/* @flow */

import yargs from 'yargs';
import { version } from '../../package.json';
import type { Command, Options } from './common';
import createContext from './createContext';
import statusCommand from './statusCommand';

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
