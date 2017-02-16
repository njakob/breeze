/* @flow */

import open from 'core/open';
import finish from 'core/finish';
import type { Context } from '../common';

export default async function finishCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const { flow, repository } = await open({ directory });
  const { branch } = await finish({
    flow,
    directory,
    repository,
  });

  ctx.term.log`Finish '${branch}' ${ctx.term.green('✓')}`;
}
