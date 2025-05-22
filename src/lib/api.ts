
import { Form, FormResponse, FormStats, FormIntegration } from '@/types/form';
import { MOCK_FORMS } from './constants';

// Base API URL would come from environment variables in a real app
const API_BASE_URL = 'https://api.example.com';

// Mock implementations for frontend development
export const fetchForms = async (): Promise<Form[]> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms`).then(res => res.json());
  
  // Using mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_FORMS);
    }, 500);
  });
};

export const fetchForm = async (id: string): Promise<Form | null> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${id}`).then(res => res.json());
  
  // Using mock data for now
  return new Promise((resolve) => {
    setTimeout(() => {
      const form = MOCK_FORMS.find(f => f.id === id);
      resolve(form || null);
    }, 300);
  });
};

export const createForm = async (formData: Partial<Form>): Promise<Form> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // }).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const newForm: Form = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title || 'Untitled Form',
        description: formData.description || '',
        fields: formData.fields || [],
        theme: formData.theme || {
          backgroundColor: '#ffffff',
          textColor: '#1a1a1a',
          accentColor: '#9b87f5',
          fontFamily: 'Inter, sans-serif',
          borderRadius: '8px',
        },
        settings: formData.settings || {
          savePartialResponses: true,
          allowMultipleSubmissions: true,
          enableCaptcha: false,
          showProgressBar: true,
          submitButtonText: 'Submit',
        },
        integrations: formData.integrations || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        submissions: 0,
      };
      resolve(newForm);
    }, 500);
  });
};

export const updateForm = async (id: string, formData: Partial<Form>): Promise<Form> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${id}`, {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData)
  // }).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingForm = MOCK_FORMS.find(f => f.id === id);
      if (!existingForm) {
        throw new Error(`Form with ID ${id} not found`);
      }
      
      const updatedForm: Form = {
        ...existingForm,
        ...formData,
        updatedAt: new Date().toISOString(),
      };
      resolve(updatedForm);
    }, 500);
  });
};

export const deleteForm = async (id: string): Promise<boolean> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${id}`, {
  //   method: 'DELETE'
  // }).then(() => true);
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

export const fetchFormResponses = async (formId: string): Promise<FormResponse[]> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${formId}/responses`).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 500);
  });
};

export const fetchFormStats = async (formId: string): Promise<FormStats> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${formId}/stats`).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        formId,
        views: Math.floor(Math.random() * 1000),
        starts: Math.floor(Math.random() * 500),
        completions: Math.floor(Math.random() * 300),
        conversionRate: Math.random() * 100,
        averageTimeToComplete: Math.floor(Math.random() * 300),
        fieldStats: [],
      });
    }, 500);
  });
};

export const saveFormIntegration = async (
  formId: string, 
  integration: FormIntegration
): Promise<FormIntegration> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${formId}/integrations`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(integration)
  // }).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...integration,
        id: integration.id || Math.random().toString(36).substr(2, 9),
      });
    }, 500);
  });
};

export const deleteFormIntegration = async (
  formId: string, 
  integrationId: string
): Promise<boolean> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${formId}/integrations/${integrationId}`, {
  //   method: 'DELETE'
  // }).then(() => true);
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
};

export const submitFormResponse = async (
  formId: string, 
  responseData: Record<string, any>
): Promise<FormResponse> => {
  // In a real app, this would make an API call
  // return fetch(`${API_BASE_URL}/forms/${formId}/responses`, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(responseData)
  // }).then(res => res.json());
  
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        formId,
        data: responseData,
        submittedAt: new Date().toISOString(),
      });
    }, 700);
  });
};

export const summarizeResponses = async (formId: string): Promise<string> => {
  // In a real implementation, this would call the GROQ API
  // Mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        "Based on the form responses, most users are satisfied with the product, with 78% rating it 4 or 5 stars. Common feedback includes requests for improved mobile experience and additional export options. Users from the technology sector represent the largest demographic at 42% of respondents."
      );
    }, 1000);
  });
};
