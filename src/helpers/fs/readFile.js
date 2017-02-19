/* @flow */

import fs from 'fs';

export default function readFile(filePath: string): Promise<Buffer> {
  return new Promise((resolve: (buffer: Buffer) => void, reject: (err: ErrnoError) => void) => {
    fs.readFile(filePath, (err: ?ErrnoError, data: Buffer): void => {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  });
}
