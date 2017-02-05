/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export type StartReleaseOptions = {
  repository: Repository;
  name: string;
};

export default async function startRelease({
  repository,
  name,
}: StartReleaseOptions): Promise<*> {
  return await nodegit.Flow.startRelease(repository, name);
}
