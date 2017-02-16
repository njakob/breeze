/* @flow */

import semver from 'semver';
import nodegit from 'nodegit-flow';
import * as npmHelpers from 'helpers/npm';
import * as errorHelpers from 'helpers/error';
import type { Repository } from 'core/common';

export type ReleaseOptions = {
  bump: string;
  directory: string;
  repository: Repository;
};

export type ReleaseResult = {
  version: string,
  bumpedVersion: string,
};

export default async function release({
  bump,
  directory,
  repository,
}: ReleaseOptions): Promise<ReleaseResult> {
  const { version } = await npmHelpers.parsePackage(directory);
  const bumpedVersion = semver.inc(version, bump);

  try {
    await nodegit.Flow.startRelease(repository, bumpedVersion);
  } catch (err) {
    switch (true) {
      case /a reference with that name already exists/.test(err.message):
        throw errorHelpers.gitFlowReleaseAlreadyExists({ release: bumpedVersion });
      default:
        throw err;
    }
  }

  return {
    version,
    bumpedVersion,
  };
}
