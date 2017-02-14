/* @flow */

import nodegit from 'nodegit-flow';
import * as errorHelpers from 'helpers/error';
import type { Repository } from './common';

export type StartHotfixOptions = {
  repository: Repository;
  name: string;
};

export default async function startHotfix({
  repository,
  name,
}: StartHotfixOptions): Promise<*> {
  try {
    return await nodegit.Flow.startHotfix(repository, name);
  } catch (err) {
    switch (true) {
      case /a reference with that name already exists/.test(err.message):
        throw errorHelpers.gitFlowHotfixAlreadyStarted({ hotfix: name });
      default:
        throw err;
    }
  }
}
