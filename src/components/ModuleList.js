// src/components/ModuleList.js
import React from 'react';
import Module from './Module';
import DraggableModule from './DraggableModule';

const ModuleList = ({ modules, moveModule, addResource, renameModule, deleteModule, renameResource, deleteResource, moveResource }) => {
  return (
    <div>
      {modules.map((module, index) => (
        <DraggableModule key={module.id} index={index} module={module} moveModule={moveModule}>
          <Module 
            module={module} 
            addResource={addResource} 
            renameModule={renameModule} 
            deleteModule={deleteModule} 
            renameResource={renameResource} 
            deleteResource={deleteResource}
            moveResource={moveResource}
          />
        </DraggableModule>
      ))}
    </div>
  );
};

export default ModuleList;
