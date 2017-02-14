/* @flow */

import semver from 'semver';
import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';
import recover from './recover';

export type HotfixOptions = {
  directory: string;
};

export type HotfixResult = {
  version: string,
  bumpedVersion: string,
};

export default async function release({
  directory,
}: HotfixOptions): Promise<HotfixResult> {
  const repository = await gitHelpers.openRepository(directory);

  await recover({
    directory,
  });

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
