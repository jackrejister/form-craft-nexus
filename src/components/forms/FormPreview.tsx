
import { useState } from "react";
import { Form, FormField } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Check, Copy, ExternalLink, Upload, Star } from "lucide-react";
import { validateField, ValidationError } from "@/lib/validation";
import { useTheme } from "@/components/ThemeProvider";

interface FormPreviewProps {
  form: Form;
  onSubmit?: (data: any) => Promise<void>;
  isEmbedded?: boolean;
}

const FormPreview = ({ form, onSubmit, isEmbedded = false }: FormPreviewProps) => {
  const { theme: appTheme } = useTheme();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const fieldsPerPage = 5;
  const pages = Math.ceil(form.fields.length / fieldsPerPage);
  const currentFields = form.fields.slice(
    currentPage * fieldsPerPage,
    (currentPage + 1) * fieldsPerPage
  );

  const handleValueChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
    
    // Clear field-specific errors when user starts typing
    setErrors(prev => prev.filter(error => error.field !== fieldId));
  };

  const validateCurrentPage = () => {
    const pageErrors: ValidationError[] = [];
    currentFields.forEach(field => {
      const value = formData[field.id];
      const error = validateField(field, value);
      if (error) {
        pageErrors.push({
          field: field.id,
          message: error
        });
      }
    });
    setErrors(pageErrors);
    return pageErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCurrentPage()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      setIsSubmitted(true);
      toast({
        title: "Success",
        description: "Form submitted successfully!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to submit the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextPage = () => {
    if (validateCurrentPage() && currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}/embed/${form.id}" width="100%" height="500" style="border:none;"></iframe>`;
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getFieldError = (fieldId: string) => {
    return errors.find(error => error.field === fieldId)?.message;
  };

  const getFormBackground = () => {
    if (appTheme === 'dark') {
      return form.theme.backgroundColor === '#ffffff' ? '#1a1a1a' : form.theme.backgroundColor;
    }
    return form.theme.backgroundColor;
  };

  const getFormTextColor = () => {
    if (appTheme === 'dark') {
      return form.theme.textColor === '#1a1a1a' ? '#ffffff' : form.theme.textColor;
    }
    return form.theme.textColor;
  };

  const renderField = (field: FormField) => {
    // Check conditional logic
    if (
      field.conditional &&
      formData[field.conditional.field] !== field.conditional.value
    ) {
      return null;
    }

    const fieldError = getFieldError(field.id);
    const textColor = getFormTextColor();

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === "email" ? "email" : field.type === "url" ? "url" : "text"}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
              className={fieldError ? "border-red-500" : ""}
              style={{ 
                borderRadius: form.theme.borderRadius,
                borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
              }}
            />
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "name":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                placeholder="First Name"
                value={formData[field.id]?.firstName || ""}
                onChange={(e) => handleValueChange(field.id, { 
                  ...formData[field.id], 
                  firstName: e.target.value 
                })}
                style={{ borderRadius: form.theme.borderRadius }}
              />
              <Input
                placeholder="Last Name"
                value={formData[field.id]?.lastName || ""}
                onChange={(e) => handleValueChange(field.id, { 
                  ...formData[field.id], 
                  lastName: e.target.value 
                })}
                style={{ borderRadius: form.theme.borderRadius }}
              />
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "address":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              <Input
                placeholder="Street Address"
                value={formData[field.id]?.street || ""}
                onChange={(e) => handleValueChange(field.id, { 
                  ...formData[field.id], 
                  street: e.target.value 
                })}
                style={{ borderRadius: form.theme.borderRadius }}
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="City"
                  value={formData[field.id]?.city || ""}
                  onChange={(e) => handleValueChange(field.id, { 
                    ...formData[field.id], 
                    city: e.target.value 
                  })}
                  style={{ borderRadius: form.theme.borderRadius }}
                />
                <Input
                  placeholder="ZIP Code"
                  value={formData[field.id]?.zip || ""}
                  onChange={(e) => handleValueChange(field.id, { 
                    ...formData[field.id], 
                    zip: e.target.value 
                  })}
                  style={{ borderRadius: form.theme.borderRadius }}
                />
              </div>
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
              className={fieldError ? "border-red-500" : ""}
              style={{ 
                borderRadius: form.theme.borderRadius,
                borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
              }}
            />
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                handleValueChange(field.id, e.target.value ? Number(e.target.value) : "")
              }
              required={field.required}
              className={fieldError ? "border-red-500" : ""}
              style={{ 
                borderRadius: form.theme.borderRadius,
                borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
              }}
            />
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value) => handleValueChange(field.id, value)}
            >
              <SelectTrigger 
                id={field.id}
                className={fieldError ? "border-red-500" : ""}
                style={{ 
                  borderRadius: form.theme.borderRadius,
                  borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
                }}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "multiselect":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <Checkbox
                    id={`${field.id}-${option}`}
                    checked={
                      Array.isArray(formData[field.id])
                        ? formData[field.id]?.includes(option)
                        : false
                    }
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(formData[field.id])
                        ? [...formData[field.id]]
                        : [];
                      const newValues = checked
                        ? [...currentValues, option]
                        : currentValues.filter((value) => value !== option);
                      handleValueChange(field.id, newValues);
                    }}
                  />
                  <Label htmlFor={`${field.id}-${option}`} style={{ color: textColor }}>
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <RadioGroup
              value={formData[field.id] || ""}
              onValueChange={(value) => handleValueChange(field.id, value)}
            >
              {field.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                  <Label htmlFor={`${field.id}-${option}`} style={{ color: textColor }}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="space-y-2">
              {field.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <Checkbox
                    id={`${field.id}-${option}`}
                    checked={
                      Array.isArray(formData[field.id])
                        ? formData[field.id]?.includes(option)
                        : false
                    }
                    onCheckedChange={(checked) => {
                      const currentValues = Array.isArray(formData[field.id])
                        ? [...formData[field.id]]
                        : [];
                      const newValues = checked
                        ? [...currentValues, option]
                        : currentValues.filter((value) => value !== option);
                      handleValueChange(field.id, newValues);
                    }}
                  />
                  <Label htmlFor={`${field.id}-${option}`} style={{ color: textColor }}>
                    {option}
                  </Label>
                </div>
              ))}
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "rating":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    formData[field.id] >= rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  onClick={() => handleValueChange(field.id, rating)}
                />
              ))}
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "file":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div className="relative">
              <Input
                id={field.id}
                type="file"
                onChange={(e) => handleValueChange(field.id, e.target.files?.[0])}
                required={field.required}
                accept={field.validation?.pattern}
                className={`${fieldError ? "border-red-500" : ""} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80`}
                style={{ 
                  borderRadius: form.theme.borderRadius,
                  borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
                }}
              />
              <Upload className="absolute right-3 top-3 h-4 w-4" style={{ color: textColor, opacity: 0.5 }} />
            </div>
            {field.validation?.max && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>
                Max file size: {field.validation.max}MB
              </p>
            )}
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
              className={fieldError ? "border-red-500" : ""}
              style={{ 
                borderRadius: form.theme.borderRadius,
                borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
              }}
            />
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id} style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="time"
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
              className={fieldError ? "border-red-500" : ""}
              style={{ 
                borderRadius: form.theme.borderRadius,
                borderColor: fieldError ? '#ef4444' : form.theme.accentColor + '40'
              }}
            />
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "heading":
        return (
          <div className="py-2">
            <h3 className="text-lg font-semibold" style={{ color: textColor }}>
              {field.label}
            </h3>
            {field.description && (
              <p className="text-sm mt-1" style={{ color: textColor, opacity: 0.8 }}>
                {field.description}
              </p>
            )}
          </div>
        );

      case "divider":
        return (
          <div className="py-2">
            <hr className="border-t" style={{ borderColor: form.theme.accentColor + '40' }} />
          </div>
        );

      case "signature":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div 
              className="border-2 border-dashed rounded h-32 flex items-center justify-center"
              style={{ 
                borderColor: form.theme.accentColor + '40',
                borderRadius: form.theme.borderRadius 
              }}
            >
              <p style={{ color: textColor, opacity: 0.7 }}>
                Signature pad (Preview mode)
              </p>
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      case "payment":
        return (
          <div className="space-y-2">
            <Label style={{ color: textColor }}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <div 
              className="border rounded p-4"
              style={{ 
                borderColor: form.theme.accentColor + '40',
                borderRadius: form.theme.borderRadius 
              }}
            >
              <p style={{ color: textColor, opacity: 0.7 }}>
                Payment integration (Preview mode)
              </p>
            </div>
            {fieldError && (
              <p className="text-red-500 text-xs">{fieldError}</p>
            )}
            {field.description && (
              <p className="text-xs" style={{ color: textColor, opacity: 0.7 }}>{field.description}</p>
            )}
          </div>
        );

      default:
        return (
          <div className="bg-muted p-4 rounded-md" style={{ borderRadius: form.theme.borderRadius }}>
            <p style={{ color: textColor }}>
              Field type "{field.type}" preview coming soon.
            </p>
          </div>
        );
    }
  };

  if (isSubmitted) {
    return (
      <Card
        style={{
          backgroundColor: getFormBackground(),
          color: getFormTextColor(),
          fontFamily: form.theme.fontFamily,
          borderRadius: form.theme.borderRadius,
        }}
      >
        <CardContent className="pt-6 px-6 flex flex-col items-center justify-center min-h-[200px]">
          <div 
            className="h-12 w-12 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: form.theme.accentColor + '20' }}
          >
            <Check className="h-6 w-6" style={{ color: form.theme.accentColor }} />
          </div>
          <h2 className="text-xl font-semibold mb-2" style={{ color: getFormTextColor() }}>
            Thank you!
          </h2>
          <p className="text-center mb-4" style={{ color: getFormTextColor(), opacity: 0.8 }}>
            {form.settings.confirmationMessage ||
              "Your response has been submitted successfully."}
          </p>
          {form.settings.redirectAfterSubmit && !isEmbedded && (
            <Button
              variant="outline"
              asChild
              className="gap-2"
              style={{
                borderColor: form.theme.accentColor,
                color: form.theme.accentColor,
              }}
            >
              <a href={form.settings.redirectAfterSubmit} target="_blank" rel="noreferrer">
                Continue <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      style={{
        backgroundColor: getFormBackground(),
        color: getFormTextColor(),
        fontFamily: form.theme.fontFamily,
        borderRadius: form.theme.borderRadius,
      }}
    >
      {!isEmbedded && (
        <div className="flex justify-end p-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 text-xs"
            onClick={copyEmbedCode}
            style={{
              borderColor: form.theme.accentColor + '40',
              color: getFormTextColor(),
            }}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy embed code"}
          </Button>
        </div>
      )}

      <CardHeader>
        {form.theme.coverImage && (
          <div className="mb-4 rounded-lg overflow-hidden -mx-6 -mt-6">
            <img
              src={form.theme.coverImage}
              alt="Form Cover"
              className="w-full h-32 object-cover"
            />
          </div>
        )}
        
        {form.theme.logo && (
          <div className="mb-4 flex justify-center">
            <img
              src={form.theme.logo}
              alt="Form Logo"
              className="h-10 object-contain"
            />
          </div>
        )}
        
        <CardTitle
          className="text-xl font-bold"
          style={{ color: getFormTextColor() }}
        >
          {form.title}
        </CardTitle>
        {form.description && (
          <p className="text-sm" style={{ color: getFormTextColor(), opacity: 0.8 }}>
            {form.description}
          </p>
        )}
        {form.settings.showProgressBar && pages > 1 && (
          <div className="mt-4 space-y-1">
            <Progress 
              value={((currentPage + 1) / pages) * 100} 
              className="h-2"
              style={{ backgroundColor: form.theme.accentColor + '20' }}
            />
            <div className="flex justify-between text-xs" style={{ color: getFormTextColor(), opacity: 0.7 }}>
              <span>
                Page {currentPage + 1} of {pages}
              </span>
              <span>
                {currentPage + 1 === pages
                  ? "Review & Submit"
                  : `${Math.min((currentPage + 1) * fieldsPerPage, form.fields.length)} of ${
                      form.fields.length
                    } questions`}
              </span>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentFields.map((field) => (
            <div key={field.id} className="space-y-4">
              {renderField(field)}
            </div>
          ))}
        </form>
      </CardContent>

      <CardFooter className="flex justify-between">
        {pages > 1 && (
          <div className="flex gap-2">
            {currentPage > 0 && (
              <Button
                variant="outline"
                onClick={prevPage}
                type="button"
                style={{
                  borderColor: form.theme.accentColor + "40",
                  color: getFormTextColor(),
                  borderRadius: form.theme.borderRadius,
                }}
              >
                Previous
              </Button>
            )}
            {currentPage < pages - 1 ? (
              <Button
                onClick={nextPage}
                type="button"
                style={{
                  backgroundColor: form.theme.accentColor,
                  color: "#fff",
                  borderRadius: form.theme.borderRadius,
                }}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                  backgroundColor: form.theme.accentColor,
                  color: "#fff",
                  borderRadius: form.theme.borderRadius,
                }}
              >
                {isSubmitting
                  ? "Submitting..."
                  : form.settings.submitButtonText || "Submit"}
              </Button>
            )}
          </div>
        )}
        {pages === 1 && (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              backgroundColor: form.theme.accentColor,
              color: "#fff",
              borderRadius: form.theme.borderRadius,
            }}
          >
            {isSubmitting
              ? "Submitting..."
              : form.settings.submitButtonText || "Submit"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormPreview;
