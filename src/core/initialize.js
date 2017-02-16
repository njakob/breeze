/* @flow */

import * as rcHelpers from 'helpers/rc';
import type { Flow } from 'helpers/git/common';
import * as gitHelpers from 'helpers/git';

export type InitializeOptions = {
  directory: string;
  flow: Flow;
};

export default async function init({
  directory,
  flow,
}: InitializeOptions): Promise<*> {
  const repository = await gitHelpers.openRepository(directory);
  await gitHelpers.initialize({
    repository,
    flow,
  });

  const rc = {
    ...flow,
  };
  await rcHelpers.write({
    directory,
    rc,
  });
}
