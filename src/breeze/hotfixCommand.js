/* @flow */

import hotfix from 'core/hotfix';
import type { Context } from './common';

export default async function hotfixCommand(ctx: Context): Promise<*> {
  const {
    bumpedVersion,
  } = await hotfix({
    directory: process.cwd(),
  });

  ctx.term.log`Hotfix '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
