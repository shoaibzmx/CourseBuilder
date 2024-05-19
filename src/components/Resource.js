// src/components/Resource.js
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

const Resource = ({ resource, moduleId, renameResource, deleteResource }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(resource.name);

  const handleRename = () => {
    renameResource(moduleId, resource.id, newName);
    setIsEditing(false);
  };

  return (
    <div className="card mb-2">
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
        <div className="flex justify-between items-center">
          <div className="flex-grow">
            <p className="font-medium">{resource.name}</p>
            {resource.type === 'link' ? (
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">{resource.url}</a>
            ) : (
              <p>{resource.file}</p>
            )}
          </div>
          <div>
            <button onClick={() => setIsEditing(true)} className="btn bg-yellow-500 mr-2"><FaEdit /></button>
            <button onClick={() => deleteResource(moduleId, resource.id)} className="btn bg-red-500"><FaTrashAlt /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resource;
