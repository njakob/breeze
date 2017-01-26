/* @flow */

import { version, name } from 'package.json';
import type { Context } from './common';

function stripScope(value: string): string {
  return value.substring(value.indexOf('/') + 1);
}

export default async function versionCommand(ctx: Context): Promise<*> {
  ctx.term.log`${ctx.term.white(stripScope(name))} ${ctx.term.dim(version)}`;
}
