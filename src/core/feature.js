/* @flow */

import * as gitHelpers from 'helpers/git';
import recover from './recover';

export type FeatureOptions = {
  directory: string;
  name: string;
};

export default async function feature({
  directory,
  name,
}: FeatureOptions): Promise<*> {
  const repository = await gitHelpers.openRepository(directory);

  await recover({
    directory,
  });

  await gitHelpers.startFeature({
    repository,
    name,
  });
}
