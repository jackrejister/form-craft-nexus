
export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
  defaultValue?: any;
  validation?: {
    type?: string;
    pattern?: string;
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
  };
  conditional?: {
    field: string;
    value: any;
    operator: 'equals' | 'notEquals' | 'contains' | 'notContains' | 'greaterThan' | 'lessThan';
  };
};

export type FieldType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'time'
  | 'file'
  | 'rating'
  | 'url'
  | 'name'
  | 'address'
  | 'payment'
  | 'signature'
  | 'divider'
  | 'heading';

export type Form = {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  theme: FormTheme;
  settings: FormSettings;
  integrations: FormIntegration[];
  createdAt: string;
  updatedAt: string;
  submissions: number;
};

export type FormTheme = {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: string;
  logo?: string;
  coverImage?: string;
};

export type FormSettings = {
  redirectAfterSubmit?: string;
  savePartialResponses: boolean;
  allowMultipleSubmissions: boolean;
  enableCaptcha: boolean;
  showProgressBar: boolean;
  confirmationMessage?: string;
  submitButtonText: string;
  submitButtonColor?: string;
  limitSubmissions?: number;
  closedMessage?: string;
  formExpiry?: string;
};

export type FormIntegration = {
  id: string;
  type: IntegrationType;
  name: string;
  enabled: boolean;
  config: Record<string, any>;
};

export type IntegrationType = 
  | 'sheets'
  | 'notion'
  | 'airtable'
  | 'webhook'
  | 'slack'
  | 'zapier'
  | 'make'
  | 'googleAnalytics'
  | 'metaPixel'
  | 'coda'
  | 'pipedream'
  | 'excel';

export type FormResponse = {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: string;
  ip?: string;
  metadata?: {
    browser?: string;
    os?: string;
    device?: string;
    referrer?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
  };
};

export type FormStats = {
  formId: string;
  views: number;
  starts: number;
  completions: number;
  conversionRate: number;
  averageTimeToComplete: number;
  fieldStats: {
    fieldId: string;
    dropOff: number;
    timeSpent: number;
    errorRate: number;
  }[];
};
