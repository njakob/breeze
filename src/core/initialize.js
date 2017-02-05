/* @flow */

import * as rcHelpers from 'helpers/rc';
import * as gitHelpers from 'helpers/git';

export type InitializeOptions = {
  directory: string;
  masterBranch: string;
  developBranch: string;
  featurePrefix: string;
  releasePrefix: string;
  hotfixPrefix: string;
  versionTagPrefix: string;
};

export type InitializeResult = {

};

export default async function init({
  directory,
  masterBranch,
  developBranch,
  featurePrefix,
  releasePrefix,
  hotfixPrefix,
  versionTagPrefix,
}: InitializeOptions): Promise<InitializeResult> {
  const repository = await gitHelpers.openRepository(directory);
  await gitHelpers.initialize({
    repository,
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  });

  const rc = {
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  };
  await rcHelpers.write({
    directory,
    rc,
  });

  return {};
}
