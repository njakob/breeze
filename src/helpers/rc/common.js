/* @flow */

export type RC = {
  masterBranch: ?string;
  developBranch: ?string;
  featurePrefix: ?string;
  releasePrefix: ?string;
  hotfixPrefix: ?string;
  versionTagPrefix: ?string;
};

export const NAME = '.breezerc';
