import { HyperKeySublayer, KeyCode, LayerCommand } from './types';

export default {
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
} satisfies {
  [key_code in KeyCode]?: HyperKeySublayer | LayerCommand;
};
