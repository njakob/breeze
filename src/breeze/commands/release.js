/* @flow */

import Runtime from 'core/Runtime';
import type { Context } from '../common';

export default async function releaseCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();
  const { bump = 'minor' } = ctx.options;

  const runtime = await Runtime.open({ directory });
  runtime.initialize();
  const { bumpedVersion } = await runtime.release(bump === 'major');

  ctx.term.log`Release '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
