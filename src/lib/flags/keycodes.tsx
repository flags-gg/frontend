import React, {Dispatch, FC, useEffect, useState} from 'react';
import { useFlags } from './index';
import {Flag} from "./types";  // Correct the import if necessary

interface SecretMenuProps {
  secretMenu?: string[];
  flags: Flag[];
  toggleFlag: Dispatch<Flag>
}

const SecretMenu: FC<SecretMenuProps> = ({secretMenu}) => {
  const { flags, toggleFlag } = useFlags();  // Use destructuring to get secretMenu
  const [isActive, setIsActive] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  if (typeof secretMenu === 'undefined') {
    secretMenu = [];
  }

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      setKeySequence(seq => [...seq.slice(-(secretMenu.length - 1)), event.key.toUpperCase()]); // Keep last n keys
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [secretMenu]);  // Depend on secretMenu

  useEffect(() => {
    // Check if the current keySequence matches the secretMenu
    if (JSON.stringify(keySequence) === JSON.stringify(secretMenu)) {
      setIsActive(true);
    } else {
      setIsActive(false);  // Optionally reset if the sequence doesn't match
    }
  }, [keySequence, secretMenu]);  // Depend on keySequence and secretMenu

  return isActive ? (
    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
      <h1>Secret Menu</h1>
      {Object.entries(flags).map(([key, value]) => (
        <button key={key} onClick={() => toggleFlag(key)}>
          {key}: {value.enabled ? 'Enabled' : 'Disabled'}
        </button>
      ))}
    </div>
  ) : null;
};

export default SecretMenu;
