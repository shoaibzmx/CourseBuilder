// src/components/Module.js
import React, { useState } from 'react';
import ResourceList from './ResourceList';
import AddResourceForm from './AddResourceForm';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import DraggableModule from './DraggableModule';

const Module = ({ module, index, addResource, renameModule, deleteModule, renameResource, deleteResource, moveResource, moveModule }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(module.name);
  const [showAddResourceForm, setShowAddResourceForm] = useState(false);

  const handleRename = () => {
    renameModule(module.id, newName);
    setIsEditing(false);
  };

  return (
    <DraggableModule index={index} module={module} moveModule={moveModule}>
      <div className="card mb-4 p-4 bg-gray-100 shadow-md rounded">
        <div className="flex justify-between items-center mb-4">
          {isEditing ? (
            <div className="flex items-center w-full">
              <input 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)} 
                className="input flex-grow mr-2"
              />
              <button onClick={handleRename} className="btn bg-blue-500 mr-2"><FaSave /></button>
              <button onClick={() => setIsEditing(false)} className="btn bg-red-500"><FaTimes /></button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{module.name}</h2>
              <div>
                <button onClick={() => setIsEditing(true)} className="btn bg-yellow-500 mr-2"><FaEdit /></button>
                <button onClick={() => deleteModule(module.id)} className="btn bg-red-500"><FaTrashAlt /></button>
              </div>
            </>
          )}
        </div>
        <button 
          onClick={() => setShowAddResourceForm(!showAddResourceForm)} 
          className="btn bg-green-500 mb-4"
        >
          {showAddResourceForm ? 'Hide Add Resource Form' : 'Show Add Resource Form'}
        </button>
        {showAddResourceForm && <AddResourceForm moduleId={module.id} addResource={addResource} />}
        <ResourceList 
          resources={module.resources} 
          moduleId={module.id}
          renameResource={renameResource} 
          deleteResource={deleteResource}
          moveResource={moveResource}
        />
      </div>
    </DraggableModule>
  );
};

export default Module;
