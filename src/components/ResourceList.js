// src/components/ResourceList.js
import React from 'react';
import Resource from './Resource';
import DraggableResource from './DraggableResource';

const ResourceList = ({ resources, moduleId, renameResource, deleteResource, moveResource }) => {
  return (
    <div>
      {resources.map((resource, index) => (
        <DraggableResource key={resource.id} index={index} resource={resource} moduleId={moduleId} moveResource={moveResource}>
          <Resource 
            resource={resource} 
            moduleId={moduleId}
            renameResource={renameResource} 
            deleteResource={deleteResource} 
          />
        </DraggableResource>
      ))}
    </div>
  );
};

export default ResourceList;
