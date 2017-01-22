/* @flow */

import Terminus from '@njakob/terminus';
import type { Options, Context } from './common';

export default function createContext(options: Options): Context {
  return {
    options,
    term: new Terminus(),
  };
}
