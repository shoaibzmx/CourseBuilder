// src/components/DraggableModule.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableModule = ({ children, module, index, moveModule }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'MODULE',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveModule(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'MODULE',
    item: { type: 'MODULE', id: module.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};

export default DraggableModule;
