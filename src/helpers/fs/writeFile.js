/* @flow */

import fs from 'fs';

export default function writeFile(filePath: string, data: Buffer): Promise<*> {
  return new Promise((resolve: () => void, reject: (err: ErrnoError) => void) => {
    fs.writeFile(filePath, data, (err: ?Error): void => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
