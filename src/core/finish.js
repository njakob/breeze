/* @flow */

import nodegit from 'nodegit-flow';
import * as errors from 'helpers/error';
import type { Flow, Repository } from 'core/common';

const REF_PREFIX = 'refs/heads/';

export type FinishOptions = {
  flow: Flow;
  repository: Repository;
};

export type FinishResult = {
  branch: string;
};

async function finishFeature(repository: Repository, name: string): Promise<*> {
  return await nodegit.Flow.finishFeature(repository, name);
}

async function finishHotfix(repository: Repository, name: string): Promise<*> {
  return await nodegit.Flow.finishHotfix(repository, name);
}

async function finishRelease(repository: Repository, name: string): Promise<*> {
  return await nodegit.Flow.finishRelease(repository, name);
}

export default async function finish({
  flow,
  repository,
}: FinishOptions): Promise<FinishResult> {
  const reference = await repository.getCurrentBranch();
  const ref: string = reference.name();

  if (ref.indexOf(REF_PREFIX) !== 0) {
    throw errors.assertionFailed();
  }

  const branch: string = ref.substr(REF_PREFIX.length);
  const isFeature = branch.indexOf(flow.featurePrefix) === 0;
  const isHotfix = branch.indexOf(flow.hotfixPrefix) === 0;
  const isRelease = branch.indexOf(flow.releasePrefix) === 0;

  if (isFeature) {
    await finishFeature(repository, branch.substr(flow.featurePrefix.length));
  } else if (isHotfix) {
    await finishHotfix(repository, branch.substr(flow.hotfixPrefix.length));
  } else if (isRelease) {
    await finishRelease(repository, branch.substr(flow.releasePrefix.length));
  } else {
    throw errors.gitFlowBranchUnprocessable({ branch });
  }

  return {
    branch,
  };
}
