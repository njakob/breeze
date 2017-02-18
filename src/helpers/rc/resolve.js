/* @flow */

import * as rc from 'raclette';
import * as errorHelpers from 'helpers/error';
import { NAME } from './common';
import type { RC } from './common';

export default async function resolve(): Promise<RC> {
  const { result: data, entries } = await rc.resolve({
    name: NAME,
    strategies: [
      rc.strategies.cwd,
    ],
    loaders: [
      rc.loaders.json,
    ],
  });

  if (entries.length !== 1) {
    throw errorHelpers.assertionFailed();
  }

  if (entries[0].result === null) {
    throw errorHelpers.rcNotFound();
  }

  const { branch: branchData = {} } = data;
  const { prefix: prefixData = {} } = data;
  const {
    master: masterBranch = 'master',
    develop: developBranch = 'develop',
  } = branchData;
  const {
    feature: featurePrefix = 'feature/',
    release: releasePrefix = 'release/',
    hotfix: hotfixPrefix = 'hotfix/',
    'version-tag': versionTagPrefix = '',
  } = prefixData;
  return {
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  };
}
