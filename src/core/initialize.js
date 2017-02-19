/* @flow */

import * as rcHelpers from 'helpers/rc';
import * as gitHelpers from 'helpers/git';
import type { Flow } from 'core/common';

export type InitializeOptions = {
  directory: string;
  flow: Flow;
  releaseCommit: string;
  hotfixCommit: string;
};

export default async function init({
  directory,
  flow,
  releaseCommit,
  hotfixCommit,
}: InitializeOptions): Promise<*> {
  const repository = await gitHelpers.openRepository(directory);

  await gitHelpers.initialize({ flow, repository });

  const rc = {
    ...flow,
    releaseCommit,
    hotfixCommit,
  };

  await rcHelpers.write({ directory, rc });
}
