/* @flow */

import * as gitHelpers from 'helpers/git';
import * as rcHelpers from 'helpers/rc';

export type OpenOptions = {
  directory: string;
};

export type OpenResult = {
  repository: any;
  masterBranch: string;
  developBranch: string;
  featurePrefix: string;
  releasePrefix: string;
  hotfixPrefix: string;
  versionTagPrefix: string;
};

export default async function open({
  directory,
}: OpenOptions): Promise<*> {
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

  return {
    repository,
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  };
}
