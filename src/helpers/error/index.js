/* @flow */

import * as bugsy from 'bugsy';
import * as codes from './codes';

export { codes };
export const convert = bugsy.convert;

export const assertionFailed = bugsy.createError(codes.ASSERTION_FAILED, 'Assertion failed');

export const gitRepositoryNotFound = bugsy.createError(codes.GIT_REPOSITORY_NOT_FOUND, 'Could not find a git repository');

export const gitFlowNotInitialized = bugsy.createError(codes.GIT_FLOW_NOT_INITIALIZED, 'Git-flow is not initialized');

export const gitFlowReleaseAlreadyExists = bugsy.createDynamicError(codes.GIT_FLOW_RELEASE_ALREADY_EXISTS,
  ({ release }: { release: string; }) => `Release '${release}' already exists`);
export const gitFlowHotfixAlreadyStarted = bugsy.createDynamicError(codes.GIT_FLOW_HOTFIX_ALREADY_STARTED,
  ({ hotfix }: { hotfix: string; }) => `Hotfix '${hotfix}' already started`);
export const gitFlowBranchUnprocessable = bugsy.createDynamicError(codes.GIT_FLOW_BRANCH_UNPROCESSABLE,
  ({ branch }: { branch: string; }) => `Unable to process branch '${branch}'`);

export const npmPackageNotFound = bugsy.createError(codes.NPM_PACKAGE_NOT_FOUND, 'Could not find a package.json file');
export const npmPackageUnparseable = bugsy.createError(codes.NPM_PACKAGE_UNPARSEABLE, 'Unable to parse package.json file');

export const rcNotFound = bugsy.createError(codes.RC_NOT_FOUND, 'Could not find a .breezerc file');
