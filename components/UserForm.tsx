import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, updateUser } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store/store';

interface UserFormProps {
  user?: any; // Optional user object for editing
  onSubmitSuccess?: () => void; // Callback after successful submission
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmitSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { creatingUser, updatingUser, crudError } = useSelector((state: RootState) => state.user);

  const [name, setName] = useState('');
  const [job, setJob] = useState('');

  useEffect(() => {
    if (user) {
      // Populate form if editing an existing user
      setName(user.first_name || ''); // reqres.in returns first_name/last_name, but update expects name
      setJob(user.job || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, job };

    let result;
    if (user) {
      // Update existing user
      result = await dispatch(updateUser({ userId: user.id, userData }));
    } else {
      // Create new user
      result = await dispatch(createUser(userData));
    }

    if (result.meta.requestStatus === 'fulfilled') {
      // Handle success, e.g., close modal, show success message
      console.log(`${user ? 'User updated' : 'User created'} successfully:`, result.payload);
      if (onSubmitSuccess) {
          onSubmitSuccess();
      }
      // Optionally clear form for creation after success
      if (!user) {
          setName('');
          setJob('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {crudError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {crudError}
        </div>
      )}
      
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="job" className="block text-sm font-medium text-gray-700">
          Job:
        </label>
        <input
          type="text"
          id="job"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <button
          type="submit"
          disabled={creatingUser || updatingUser}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {user ? 'Update User' : 'Create User'}
        </button>
        {(creatingUser || updatingUser) && (
          <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
        )}
      </div>
    </form>
  );
};

export default UserForm; 