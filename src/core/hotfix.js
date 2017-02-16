/* @flow */

import semver from 'semver';
import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';
import type { Repository } from './common';

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
