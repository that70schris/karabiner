import { writeFileSync } from 'fs';
import { KarabinerRule } from './types';
import { createHyperSubLayers } from './utils';

const rules: KarabinerRule[] = [
  // Define the Hyper key itself

  ...createHyperSubLayers({
    // o = "Open" applications
    o: {
      a: 'Arc'.app,
      c: 'Calendar'.app,
      d: 'Docker'.app,
      e: 'Mail'.app,
      f: 'Finder'.app,
      i: 'Messages'.app, // 'i'Message
      n: 'Notes'.app,
      s: 'Slack'.app,
      t: 'Warp'.app,
      v: 'Visual Studio Code'.app,
      w: 'Weather'.app,
      x: 'Xcode'.app,
      z: 'zoom.us'.app,
    },

    // s = "System"
    s: {
      backslash: `raycast://extensions/raycast/system/toggle-system-appearance`
        .open,
    },
  }),
];

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
          complex_modifications: {
            rules: (
              [
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
              ] as KarabinerRule[]
            ).concat(rules),
          },
        },
      ],
    },
    null,
    2,
  ),
);
