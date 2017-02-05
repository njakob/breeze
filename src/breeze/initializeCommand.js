/* @flow */

import initialize from 'core/initialize';
import type { Context } from './common';

export default async function initializeCommand(ctx: Context): Promise<*> {
  await initialize({
    directory: process.cwd(),
    masterBranch: 'master',
    developBranch: 'develop',
    featurePrefix: 'feature/',
    releasePrefix: 'release/',
    hotfixPrefix: 'hotfix/',
    versionTagPrefix: '',
  });

  ctx.term.log`<name> initialized`;
}
