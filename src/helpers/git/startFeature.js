/* @flow */

import nodegit from 'nodegit-flow';
import type { Repository } from './common';

export type StartFeatureOptions = {
  repository: Repository;
  name: string;
};

export default async function startFeature({
  repository,
  name,
}: StartFeatureOptions): Promise<*> {
  return await nodegit.Flow.startFeature(repository, name);
}
