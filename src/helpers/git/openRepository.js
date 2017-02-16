/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import type { Repository } from 'core/common';

export default async function openRepository(directory: string): Promise<Repository> {
  try {
    return await nodegit.Repository.open(directory);
  } catch (err) {
    throw errorHelpers.gitRepositoryNotFound();
  }
}
