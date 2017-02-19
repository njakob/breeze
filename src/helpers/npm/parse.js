/* @flow */

import path from 'path';
import { parseParcel } from '@njakob/parcel';
import * as fsHelpers from 'helpers/fs';
import * as errorHelpers from 'helpers/error';

export type ParseResult = {
  version: string;
};

async function readPackage(directory: string): Promise<string> {
  try {
    return await fsHelpers.readFile({
      filePath: path.join(directory, 'package.json')
    }).toString('utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw errorHelpers.npmPackageNotFound();
    } else {
      throw errorHelpers.convert(err);
    }
  }
}

function parsePackage(data: string): any {
  try {
    return JSON.parse(data);
  } catch (innerErr) {
    throw errorHelpers.npmPackageUnparseable();
  }
}

export default async function parse(directory: string): Promise<ParseResult> {
  const data = await readPackage(directory);
  const { version } = parseParcel(parsePackage(data));

  if (!version) {
    throw errorHelpers.npmPackageUnparseable();
  }

  return {
    version,
  };
}
