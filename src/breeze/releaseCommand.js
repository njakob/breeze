/* @flow */

import release from 'core/release';
import type { Context } from './common';

export default async function releaseCommand(ctx: Context): Promise<*> {
  const releaseResult = await release({
    dryRun: true,
    bump: ctx.options.bump || 'minor',
    directory: process.cwd(),
  });

  ctx.term.log`${releaseResult}`;
}
