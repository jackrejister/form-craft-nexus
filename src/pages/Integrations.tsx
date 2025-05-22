
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { INTEGRATION_TYPES } from "@/lib/constants";
import { toast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

const Integrations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredIntegrations = INTEGRATION_TYPES.filter(integration => 
    integration.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleConnect = (integrationType: string) => {
    toast({
      title: "Integration Setup",
      description: `Setup process started for ${
        INTEGRATION_TYPES.find(i => i.value === integrationType)?.label
      } integration.`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your forms with other services and platforms
        </p>
      </div>
      
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <Card key={integration.value} className="hover-scale">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="text-3xl">{integration.icon}</div>
                <CardTitle>{integration.label}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-6 min-h-[60px]">
                {getIntegrationDescription(integration.value)}
              </CardDescription>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleConnect(integration.value)}
              >
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
        
        {filteredIntegrations.length === 0 && (
          <div className="col-span-full text-center p-12 border border-dashed rounded-lg">
            <h3 className="text-lg font-medium mb-1">No integrations found</h3>
            <p className="text-muted-foreground mb-0">
              No integrations match your search query "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function getIntegrationDescription(type: string): string {
  switch (type) {
    case "sheets":
      return "Send form responses directly to Google Sheets to organize and analyze data";
    case "notion":
      return "Create new pages or update databases in Notion with form submission data";
    case "airtable":
      return "Automatically add new records to your Airtable bases from form submissions";
    case "webhook":
      return "Send form data to any custom endpoint to integrate with your own systems";
    case "slack":
      return "Get notified in Slack channels when someone submits your form";
    case "zapier":
      return "Connect to thousands of apps through Zapier's automation platform";
    case "make":
      return "Create complex workflows with Make (Integromat) using your form data";
    case "googleAnalytics":
      return "Track form submissions as events in Google Analytics";
    case "metaPixel":
      return "Track conversions and create audiences in Meta Ads Manager";
    case "coda":
      return "Add form submissions to Coda docs as new rows in tables";
    case "pipedream":
      return "Use Pipedream to build event-driven workflows when forms are submitted";
    case "excel":
      return "Export form responses directly to Microsoft Excel spreadsheets";
    default:
      return "Connect your forms with other services to automate your workflow";
  }
}

export default Integrations;
