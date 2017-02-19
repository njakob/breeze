/* @flow */

import Runtime from 'core/Runtime';
import type { Context } from '../common';

export default async function initializeCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const runtime = await Runtime.open({ directory });
  await runtime.initialize();

  ctx.term.log`Repository initialized ${ctx.term.green('✓')}`;
}
