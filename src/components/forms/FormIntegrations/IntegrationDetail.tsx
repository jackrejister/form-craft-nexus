import { useState } from "react";
import { FormIntegration } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { INTEGRATION_TYPES } from "@/lib/constants";
import IntegrationTester from "./IntegrationTester";

interface IntegrationDetailProps {
  integration: FormIntegration;
  onSave: (integration: FormIntegration) => void;
  onCancel: () => void;
}

const IntegrationDetail = ({
  integration,
  onSave,
  onCancel,
}: IntegrationDetailProps) => {
  const [editedIntegration, setEditedIntegration] = useState<FormIntegration>({
    ...integration,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedIntegration({
      ...editedIntegration,
      name: e.target.value,
    });
  };

  const handleConfigChange = (key: string, value: any) => {
    setEditedIntegration({
      ...editedIntegration,
      config: {
        ...editedIntegration.config,
        [key]: value,
      },
    });
  };

  const handleSave = () => {
    onSave(editedIntegration);
  };

  const getIntegrationIcon = () => {
    const integrationType = INTEGRATION_TYPES.find(
      (i) => i.value === integration.type
    );
    return integrationType ? integrationType.icon : "🔌";
  };

  const getIntegrationLabel = () => {
    const integrationType = INTEGRATION_TYPES.find(
      (i) => i.value === integration.type
    );
    return integrationType ? integrationType.label : integration.type;
  };

  const renderConfigFields = () => {
    const { type, config } = editedIntegration;

    switch (type) {
      case "webhook":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="webhook-url">Webhook URL</Label>
              <Input
                id="webhook-url"
                value={config.url || ""}
                onChange={(e) => handleConfigChange("url", e.target.value)}
                placeholder="https://example.com/webhook"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhook-method">Method</Label>
              <Input
                id="webhook-method"
                value={config.method || "POST"}
                onChange={(e) => handleConfigChange("method", e.target.value)}
                placeholder="POST"
              />
            </div>
          </>
        );

      case "sheets":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="sheets-id">Spreadsheet ID</Label>
              <Input
                id="sheets-id"
                value={config.spreadsheetId || ""}
                onChange={(e) =>
                  handleConfigChange("spreadsheetId", e.target.value)
                }
                placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
              />
              <p className="text-xs text-muted-foreground">
                Copy the ID from your Google Sheet URL between /d/ and /edit
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sheets-tab">Sheet Name or ID</Label>
              <Input
                id="sheets-tab"
                value={config.sheetId || ""}
                onChange={(e) => handleConfigChange("sheetId", e.target.value)}
                placeholder="Sheet1"
              />
              <p className="text-xs text-muted-foreground">
                The name of the sheet tab (default: Sheet1)
              </p>
            </div>
          </>
        );

      case "slack":
        return (
          <div className="space-y-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              value={config.webhookUrl || ""}
              onChange={(e) =>
                handleConfigChange("webhookUrl", e.target.value)
              }
              placeholder="https://hooks.slack.com/services/..."
            />
            <p className="text-xs text-muted-foreground">
              Create an incoming webhook in your Slack workspace
            </p>
          </div>
        );

      case "zapier":
        return (
          <div className="space-y-2">
            <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
            <Input
              id="zapier-webhook"
              value={config.webhookUrl || ""}
              onChange={(e) =>
                handleConfigChange("webhookUrl", e.target.value)
              }
              placeholder="https://hooks.zapier.com/..."
            />
            <p className="text-xs text-muted-foreground">
              Create a Webhook trigger in your Zapier workflow
            </p>
          </div>
        );

      default:
        return (
          <div className="text-muted-foreground py-2">
            No configuration options available for this integration type.
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onCancel} className="pl-0">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to integrations
      </Button>

      <div>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <span>{getIntegrationIcon()}</span>
          <span>Edit {getIntegrationLabel()} Integration</span>
        </h2>
        <p className="text-muted-foreground mt-1">
          Configure how your form connects with {getIntegrationLabel()}
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="integration-name">Integration Name</Label>
          <Input
            id="integration-name"
            value={editedIntegration.name}
            onChange={handleNameChange}
          />
        </div>

        {renderConfigFields()}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      {integration.id && <IntegrationTester integration={editedIntegration} />}
    </div>
  );
};

export default IntegrationDetail;
