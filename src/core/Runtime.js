/* @flow */

import util from 'util';
import semver from 'semver';
import nodegit from 'nodegit-flow';
import * as gitHelpers from 'helpers/git';
import * as errorHelpers from 'helpers/error';
import * as npmHelpers from 'helpers/npm';
import * as rcHelpers from 'helpers/rc';
import type { Flow, Repository, Signature } from 'core/common';

const REF_PREFIX = 'refs/heads/';

export type ReleaseResult = {
  version: string,
  bumpedVersion: string,
};

export type HotfixResult = {
  version: string,
  bumpedVersion: string,
};

export type FinishResult = {
  branch: string;
};

export default class Runtime {
  directory: string;
  flow: Flow;
  hotfixCommit: string;
  initialized: boolean;
  repository: Repository;
  releaseCommit: string;
  signature: Signature;
  version: string;

  static async open({ directory }): Promise<Runtime> {
    const repository = await gitHelpers.openRepository(directory);
    const { version } = await npmHelpers.parse(directory);
    const initialized = await nodegit.Flow.isInitialized(repository);

    const {
      masterBranch,
      developBranch,
      featurePrefix,
      releasePrefix,
      hotfixPrefix,
      versionTagPrefix,
      releaseCommit,
      hotfixCommit,
    } = await rcHelpers.resolve();

    const runtime = new Runtime();
    runtime.repository = repository;
    runtime.version = version;
    runtime.initialized = initialized;
    runtime.signature = nodegit.Signature.default(repository);
    runtime.flow = {
      masterBranch,
      developBranch,
      featurePrefix,
      releasePrefix,
      hotfixPrefix,
      versionTagPrefix,
    };
    runtime.releaseCommit = releaseCommit;
    runtime.hotfixCommit = hotfixCommit;

    return runtime;
  }

  async initialize(): Promise<*> {
    await gitHelpers.initialize({ flow: this.flow, repository: this.repository });
    await rcHelpers.write({
      directory: this.directory,
      rc: {
        ...this.flow,
        releaseCommit: this.releaseCommit,
        hotfixCommit: this.hotfixCommit,
      }
    });

    this.initialized = true;
  }

  async feature(name: string): Promise<*> {
    try {
      await nodegit.Flow.startFeature(this.repository, name);
    } catch (err) {
      switch (true) {
        case /a reference with that name already exists/.test(err.message):
          throw errorHelpers.gitFlowFeatureAlreadyExists({ release: name });
        default:
          throw err;
      }
    }
  }

  async release(major: boolean = false): Promise<ReleaseResult> {
    const version = this.version;
    const bumpedVersion = semver.inc(version, major ? 'major' : 'minor');

    try {
      await nodegit.Flow.startRelease(this.repository, bumpedVersion);
    } catch (err) {
      switch (true) {
        case /a reference with that name already exists/.test(err.message):
          throw errorHelpers.gitFlowReleaseAlreadyExists({ release: bumpedVersion });
        default:
          throw err;
      }
    }

    await this.repository.createCommitOnHead(['package.json'], this.signature, this.signature, util.format(this.releaseCommit, bumpedVersion));

    return {
      version,
      bumpedVersion,
    };
  }

  async hotfix(): Promise<HotfixResult> {
    const version = this.version;
    const bumpedVersion = semver.inc(version, 'patch');

    try {
      await nodegit.Flow.startHotfix(this.repository, bumpedVersion);
    } catch (err) {
      switch (true) {
        case /a reference with that name already exists/.test(err.message):
          throw errorHelpers.gitFlowHotfixAlreadyStarted({ hotfix: bumpedVersion });
        default:
          throw err;
      }
    }


    await this.repository.createCommitOnHead(['package.json'], this.signature, this.signature, util.format(this.hotfixCommit, bumpedVersion));
    this.version = bumpedVersion;

    return {
      version,
      bumpedVersion,
    };
  }

  async finish(): Promise<FinishResult> {
    const reference = await this.repository.getCurrentBranch();
    const ref: string = reference.name();

    if (ref.indexOf(REF_PREFIX) !== 0) {
      throw errorHelpers.assertionFailed();
    }

    const branch: string = ref.substr(REF_PREFIX.length);
    const isFeature = branch.indexOf(this.flow.featurePrefix) === 0;
    const isHotfix = branch.indexOf(this.flow.hotfixPrefix) === 0;
    const isRelease = branch.indexOf(this.flow.releasePrefix) === 0;

    if (isFeature) {
      await nodegit.Flow.finishFeature(this.repository, branch.substr(this.flow.featurePrefix.length));
    } else if (isHotfix) {
      await nodegit.Flow.finishHotfix(this.repository, branch.substr(this.flow.hotfixPrefix.length));
    } else if (isRelease) {
      await nodegit.Flow.finishRelease(this.repository, branch.substr(this.flow.releasePrefix.length));
    } else {
      throw errorHelpers.gitFlowBranchUnprocessable({ branch });
    }

    return {
      branch,
    };
  }
}
