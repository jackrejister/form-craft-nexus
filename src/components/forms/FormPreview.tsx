
import { useState } from "react";
import { Form, FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { submitFormResponse } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import { Calendar, Clock, Upload, Star } from "lucide-react";

interface FormPreviewProps {
  form: Form;
  isSubmitting?: boolean;
  onSubmissionComplete?: () => void;
}

const FormPreview = ({ form, isSubmitting = false, onSubmissionComplete }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    form.fields.forEach((field) => {
      if (field.required && (!formData[field.id] || formData[field.id] === '')) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      // Email validation
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
      
      // Phone validation
      if (field.type === 'phone' && formData[field.id]) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(formData[field.id].replace(/[\s\-\(\)]/g, ''))) {
          newErrors[field.id] = 'Please enter a valid phone number';
        }
      }
      
      // URL validation
      if (field.type === 'url' && formData[field.id]) {
        try {
          new URL(formData[field.id]);
        } catch {
          newErrors[field.id] = 'Please enter a valid URL';
        }
      }
      
      // Number validation
      if (field.type === 'number' && formData[field.id]) {
        if (isNaN(Number(formData[field.id]))) {
          newErrors[field.id] = 'Please enter a valid number';
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Submitting form with integrations:', form.integrations);
      await submitFormResponse(form.id, formData, form);
      
      toast({
        title: "Form Submitted Successfully!",
        description: form.integrations?.length 
          ? `Your response has been saved and sent to ${form.integrations.filter(i => i.enabled).length} connected service(s).`
          : "Your response has been saved.",
      });
      
      // Reset form
      setFormData({});
      setErrors({});
      
      if (onSubmissionComplete) {
        onSubmissionComplete();
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldError = errors[field.id];
    const fieldValue = formData[field.id] || field.defaultValue || '';

    const baseClassName = "w-full transition-colors";
    const errorClassName = fieldError ? "border-red-500 focus:border-red-500" : "";

    switch (field.type) {
      case 'text':
      case 'name':
      case 'email':
      case 'phone':
      case 'url':
      case 'number':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : 'text'}
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`${baseClassName} ${errorClassName}`}
              required={field.required}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`${baseClassName} ${errorClassName} min-h-[100px]`}
              required={field.required}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select value={fieldValue} onValueChange={(value) => handleFieldChange(field.id, value)}>
              <SelectTrigger className={`${baseClassName} ${errorClassName}`}>
                <SelectValue placeholder={field.placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'radio':
        return (
          <div key={field.id} className="space-y-3">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <RadioGroup
              value={fieldValue}
              onValueChange={(value) => handleFieldChange(field.id, value)}
              className="space-y-2"
            >
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${field.id}-${index}`} />
                  <Label htmlFor={`${field.id}-${index}`} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.id} className="space-y-3">
            <Label className="text-sm font-medium">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${field.id}-${index}`}
                    checked={(fieldValue || []).includes(option)}
                    onCheckedChange={(checked) => {
                      const currentValues = fieldValue || [];
                      if (checked) {
                        handleFieldChange(field.id, [...currentValues, option]);
                      } else {
                        handleFieldChange(field.id, currentValues.filter((v: string) => v !== option));
                      }
                    }}
                  />
                  <Label htmlFor={`${field.id}-${index}`} className="text-sm cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'date':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`${baseClassName} ${errorClassName}`}
              required={field.required}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'time':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="time"
              value={fieldValue}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={`${baseClassName} ${errorClassName}`}
              required={field.required}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'file':
        return (
          <div key={field.id} className="space-y-2">
            <Label htmlFor={field.id} className="text-sm font-medium flex items-center gap-2">
              <Upload className="h-4 w-4" />
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="file"
              onChange={(e) => handleFieldChange(field.id, e.target.files?.[0]?.name || '')}
              className={`${baseClassName} ${errorClassName}`}
              required={field.required}
            />
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'rating':
        return (
          <div key={field.id} className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Star className="h-4 w-4" />
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="p-1"
                  onClick={() => handleFieldChange(field.id, rating)}
                >
                  <Star
                    className={`h-6 w-6 ${
                      rating <= (fieldValue || 0)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </Button>
              ))}
            </div>
            {fieldError && <p className="text-sm text-red-500">{fieldError}</p>}
            {field.description && <p className="text-xs text-muted-foreground">{field.description}</p>}
          </div>
        );

      case 'divider':
        return <hr key={field.id} className="border-t border-gray-200 my-6" />;

      case 'heading':
        return (
          <h3 key={field.id} className="text-lg font-semibold mb-2">
            {field.label}
          </h3>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {form.theme?.coverImage && (
            <div className="mb-6 -mx-6 -mt-6">
              <img
                src={form.theme.coverImage}
                alt="Form Cover"
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </div>
          )}
          
          {form.theme?.logo && (
            <div className="flex justify-center mb-6">
              <img
                src={form.theme.logo}
                alt="Form Logo"
                className="h-12 object-contain"
              />
            </div>
          )}

          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">{form.title}</h1>
            {form.description && (
              <p className="text-gray-600 mb-6">{form.description}</p>
            )}
          </div>

          <div className="space-y-6">
            {form.fields.map(renderField)}
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || isSubmitting}
              style={{
                backgroundColor: form.theme?.accentColor || '#9b87f5',
                color: '#ffffff'
              }}
            >
              {isLoading || isSubmitting ? "Submitting..." : form.settings?.submitButtonText || "Submit"}
            </Button>
          </div>

          {form.integrations && form.integrations.filter(i => i.enabled).length > 0 && (
            <div className="text-center text-xs text-muted-foreground">
              This form is connected to {form.integrations.filter(i => i.enabled).length} service(s)
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default FormPreview;
