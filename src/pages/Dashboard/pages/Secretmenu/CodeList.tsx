import {FC, useEffect, useState} from "react";
import {useAtom} from "jotai";

import {environmentAtom, menuAtom, secretMenu} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {DraggableKey} from "@DP/Secretmenu/DraggableKey.tsx";
import {DropTarget} from "@DP/Secretmenu/DropTarget.tsx";
import {KeyMap} from "@DP/Secretmenu/keymap";
import {DndContext} from "@dnd-kit/core";

export const CodeList: FC = () => {
  const [selectedEnvironment] = useAtom(environmentAtom)
  const [, setSelectedMenu] = useAtom(menuAtom)
  const authFetch = useAuthFetch();
  const [menuData, setMenuData] = useState<secretMenu | null>(null);
  const [code, setCode] = useState<string[]>([]);

  const fetchMenu = async () => {
    try {
      const response = await authFetch(`/environment/${selectedEnvironment.environment_id}/secret-menu`);
      const data = await response.json();
      console.info("Menu Data:", data);
      setSelectedMenu(data);
      setMenuData(data);
      setCodeSequence(data.sequence);
    } catch (error) {
      console.error("Failed to fetch menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu().catch(error => console.error("Failed to fetch menu:", error));
  }, [])

  const setCodeSequence = (sequence: string[]) => {
    const newSequence = sequence.map((keyId) => {
      const key = KeyMap.find((k) => k.id === keyId);
      return key ? key.icon : keyId; // Fallback to keyId if icon not found
    });
    setCode(newSequence);
  };

  const saveMenu = async (menu: secretMenu) => {
    try {
      const response = await authFetch(`/agent/${selectedEnvironment.environment_id}/secret-menu/${menuData?.menu_id}`, {
        method: "PUT",
        body: JSON.stringify(menu)
      });
      const data = await response.json();
    } catch (error) {
      console.error("Failed to save menu:", error);
    }
  }

  const handleDragEnd = (event) => {
    const {active, over} = event
    if (over && active.id !== over.id) {
      const key = KeyMap.find((k) => k.id === active.id)
      if (key) {
        setCode([...code, key.icon])
      }
    }
  }

  const handleRemove = (index: number) => {
    setCode(code.filter((_, i) => i !== index));
  };

  return (
     <div>
      <h1>Drag and Drop Key Code Sequence</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
          {KeyMap.map((key) => (
            <DraggableKey key={key.id} id={key.id} icon={key.icon} />
          ))}
        </div>
        <DropTarget id="drop-target" sequence={code} onRemove={handleRemove} />
      </DndContext>
    </div>
  )
}
