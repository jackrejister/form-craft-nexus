
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
import { Check, Copy, ExternalLink } from "lucide-react";

interface FormPreviewProps {
  form: Form;
  onSubmit?: (data: any) => Promise<void>;
  isEmbedded?: boolean;
}

const FormPreview = ({ form, onSubmit, isEmbedded = false }: FormPreviewProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFieldsMissing = form.fields.some(
      (field) => field.required && !formData[field.id]
    );
    
    if (requiredFieldsMissing) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
    if (currentPage < pages - 1) {
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

  const renderField = (field: FormField) => {
    // Check conditional logic
    if (
      field.conditional &&
      formData[field.conditional.field] !== field.conditional.value
    ) {
      return null;
    }

    switch (field.type) {
      case "text":
      case "email":
      case "phone":
      case "url":
      case "name":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type={field.type === "email" ? "email" : "text"}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "textarea":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "number":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="number"
              placeholder={field.placeholder}
              value={formData[field.id] || ""}
              onChange={(e) =>
                handleValueChange(field.id, e.target.valueAsNumber)
              }
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "select":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Select
              value={formData[field.id] || ""}
              onValueChange={(value) => handleValueChange(field.id, value)}
            >
              <SelectTrigger id={field.id}>
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
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "radio":
        return (
          <div className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <RadioGroup
              value={formData[field.id] || ""}
              onValueChange={(value) => handleValueChange(field.id, value)}
            >
              {field.options?.map((option) => (
                <div className="flex items-center space-x-2" key={option}>
                  <RadioGroupItem value={option} id={`${field.id}-${option}`} />
                  <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            <Label>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
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
                  <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "date":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="date"
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <Label htmlFor={field.id}>
              {field.label}
              {field.required && <span className="text-destructive ml-1">*</span>}
            </Label>
            <Input
              id={field.id}
              type="time"
              value={formData[field.id] || ""}
              onChange={(e) => handleValueChange(field.id, e.target.value)}
              required={field.required}
            />
            {field.description && (
              <p className="text-xs text-muted-foreground">{field.description}</p>
            )}
          </div>
        );

      case "heading":
        return (
          <div>
            <h3 className="text-lg font-semibold">{field.label}</h3>
            {field.description && <p className="text-sm">{field.description}</p>}
          </div>
        );

      case "divider":
        return <hr className="my-4" />;

      default:
        return (
          <div className="bg-muted p-4 rounded-md">
            <p>
              Field type "{field.type}" not implemented in preview mode yet.
            </p>
          </div>
        );
    }
  };

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 px-6 flex flex-col items-center justify-center min-h-[200px]">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Thank you!</h2>
          <p className="text-center text-muted-foreground mb-4">
            {form.settings.confirmationMessage ||
              "Your response has been submitted successfully."}
          </p>
          {form.settings.redirectAfterSubmit && !isEmbedded && (
            <Button
              variant="outline"
              asChild
              className="gap-2"
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
        backgroundColor: form.theme.backgroundColor,
        color: form.theme.textColor,
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
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            {copied ? "Copied!" : "Copy embed code"}
          </Button>
        </div>
      )}

      <CardHeader>
        {form.theme.logo && (
          <img
            src={form.theme.logo}
            alt="Form Logo"
            className="h-10 object-contain mb-4"
          />
        )}
        <CardTitle
          className="text-xl font-bold"
          style={{ color: form.theme.textColor }}
        >
          {form.title}
        </CardTitle>
        {form.description && (
          <p className="text-sm" style={{ color: form.theme.textColor }}>
            {form.description}
          </p>
        )}
        {form.settings.showProgressBar && pages > 1 && (
          <div className="mt-4 space-y-1">
            <Progress value={((currentPage + 1) / pages) * 100} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
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
                  color: form.theme.textColor,
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
