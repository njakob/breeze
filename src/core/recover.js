/* @flow */

import * as gitHelpers from 'helpers/git';
import * as rcHelpers from 'helpers/rc';

export type RecoverOptions = {
  directory: string;
};

export default async function recover({
  directory,
}: RecoverOptions): Promise<*> {
  const repository = await gitHelpers.openRepository(directory);
  const {
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  } = await rcHelpers.resolve();

  await gitHelpers.initialize({
    repository,
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  });
}
