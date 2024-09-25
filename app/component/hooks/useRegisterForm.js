import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useRegisterForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const registerParam = url.searchParams.get('register');
    const successParam = url.searchParams.get('success');
    setIsFormOpen(registerParam === 'true');
    setIsSuccess(successParam === 'true');
  }, []);

  const openForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('register', 'true');
    url.searchParams.delete('success');
    router.push(url.toString());
    setIsFormOpen(true);
    setIsSuccess(false);
  };

  const closeForm = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('register');
    url.searchParams.delete('success');
    router.push(url.toString());
    setIsFormOpen(false);
    setIsSuccess(false);
  };

  const handleSuccess = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('register');
    url.searchParams.set('success', 'true');
    router.push(url.toString());
    setIsFormOpen(false);
    setIsSuccess(true);
  };

  return { isFormOpen, isSuccess, openForm, closeForm, handleSuccess };
}