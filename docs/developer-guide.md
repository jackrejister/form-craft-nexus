# Developer Guide

Technical documentation for developers working with the Form Builder codebase.

## Architecture Overview

### Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks and context
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Form Handling**: React Hook Form with Zod validation

### Project Structure

```
src/
├── components/
│   ├── forms/              # Form-related components
│   │   ├── FormBuilder/    # Form building interface
│   │   ├── FormPreview/    # Form preview and rendering
│   │   └── FormIntegrations/ # Integration management
│   ├── dashboard/          # Dashboard widgets
│   ├── layout/            # Layout components
│   └── ui/                # Base UI components
├── pages/                 # Application pages/routes
├── types/                 # TypeScript definitions
├── lib/                   # Utility functions
├── services/              # External service integrations
└── hooks/                 # Custom React hooks
```

## Core Types

### Form Types

```typescript
export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  description?: string;
  defaultValue?: any;
  validation?: ValidationConfig;
  conditional?: ConditionalConfig;
};

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
```

## Key Components

### FormBuilder

The main form building interface located in `src/components/forms/FormBuilder/`.

**Key Features:**
- Drag-and-drop field arrangement
- Real-time form preview
- Field configuration panel
- Form settings management

**Usage:**
```typescript
import FormBuilder from '@/components/forms/FormBuilder/FormBuilder';

<FormBuilder 
  form={form}
  onFormUpdate={handleFormUpdate}
  onSave={handleSave}
/>
```

### FormPreview

Renders forms for user interaction located in `src/components/forms/FormPreview.tsx`.

**Key Features:**
- Dynamic field rendering
- Form validation
- Integration with submission handling
- Theme application

**Usage:**
```typescript
import FormPreview from '@/components/forms/FormPreview';

<FormPreview 
  form={form}
  onSubmit={handleSubmit}
  isSubmitting={isLoading}
/>
```

## Adding New Field Types

### 1. Update Type Definitions

Add your new field type to `src/types/form.ts`:

```typescript
export type FieldType = 
  | 'text'
  | 'email'
  // ... existing types
  | 'your-new-type';
```

### 2. Add Field Configuration

Update `FormFieldPicker.tsx` to include your new field:

```typescript
const fieldTypes = [
  // ... existing fields
  {
    type: 'your-new-type' as FieldType,
    label: 'Your New Field',
    icon: YourIcon,
    description: 'Description of your field'
  }
];
```

### 3. Implement Field Rendering

Add rendering logic in `FormPreview.tsx`:

```typescript
case 'your-new-type':
  return (
    <div key={field.id} className="space-y-2">
      <Label>{field.label}</Label>
      <YourCustomComponent
        value={fieldValue}
        onChange={(value) => handleFieldChange(field.id, value)}
        {...field}
      />
    </div>
  );
```

### 4. Add Validation

Update `src/lib/validation.ts` if needed:

```typescript
export const validateField = (field: FormField, value: any): string | null => {
  // ... existing validation
  
  if (field.type === 'your-new-type') {
    // Your custom validation logic
  }
  
  return null;
};
```

## Integration Development

### Creating New Integrations

1. **Add Integration Type**

```typescript
// In src/types/form.ts
export type IntegrationType = 
  | 'sheets'
  | 'webhook'
  // ... existing types
  | 'your-integration';
```

2. **Implement Integration Service**

Create service in `src/services/integrationService.ts`:

```typescript
export const handleYourIntegration = async (
  integration: FormIntegration,
  formData: Record<string, any>,
  form: Form
) => {
  // Implementation logic
};
```

3. **Add Integration Config UI**

Update integration management components to include configuration options for your integration.

## Validation System

The validation system is located in `src/lib/validation.ts` and provides:

- Field-level validation
- Form-level validation
- Custom validation rules
- Real-time error feedback

### Custom Validation Rules

```typescript
const customValidation = {
  type: 'custom',
  pattern: '^[A-Z]{2}[0-9]{6}$',
  message: 'Format must be AA123456'
};
```

## State Management

The application uses React's built-in state management:

- **Local State**: Component-level state with `useState`
- **Form State**: React Hook Form for complex forms
- **Global State**: Context providers for shared state

## API Integration

### Form Submission

Form submissions are handled through the `submitFormResponse` function in `src/lib/api.ts`:

```typescript
export const submitFormResponse = async (
  formId: string,
  data: Record<string, any>,
  form: Form
) => {
  // Process integrations
  // Save response
  // Return result
};
```

## Testing

### Running Tests

```bash
npm run test
```

### Test Structure

```
tests/
├── components/     # Component tests
├── utils/         # Utility function tests
├── integration/   # Integration tests
└── e2e/          # End-to-end tests
```

## Build and Deployment

### Development Build

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Contributing

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages

### Pull Request Process

1. Fork the repository
2. Create feature branch
3. Make changes with tests
4. Update documentation
5. Submit pull request

### Debugging Tips

- Use React Developer Tools
- Check console for validation errors
- Test integrations with sample data
- Verify responsive design on multiple devices
