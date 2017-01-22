/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export default async function openRepository(directory: string): Promise<Repository> {
  return await nodegit.Repository.open(directory);
}
