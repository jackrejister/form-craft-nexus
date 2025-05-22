
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import { createForm } from "@/lib/api";
import { DEFAULT_THEME } from "@/lib/constants";
import { Form } from "@/types/form";
import { toast } from "@/components/ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const FormCreate = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const templateData = location.state?.template;
  
  // Initialize form data with template if available
  const getInitialFormData = () => {
    if (templateData) {
      // Process template fields to ensure they have proper IDs
      const fields = Array.isArray(templateData.fields) 
        ? templateData.fields.map(field => ({
            ...field,
            id: field.id || uuidv4() // Ensure each field has a unique ID
          }))
        : [];
      
      return {
        title: templateData.title || "Untitled Form",
        description: templateData.description || "",
        fields: fields,
        theme: DEFAULT_THEME,
        settings: {
          savePartialResponses: true,
          allowMultipleSubmissions: true,
          enableCaptcha: false,
          showProgressBar: true,
          submitButtonText: "Submit",
        },
        integrations: [],
      };
    }

    return {
      title: "Untitled Form",
      description: "",
      fields: [],
      theme: DEFAULT_THEME,
      settings: {
        savePartialResponses: true,
        allowMultipleSubmissions: true,
        enableCaptcha: false,
        showProgressBar: true,
        submitButtonText: "Submit",
      },
      integrations: [],
    };
  };

  const handleSaveForm = async (formData: Partial<Form>) => {
    try {
      setIsSaving(true);
      console.log("Saving form data:", formData);
      
      // Make sure all fields have valid IDs
      if (formData.fields) {
        formData.fields = formData.fields.map(field => ({
          ...field,
          id: field.id || uuidv4()
        }));
      }
      
      const savedForm = await createForm(formData);
      toast({
        title: "Success",
        description: "Form created successfully!",
      });
      navigate(`/forms/${savedForm.id}/edit`);
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: "Failed to create the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <FormBuilder
        initialForm={getInitialFormData()}
        onSave={handleSaveForm}
        isSaving={isSaving}
      />
    </div>
  );
};

export default FormCreate;
