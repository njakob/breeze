/* @flow */

import nodegit from 'nodegit-flow';

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

  return {
    initialized,
  };
}
