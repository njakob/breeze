/* @flow */

import path from 'path';
import { parseParcel } from '@njakob/parcel';
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
  } catch (err) {
    throw errorHelpers.npmPackageUnparseable();
  }
}

export default async function parse(directory: string): Promise<ParseResult> {
  const filePath = path.join(directory, 'package.json');
  const data = await readPackage(filePath);
  const { version } = parseParcel(parsePackage(data));

  if (!version) {
    throw errorHelpers.npmPackageUnparseable();
  }

  return {
    version,
  };
}
