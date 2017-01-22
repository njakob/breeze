/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export default async function isInitialized(repository: Repository): Promise<boolean> {
  return await nodegit.Flow.isInitialized(repository);
}
