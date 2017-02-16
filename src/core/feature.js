/* @flow */

import type { Repository } from 'helpers/git/common';
import * as gitHelpers from 'helpers/git';

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
