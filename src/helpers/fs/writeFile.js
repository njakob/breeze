/* @flow */

import fs from 'fs';

export type WriteFileOptions = {
  filePath: string;
  data: Buffer;
};

export default function writeFile({
  filePath,
  data,
}: WriteFileOptions): Promise<*> {
  return new Promise((resolve: () => void, reject: (err: ErrnoError) => void) => {
    fs.writeFile(filePath, data, (err: ?Error): void => {
      if (err) {
        return reject(err);
      }

      return resolve();
    });
  });
}
