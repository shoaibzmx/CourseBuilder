// src/components/AddResourceForm.js
import React, { useState } from 'react';

const AddResourceForm = ({ moduleId, addResource }) => {
  const [resourceName, setResourceName] = useState('');
  const [resourceType, setResourceType] = useState('link');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceFile, setResourceFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resourceType === 'link' && resourceUrl) {
      const newResource = { id: Date.now(), name: resourceName, type: resourceType, url: resourceUrl };
      addResource(moduleId, newResource);
    } else if (resourceType === 'file' && resourceFile) {
      const newResource = { id: Date.now(), name: resourceName, type: resourceType, file: resourceFile.name };
      addResource(moduleId, newResource);
    }
    setResourceName('');
    setResourceUrl('');
    setResourceFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={resourceName} 
        onChange={(e) => setResourceName(e.target.value)} 
        placeholder="Resource Name" 
        required 
      />
      <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
        <option value="link">Link</option>
        <option value="file">File</option>
      </select>
      {resourceType === 'link' ? (
        <input 
          type="url" 
          value={resourceUrl} 
          onChange={(e) => setResourceUrl(e.target.value)} 
          placeholder="Resource URL" 
          required 
        />
      ) : (
        <input 
          type="file" 
          onChange={(e) => setResourceFile(e.target.files[0])} 
          required 
        />
      )}
      <button type="submit">Add Resource</button>
    </form>
  );
};

export default AddResourceForm;
