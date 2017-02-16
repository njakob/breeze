/* @flow */

import * as gitHelpers from 'helpers/git';
import type { Repository } from './common';

export type FeatureOptions = {
  name: string;
  repository: Repository;
};

export type FeatureResult = {};

export default async function feature({
  name,
  repository,
}: FeatureOptions): Promise<FeatureResult> {
  await gitHelpers.startFeature({
    repository,
    name,
  });

  return {};
}
