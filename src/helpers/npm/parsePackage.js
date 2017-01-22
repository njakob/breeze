/* @flow */

import fs from 'fs';
import path from 'path';
import type { Bugsy } from 'bugsy';
import * as errorHelpers from 'helpers/error';

export type ParsePackage = {
  version: string;
};

export default async function parsePackage(directory: string): Promise<ParsePackage> {
  return new Promise((resolve: (result: ParsePackage) => void, reject: (err: Bugsy) => void) => {
    const packageFilePath = path.join(directory, 'package.json');

    fs.readFile(packageFilePath, 'utf8', (err: ?ErrnoError, data: string): void => {
      if (err) {
        if (err.code === 'ENOENT') {
          return reject(errorHelpers.npmPackageNotFound());
        }
        return reject(errorHelpers.convert(err));
      }

      try {
        const { version } = JSON.parse(data);

        return resolve({
          version,
        });
      } catch (innerErr) {
        return reject(errorHelpers.npmPackageUnparseable());
      }
    });
  });
}
