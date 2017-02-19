/* @flow */

import Runtime from 'core/Runtime';
import * as errorHelpers from 'helpers/error';
import type { Context } from '../common';

export default async function featureCommand(ctx: Context): Promise<*> {
  const { name } = ctx.options;
  const directory = process.cwd();

  if (!name) {
    throw errorHelpers.assertionFailed();
  }

  const runtime = await Runtime.open({ directory });
  await runtime.initialize();
  await runtime.feature(name);

  ctx.term.log`Feature '${name}' created ${ctx.term.green('✓')}`;
}
