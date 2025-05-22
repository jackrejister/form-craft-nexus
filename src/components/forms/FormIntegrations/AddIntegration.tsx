
import { useState } from "react";
import { IntegrationType } from "@/types/form";
import { INTEGRATION_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Search } from "lucide-react";

interface AddIntegrationProps {
  onSave: (
    type: IntegrationType,
    name: string,
    config: Record<string, any>
  ) => void;
  onCancel: () => void;
}

const AddIntegration = ({ onSave, onCancel }: AddIntegrationProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<IntegrationType | null>(null);
  const [name, setName] = useState("");
  const [config, setConfig] = useState<Record<string, any>>({});

  const filteredIntegrations = INTEGRATION_TYPES.filter((integration) =>
    integration.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!selectedType || !name) return;
    
    let finalConfig = { ...config };
    
    // Ensure required fields for specific integration types
    switch (selectedType) {
      case "webhook":
        finalConfig = { 
          ...finalConfig, 
          url: finalConfig.url || "",
          method: finalConfig.method || "POST",
        };
        break;
      case "sheets":
        finalConfig = { 
          ...finalConfig, 
          spreadsheetId: finalConfig.spreadsheetId || "",
          sheetId: finalConfig.sheetId || "0",
        };
        break;
      case "slack":
        finalConfig = { 
          ...finalConfig, 
          webhookUrl: finalConfig.webhookUrl || "",
        };
        break;
      // Add cases for other integration types as needed
    }
    
    onSave(selectedType, name, finalConfig);
  };

  const renderIntegrationConfig = () => {
    if (!selectedType) return null;

    return (
      <div className="space-y-4">
        <Button variant="ghost" onClick={() => setSelectedType(null)} className="pl-0">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to integrations
        </Button>

        <h2 className="text-xl font-semibold">
          {INTEGRATION_TYPES.find((i) => i.value === selectedType)?.icon}{" "}
          {INTEGRATION_TYPES.find((i) => i.value === selectedType)?.label}
        </h2>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="integration-name">Integration Name</Label>
            <Input
              id="integration-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`My ${
                INTEGRATION_TYPES.find((i) => i.value === selectedType)?.label
              }`}
            />
          </div>

          {selectedType === "webhook" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  value={config.url || ""}
                  onChange={(e) =>
                    setConfig({ ...config, url: e.target.value })
                  }
                  placeholder="https://example.com/webhook"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-method">Method</Label>
                <Input
                  id="webhook-method"
                  value={config.method || "POST"}
                  onChange={(e) =>
                    setConfig({ ...config, method: e.target.value })
                  }
                  placeholder="POST"
                />
              </div>
            </>
          )}

          {selectedType === "sheets" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="sheets-id">Spreadsheet ID</Label>
                <Input
                  id="sheets-id"
                  value={config.spreadsheetId || ""}
                  onChange={(e) =>
                    setConfig({ ...config, spreadsheetId: e.target.value })
                  }
                  placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                />
                <p className="text-xs text-muted-foreground">
                  The ID of your Google Sheet from the URL
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sheets-tab">Sheet Name or ID</Label>
                <Input
                  id="sheets-tab"
                  value={config.sheetId || ""}
                  onChange={(e) =>
                    setConfig({ ...config, sheetId: e.target.value })
                  }
                  placeholder="Sheet1"
                />
              </div>
            </>
          )}

          {selectedType === "slack" && (
            <div className="space-y-2">
              <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
              <Input
                id="slack-webhook"
                value={config.webhookUrl || ""}
                onChange={(e) =>
                  setConfig({ ...config, webhookUrl: e.target.value })
                }
                placeholder="https://hooks.slack.com/services/..."
              />
            </div>
          )}

          {selectedType === "zapier" && (
            <div className="space-y-2">
              <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
              <Input
                id="zapier-webhook"
                value={config.webhookUrl || ""}
                onChange={(e) =>
                  setConfig({ ...config, webhookUrl: e.target.value })
                }
                placeholder="https://hooks.zapier.com/..."
              />
            </div>
          )}

          {/* Add configuration fields for other integration types as needed */}

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={!name}>
              Save Integration
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderIntegrationsList = () => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={onCancel} className="pl-0">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold">Add Integration</h2>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {filteredIntegrations.map((integration) => (
            <Card
              key={integration.value}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setSelectedType(integration.value as IntegrationType)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="text-2xl">{integration.icon}</div>
                <div className="flex-1">
                  <div className="font-medium">{integration.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredIntegrations.length === 0 && (
            <div className="col-span-2 text-center p-6 text-muted-foreground">
              No integrations found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {selectedType ? renderIntegrationConfig() : renderIntegrationsList()}
    </div>
  );
};

export default AddIntegration;
