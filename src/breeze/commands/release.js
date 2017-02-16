/* @flow */

import open from 'core/open';
import release from 'core/release';
import type { Context } from '../common';

export default async function releaseCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();
  const { bump = 'minor' } = ctx.options;

  const { repository } = await open({
    directory,
  });
  const {
    bumpedVersion,
  } = await release({
    bump,
    directory,
    repository,
  });

  ctx.term.log`Release '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
