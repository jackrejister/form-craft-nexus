
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchForm, submitFormResponse } from "@/lib/api";
import { Form } from "@/types/form";
import FormPreview from "@/components/forms/FormPreview";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";

const FormPreviewPage = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadForm = async () => {
    if (!formId) return;

    try {
      setIsLoading(true);
      const fetchedForm = await fetchForm(formId);
      
      if (!fetchedForm) {
        toast({
          title: "Error",
          description: "Form not found",
          variant: "destructive",
        });
        navigate("/forms");
        return;
      }
      
      setForm(fetchedForm);
    } catch (error) {
      console.error("Error loading form:", error);
      toast({
        title: "Error",
        description: "Failed to load the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForm();
  }, [formId]);

  const handleSubmit = async (data: Record<string, any>) => {
    if (!formId) return;
    
    await submitFormResponse(formId, data);
  };

  if (isLoading || !form) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-6">
      <Button
        variant="ghost"
        className="pl-0"
        onClick={() => navigate(`/forms/${formId}/edit`)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Editor
      </Button>
      
      <div className="bg-gray-50 p-6 rounded-lg border space-y-6">
        <FormPreview form={form} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default FormPreviewPage;
