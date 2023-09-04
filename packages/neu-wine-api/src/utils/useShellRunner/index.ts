import { Command } from '@tauri-apps/api/shell';
import { createSignal } from 'solid-js';
import {
  CommandOptions,
  Env,
  Workflow,
  ScriptOptions,
  BashScript,
} from '@interfaces';
import { createStore } from 'solid-js/store';
import { useAppModel } from '@models';
import { APP_MODE } from 'www-shared';

export const useShellRunner = (config?: CommandOptions) => {
  const appModel = useAppModel();
  const appEnv = appModel.selectEnv();
  const env = {
    ...appEnv(),
    ...config?.env,
  };

  /**
   * Adds envs to be replaced
   */
  const mergeEnv = (newEnv?: Env) => {
    Object.assign(env, newEnv);
  };

  /**
   * Executes a pipeline workflow.
   */
  const buildPipeline = (workflow: Workflow, options?: { env?: Env }) => {
    mergeEnv(options?.env);
    const [currentWorkflow, setCurrentWorkflow] =
      createStore<Workflow>(workflow);
    const [output, setOutput] = createSignal<string>('');

    const run = async () => {
      setCurrentWorkflow('status', 'pending');
      let currentJob = 0;
      let currentStep = 0;

      try {
        for (let i = 0; i < currentWorkflow.jobs.length; i++) {
          currentJob = i;
          const job = currentWorkflow.jobs[i];
          const steps = job.steps;
          for (let j = 0; j < steps.length; j++) {
            currentStep = j;
            setCurrentWorkflow('jobs', i, 'steps', j, 'status', 'inProgress');
            const step = steps[j];

            if (
              step.bashScript === undefined &&
              step.script === undefined &&
              step.fn === undefined
            )
              continue;

            setCurrentWorkflow('jobs', i, 'steps', j, 'output', '');

            let runningProcesses = [
              step.script && (await spawnScript(step.script, step.options)),
              step.bashScript &&
                (await spawnBashScript(step.bashScript, step.options)),
              step.fn && (await step.fn()),
            ];

            for (let runningProcess of runningProcesses) {
              if (!runningProcess) continue;
              const { cmd } = runningProcess;

              const onData = (data: string) => {
                setOutput((prev) => `${prev || ''}\n${data}`);
                setCurrentWorkflow(
                  'jobs',
                  i,
                  'steps',
                  j,
                  'output',
                  (prev) => `${prev || ''}\n${data}`
                );
              };

              cmd.stderr.on('data', onData);
              cmd.stdout.on('data', onData);

              await new Promise((resolve, reject) => {
                cmd.on('close', (data) => {
                  if (!step.options?.force && data.code !== 0) {
                    reject(`Status code error ${data.code}`);
                  } else {
                    resolve(
                      setCurrentWorkflow(
                        'jobs',
                        i,
                        'steps',
                        j,
                        'status',
                        'success'
                      )
                    );
                  }
                });
              });
            }
          }
        }

        setCurrentWorkflow('status', 'success');
      } catch (error) {
        for (let i = currentJob; i < currentWorkflow.jobs.length; i++) {
          const job = currentWorkflow.jobs[i];
          const steps = job.steps;
          for (let j = currentStep; j < steps.length; j++) {
            setCurrentWorkflow(
              'jobs',
              i,
              'steps',
              j,
              'status',
              j >= currentStep + 1 ? 'cancelled' : 'error'
            );
          }
          setCurrentWorkflow(
            'status',
            i >= currentJob + 1 ? 'cancelled' : 'error'
          );
        }
      }
    };

    return { currentWorkflow, output, run };
  };

  /**
   * Spawns bash script .sh file.
   */
  const spawnBashScript = async (
    fileName: BashScript,
    options?: ScriptOptions
  ) => {
    const cmd = runBashScriptCommand(fileName, {
      env: options?.env,
      args: parseArgs(options?.args),
    });
    const child = await cmd.spawn();

    return { cmd: cmd as Cmd, child };
  };

  /**
   * Executes bash script .sh file.
   */
  const executeBashScript = async (
    fileName: BashScript,
    options?: ScriptOptions
  ) => {
    return runBashScriptCommand(fileName, {
      env: options?.env,
      args: parseArgs(options?.args),
    }).execute();
  };

  /**
   * Executes shell script.
   */
  const executeScript = (script: string, options?: CommandOptions) => {
    return runShellScriptCommand(script, options).execute();
  };

  /**
   * Executes shell script.
   */
  const spawnScript = async (script: string, options?: CommandOptions) => {
    const cmd = runShellScriptCommand(script, options);
    const child = await cmd.spawn();

    return { cmd: cmd as Cmd, child };
  };

  /**
   * Builds the env vars passed to the command.
   */
  const buildEnvVarsCmd = () => {
    let exports = '';
    for (const [VAR, VALUE] of Object.entries(env)) {
      exports += `${VAR}=${VALUE} `;
    }

    return exports;
  };

  /**
   * Builds the env source by using the env.sh script.
   */
  const ENV_SOURCE = appEnv().ENV_SH
    ? `source ${appEnv().ENV_SH} ${APP_MODE} && `
    : '';

  /**
   * Tauri command for running a shell script.
   */
  const runShellScriptCommand = (script: string, options?: CommandOptions) => {
    mergeEnv(options?.env);
    const envVarsCmd = buildEnvVarsCmd();
    const args = options?.args || '';

    return new Command('run-script', [
      '-c',
      `${envVarsCmd} ${ENV_SOURCE} ${script} ${args}`,
    ]);
  };

  /**
   * Tauri command for running a shell script file located at bash folder.
   */
  const runBashScriptCommand = (fileName: string, options: CommandOptions) => {
    mergeEnv(options?.env);
    const envVarsCmd = buildEnvVarsCmd();
    const args = options?.args || '';

    return new Command('run-script', [
      '-c',
      `${envVarsCmd} ${ENV_SOURCE} sh ${
        appEnv().BASH_SCRIPTS_PATH
      }/${fileName}.sh ${args}`,
    ]);
  };

  /**
   * Stringifies cmd args
   */
  const parseArgs = (args: any) => {
    let str: string = '';

    if (typeof args === 'object') {
      for (let [key, value] of Object.entries(args)) {
        str += `${key} ${value} `;
      }
    } else if (typeof args === 'string') {
      str = args;
    }

    return str;
  };

  return {
    buildPipeline,
    spawnBashScript,
    executeBashScript,
    executeScript,
    mergeEnv,
  };
};
