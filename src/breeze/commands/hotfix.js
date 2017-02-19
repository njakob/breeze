/* @flow */

import Runtime from 'core/Runtime';
import type { Context } from '../common';

export default async function hotfixCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const runtime = await Runtime.open({ directory });
  await runtime.initialize();
  const { bumpedVersion } = await runtime.hotfix();

  ctx.term.log`Hotfix '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
