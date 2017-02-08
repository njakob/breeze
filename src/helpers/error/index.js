/* @flow */

import * as bugsy from 'bugsy';
import * as codes from './codes';

export { codes };
export const convert = bugsy.convert;

export const assertionFailed = bugsy.createError(codes.ASSERTION_FAILED, 'Assertion failed');

export const gitRepositoryNotFound = bugsy.createError(codes.GIT_REPOSITORY_NOT_FOUND, 'Could not find a git repository');

export const gitFlowNotInitialized = bugsy.createError(codes.GIT_FLOW_NOT_INITIALIZED, 'Git-flow is not initialized');

export const gitFlowReleaseAlreadyExists = ({ release }: { release: string; }) => new bugsy.Bugsy({
  code: codes.GIT_FLOW_RELEASE_ALREADY_EXISTS,
  message: `Release '${release}' already exists`,
  meta: {
    release,
  },
});

export const npmPackageNotFound = bugsy.createError(codes.NPM_PACKAGE_NOT_FOUND, 'Could not find a package.json file');
export const npmPackageUnparseable = bugsy.createError(codes.NPM_PACKAGE_UNPARSEABLE, 'Unable to parse package.json file');

export const rcNotFound = bugsy.createError(codes.RC_NOT_FOUND, 'Could not find a .breezerc file');
