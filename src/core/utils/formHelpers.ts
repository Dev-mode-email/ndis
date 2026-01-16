import * as z from 'zod';

export const commonValidations = {
  requiredString: (message?: string) => 
    z.string().min(1, message || 'Required'),
  
  email: (message?: string) => 
    z.string().email('Invalid email format').min(1, message || 'Required'),
  
  password: (minLength: number = 6) => 
    z.string().min(minLength, `Password must be at least ${minLength} characters`),
  
  optionalString: () => z.string().optional().default(''),
  
  file: (maxSizeMB: number = 1) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return z.custom<File | null>((file) => {
      if (!file) return false;
      if (!(file instanceof File)) return false;
      return file.size <= maxSizeBytes;
    }, {
      message: `File size must be less than ${maxSizeMB}MB`
    }).refine((file) => file !== null, {
      message: 'File is required'
    });
  },
  
  optionalFile: (maxSizeMB: number = 1) => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return z.custom<File | null>((file) => {
      if (!file) return true; 
      if (!(file instanceof File)) return false;
      return file.size <= maxSizeBytes;
    }, {
      message: `File size must be less than ${maxSizeMB}MB`
    }).nullable();
  }
};

export const createFormSchema = <T extends Record<string, z.ZodTypeAny>>(
  fields: T
) => {
  return z.object(fields);
};

export const formErrorHandlers = {
  handleApiError: (
    error: unknown,
    form: { setError: (field: string | number, error: { message: string }) => void },
    fieldName: string | number = 'root'
  ) => {
    const apiError = error as { 
      response?: { 
        status?: number; 
        data?: { message?: string } 
      }; 
      message?: string 
    };
    
    let errorMessage = 'An error occurred';
    
    if (apiError?.response?.data?.message) {
      errorMessage = apiError.response.data.message;
    } else if (apiError?.message) {
      errorMessage = apiError.message;
    }
    
    form.setError(fieldName, {
      message: errorMessage
    });
  },

  handleFileSizeError: (
    error: unknown,
    form: { setError: (field: string | number, error: { message: string }) => void },
    maxSizeMB: number = 1
  ) => {
    const apiError = error as { 
      response?: { 
        status?: number; 
        data?: { message?: string } 
      }; 
      message?: string 
    };
    
    
    if (
      apiError?.response?.status === 413 || 
      (typeof apiError?.response?.data?.message === 'string' && 
       apiError.response.data.message.toLowerCase().includes('file'))
    ) {
      form.setError('file', {
        message: `File size must be less than ${maxSizeMB}MB`
      });
    } else {
      formErrorHandlers.handleApiError(error, form);
    }
  }
};

export const standardFormConfig = {
  mode: 'onChange' as const,
  reValidateMode: 'onChange' as const
};

export const defaultFormValues = {
  auth: {
    login: {
      email: '',
      password: ''
    },
    register: {
      name: '',
      email: '',
      password: ''
    }
  },
  contact: {
    name: '',
    description: '',
    label: '',
    link: '',
    phone: ''
  },
  image: {
    name: '',
    file: null as File | null,
    image_group: ''
  }
};

export type LoginFormData = typeof defaultFormValues.auth.login;
export type RegisterFormData = typeof defaultFormValues.auth.register;
export type ContactFormData = typeof defaultFormValues.contact;
export type ImageFormData = typeof defaultFormValues.image; 