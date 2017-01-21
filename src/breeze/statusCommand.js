/* @flow */

import status from '../status';
import type { Context } from './common';

export default async function statusCommand(ctx: Context): Promise<*> {
  const output = await status({
    directory: process.cwd(),
  });

  ctx.term.log`${output}`;
}
