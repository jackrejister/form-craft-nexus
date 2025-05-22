
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { summarizeResponses } from "@/lib/api";
import { Loader2, RefreshCw } from "lucide-react";

interface ResponseSummaryProps {
  formId: string;
}

const ResponseSummary = ({ formId }: ResponseSummaryProps) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadSummary = async () => {
    try {
      setLoading(true);
      setError(null);
      const summaryText = await summarizeResponses(formId);
      setSummary(summaryText);
    } catch (err) {
      setError("Failed to generate summary. Please try again.");
      console.error("Error generating summary:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSummary();
  }, [formId]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>AI Response Summary</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={loadSummary}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-6">
            <Loader2 className="h-6 w-6 text-primary animate-spin mr-2" />
            <span>Generating AI summary...</span>
          </div>
        ) : error ? (
          <div className="text-destructive p-4">{error}</div>
        ) : (
          <div className="prose max-w-none">
            <p>{summary}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseSummary;
