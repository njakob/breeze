/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import type { Repository } from 'core/common';

export type FeatureOptions = {
  name: string;
  repository: Repository;
};

export type FeatureResult = {};

export default async function feature({
  name,
  repository,
}: FeatureOptions): Promise<FeatureResult> {
  try {
    await nodegit.Flow.startFeature(repository, name);
  } catch (err) {
    switch (true) {
      case /a reference with that name already exists/.test(err.message):
        throw errorHelpers.gitFlowFeatureAlreadyExists({ release: name });
      default:
        throw err;
    }
  }

  return {};
}
