import {FC, useEffect, useState} from "react";
import {useAtom} from "jotai";

import {environmentAtom, menuAtom, secretMenu} from "@DL/statemanager";
import useAuthFetch from "@DL/fetcher";
import {KeyMap} from "@DP/Secretmenu/keymap";
import {DndContext, DragEndEvent, useDraggable, useDroppable, closestCenter} from "@dnd-kit/core";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Tooltip
} from "@mui/material";
import {rectSortingStrategy, SortableContext, arrayMove, useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";

interface DropTargetProps {
  sequence: {id: string, icon: string}[];
  setCode: (sequence: {id: string, icon: string}[]) => void;
  onRemove: (index: number) => void;
}

const SortableItem: FC<{item: { id: string; icon: string }; index: number; onRemove: (index: number) => void}> = ({item, index, onRemove}) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    fontSize: 25,
    cursor: "pointer",
  };

  return (
    <span
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onDoubleClick={() => onRemove(index)}
    >
      {item.icon}
    </span>
  );
};

const DropTarget: FC<DropTargetProps> = ({ sequence, onRemove, setCode }) => {
  const { setNodeRef } = useDroppable({
    id: 'drop-target',
  })

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
      <SortableContext items={sequence} strategy={rectSortingStrategy}>
        {sequence.map((item, index) => (
          <SortableItem key={item.id} item={item} index={index} onRemove={onRemove}/>
        ))}
      </SortableContext>
    </div>
  );
};

interface DraggableKeyProps {
  id: string;
  icon: string; // Add the icon prop
}

const DraggableKey: FC<DraggableKeyProps> = ({ id, icon }) => {
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
  const [code, setCode] = useState<{ id: string; icon: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMenu = async () => {
    try {
      const response = await authFetch(`/secret-menu/${selectedEnvironment.environment_id}`);
      if (response.status === 404) {
        return;
      }
      const data = await response.json();
      setSelectedMenu(data);
      setMenuData(data);
      setIsLoading(false);
      if (data.sequence !== undefined) {
        setCodeSequence(data.sequence);
      }
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
      return key ? { id: `${keyId}-${Math.random()}`, icon: key.icon } : { id: keyId, icon: keyId };
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
        const keyObj = KeyMap.find((k) => k.icon === key.icon);
        return keyObj ? keyObj.id : key.id;
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

    if (!over) {
      const index = code.findIndex((key) => key.id === active.id);
      if (index === -1) {
        setCode(code.filter((_, i) => i !== index))
      }
      return
    }

    if (active.id === over.id) {
      return;
    }

    const oldIndex = code.findIndex((item) => item.id === active.id);
    const newIndex = code.findIndex((item) => item.id === over.id);
    if (oldIndex === -1) {
      const key = KeyMap.find((k) => k.id === active.id);
      if (key) {
        const updatedCode = [...code];
        updatedCode.splice(newIndex, 0, { id: `${active.id}-${Math.random()}`, icon: key.icon });
        setCode(updatedCode);
      }
    } else {
      setCode(arrayMove(code, oldIndex, newIndex));
    }
  }

  const handleRemove = (index: number) => {
    setCode(code.filter((_, i) => i !== index));
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader title={"Build Secret Menu"} />
        <Divider />
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          p: 2
        }}>
          <CircularProgress />
        </Box>
      </Card>
    );
  }

  return (
     <Card>
       <CardHeader title={"Build Secret Menu"} />
       <Divider />
       <CardContent>
         You can drag and drop keys to build your secret menu.
         <Divider />
         <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
           <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px', gap: '10px', flexWrap: 'wrap' }}>
             {KeyMap.map((key, index) => (
               <DraggableKey key={key.id} id={key.id} icon={key.icon} />
             ))}
           </div>
           <DropTarget sequence={code} onRemove={handleRemove} setCode={setCode} />
         </DndContext>
       </CardContent>
       <CardActions>
         <Button fullWidth variant={"contained"} onClick={saveMenu} disabled={submitting}>Save</Button>
       </CardActions>
    </Card>
  )
}
