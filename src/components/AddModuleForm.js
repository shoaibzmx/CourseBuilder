// src/components/AddModuleForm.js
import React, { useState } from 'react';

const AddModuleForm = ({ addModule }) => {
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addModule(moduleName);
    setModuleName('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex">
      <input 
        type="text" 
        value={moduleName} 
        onChange={(e) => setModuleName(e.target.value)} 
        placeholder="Module Name" 
        className="input mr-2 flex-grow" 
        required 
      />
      <button type="submit" className="btn">Add Module</button>
    </form>
  );
};

export default AddModuleForm;
