/* @flow */

import semver from 'semver';
import type { Repository } from 'helpers/git/common';
import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';

export type HotfixOptions = {
  directory: string;
  repository: Repository;
};

export type HotfixResult = {
  version: string,
  bumpedVersion: string,
};

export default async function release({
  directory,
  repository,
}: HotfixOptions): Promise<HotfixResult> {
  const { version } = await npmHelpers.parsePackage(directory);
  const bumpedVersion = semver.inc(version, 'patch');

  await gitHelpers.startHotfix({
    repository,
    name: bumpedVersion,
  });

  return {
    version,
    bumpedVersion,
  };
}
