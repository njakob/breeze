/* @flow */

import yargs from 'yargs';
import { version } from 'package.json';
import type { Command, Options } from './common';
import createContext from './createContext';
import releaseCommand from './releaseCommand';
import statusCommand from './statusCommand';
import versionCommand from './versionCommand';

function yargsHandler(command: Command): (options: Options) => void {
  return (options: Options) => {
    const ctx = createContext(options);

    command(ctx).catch((err: Error) => {
      ctx.term.log`Error: ${err.message}`;
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
    command: 'release [bump]',
    desc: 'Start a new release',
    builder: (y: any): any => y
      .option('bump', {
        default: 'minor',
        desc: 'X',
        choices: ['minor', 'major'],
      }),
    handler: yargsHandler(releaseCommand),
  })
  .command({
    command: 'status',
    desc: 'Show current repository status',
    handler: yargsHandler(statusCommand),
  })
  .command({
    command: 'version',
    desc: 'Show version',
    handler: yargsHandler(versionCommand),
  })
  .argv;
