/* @flow */

import release from 'core/release';
import type { Context } from './common';

export default async function releaseCommand(ctx: Context): Promise<*> {
  const {
    bumpedVersion,
  } = await release({
    bump: ctx.options.bump || 'minor',
    directory: process.cwd(),
  });

  ctx.term.log`Release '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
