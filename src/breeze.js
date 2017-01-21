/* @flow */

import yargs from 'yargs';
import Terminus from '@njakob/terminus';
import { version } from '../package.json';
import status from './status';

type Options = {
  verbose: number;
};

type Context = {
  term: Terminus;
  verbose: number;
};

type Command = (ctx: Context) => Promise<*>;

function createContext(options: Options): Context {
  return {
    term: new Terminus(),
    verbose: options.verbose,
  };
}

async function statusCommand(ctx: Context): Promise<*> {
  const output = await status({
    directory: process.cwd(),
  });

  ctx.term.log`${output}`;
}

function yargsHandler(command: Command): (options: Options) => void {
  return (options: Options) => {
    const ctx = createContext(options);

    command(ctx).catch((err: Error) => {
      ctx.term.log`${err}`;
    });
  };
}

yargs
  .usage('Usage: $0 <command> [options]')
  .example('$0 status')
  .help('h')
  .alias('h', 'help')
  .alias('v', 'version')
  .version(version)
  .command({
    command: 'status',
    desc: 'Show current repository status',
    handler: yargsHandler(statusCommand),
  })
  .argv;
