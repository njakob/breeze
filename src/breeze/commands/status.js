/* @flow */

import Runtime from 'core/Runtime';
import type { Context } from '../common';

export default async function statusCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const runtime = await Runtime.open({ directory });
  const result = {
    version: runtime.version,
    initialized: runtime.initialized,
  };

  ctx.term.log`${result}`;
}
