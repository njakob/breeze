/* @flow */

export type Options = {
  verbose: number;
};

export type Context = {
  term: any;
  verbose: number;
};

export type Command = (ctx: Context) => Promise<*>;
