
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input"; // Added missing import
import FormBuilder from "@/components/forms/FormBuilder/FormBuilder";
import FormPreview from "@/components/forms/FormPreview";
import IntegrationsList from "@/components/forms/FormIntegrations/IntegrationsList";
import { fetchForm, updateForm } from "@/lib/api";
import { Form } from "@/types/form";
import { toast } from "@/components/ui/use-toast";
import { BarChart2, FileText, Link, Settings, Eye } from "lucide-react";

const FormEdit = () => {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState<Form | null>(null);
  const [currentTab, setCurrentTab] = useState("build");
  const [isSaving, setIsSaving] = useState(false);
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

  const handleSaveForm = async (formData: Partial<Form>) => {
    if (!formId) return;

    try {
      setIsSaving(true);
      await updateForm(formId, formData);
      setForm((prev) => ({
        ...(prev as Form),
        ...formData,
        updatedAt: new Date().toISOString(),
      }));
      toast({
        title: "Success",
        description: "Form saved successfully!",
      });
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error",
        description: "Failed to save the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveIntegrations = async (integrations: any) => {
    if (!formId || !form) return;

    try {
      setIsSaving(true);
      await updateForm(formId, { integrations });
      setForm((prev) => ({
        ...(prev as Form),
        integrations,
        updatedAt: new Date().toISOString(),
      }));
      toast({
        title: "Success",
        description: "Integrations saved successfully!",
      });
    } catch (error) {
      console.error("Error saving integrations:", error);
      toast({
        title: "Error",
        description: "Failed to save integrations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-center">
          <p className="text-muted-foreground">Loading form...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">Form not found</h2>
          <p className="text-muted-foreground mb-4">
            The form you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => navigate("/forms")}>Go to Forms</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      <Tabs value={currentTab} onValueChange={setCurrentTab}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{form.title}</h1>
            <p className="text-muted-foreground">
              {form.description || "No description"}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/forms/${formId}/responses`)}
            >
              View Responses
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open(`/forms/${formId}/preview`, "_blank")}
            >
              Preview
            </Button>
            <Button onClick={() => handleSaveForm(form)}>Save Form</Button>
          </div>
        </div>

        <TabsList className="mt-6 w-full justify-start">
          <TabsTrigger value="build" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" /> Build
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex gap-2 items-center">
            <Eye className="h-4 w-4" /> Preview
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex gap-2 items-center">
            <Link className="h-4 w-4" /> Integrations
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2 items-center">
            <Settings className="h-4 w-4" /> Settings
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex gap-2 items-center">
            <BarChart2 className="h-4 w-4" /> Analytics
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="build">
            <FormBuilder
              initialForm={form}
              onSave={handleSaveForm}
              isSaving={isSaving}
            />
          </TabsContent>
          
          <TabsContent value="preview">
            <div className="max-w-3xl mx-auto">
              <FormPreview form={form} />
            </div>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>
                  Connect your form with other services to automatically send responses or trigger actions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IntegrationsList
                  formId={formId}
                  integrations={form.integrations || []}
                  onSave={handleSaveIntegrations}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Configure advanced settings for your form
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Sharing & Embedding</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Form URL</h4>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={`${window.location.origin}/forms/${formId}/preview`}
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Embed Code</h4>
                      <div className="flex gap-2">
                        <Input
                          readOnly
                          value={`<iframe src="${window.location.origin}/embed/${formId}" width="100%" height="500" style="border:none;"></iframe>`}
                        />
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Form Access</h3>
                  <Separator className="mb-4" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Privacy</h4>
                      <p className="text-muted-foreground">
                        Your form is currently public and can be accessed by anyone with the link
                      </p>
                      <Button variant="outline" className="mt-2">
                        Change Privacy
                      </Button>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Password Protection</h4>
                      <p className="text-muted-foreground">
                        Add a password to restrict access to your form
                      </p>
                      <Button variant="outline" className="mt-2">
                        Set Password
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Danger Zone</h3>
                  <Separator className="mb-4" />
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 border border-destructive/20 rounded-md bg-destructive/5">
                      <div>
                        <h4 className="font-medium">Delete Form</h4>
                        <p className="text-muted-foreground">
                          Permanently delete this form and all its responses
                        </p>
                      </div>
                      <Button variant="destructive">Delete Form</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View detailed analytics about your form performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12">
                  <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Advanced analytics features are under development and will be available soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default FormEdit;
