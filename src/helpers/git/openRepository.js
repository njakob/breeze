/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import type { Repository } from './common';

export default async function openRepository(directory: string): Promise<Repository> {
  try {
    return await nodegit.Repository.open(directory);
  } catch (err) {
    // Sadly, the library does not provide any code that we can test against
    // the error.
    throw errorHelpers.gitRepositoryNotFound();
  }
}
