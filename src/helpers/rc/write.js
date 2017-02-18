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
  } = rc;

  await fsHelpers.writeFile({
    data: new Buffer(JSON.stringify({
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
    }, null, '  '), 'utf8'),
    filePath: path.join(directory, NAME),
  });
}
