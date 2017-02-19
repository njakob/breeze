/* @flow */

export type RC = {
  masterBranch: string;
  developBranch: string;
  featurePrefix: string;
  releasePrefix: string;
  hotfixPrefix: string;
  versionTagPrefix: string;
  releaseCommit: string;
  hotfixCommit: string;
};

export const NAME = '.breezerc';
