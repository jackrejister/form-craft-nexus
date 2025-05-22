
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import { createForm } from "@/lib/api";
import { DEFAULT_THEME } from "@/lib/constants";
import { Form } from "@/types/form";
import { toast } from "@/components/ui/use-toast";

const FormCreate = () => {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleSaveForm = async (formData: Partial<Form>) => {
    try {
      setIsSaving(true);
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

  const initialFormData: Partial<Form> = {
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

  return (
    <div className="space-y-8 animate-fade-in">
      <FormBuilder
        initialForm={initialFormData}
        onSave={handleSaveForm}
        isSaving={isSaving}
      />
    </div>
  );
};

export default FormCreate;
