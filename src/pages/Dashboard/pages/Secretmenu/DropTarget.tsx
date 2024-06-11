import { useDroppable } from '@dnd-kit/core';
import {FC} from "react";

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

export default DropTarget;
