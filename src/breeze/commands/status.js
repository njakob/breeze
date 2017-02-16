/* @flow */

import status from 'core/status';
import type { Context } from '../common';

export default async function statusCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const statusResult = await status({ directory });

  ctx.term.log`${statusResult}`;
}
