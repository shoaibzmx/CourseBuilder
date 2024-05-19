// src/components/DraggableResource.js
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DraggableResource = ({ children, resource, index, moduleId, moveResource }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: 'RESOURCE',
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      const dragModuleId = item.moduleId;
      const hoverModuleId = moduleId;

      if (dragIndex === hoverIndex && dragModuleId === hoverModuleId) {
        return;
      }

      moveResource(dragIndex, hoverIndex, dragModuleId, hoverModuleId);
      item.index = hoverIndex;
      item.moduleId = hoverModuleId;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'RESOURCE',
    item: { type: 'RESOURCE', id: resource.id, index, moduleId },
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

export default DraggableResource;
