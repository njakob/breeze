/* @flow */

import * as rcHelpers from 'helpers/rc';
import * as gitHelpers from 'helpers/git';
import type { Flow } from 'core/common';

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
    flow,
    repository,
  });

  const rc = {
    ...flow,
  };

  await rcHelpers.write({
    directory,
    rc,
  });
}
