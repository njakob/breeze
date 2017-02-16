/* @flow */

import open from 'core/open';
import hotfix from 'core/hotfix';
import type { Context } from '../common';

export default async function hotfixCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  const { repository } = await open({ directory });
  const { bumpedVersion } = await hotfix({ directory, repository });

  ctx.term.log`Hotfix '${bumpedVersion}' created ${ctx.term.green('✓')}`;
}
