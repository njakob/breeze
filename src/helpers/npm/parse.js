/* @flow */

import fs from 'fs';
import path from 'path';
import type { Bugsy } from 'bugsy';
import { parseParcel } from '@njakob/parcel';
import * as errorHelpers from 'helpers/error';

export type ParseResult = {
  version: string;
};

export default async function parse(directory: string): Promise<ParseResult> {
  return new Promise((resolve: (result: ParseResult) => void, reject: (err: Bugsy) => void) => {
    const packageFilePath = path.join(directory, 'package.json');

    fs.readFile(packageFilePath, 'utf8', (err: ?ErrnoError, data: string): void => {
      if (err) {
        if (err.code === 'ENOENT') {
          return reject(errorHelpers.npmPackageNotFound());
        }
        return reject(errorHelpers.convert(err));
      }

      let pkg;
      try {
        pkg = JSON.parse(data);
      } catch (innerErr) {
        return reject(errorHelpers.npmPackageUnparseable());
      }

      const { version } = parseParcel(pkg);

      if (!version) {
        return reject(errorHelpers.npmPackageUnparseable());
      }

      return resolve({
        version,
      });
    });
  });
}
