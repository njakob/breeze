/* @flow */

import fs from 'fs';
import path from 'path';

export type ParsePackageOptions = {
  directory: string;
};

export type ParsePackage = {
  version: string;
};

export default async function parsePackage({
  directory,
}: ParsePackageOptions): Promise<ParsePackage> {
  return new Promise((resolve: (result: ParsePackage) => void, reject: (err: Error) => void) => {
    const packageFilePath = path.join(directory, 'package.json');

    fs.readFile(packageFilePath, 'utf8', (err: ?Error, data: string) => {
      if (err) {
        reject(err);
      }

      try {
        const { version } = JSON.parse(data);

        resolve({
          version,
        });
      } catch (parseErr) {
        reject(parseErr);
      }
    });
  });
}
