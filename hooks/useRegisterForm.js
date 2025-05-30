import { useState, useEffect } from 'react';

export function useRegisterForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [originalPath, setOriginalPath] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const registerParam = url.searchParams.get('register');
    const successParam = url.searchParams.get('success');
    setIsFormOpen(registerParam === 'true');
    setIsSuccess(successParam === 'true');
    setOriginalPath(url.pathname);
  }, []);

  const updateURL = (params) => {
    const url = new URL(window.location.href);

    // Clear existing search params
    url.search = '';

    Object.entries(params).forEach(([key, value]) => {
      if (value !== null) {
        url.searchParams.set(key, value);
      }
    });

    // Replace the entire path with just the search params
    const newURL = `/${url.search}`;
    window.history.pushState({}, '', newURL);
  };

  const restoreOriginalPath = () => {
    window.history.pushState({}, '', originalPath);
  };

  const openForm = () => {
    updateURL({ register: 'true' });
    setIsFormOpen(true);
    setIsSuccess(false);
  };

  const closeForm = () => {
    restoreOriginalPath();
    setIsFormOpen(false);
    setIsSuccess(false);
  };

  const handleSuccess = () => {
    updateURL({ success: 'true' });
    setIsFormOpen(false);
    setIsSuccess(true);
  };

  return { isFormOpen, isSuccess, openForm, closeForm, handleSuccess };
}