/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import * as npmHelpers from 'helpers/npm';

export type StatusOptions = {
  directory: string;
};

export type StatusResult = {
  initialized: boolean;
};

async function openRepository(directory: string) {
  try {
    return await nodegit.Repository.open(directory);
  } catch (err) {
    throw errorHelpers.gitRepositoryNotFound();
  }
}

export default async function status({
  directory,
}: StatusOptions): Promise<StatusResult> {
  const repository = await openRepository(directory);
  const initialized = await nodegit.Flow.isInitialized(repository);
  const { version } = await npmHelpers.parsePackage(directory);

  return {
    initialized,
    version,
  };
}
