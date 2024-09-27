import { useState, useEffect } from 'react';

export function useRegisterForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const registerParam = url.searchParams.get('register');
    const successParam = url.searchParams.get('success');
    setIsFormOpen(registerParam === 'true');
    setIsSuccess(successParam === 'true');
  }, []);

  const updateURL = (params) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === null) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.pushState({}, '', url.toString());
  };

  const openForm = () => {
    updateURL({ register: 'true', success: null });
    setIsFormOpen(true);
    setIsSuccess(false);
  };

  const closeForm = () => {
    updateURL({ register: null, success: null });
    setIsFormOpen(false);
    setIsSuccess(false);
  };

  const handleSuccess = () => {
    updateURL({ register: null, success: 'true' });
    setIsFormOpen(false);
    setIsSuccess(true);
  };

  return { isFormOpen, isSuccess, openForm, closeForm, handleSuccess };
}