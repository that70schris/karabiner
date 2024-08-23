import {
  HyperKeySublayer,
  KarabinerRule,
  KeyCode,
  LayerCommand,
  Manipulator,
} from './types';

export function createHyperSubLayers(layers: {
  [key_code in KeyCode]?: HyperKeySublayer | LayerCommand;
}): KarabinerRule[] {
  const variables = (Object.keys(layers) as (keyof typeof layers)[]).map(
    (key) => key.variable,
  );

  return Object.entries(layers).map(([key, layer]) => {
    return 'to' in layer
      ? {
          description: `Hyper Key + ${key}`,
          manipulators: [
            {
              ...layer,
              type: 'basic',
              from: {
                key_code: key,
                modifiers: {
                  optional: ['any'],
                },
              },
              conditions: [
                {
                  type: 'variable_if',
                  name: 'hyper',
                  value: 1,
                },
                ...variables.map((variable) => ({
                  type: 'variable_if',
                  name: variable,
                  value: 0,
                })),
              ],
            },
          ],
        }
      : {
          description: `Hyper Key sublayer "${key}"`,
          manipulators: [
            {
              description: `Toggle Hyper sublayer ${key}`,
              type: 'basic',
              from: {
                key_code: key,
                modifiers: {
                  optional: ['any'],
                },
              },
              to_after_key_up: [
                {
                  set_variable: {
                    name: key.variable,
                    value: 0,
                  },
                },
              ],
              to: [
                {
                  set_variable: {
                    name: key.variable,
                    value: 1,
                  },
                },
              ],
              conditions: [
                ...variables
                  .filter((variable) => variable !== key.variable)
                  .map((subLayerVariable) => ({
                    type: 'variable_if',
                    name: subLayerVariable,
                    value: 0,
                  })),
                {
                  type: 'variable_if',
                  name: 'hyper',
                  value: 1,
                },
              ],
            },
            // Define the individual commands that are meant to trigger in the sublayer
            ...(Object.keys(layer) as (keyof typeof layer)[]).map(
              (command_key): Manipulator => ({
                ...layer[command_key],
                type: 'basic',
                from: {
                  key_code: command_key,
                  modifiers: {
                    optional: ['any'],
                  },
                },
                // Only trigger this command if the variable is 1 (i.e., if Hyper + sublayer is held)
                conditions: [
                  {
                    type: 'variable_if',
                    name: key.variable,
                    value: 1,
                  },
                ],
              }),
            ),
          ],
        };
  });
}
