
import { FormField, FieldType } from "@/types/form";

export const FIELD_TYPE_OPTIONS: { value: FieldType; label: string; icon: string; category: string }[] = [
  // Basic Fields
  { value: 'text', label: 'Short Text', icon: '✍️', category: 'basic' },
  { value: 'textarea', label: 'Long Text', icon: '📝', category: 'basic' },
  { value: 'number', label: 'Number', icon: '🔢', category: 'basic' },
  { value: 'email', label: 'Email', icon: '📧', category: 'basic' },
  { value: 'phone', label: 'Phone', icon: '📞', category: 'basic' },
  { value: 'url', label: 'Website URL', icon: '🌐', category: 'basic' },
  
  // Choice Fields
  { value: 'select', label: 'Dropdown', icon: '🔽', category: 'choice' },
  { value: 'multiselect', label: 'Multi Select', icon: '✅', category: 'choice' },
  { value: 'radio', label: 'Multiple Choice', icon: '⭕', category: 'choice' },
  { value: 'checkbox', label: 'Checkboxes', icon: '☑️', category: 'choice' },
  { value: 'rating', label: 'Rating', icon: '⭐', category: 'choice' },
  
  // Date & Time
  { value: 'date', label: 'Date', icon: '📅', category: 'datetime' },
  { value: 'time', label: 'Time', icon: '🕒', category: 'datetime' },
  
  // Advanced Fields
  { value: 'file', label: 'File Upload', icon: '📎', category: 'advanced' },
  { value: 'name', label: 'Full Name', icon: '👤', category: 'advanced' },
  { value: 'address', label: 'Address', icon: '🏠', category: 'advanced' },
  { value: 'payment', label: 'Payment', icon: '💳', category: 'advanced' },
  { value: 'signature', label: 'Signature', icon: '✒️', category: 'advanced' },
  
  // Layout Elements
  { value: 'divider', label: 'Divider', icon: '➖', category: 'layout' },
  { value: 'heading', label: 'Heading', icon: '🔤', category: 'layout' },
];

export const VALIDATION_TYPES = [
  { value: 'required', label: 'Required' },
  { value: 'minLength', label: 'Minimum Length' },
  { value: 'maxLength', label: 'Maximum Length' },
  { value: 'min', label: 'Minimum Value' },
  { value: 'max', label: 'Maximum Value' },
  { value: 'pattern', label: 'Pattern (Regex)' },
  { value: 'email', label: 'Valid Email' },
  { value: 'url', label: 'Valid URL' },
  { value: 'phone', label: 'Valid Phone' },
];

export const DEFAULT_FIELD: FormField = {
  id: '',
  type: 'text',
  label: 'Question',
  placeholder: 'Type your answer here',
  required: false,
  validation: {},
};

export const DEFAULT_THEME = {
  backgroundColor: '#ffffff',
  textColor: '#1a1a1a',
  accentColor: '#9b87f5',
  fontFamily: 'Inter, sans-serif',
  borderRadius: '8px',
};

export const INTEGRATION_TYPES = [
  { value: 'sheets', label: 'Google Sheets', icon: '📊' },
  { value: 'notion', label: 'Notion', icon: '📝' },
  { value: 'airtable', label: 'Airtable', icon: '📋' },
  { value: 'webhook', label: 'Webhook', icon: '🪝' },
  { value: 'slack', label: 'Slack', icon: '💬' },
  { value: 'zapier', label: 'Zapier', icon: '⚡' },
  { value: 'make', label: 'Make', icon: '🔄' },
  { value: 'googleAnalytics', label: 'Google Analytics', icon: '📈' },
  { value: 'metaPixel', label: 'Meta Pixel', icon: '👁️' },
  { value: 'coda', label: 'Coda', icon: '📔' },
  { value: 'pipedream', label: 'Pipedream', icon: '🌊' },
  { value: 'excel', label: 'Excel', icon: '📗' },
];

export const MOCK_FORMS = [
  {
    id: '1',
    title: 'Customer Feedback',
    description: 'Help us improve our products and services',
    createdAt: '2023-04-15T10:30:00Z',
    updatedAt: '2023-04-16T14:45:00Z',
    submissions: 245,
    fields: [],
    theme: DEFAULT_THEME,
    settings: {
      savePartialResponses: true,
      allowMultipleSubmissions: false,
      enableCaptcha: true,
      showProgressBar: true,
      submitButtonText: 'Submit',
    },
    integrations: [],
  },
  {
    id: '2',
    title: 'Event Registration',
    description: 'Register for our upcoming webinar',
    createdAt: '2023-05-02T09:15:00Z',
    updatedAt: '2023-05-03T11:20:00Z',
    submissions: 124,
    fields: [],
    theme: DEFAULT_THEME,
    settings: {
      savePartialResponses: true,
      allowMultipleSubmissions: false,
      enableCaptcha: true,
      showProgressBar: true,
      submitButtonText: 'Register',
    },
    integrations: [],
  },
  {
    id: '3',
    title: 'Contact Form',
    description: 'Get in touch with our team',
    createdAt: '2023-03-10T16:45:00Z',
    updatedAt: '2023-03-11T08:30:00Z',
    submissions: 78,
    fields: [],
    theme: DEFAULT_THEME,
    settings: {
      savePartialResponses: false,
      allowMultipleSubmissions: true,
      enableCaptcha: true,
      showProgressBar: false,
      submitButtonText: 'Send Message',
    },
    integrations: [],
  }
];
