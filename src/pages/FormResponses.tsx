
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { fetchForm, fetchFormResponses } from "@/lib/api";
import { Form, FormResponse } from "@/types/form";
import { toast } from "@/components/ui/use-toast";
import { ArrowLeft } from "lucide-react";
import ResponseTable from "@/components/forms/FormResponseViewer/ResponseTable";
import ResponseSummary from "@/components/forms/FormResponseViewer/ResponseSummary";

const FormResponses = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<FormResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadForm = async () => {
    if (!formId) return;

    try {
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
    }
  };

  const loadResponses = async () => {
    if (!formId) return;

    try {
      setIsLoading(true);
      const fetchedResponses = await fetchFormResponses(formId);
      setResponses(fetchedResponses);
    } catch (error) {
      console.error("Error loading responses:", error);
      toast({
        title: "Error",
        description: "Failed to load responses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadForm();
    loadResponses();
  }, [formId]);

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  const formFields = form.fields
    .filter((field) => field.type !== "divider" && field.type !== "heading")
    .map((field) => ({
      id: field.id,
      label: field.label,
    }));

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button
            variant="ghost"
            className="pl-0 mb-2"
            onClick={() => navigate(`/forms/${formId}/edit`)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Form
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{form.title} - Responses</h1>
          <p className="text-muted-foreground">
            View and manage form submissions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Export started",
                description: "Your responses are being prepared for download.",
              });
            }}
          >
            Export All Responses
          </Button>
        </div>
      </div>

      <ResponseSummary formId={formId} />

      <ResponseTable
        responses={
          // Mock some responses for demonstration purposes
          responses.length > 0
            ? responses
            : [
                {
                  id: "1",
                  formId: formId || "",
                  data: {
                    name: "John Doe",
                    email: "john@example.com",
                    feedback: "Great product! Would recommend to others.",
                  },
                  submittedAt: new Date().toISOString(),
                },
                {
                  id: "2",
                  formId: formId || "",
                  data: {
                    name: "Jane Smith",
                    email: "jane@example.com",
                    feedback: "The service was excellent but the website could be improved.",
                  },
                  submittedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
                },
              ]
        }
        fields={formFields}
        onRefresh={loadResponses}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FormResponses;
