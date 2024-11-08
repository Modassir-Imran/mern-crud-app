// src/App.js
import React, { useState } from 'react';
import RecordForm from './components/RecordForm';
import RecordList from './components/RecordList';

function App() {
  const [refresh, setRefresh] = useState(0);
  const [recordToEdit, setRecordToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleRecordCreated = () => {
    setRefresh(prev => prev + 1);
    setShowForm(false);
  };

  const handleEdit = (record) => {
    setRecordToEdit(record);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewRecord = () => {
    setRecordToEdit(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Client Details</h1>
              {!showForm && (
                <button
                  onClick={handleNewRecord}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Create New Record
                </button>
              )}
            </div>

            {showForm && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-700">
                    {recordToEdit ? 'Update Record' : 'Create New Record'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setRecordToEdit(null);
                    }}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    ✕
                  </button>
                </div>
                <RecordForm
                  onRecordCreated={handleRecordCreated}
                  recordToEdit={recordToEdit}
                  setRecordToEdit={setRecordToEdit}
                />
              </div>
            )}

            <RecordList
              refresh={refresh}
              onEdit={handleEdit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
