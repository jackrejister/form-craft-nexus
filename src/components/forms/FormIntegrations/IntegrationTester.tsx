
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormIntegration } from "@/types/form";
import { IntegrationService } from "@/services/integrationService";
import { toast } from "@/components/ui/use-toast";
import { Play, CheckCircle, XCircle } from "lucide-react";

interface IntegrationTesterProps {
  integration: FormIntegration;
}

const IntegrationTester = ({ integration }: IntegrationTesterProps) => {
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleTest = async () => {
    setIsTesting(true);
    setTestResult(null);

    // Create test data
    const testData = {
      formTitle: "Test Form",
      fields: [
        { id: "1", label: "Name", type: "text", value: "John Doe" },
        { id: "2", label: "Email", type: "email", value: "john@example.com" },
        { id: "3", label: "Message", type: "textarea", value: "This is a test submission" },
      ],
      submittedAt: new Date().toISOString(),
      metadata: {
        userAgent: navigator.userAgent,
        referrer: "test"
      }
    };

    try {
      await IntegrationService.executeIntegrations([integration], testData);
      setTestResult('success');
      toast({
        title: "Test Successful",
        description: `${integration.name} integration is working correctly.`,
      });
    } catch (error) {
      setTestResult('error');
      toast({
        title: "Test Failed",
        description: `${integration.name} integration test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const getTestResultIcon = () => {
    if (testResult === 'success') {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (testResult === 'error') {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Test Integration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Send a test submission to verify the integration is working
          </p>
          <div className="flex items-center gap-2">
            {getTestResultIcon()}
            <Button
              size="sm"
              onClick={handleTest}
              disabled={isTesting}
              variant="outline"
            >
              {isTesting ? (
                "Testing..."
              ) : (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Test
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationTester;
