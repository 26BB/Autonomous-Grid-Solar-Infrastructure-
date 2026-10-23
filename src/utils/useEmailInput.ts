import React, { useState, useCallback } from 'react';
import { isValidEmail, sanitizeInput } from './security';

export interface UseEmailInputReturn {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validateAndSanitize: (customErrorMessage?: string) => { isValid: boolean; cleanEmail: string };
  resetEmail: () => void;
}

/**
 * Pure helper function for validating and sanitizing email strings outside React rendering contexts.
 */
export function validateAndSanitizeEmailInput(
  rawEmail: string,
  customErrorMessage: string = 'Please enter a valid email address.'
): { isValid: boolean; cleanEmail: string; error: string | null } {
  const cleanEmail = sanitizeInput(rawEmail, 254);
  if (!isValidEmail(cleanEmail)) {
    return { isValid: false, cleanEmail, error: customErrorMessage };
  }
  return { isValid: true, cleanEmail, error: null };
}

export function useEmailInput(initialValue: string = ''): UseEmailInputReturn {
  const [email, setEmail] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError(null);
  }, [error]);

  const validateAndSanitize = useCallback((customErrorMessage: string = 'Please enter a valid email address.') => {
    const res = validateAndSanitizeEmailInput(email, customErrorMessage);
    if (!res.isValid) {
      setError(res.error);
      return { isValid: false, cleanEmail: res.cleanEmail };
    }
    setError(null);
    setEmail(res.cleanEmail);
    return { isValid: true, cleanEmail: res.cleanEmail };
  }, [email]);

  const resetEmail = useCallback(() => {
    setEmail(initialValue);
    setError(null);
  }, [initialValue]);

  return {
    email,
    setEmail,
    error,
    setError,
    handleEmailChange,
    validateAndSanitize,
    resetEmail,
  };
}
