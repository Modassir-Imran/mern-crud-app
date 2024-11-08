// src/components/RecordForm.js
import React, { useState, useEffect } from 'react';
import { createRecord, updateRecord } from '../api/records';

const RecordForm = ({ onRecordCreated, recordToEdit, setRecordToEdit }) => {
  const [formData, setFormData] = useState({
    CliendId: '',
    name: '',
    address: '',
    bio: ''
  });
  const [error, setError] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState({
    name: 0,
    address: 0,
    bio: 0
  });

  useEffect(() => {
    if (recordToEdit) {
      setFormData({
        CliendId: recordToEdit.CliendId,
        name: recordToEdit.name,
        address: recordToEdit.address,
        bio: recordToEdit.bio
      });
      setCharCount({
        name: recordToEdit.name.length,
        address: recordToEdit.address.length,
        bio: recordToEdit.bio.length
      });
    }
  }, [recordToEdit]);

  const validateField = (name, value) => {
    switch (name) {
      case 'CliendId':
        const numValue = Number(value);
        if (!Number.isInteger(numValue) || numValue < 1 || numValue > 10000) {
          return 'Client ID must be a number between 1 and 10000';
        }
        break;
      case 'name':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          return 'Name can only contain alphabets and spaces';
        }
        if (value.length > 20) {
          return 'Name cannot be more than 20 characters';
        }
        break;
      case 'address':
        if (value.length > 40) {
          return 'Address cannot be more than 40 characters';
        }
        break;
      case 'bio':
        if (value.length > 200) {
          return 'Bio cannot be more than 120 characters';
        }
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate Client ID - only allow numbers between 1 and 10000
    if (name === 'CliendId') {
      if (!/^\d*$/.test(value)) return;
      const numValue = Number(value);
      if (numValue > 10000) return;
    }

    // Validate Name - only allow letters and spaces
    if (name === 'name' && !/^[A-Za-z\s]*$/.test(value)) return;
    
    // Update character count and validate field
    if (['name', 'address', 'bio'].includes(name)) {
      const maxLengths = { name: 20, address: 40, bio: 120 };
      if (value.length <= maxLengths[name]) {
        setCharCount(prev => ({
          ...prev,
          [name]: value.length
        }));
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Validate and set error
    const fieldError = validateField(name, value);
    setError(prev => ({
      ...prev,
      [name]: fieldError
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const errors = {};
    Object.keys(formData).forEach(key => {
      const fieldError = validateField(key, formData[key]);
      if (fieldError) errors[key] = fieldError;
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      let result;
      if (recordToEdit) {
        result = await updateRecord(recordToEdit._id, formData);
        setRecordToEdit(null);
      } else {
        result = await createRecord(formData);
      }
      console.log('Record saved successfully:', result);
      onRecordCreated(result);
      setFormData({
        CliendId: '',
        name: '',
        address: '',
        bio: ''
      });
      setError({});
    } catch (err) {
      console.error('Detailed error:', err);
      setError({
        submit: err.response?.data?.message || 
        'Network error - please check if the server is running'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setRecordToEdit(null);
    setFormData({
      CliendId: '',
      name: '',
      address: '',
      bio: ''
    });
  };

  return (
    <div className="py-8 bg-white rounded-xl shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto px-6">
        {error.submit && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded-r-lg">
            <div className="text-red-700">{error.submit}</div>
          </div>
        )}

        {/* Client ID Field */}
        <div className="space-y-2">
          <label htmlFor="CliendId" className="block text-sm font-medium text-gray-700">
            Client ID <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2"></span>
          </label>
          <input
            type="number"
            id="CliendId"
            name="CliendId"
            value={formData.CliendId}
            onChange={handleChange}
            required
            min="1"
            max="10000"
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200
              ${error.CliendId ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter ID"
          />
          {error.CliendId && (
            <p className="text-red-500 text-xs mt-1">{error.CliendId}</p>
          )}
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200
              ${error.name ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter full name"
          />
          {error.name && (
            <p className="text-red-500 text-xs mt-1">{error.name}</p>
          )}
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            maxLength="40"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Enter your address"
          />
        </div>

        {/* Bio Field */}
        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 ml-2">({charCount.bio}/200)</span>
          </label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            maxLength="120"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white 
              ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
              transition-all duration-200 transform hover:scale-[1.02]`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {recordToEdit ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              recordToEdit ? 'Update Record' : 'Create Record'
            )}
          </button>
          {recordToEdit && (
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RecordForm;
