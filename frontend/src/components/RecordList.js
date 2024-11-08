// src/components/RecordList.js
import React, { useEffect, useState } from 'react';
import { getAllRecords, deleteRecord } from '../api/records';

const RecordList = ({ refresh, onEdit }) => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [expandedBios, setExpandedBios] = useState({});

  const fetchRecords = async () => {
    try {
      const data = await getAllRecords();
      setRecords(data);
    } catch (err) {
      setError('Failed to fetch records');
      console.error('Error fetching records:', err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      await deleteRecord(id);
      fetchRecords();
    } catch (err) {
      setError('Failed to delete record');
      console.error('Error deleting record:', err);
    }
  };

  const toggleBio = (recordId) => {
    setExpandedBios(prev => ({
      ...prev,
      [recordId]: !prev[recordId]
    }));
  };

  const renderBio = (record) => {
    const isExpanded = expandedBios[record._id];
    const bioText = record.bio;
    
    if (bioText.length <= 20) {
      return <span>{bioText}</span>;
    }

    return (
      <div>
        <span>
          {isExpanded ? bioText : `${bioText.substring(0, 30)}`}
        </span>
        <button
          onClick={() => toggleBio(record._id)}
          className="ml-2 text-indigo-600 hover:text-indigo-800 text-xs font-medium focus:outline-none"
        >
            {bioText.length > 30 ? (isExpanded ? 'Show Less' : '... Show More') : ''}
        </button>
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Records</h2>
      </div>

      {records.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-gray-500">No records found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.CliendId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.address}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {renderBio(record)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onEdit(record)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 p-2 rounded-full hover:bg-indigo-100 transition-colors duration-200"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(record._id)}
                        className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition-colors duration-200"
                        title="Delete"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecordList;
