/* @flow */

import * as rc from 'raclette';
import { NAME } from './common';
import type { RC } from './common';

export default async function resolve(): Promise<RC> {
  const { result } = await rc.resolve({
    name: NAME,
    strategies: [
      rc.strategies.cwd,
    ],
    loaders: [
      rc.loaders.json,
    ],
  });

  return {
    masterBranch: result['master-branch'],
    developBranch: result['develop-branch'],
    featurePrefix: result['feature-prefix'],
    releasePrefix: result['release-prefix'],
    hotfixPrefix: result['hotfix-prefix'],
    versionTagPrefix: result['version-tag-prefix'],
  };
}
