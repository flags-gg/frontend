import { useDraggable } from "@dnd-kit/core";
import { FC } from "react";
import {Tooltip} from "@mui/material";

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
