/* @flow */

import * as bugsy from 'bugsy';
import * as codes from './codes';

export { codes };
export const gitFlowNotInitialized = bugsy.createError(codes.GIT_FLOW_NOT_INITIALIZED, 'Git Flow is not initialized');
