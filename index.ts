import { writeFileSync } from 'fs';
import './extensions';
import rules from './rules';
import { KarabinerRule } from './types';
import { createHyperSubLayers } from './utils';

writeFileSync(
  'karabiner.json',
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: 'Default',
          virtual_hid_keyboard: {
            keyboard_type_v2: 'ansi',
          },
          complex_modifications: {
            rules: [
              {
                description: 'Hyper Key (⌃⌥⇧⌘)',
                manipulators: [
                  {
                    description: 'Caps Lock -> Hyper Key',
                    type: 'basic',
                    from: {
                      key_code: 'caps_lock',
                      modifiers: {
                        optional: ['any'],
                      },
                    },
                    to: [
                      {
                        set_variable: {
                          name: 'hyper',
                          value: 1,
                        },
                      },
                    ],
                    to_after_key_up: [
                      {
                        set_variable: {
                          name: 'hyper',
                          value: 0,
                        },
                      },
                    ],
                    to_if_alone: [
                      {
                        key_code: 'escape',
                      },
                    ],
                  },
                ],
              },
              // {
              //   type: 'basic',
              //   description: 'Disable CMD + Tab to force Hyper Key usage',
              //   from: {
              //     key_code: 'tab',
              //     modifiers: {
              //       mandatory: ['left_command'],
              //     },
              //   },
              //   to: [
              //     {
              //       key_code: 'tab',
              //     },
              //   ],
              // },
              ...createHyperSubLayers(rules),
            ] as KarabinerRule[],
          },
        },
      ],
    },
    null,
    2,
  ),
);
