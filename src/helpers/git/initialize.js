/* @flow */

import nodegit from 'nodegit-flow';
import type { Flow, Repository } from './common';

export type InitializeOptions = {
  flow: Flow;
  repository: Repository;
};

export default async function initialize({
  flow,
  repository,
}: InitializeOptions): Promise<*> {
  await nodegit.Flow.init(repository, {
    'gitflow.branch.master': flow.masterBranch,
    'gitflow.branch.develop': flow.developBranch,
    'gitflow.prefix.feature': flow.featurePrefix,
    'gitflow.prefix.release': flow.releasePrefix,
    'gitflow.prefix.hotfix': flow.hotfixPrefix,
    'gitflow.prefix.versiontag': flow.versionTagPrefix,
  });
}
