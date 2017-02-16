/* @flow */

import status from 'core/status';
import type { Context } from '../common';

export default async function statusCommand(ctx: Context): Promise<*> {
  const statusResult = await status({
    directory: process.cwd(),
  });

  ctx.term.log`${statusResult}`;
}
