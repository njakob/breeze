/* @flow */

export type Options = {
  verbose: number;
  bump?: string;
  name?: string;
};

export type Context = {
  term: any;
  options: Options;
};

export type Command = (ctx: Context) => Promise<*>;
