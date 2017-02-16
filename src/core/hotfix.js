/* @flow */

import nodegit from 'nodegit-flow';
import semver from 'semver';
import * as errorHelpers from 'helpers/error';
import * as npmHelpers from 'helpers/npm';
import type { Repository } from 'core/common';

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

  try {
    await nodegit.Flow.startHotfix(repository, bumpedVersion);
  } catch (err) {
    switch (true) {
      case /a reference with that name already exists/.test(err.message):
        throw errorHelpers.gitFlowHotfixAlreadyStarted({ hotfix: bumpedVersion });
      default:
        throw err;
    }
  }

  return {
    version,
    bumpedVersion,
  };
}
