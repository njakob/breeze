/* @flow */

import * as bugsy from 'bugsy';

export const GIT_FLOW_NOT_INITIALIZED = 'git-flow/not-initiailzed';

export const gitFlowNotInitialized = bugsy.createError(GIT_FLOW_NOT_INITIALIZED, 'Git Flow is not initialized');
