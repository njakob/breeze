/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export default async function startRelease(repository: Repository, name: string): Promise<*> {
  return await nodegit.Flow.startRelease(repository, name);
}
