/* @flow */

import { parseParcel } from '@njakob/parcel';
import pkg from 'package.json';
import type { Context } from './common';

export default async function versionCommand(ctx: Context): Promise<*> {
  const {
    name,
    version,
    author,
    homepage,
  } = parseParcel(pkg);

  ctx.term.log`${ctx.term.white(name && name.name)} ${ctx.term.dim(version)}`;
  ctx.term.log`Built with ${ctx.term.red('❤')} by ${author && author.name}`;
  ctx.term.log`${ctx.term.blue(homepage)}`;
}
