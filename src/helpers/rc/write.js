/* @flow */

import * as path from 'path';
import * as fsHelpers from 'helpers/fs';
import { NAME } from './common';
import type { RC } from './common';

export type WriteOptions = {
  directory: string;
  rc: RC;
};

export default async function write({
  directory,
  rc,
}: WriteOptions): Promise<*> {
  const {
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
    releaseCommit,
    hotfixCommit,
  } = rc;

  const filePath = path.join(directory, NAME);
  const data = new Buffer(JSON.stringify({
    branch: {
      master: masterBranch,
      develop: developBranch,
    },
    prefix: {
      feature: featurePrefix,
      release: releasePrefix,
      hotfix: hotfixPrefix,
      'version-tag': versionTagPrefix,
    },
    commit: {
      release: releaseCommit,
      hotfix: hotfixCommit,
    },
  }, null, '  '), 'utf8');
  await fsHelpers.writeFile(filePath, data);
}
