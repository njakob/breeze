/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export type InitializeOptions = {
  repository: Repository;
  masterBranch: string;
  developBranch: string;
  featurePrefix: string;
  releasePrefix: string;
  hotfixPrefix: string;
  versionTagPrefix: string;
};

export default async function initialize({
  repository,
  masterBranch,
  developBranch,
  featurePrefix,
  releasePrefix,
  hotfixPrefix,
  versionTagPrefix,
}: InitializeOptions): Promise<*> {
  await nodegit.Flow.init(repository, {
    'gitflow.branch.master': masterBranch,
    'gitflow.branch.develop': developBranch,
    'gitflow.prefix.feature': featurePrefix,
    'gitflow.prefix.release': releasePrefix,
    'gitflow.prefix.hotfix': hotfixPrefix,
    'gitflow.prefix.versiontag': versionTagPrefix,
  });
}
