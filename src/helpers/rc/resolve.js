/* @flow */

import * as rc from 'raclette';
import * as errorHelpers from 'helpers/error';
import { NAME } from './common';
import type { RC } from './common';

export default async function resolve(): Promise<RC> {
  const { result, entries } = await rc.resolve({
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

  return {
    masterBranch: result['master-branch'] || 'master',
    developBranch: result['develop-branch'] || 'develop',
    featurePrefix: result['feature-prefix'] || 'feature/',
    releasePrefix: result['release-prefix'] || 'release/',
    hotfixPrefix: result['hotfix-prefix'] || 'hotfix/',
    versionTagPrefix: result['version-tag-prefix'] || '',
  };
}
