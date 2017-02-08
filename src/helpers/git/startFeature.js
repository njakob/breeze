/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import type { Repository } from './common';

export type StartFeatureOptions = {
  repository: Repository;
  name: string;
};

export default async function startFeature({
  repository,
  name,
}: StartFeatureOptions): Promise<*> {
  try {
    return await nodegit.Flow.startFeature(repository, name);
  } catch (err) {
    switch (true) {
      case /a reference with that name already exists/.test(err.message):
        throw errorHelpers.gitFlowReleaseAlreadyExists({ release: name });
      default:
        throw err;
    }
  }
}
