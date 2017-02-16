/* @flow */

import type { Flow } from 'helpers/git/common';
import * as gitHelpers from 'helpers/git';
import * as rcHelpers from 'helpers/rc';

export type OpenOptions = {
  directory: string;
};

export type OpenResult = {
  flow: Flow;
  repository: any;
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

  const flow = {
    masterBranch,
    developBranch,
    featurePrefix,
    releasePrefix,
    hotfixPrefix,
    versionTagPrefix,
  };

  await gitHelpers.initialize({
    flow,
    repository,
  });

  return {
    flow,
    repository,
  };
}
