
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FormIntegration, IntegrationType } from "@/types/form";
import { INTEGRATION_TYPES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Settings, Trash } from "lucide-react";
import IntegrationDetail from "./IntegrationDetail";
import AddIntegration from "./AddIntegration";

interface IntegrationsListProps {
  formId: string;
  integrations: FormIntegration[];
  onSave: (integrations: FormIntegration[]) => void;
}

const IntegrationsList = ({
  formId,
  integrations,
  onSave,
}: IntegrationsListProps) => {
  const [isAddingIntegration, setIsAddingIntegration] = useState(false);
  const [editingIntegration, setEditingIntegration] =
    useState<FormIntegration | null>(null);

  const handleToggleIntegration = (id: string, enabled: boolean) => {
    const updatedIntegrations = integrations.map((integration) =>
      integration.id === id ? { ...integration, enabled } : integration
    );
    onSave(updatedIntegrations);
  };

  const handleSaveIntegration = (integration: FormIntegration) => {
    const existingIndex = integrations.findIndex((i) => i.id === integration.id);
    let updatedIntegrations;
    
    if (existingIndex >= 0) {
      updatedIntegrations = [...integrations];
      updatedIntegrations[existingIndex] = integration;
    } else {
      updatedIntegrations = [...integrations, integration];
    }
    
    onSave(updatedIntegrations);
    setEditingIntegration(null);
  };

  const handleDeleteIntegration = (id: string) => {
    const updatedIntegrations = integrations.filter((i) => i.id !== id);
    onSave(updatedIntegrations);
  };

  const handleAddIntegration = (
    type: IntegrationType,
    name: string,
    config: Record<string, any>
  ) => {
    const newIntegration: FormIntegration = {
      id: Date.now().toString(),
      type,
      name,
      enabled: true,
      config,
    };
    onSave([...integrations, newIntegration]);
    setIsAddingIntegration(false);
  };

  const getIntegrationIcon = (type: string) => {
    const integration = INTEGRATION_TYPES.find((i) => i.value === type);
    return integration ? integration.icon : "🔌";
  };

  if (isAddingIntegration) {
    return (
      <AddIntegration
        onSave={handleAddIntegration}
        onCancel={() => setIsAddingIntegration(false)}
      />
    );
  }

  if (editingIntegration) {
    return (
      <IntegrationDetail
        integration={editingIntegration}
        onSave={handleSaveIntegration}
        onCancel={() => setEditingIntegration(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium">Integrations</h2>
        <Button onClick={() => setIsAddingIntegration(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <div className="space-y-3">
        {integrations.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                No integrations configured. Add an integration to connect this
                form with other services.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setIsAddingIntegration(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Integration
              </Button>
            </CardContent>
          </Card>
        ) : (
          integrations.map((integration) => (
            <Card key={integration.id} className="overflow-hidden">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl">
                    {getIntegrationIcon(integration.type)}
                  </div>
                  <div>
                    <div className="font-medium">{integration.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <span>
                        {
                          INTEGRATION_TYPES.find(
                            (i) => i.value === integration.type
                          )?.label
                        }
                      </span>
                      <Badge
                        variant={integration.enabled ? "default" : "outline"}
                        className="text-[10px] h-5"
                      >
                        {integration.enabled ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={integration.enabled}
                    onCheckedChange={(checked) =>
                      handleToggleIntegration(integration.id, checked)
                    }
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingIntegration(integration)}
                  >
                    <Settings className="h-4 w-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteIntegration(integration.id)}
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default IntegrationsList;
