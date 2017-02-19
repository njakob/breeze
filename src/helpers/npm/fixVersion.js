/* @flow */

import path from 'path';
import * as fsHelpers from 'helpers/fs';
import * as errorHelpers from 'helpers/error';

export type ParseResult = {
  version: string;
};

async function readPackage(filePath: string): Promise<string> {
  let buffer: Buffer;

  try {
    buffer = await fsHelpers.readFile(filePath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw errorHelpers.npmPackageNotFound();
    } else {
      throw errorHelpers.convert(err);
    }
  }

  return buffer.toString('utf8');
}

function parsePackage(data: string): any {
  try {
    return JSON.parse(data);
  } catch (innerErr) {
    throw errorHelpers.npmPackageUnparseable();
  }
}

export default async function fixVersion(directory: string, version: string): Promise<*> {
  const filePath = path.join(directory, 'package.json');
  const data = await readPackage(filePath);
  const pkg = parsePackage(data);
  pkg.version = version;
  await fsHelpers.writeFile(filePath, new Buffer(JSON.stringify(pkg, null, '  '), 'utf8'));
}
