/* @flow */

import nodegit from 'nodegit-flow';
import * as npmHelpers from 'helpers/npm';

export type StatusOptions = {
  directory: string;
};

export type StatusOutput = {
  initialized: boolean;
};

export default async function status({
  directory,
}: StatusOptions): Promise<StatusOutput> {
  const repository = await nodegit.Repository.open(directory);
  const initialized = await nodegit.Flow.isInitialized(repository);
  const { version: packageVersion } = await npmHelpers.parsePackage({ directory });

  return {
    initialized,
    packageVersion,
  };
}
