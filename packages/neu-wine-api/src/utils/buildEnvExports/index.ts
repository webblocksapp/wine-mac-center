import { Env } from '@interfaces';

/**
 * Builds the env vars passed to the command.
 */
export const buildEnvExports = (
  env: Partial<Env>,
  filter?: (envName: string) => boolean
) => {
  let exports = '';
  for (const [VAR, VALUE] of Object.entries(env)) {
    if (filter && filter(VAR) === false) continue;
    if (typeof VALUE === 'string') {
      exports += `${VAR}="${VALUE}" `;
    } else {
      exports += `${VAR}=${VALUE} `;
    }
  }

  return `export ${exports.trim()};`;
};
