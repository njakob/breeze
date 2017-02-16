/* @flow */

import initialize from 'core/initialize';
import type { Context } from './common';

export default async function initializeCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();

  await initialize({
    directory,
    masterBranch: 'master',
    developBranch: 'develop',
    featurePrefix: 'feature/',
    releasePrefix: 'release/',
    hotfixPrefix: 'hotfix/',
    versionTagPrefix: '',
  });

  ctx.term.log`Repository initialized ${ctx.term.green('✓')}`;
}
