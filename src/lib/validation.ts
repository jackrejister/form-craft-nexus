
import { FormField } from "@/types/form";

export interface ValidationError {
  field: string;
  message: string;
}

export const validateField = (field: FormField, value: any): string | null => {
  // Check required validation
  if (field.required && (!value || value.toString().trim() === "")) {
    return `${field.label} is required`;
  }

  // Skip other validations if field is empty and not required
  if (!value || value.toString().trim() === "") {
    return null;
  }

  const validation = field.validation || {};

  // Text length validations
  if (field.type === "text" || field.type === "textarea") {
    const textValue = value.toString();
    
    if (validation.minLength && textValue.length < validation.minLength) {
      return `${field.label} must be at least ${validation.minLength} characters`;
    }
    
    if (validation.maxLength && textValue.length > validation.maxLength) {
      return `${field.label} must be no more than ${validation.maxLength} characters`;
    }
  }

  // Number validations
  if (field.type === "number") {
    const numValue = Number(value);
    
    if (isNaN(numValue)) {
      return `${field.label} must be a valid number`;
    }
    
    if (validation.min !== undefined && numValue < validation.min) {
      return `${field.label} must be at least ${validation.min}`;
    }
    
    if (validation.max !== undefined && numValue > validation.max) {
      return `${field.label} must be no more than ${validation.max}`;
    }
  }

  // Email validation
  if (field.type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value.toString())) {
      return `${field.label} must be a valid email address`;
    }
  }

  // URL validation
  if (field.type === "url") {
    try {
      new URL(value.toString());
    } catch {
      return `${field.label} must be a valid URL`;
    }
  }

  // Phone validation
  if (field.type === "phone") {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = value.toString().replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return `${field.label} must be a valid phone number`;
    }
  }

  // File validation
  if (field.type === "file" && value instanceof File) {
    if (validation.max && value.size > validation.max * 1024 * 1024) {
      return `${field.label} file size must be less than ${validation.max}MB`;
    }
    
    if (validation.pattern) {
      const allowedTypes = validation.pattern.split(',').map(t => t.trim());
      const fileExtension = '.' + value.name.split('.').pop()?.toLowerCase();
      if (!allowedTypes.includes(fileExtension)) {
        return `${field.label} must be one of: ${allowedTypes.join(', ')}`;
      }
    }
  }

  // Custom pattern validation
  if (validation.pattern && field.type !== "file") {
    try {
      const regex = new RegExp(validation.pattern);
      if (!regex.test(value.toString())) {
        return `${field.label} format is invalid`;
      }
    } catch {
      // Invalid regex pattern, skip validation
    }
  }

  return null;
};

export const validateForm = (fields: FormField[], formData: Record<string, any>): ValidationError[] => {
  const errors: ValidationError[] = [];

  fields.forEach(field => {
    const value = formData[field.id];
    const error = validateField(field, value);
    
    if (error) {
      errors.push({
        field: field.id,
        message: error
      });
    }
  });

  return errors;
};

export const getFieldErrorMessage = (fieldId: string, errors: ValidationError[]): string | null => {
  const error = errors.find(e => e.field === fieldId);
  return error ? error.message : null;
};
