import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createUser } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store/store';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  job: string;
}

interface FormErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  job?: string;
}

const CreateUserPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { creatingUser, crudError } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<FormData>({
    first_name: '',
    last_name: '',
    email: '',
    job: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // First name validation
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'First name is required';
    } else if (formData.first_name.trim().length < 2) {
      newErrors.first_name = 'First name must be at least 2 characters';
    }

    // Last name validation
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Last name is required';
    } else if (formData.last_name.trim().length < 2) {
      newErrors.last_name = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Job validation
    if (!formData.job.trim()) {
      newErrors.job = 'Job title is required';
    } else if (formData.job.trim().length < 2) {
      newErrors.job = 'Job title must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      // Create user with the name field expected by the API
      const userData = {
        name: `${formData.first_name} ${formData.last_name}`,
        job: formData.job,
      };

      const result = await dispatch(createUser(userData)).unwrap();
      
      // Show success message
      setShowSuccess(true);
      
      // Redirect to users list after a short delay
      setTimeout(() => {
        router.push('/users');
      }, 2000);
      
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      job: '',
    });
    setErrors({});
  };

  // Success State
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white rounded-3xl p-8 shadow-xl border text-center">
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Member Added Successfully!</h3>
            <p className="text-gray-600 mb-8">
              {formData.first_name} {formData.last_name} has been added to your team.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/users"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                View Team Members
              </Link>
              <button
                onClick={() => {
                  setShowSuccess(false);
                  resetForm();
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Add Another Member
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Back Button */}
        <div className="mb-8">
          <Link
            href="/users"
            className="inline-flex items-center px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-white hover:border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Team Members
          </Link>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Add New Team Member</h1>
              <p className="text-blue-100">Fill in the details to add a new member to your team</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8">
            {/* Error Alert */}
            {crudError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-xl">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{crudError}</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className={`block w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 ${
                      errors.first_name 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.first_name && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.first_name}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className={`block w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 ${
                      errors.last_name 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.last_name && (
                    <p className="text-sm text-red-600 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.last_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`block w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Enter email address"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Job Title Field */}
              <div className="space-y-2">
                <label htmlFor="job" className="block text-sm font-medium text-gray-700 uppercase tracking-wide">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="job"
                  value={formData.job}
                  onChange={(e) => handleInputChange('job', e.target.value)}
                  className={`block w-full px-4 py-3 border rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 ${
                    errors.job 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder="Enter job title"
                />
                {errors.job && (
                  <p className="text-sm text-red-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.job}
                  </p>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={creatingUser}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-lg"
                >
                  {creatingUser ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Adding Member...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Team Member
                    </>
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={creatingUser}
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-100 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset Form
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Fields marked with <span className="text-red-500">*</span> are required
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPage; 