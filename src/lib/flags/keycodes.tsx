import {FC, useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {SecretMenuProps} from "./types";  // Correct the import if necessary

const SecretMenu: FC<SecretMenuProps> = ({secretMenu, toggleFlag, flags}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [keySequence, setKeySequence] = useState<string[]>([]);
  if (typeof secretMenu === 'undefined') {
    secretMenu = [];
  }

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      setKeySequence(seq => [...seq.slice(-(secretMenu.length - 1)), event.key]); // Keep last n keys
    };

    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [secretMenu]);  // Depend on secretMenu

  useEffect(() => {
    // Check if the current keySequence matches the secretMenu
    if (JSON.stringify(keySequence) === JSON.stringify(secretMenu)) {
      setShowMenu(true);
    } else {
      setShowMenu(false);  // Optionally reset if the sequence doesn't match
    }
  }, [keySequence, secretMenu]);  // Depend on keySequence and secretMenu

  return showMenu ? (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1000,
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid black',
      borderRadius: '5px',
      padding: '1rem',
    }}>
      <Button
        style={{
          position: 'absolute',
          top: 0,
          right: -15,
          color: "black",
          cursor: "pointer",
        }}
        onClick={() => setShowMenu(false)}>X</Button>
      <h1>Secret Menu</h1>
      {Object.entries(flags).map(([key, value]) => (
        <div key={`sm_item_${key}`} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem',
          background: 'lightgray',
          borderRadius: '5px',
          margin: '0.5rem 0',
        }}>
          <span>{key}</span>
          <button
            key={`sm_button_${key}`}
            onClick={() => toggleFlag(value.feature.name)}
          >
            {value.enabled ? 'Enabled' : 'Disabled'}
          </button>
        </div>
      ))}
    </div>
  ) : null;
};

export default SecretMenu;
