interface KbdShortcut {
  id?: string;
  keys: number[];
  altKey?: boolean;
  f: () => void;
}

export class KbdShortcutRegisty {
  private keycode_lookup: {[id: number]: KbdShortcut | undefined};
  private id_lookup: {[id: number]: KbdShortcut | undefined};

  constructor(shortcuts?: KbdShortcut[]) {
    this.keycode_lookup = {};
    this.id_lookup = {};
    if (shortcuts) {
      this.register_all(shortcuts);
    }
  }

  public register(shortcut: KbdShortcut) {
    if (shortcut.keys) {
      for (const k of shortcut.keys) {
        this.keycode_lookup[k] = shortcut;
      }
    }
    if (shortcut.id) {
      this.id_lookup[shortcut.id] = shortcut;
    }
  }

  public register_all(shortcuts: KbdShortcut[]) {
    for (const sc of shortcuts) {
      this.register(sc);
    }
  }

  public handle(ev: KeyboardEvent): boolean {
    const a = this.keycode_lookup[ev.keyCode];
    if (a && (!a.altKey || ev.altKey)) {
      a.f();
      ev.preventDefault();
      return true;
    }
    return false;
  }
}
