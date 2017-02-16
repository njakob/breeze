/* @flow */

import open from 'core/open';
import feature from 'core/feature';
import * as errorHelpers from 'helpers/error';
import type { Context } from './common';

export default async function featureCommand(ctx: Context): Promise<*> {
  const { name } = ctx.options;
  const directory = process.cwd();

  if (!name) {
    throw errorHelpers.assertionFailed();
  }

  const { repository } = await open({
    directory,
  });
  await feature({
    name,
    directory,
    repository,
  });

  ctx.term.log`Feature '${name}' created ${ctx.term.green('✓')}`;
}
