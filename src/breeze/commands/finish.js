/* @flow */

import Runtime from 'core/Runtime';
import type { Context } from '../common';

export default async function finishCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const runtime = await Runtime.open({ directory });
  await runtime.initialize();
  const { branch } = await runtime.finish();

  ctx.term.log`Finish '${branch}' ${ctx.term.green('✓')}`;
}
