import React, { useState } from 'react';
import ModuleList from './ModuleList';
import AddModuleForm from './AddModuleForm';
import DndWrapper from './DndWrapper';
import AddResourceForm from './AddResourceForm';
const CourseBuilder = () => {
  const [modules, setModules] = useState([]);
  const [ResourceForm, setResourceForm] = useState(false);

  const addModule = (name) => {
    setModules([...modules, { id: Date.now(), name, resources: [] }]);
  };

  const addResource = (moduleId, resource) => {
    setModules(modules.map(module =>
      module.id === moduleId ? { ...module, resources: [...module.resources, resource] } : module
    ));
  };

  const renameModule = (id, newName) => {
    setModules(modules.map(module =>
      module.id === id ? { ...module, name: newName } : module
    ));
  };

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id));
  };

  const renameResource = (moduleId, resourceId, newName) => {
    setModules(modules.map(module =>
      module.id === moduleId ? {
        ...module,
        resources: module.resources.map(resource =>
          resource.id === resourceId ? { ...resource, name: newName } : resource
        )
      } : module
    ));
  };

  const deleteResource = (moduleId, resourceId) => {
    setModules(modules.map(module =>
      module.id === moduleId ? {
        ...module,
        resources: module.resources.filter(resource => resource.id !== resourceId)
      } : module
    ));
  };

  const moveModule = (dragIndex, hoverIndex) => {
    const draggedModule = modules[dragIndex];
    const updatedModules = [...modules];
    updatedModules.splice(dragIndex, 1);
    updatedModules.splice(hoverIndex, 0, draggedModule);
    setModules(updatedModules);
  };

  const moveResource = (dragIndex, hoverIndex, dragModuleId, hoverModuleId) => {
    const sourceModule = modules.find(module => module.id === dragModuleId);
    const targetModule = modules.find(module => module.id === hoverModuleId);
    const draggedResource = sourceModule.resources[dragIndex];

    const updatedSourceResources = [...sourceModule.resources];
    updatedSourceResources.splice(dragIndex, 1);

    const updatedTargetResources = [...targetModule.resources];
    updatedTargetResources.splice(hoverIndex, 0, draggedResource);

    setModules(modules.map(module => {
      if (module.id === dragModuleId) {
        return { ...module, resources: updatedSourceResources };
      } else if (module.id === hoverModuleId) {
        return { ...module, resources: updatedTargetResources };
      } else {
        return module;
      }
    }));
  };

  return (
    <DndWrapper>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Course Builder</h1>
        <AddModuleForm addModule={addModule} />
        <button 
          onClick={() => setResourceForm(!ResourceForm)} 
          className="btn bg-blue-500 mb-4 ml-4"
        >
          {ResourceForm ? ' Resource ' : 'Resource'}
        </button>
        {ResourceForm && (
          <AddResourceForm modules={modules} addResource={addResource} />
        )}
        <ModuleList 
          modules={modules} 
          moveModule={moveModule}
          addResource={addResource} 
          renameModule={renameModule} 
          deleteModule={deleteModule} 
          renameResource={renameResource}
          deleteResource={deleteResource}
          moveResource={moveResource}
        />
      </div>
    </DndWrapper>
  );
};

export default CourseBuilder;
