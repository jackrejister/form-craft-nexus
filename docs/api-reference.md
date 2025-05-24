
# API Reference

## Types and Interfaces

### FormField

Represents a single field in a form.

```typescript
interface FormField {
  id: string;                    // Unique field identifier
  type: FieldType;              // Field type (see FieldType)
  label: string;                // Display label
  placeholder?: string;         // Placeholder text
  required: boolean;            // Whether field is required
  options?: string[];           // Options for select/radio/checkbox
  description?: string;         // Help text
  defaultValue?: any;           // Default field value
  validation?: ValidationConfig; // Validation rules
  conditional?: ConditionalConfig; // Conditional display rules
}
```

### FieldType

Available field types:

```typescript
type FieldType = 
  | 'text'          // Single-line text input
  | 'textarea'      // Multi-line text input
  | 'number'        // Numeric input
  | 'email'         // Email address input
  | 'phone'         // Phone number input
  | 'select'        // Dropdown selection
  | 'multiselect'   // Multiple selection dropdown
  | 'radio'         // Radio button group
  | 'checkbox'      // Checkbox group
  | 'date'          // Date picker
  | 'time'          // Time picker
  | 'file'          // File upload
  | 'rating'        // Star rating
  | 'url'           // URL input
  | 'name'          // Name input (with formatting)
  | 'address'       // Address input
  | 'payment'       // Payment information
  | 'signature'     // Digital signature
  | 'divider'       // Visual divider
  | 'heading';      // Section heading
```

### Form

Complete form configuration:

```typescript
interface Form {
  id: string;                    // Unique form identifier
  title: string;                 // Form title
  description?: string;          // Form description
  fields: FormField[];           // Array of form fields
  theme: FormTheme;             // Visual theme settings
  settings: FormSettings;       // Form behavior settings
  integrations: FormIntegration[]; // Connected services
  createdAt: string;            // Creation timestamp
  updatedAt: string;            // Last update timestamp
  submissions: number;          // Number of submissions
}
```

### FormTheme

Visual appearance configuration:

```typescript
interface FormTheme {
  backgroundColor: string;       // Background color
  textColor: string;            // Text color
  accentColor: string;          // Accent/primary color
  fontFamily: string;           // Font family
  borderRadius: string;         // Border radius setting
  logo?: string;                // Logo image URL
  coverImage?: string;          // Cover image URL
}
```

### FormSettings

Form behavior configuration:

```typescript
interface FormSettings {
  redirectAfterSubmit?: string;     // Redirect URL after submission
  savePartialResponses: boolean;    // Save incomplete responses
  allowMultipleSubmissions: boolean; // Allow multiple submissions
  enableCaptcha: boolean;           // Enable CAPTCHA protection
  showProgressBar: boolean;         // Show progress indicator
  confirmationMessage?: string;     // Custom confirmation message
  submitButtonText: string;         // Submit button text
  submitButtonColor?: string;       // Submit button color
  limitSubmissions?: number;        // Max number of submissions
  closedMessage?: string;           // Message when form is closed
  formExpiry?: string;              // Form expiration date
}
```

### FormIntegration

External service integration:

```typescript
interface FormIntegration {
  id: string;                    // Integration identifier
  type: IntegrationType;         // Integration type
  name: string;                  // Display name
  enabled: boolean;              // Whether integration is active
  config: Record<string, any>;   // Integration-specific configuration
}
```

### IntegrationType

Available integration types:

```typescript
type IntegrationType = 
  | 'sheets'         // Google Sheets
  | 'notion'         // Notion database
  | 'airtable'       // Airtable base
  | 'webhook'        // Custom webhook
  | 'slack'          // Slack notifications
  | 'zapier'         // Zapier automation
  | 'make'           // Make (formerly Integromat)
  | 'googleAnalytics' // Google Analytics
  | 'metaPixel'      // Meta Pixel
  | 'coda'           // Coda document
  | 'pipedream'      // Pipedream workflow
  | 'excel';         // Microsoft Excel
```

### ValidationConfig

Field validation configuration:

```typescript
interface ValidationConfig {
  type?: string;                 // Validation type
  pattern?: string;              // Regex pattern
  min?: number;                  // Minimum value/length
  max?: number;                  // Maximum value/length
  minLength?: number;            // Minimum text length
  maxLength?: number;            // Maximum text length
}
```

### ConditionalConfig

Conditional field display:

```typescript
interface ConditionalConfig {
  field: string;                 // Field ID to check
  value: any;                    // Value to compare
  operator: ConditionalOperator; // Comparison operator
}

type ConditionalOperator = 
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan';
```

## Components API

### FormPreview

Main component for rendering forms:

```typescript
interface FormPreviewProps {
  form: Form;                                    // Form to render
  onSubmit?: (data: Record<string, any>) => Promise<void>; // Custom submit handler
  isSubmitting?: boolean;                        // Submission state
  onSubmissionComplete?: () => void;             // Completion callback
}
```

### FormBuilder

Form building interface:

```typescript
interface FormBuilderProps {
  form: Form;                                    // Form being edited
  onFormUpdate: (form: Form) => void;           // Form update callback
  onSave: () => Promise<void>;                  // Save callback
}
```

## Utility Functions

### Validation

```typescript
// Validate a single field
validateField(field: FormField, value: any): string | null

// Validate entire form
validateForm(fields: FormField[], formData: Record<string, any>): ValidationError[]

// Get error message for field
getFieldErrorMessage(fieldId: string, errors: ValidationError[]): string | null
```

### Form Submission

```typescript
// Submit form response with integrations
submitFormResponse(
  formId: string, 
  data: Record<string, any>, 
  form: Form
): Promise<void>
```

## Error Handling

### ValidationError

```typescript
interface ValidationError {
  field: string;                 // Field ID with error
  message: string;               // Error message
}
```

### Common Error Types

- **Required Field**: Field is required but empty
- **Invalid Format**: Field value doesn't match expected format
- **Length Validation**: Text too short or too long
- **Range Validation**: Number outside allowed range
- **File Validation**: File size or type not allowed

## Integration APIs

Each integration type has specific configuration requirements:

### Google Sheets

```typescript
interface SheetsConfig {
  spreadsheetId: string;         // Google Sheets ID
  range?: string;                // Target range (optional)
  headers?: string[];            // Column headers
}
```

### Webhook

```typescript
interface WebhookConfig {
  url: string;                   // Webhook URL
  method: 'POST' | 'PUT';        // HTTP method
  headers?: Record<string, string>; // Custom headers
  template?: string;             // Payload template
}
```

### Slack

```typescript
interface SlackConfig {
  webhookUrl: string;            // Slack webhook URL
  channel?: string;              // Target channel
  template?: string;             // Message template
}
```

## Events

### Form Events

- `form:created` - New form created
- `form:updated` - Form configuration changed
- `form:submitted` - Form response submitted
- `form:deleted` - Form deleted

### Integration Events

- `integration:added` - New integration connected
- `integration:enabled` - Integration activated
- `integration:disabled` - Integration deactivated
- `integration:tested` - Integration test completed
