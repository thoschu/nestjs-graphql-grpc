import { exec, ExecOptions, PromiseWithChild } from 'child_process';
import { ObjectEncodingOptions } from 'fs';
import { promisify } from 'util';

import { PromiseExecutor } from '@nx/devkit';
import type { ExecutorContext } from '@nx/devkit';
import chalk from 'chalk';
import { not } from 'ramda';

import { Configuration, RunExecutorSchema } from './schema';

type AsyncRunExecutor = Promise<Record<'success', boolean>>;
type Std<T> = Record<'stdout' | 'stderr', T>;
type Encoding<T> = Record<'encoding', T>;
type PromisifyExec = {
  (command: string): PromiseWithChild<Std<string>>;
  (command: string, options: Encoding<"buffer" | null> & ExecOptions): PromiseWithChild<Std<Buffer>>;
  (command: string, options: Encoding<BufferEncoding> & ExecOptions): PromiseWithChild<Std<string>>;
  (command: string, options: ExecOptions): PromiseWithChild<Std<string>>;
  (command: string, options?: (ObjectEncodingOptions & ExecOptions) | null): PromiseWithChild<Std<string | Buffer>>;
};

const runExecutor: PromiseExecutor<RunExecutorSchema> = async (
  options: RunExecutorSchema,
  context: ExecutorContext
): AsyncRunExecutor => {
  const { cmd, config }: RunExecutorSchema = options;
  const { app, params }: Configuration = config;
  const { isVerbose }: ExecutorContext = context;
  const command: string = `pm2 ${cmd ?? 'monit'} ${app ?? ''} ${params ?? ''}`.trim();

  console.log(chalk.bgYellowBright.bold(chalk.black(command)));

  const promisifyExec: PromisifyExec = promisify<PromisifyExec>(exec);
  const { stdout: stdoutCmd, stderr: stderrCmd } = await promisifyExec(command);

  if(isVerbose)
    console.info(chalk.bgYellowBright(`${JSON.stringify(options, null, 2)}`));

  if(stderrCmd)
    console.error(stderrCmd);
  else
    console.log(stdoutCmd);

  return { success: not(stderrCmd) };
};

export default runExecutor;
