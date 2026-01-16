import axios from 'axios';

export const handleApiError = (error: unknown, fallbackMessage: string): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || fallbackMessage;
  }
  return (error as Error)?.message || fallbackMessage;
};

export const isAxiosError = (error: unknown): boolean => {
  return axios.isAxiosError(error);
};

export const getErrorStatus = (error: unknown): number | undefined => {
  if (axios.isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
};

export const getErrorData = (error: unknown): unknown => {
  if (axios.isAxiosError(error)) {
    return error.response?.data;
  }
  return null;
}; 