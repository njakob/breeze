/* @flow */

import semver from 'semver';
import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';
import type { Repository } from './common';

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

  await gitHelpers.startRelease({
    repository,
    name: bumpedVersion,
  });

  return {
    version,
    bumpedVersion,
  };
}
