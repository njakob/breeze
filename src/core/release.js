/* @flow */

import semver from 'semver';
import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';
import * as errorHelpers from 'helpers/error';

export type ReleaseOptions = {
  bump: string;
  directory: string;
};

export type ReleaseResult = {
  version: string,
  bumpedVersion: string,
};

export default async function release({
  bump,
  directory,
}: ReleaseOptions): Promise<ReleaseResult> {
  const repository = await gitHelpers.openRepository(directory);
  const initialized = await gitHelpers.isInitialized(repository);

  if (!initialized) {
    throw errorHelpers.gitFlowNotInitialized();
  }

  const { version } = await npmHelpers.parsePackage(directory);
  const bumpedVersion = semver.inc(version, bump);

  await gitHelpers.startRelease({
    repository,
    name: bumpedVersion,
  });

  return {
    version,
    bumpedVersion,
  };
}
