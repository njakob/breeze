/* @flow */

import * as gitHelpers from 'helpers/git';
import * as npmHelpers from 'helpers/npm';

export type StatusOptions = {
  directory: string;
};

export type StatusResult = {
  initialized: boolean;
};

export default async function status({
  directory,
}: StatusOptions): Promise<StatusResult> {
  const repository = await gitHelpers.openRepository(directory);
  const initialized = await gitHelpers.isInitialized(repository);
  const { version } = await npmHelpers.parsePackage(directory);

  return {
    initialized,
    version,
  };
}
