import { Env } from '@interfaces';

/**
 * Builds the env vars passed to the command.
 */
export const buildEnvExports = (
  env: Env,
  filter?: (envName: string) => boolean
) => {
  let exports = '';
  for (const [VAR, VALUE] of Object.entries(env)) {
    if (filter && filter(VAR) === false) continue;
    exports += `${VAR}=${VALUE}; `;
  }

  return exports;
};
