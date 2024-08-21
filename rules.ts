import { writeFileSync } from 'fs';
import { KarabinerRule } from './types';
import { createHyperSubLayers, rectangle } from './utils';

const rules: KarabinerRule[] = [
  // Define the Hyper key itself
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
    ],
  },
  ...createHyperSubLayers({
    spacebar: 'raycast://extensions/stellate/mxstbr-commands/create-notion-todo'
      .open,
    // b = "B"rowse
    b: {
      t: 'https://twitter.com'.open,
      // Quarterly "P"lan
      p: 'https://qrtr.ly/plan'.open,
      y: 'https://news.ycombinator.com'.open,
      f: 'https://facebook.com'.open,
      r: 'https://reddit.com'.open,
      h: 'https://hashnode.com/draft'.open,
    },
    // o = "Open" applications
    o: {
      1: '1Password'.app,
      g: 'Google Chrome'.app,
      c: 'Notion Calendar'.app,
      v: 'Visual Studio Code'.app,
      d: 'Discord'.app,
      s: 'Slack'.app,
      e: 'Superhuman'.app,
      n: 'Notion'.app,
      t: 'Terminal'.app,
      // Open todo list managed via *H*ypersonic
      h: 'notion://www.notion.so/stellatehq/7b33b924746647499d906c55f89d5026'
        .open,
      z: 'zoom.us'.app,
      // "M"arkdown (Reflect.app)
      m: 'Reflect'.app,
      r: 'Reflect'.app,
      f: 'Finder'.app,
      // "i"Message
      i: 'Texts'.app,
      p: 'Spotify'.app,
      a: 'iA Presenter'.app,
      // "W"hatsApp has been replaced by Texts
      w: 'Texts'.open,
      l: 'raycast://extensions/stellate/mxstbr-commands/open-mxs-is-shortlink'
        .open,
    },

    // TODO: This doesn't quite work yet.
    // l = "Layouts" via Raycast's custom window management
    // l: {
    //   // Coding layout
    //   c: shell`
    //     open -a "Visual Studio Code.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topLeft&relativeWidth=0.5"

    //     open -a "Terminal.app"
    //     sleep 0.2
    //     open -g "raycast://customWindowManagementCommand?position=topRight&relativeWidth=0.5"
    //   `,
    // },

    // w = "Window" via rectangle.app
    w: {
      semicolon: {
        description: 'Window: Hide',
        to: [
          {
            key_code: 'h',
            modifiers: ['right_command'],
          },
        ],
      },
      y: rectangle('previous-display'),
      o: rectangle('next-display'),
      k: rectangle('top-half'),
      j: rectangle('bottom-half'),
      h: rectangle('left-half'),
      l: rectangle('right-half'),
      f: rectangle('maximize'),
      u: {
        description: 'Window: Previous Tab',
        to: [
          {
            key_code: 'tab',
            modifiers: ['right_control', 'right_shift'],
          },
        ],
      },
      i: {
        description: 'Window: Next Tab',
        to: [
          {
            key_code: 'tab',
            modifiers: ['right_control'],
          },
        ],
      },
      n: {
        description: 'Window: Next Window',
        to: [
          {
            key_code: 'grave_accent_and_tilde',
            modifiers: ['right_command'],
          },
        ],
      },
      b: {
        description: 'Window: Back',
        to: [
          {
            key_code: 'open_bracket',
            modifiers: ['right_command'],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: 'Window: Forward',
        to: [
          {
            key_code: 'close_bracket',
            modifiers: ['right_command'],
          },
        ],
      },
      d: {
        description: 'Window: Next display',
        to: [
          {
            key_code: 'right_arrow',
            modifiers: ['right_control', 'right_option', 'right_command'],
          },
        ],
      },
    },

    // s = "System"
    s: {
      l: {
        to: [
          {
            key_code: 'q',
            modifiers: ['right_control', 'right_command'],
          },
        ],
      },

      semicolon: {
        to: [
          {
            key_code: 'fastforward',
          },
        ],
      },
      e: `raycast://extensions/thomas/elgato-key-light/toggle?launchType=background`
        .open,

      // "D"o not disturb toggle
      d: `raycast://extensions/yakitrak/do-not-disturb/toggle?launchType=background`
        .open,
      // "T"heme
      t: `raycast://extensions/raycast/system/toggle-system-appearance`.open,
      c: 'raycast://extensions/raycast/system/open-camera'.open,
    },

    // v = "moVe" which isn't "m" because we want it to be on the left hand
    // so that hjkl work like they do in vim
    v: {
      h: {
        to: [{ key_code: 'left_arrow' }],
      },
      j: {
        to: [{ key_code: 'down_arrow' }],
      },
      k: {
        to: [{ key_code: 'up_arrow' }],
      },
      l: {
        to: [{ key_code: 'right_arrow' }],
      },
      // Magicmove via homerow.app
      m: {
        to: [{ key_code: 'f', modifiers: ['right_control'] }],
        // TODO: Trigger Vim Easymotion when VSCode is focused
      },
      // Scroll mode via homerow.app
      s: {
        to: [{ key_code: 'j', modifiers: ['right_control'] }],
      },
      d: {
        to: [
          {
            key_code: 'd',
            modifiers: ['right_shift', 'right_command'],
          },
        ],
      },
      u: {
        to: [{ key_code: 'page_down' }],
      },
      i: {
        to: [{ key_code: 'page_up' }],
      },
    },

    // r = "Raycast"
    r: {
      c: 'raycast://extensions/thomas/color-picker/pick-color'.open,
      n: 'raycast://script-commands/dismiss-notifications'.open,
      l: 'raycast://extensions/stellate/mxstbr-commands/create-mxs-is-shortlink'
        .open,
      e: 'raycast://extensions/raycast/emoji-symbols/search-emoji-symbols'.open,
      p: 'raycast://extensions/raycast/raycast/confetti'.open,
      a: 'raycast://extensions/raycast/raycast-ai/ai-chat'.open,
      s: 'raycast://extensions/peduarte/silent-mention/index'.open,
      h: 'raycast://extensions/raycast/clipboard-history/clipboard-history'
        .open,
      1: 'raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-1'
        .open,
      2: 'raycast://extensions/VladCuciureanu/toothpick/connect-favorite-device-2'
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
            rules,
          },
        },
      ],
    },
    null,
    2,
  ),
);
