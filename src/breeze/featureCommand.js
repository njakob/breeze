/* @flow */

import feature from 'core/feature';
import * as errorHelpers from 'helpers/error';
import type { Context } from './common';

export default async function featureCommand(ctx: Context): Promise<*> {
  const name = ctx.options.name;

  if (!name) {
    throw errorHelpers.assertionFailed();
  }

  await feature({
    name,
    directory: process.cwd(),
  });
}
