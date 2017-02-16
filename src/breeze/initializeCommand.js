/* @flow */

import initialize from 'core/initialize';
import type { Flow } from 'core/common';
import type { Context } from './common';

export default async function initializeCommand(ctx: Context): Promise<*> {
  const directory = process.cwd();
  const flow: Flow = {
    masterBranch: 'master',
    developBranch: 'develop',
    featurePrefix: 'feature/',
    releasePrefix: 'release/',
    hotfixPrefix: 'hotfix/',
    versionTagPrefix: '',
  };

  await initialize({
    directory,
    flow,
  });

  ctx.term.log`Repository initialized ${ctx.term.green('✓')}`;
}
