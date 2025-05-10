import { writeFileSync } from 'fs';
import './extensions';
import { KarabinerRule } from './types';

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
                        key_code: 'l',
                        modifiers: ['control', 'option', 'shift', 'command'],
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
            ] as KarabinerRule[],
          },
        },
      ],
    },
    null,
    2,
  ),
);
