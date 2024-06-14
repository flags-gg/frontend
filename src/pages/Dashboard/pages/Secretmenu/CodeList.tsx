import {FC, useEffect, useState} from "react";
import {useAtom} from "jotai";

import {environmentAtom, menuAtom, secretMenu} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {KeyMap} from "@DP/Secretmenu/keymap";
import {DndContext, DragEndEvent, useDraggable, useDroppable} from "@dnd-kit/core";
import {Button, Card, CardActions, CardContent, CardHeader, Divider, Tooltip} from "@mui/material";

interface DropTargetProps {
  id: string;
  sequence: string[];
  onRemove: (index: number) => void;
}

export const DropTarget: FC<DropTargetProps> = ({ id, sequence, onRemove }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: '50px',
        border: '1px dashed gray',
        padding: '10px',
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
      }}
    >
      {sequence.map((icon, index) => (
        <span key={index} style={{ fontSize: 25, cursor: "pointer" }} onClick={() => onRemove(index)}>
          {icon}
        </span>
      ))}
    </div>
  );
};

interface DraggableKeyProps {
  id: string;
  icon: string; // Add the icon prop
}

export const DraggableKey: FC<DraggableKeyProps> = ({ id, icon }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    fontSize: 25,
    fontWeight: 'bold',
    cursor: 'move',
  };

  return (
    <Tooltip title={id} placement="top">
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {icon}
      </div>
    </Tooltip>
  );
};

export const CodeList: FC = () => {
  const [selectedEnvironment] = useAtom(environmentAtom)
  const [, setSelectedMenu] = useAtom(menuAtom)
  const authFetch = useAuthFetch();
  const [menuData, setMenuData] = useState<secretMenu | null>(null);
  const [code, setCode] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchMenu = async () => {
    try {
      const response = await authFetch(`/secret-menu/${selectedEnvironment.environment_id}`);
      if (response.status === 404) {
        return;
      }
      const data = await response.json();
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

  const saveMenu = async () => {
    setSubmitting(true);
    const menu = {
      menu_id: menuData?.menu_id,
      enabled: menuData?.enabled,
      custom_style: menuData?.style,
      sequence: code.map((key) => {
        const keyObj = KeyMap.find((k) => k.icon === key);
        return keyObj ? keyObj.id : key;
      }),
    };

    if (menu.menu_id === "") {
      try {
        menu.enabled = true
        const response = await authFetch(`/secret-menu/${selectedEnvironment.environment_id}`, {
          method: "POST",
          body: JSON.stringify(menu)
        });
        const data = await response.json();
        setSelectedMenu(data);
      } catch (error) {
        console.error("Failed to save menu:", error);
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        const response = await authFetch(`/secret-menu/${menuData?.menu_id}`, {
          method: "PUT",
          body: JSON.stringify(menu)
        });
        if (response.status !== 200) {
          console.error("Failed to save menu:", response);
          return;
        }
      } catch (error) {
        console.error("Failed to save menu:", error);
      } finally {
        setSubmitting(false);
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
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
     <Card>
       <CardHeader title={"Build Secret Menu"} />
       <CardContent>
         You can drag and drop keys to build your secret menu.
         <Divider />
         <DndContext onDragEnd={handleDragEnd}>
           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
             {KeyMap.map((key, index) => (
               <DraggableKey key={key.id} id={key.id} icon={key.icon} />
             ))}
           </div>
           <DropTarget id="drop-target" sequence={code} onRemove={handleRemove} />
         </DndContext>
       </CardContent>
       <CardActions>
         <Button fullWidth variant={"contained"} onClick={saveMenu} disabled={submitting}>Save</Button>
       </CardActions>
    </Card>
  )
}
