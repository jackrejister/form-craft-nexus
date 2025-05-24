
import { FormIntegration, FormResponse } from "@/types/form";

export interface IntegrationSubmissionData {
  formTitle: string;
  fields: Array<{
    id: string;
    label: string;
    type: string;
    value: any;
  }>;
  submittedAt: string;
  metadata?: {
    userAgent?: string;
    ip?: string;
    referrer?: string;
  };
}

export class IntegrationService {
  static async executeIntegrations(
    integrations: FormIntegration[],
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    const activeIntegrations = integrations.filter(i => i.enabled);
    
    const promises = activeIntegrations.map(integration => 
      this.executeIntegration(integration, submissionData)
    );

    await Promise.allSettled(promises);
  }

  private static async executeIntegration(
    integration: FormIntegration,
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    console.log(`Executing ${integration.type} integration:`, integration.name);

    try {
      switch (integration.type) {
        case 'sheets':
          await this.executeGoogleSheetsIntegration(integration, submissionData);
          break;
        case 'webhook':
          await this.executeWebhookIntegration(integration, submissionData);
          break;
        case 'slack':
          await this.executeSlackIntegration(integration, submissionData);
          break;
        case 'zapier':
          await this.executeZapierIntegration(integration, submissionData);
          break;
        default:
          console.warn(`Integration type ${integration.type} not implemented yet`);
      }
    } catch (error) {
      console.error(`Failed to execute ${integration.type} integration:`, error);
      throw error;
    }
  }

  private static async executeGoogleSheetsIntegration(
    integration: FormIntegration,
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    const { spreadsheetId, sheetId } = integration.config;
    
    if (!spreadsheetId) {
      throw new Error('Google Sheets integration missing spreadsheet ID');
    }

    // Prepare row data
    const rowData = [
      submissionData.submittedAt,
      submissionData.formTitle,
      ...submissionData.fields.map(field => {
        if (Array.isArray(field.value)) {
          return field.value.join(', ');
        }
        return field.value || '';
      })
    ];

    // For demo purposes, we'll use Google Sheets API v4
    // In a real implementation, you'd need to set up OAuth2 or service account
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetId || 'Sheet1'}:append`;
    
    const payload = {
      range: `${sheetId || 'Sheet1'}`,
      majorDimension: 'ROWS',
      values: [rowData]
    };

    // This is a mock implementation - in production you'd need proper authentication
    console.log('Would send to Google Sheets:', {
      url: sheetsUrl,
      payload,
      headers: ['Timestamp', 'Form Title', ...submissionData.fields.map(f => f.label)]
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  private static async executeWebhookIntegration(
    integration: FormIntegration,
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    const { url, method = 'POST' } = integration.config;
    
    if (!url) {
      throw new Error('Webhook integration missing URL');
    }

    const response = await fetch(url, {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        integration: integration.name,
        form: submissionData.formTitle,
        submission: {
          timestamp: submissionData.submittedAt,
          data: submissionData.fields.reduce((acc, field) => {
            acc[field.label] = field.value;
            return acc;
          }, {} as Record<string, any>)
        },
        metadata: submissionData.metadata
      })
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status: ${response.status}`);
    }
  }

  private static async executeSlackIntegration(
    integration: FormIntegration,
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    const { webhookUrl } = integration.config;
    
    if (!webhookUrl) {
      throw new Error('Slack integration missing webhook URL');
    }

    const fieldsList = submissionData.fields
      .map(field => `*${field.label}:* ${field.value}`)
      .join('\n');

    const message = {
      text: `New form submission: ${submissionData.formTitle}`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `🆕 *New form submission*\n\n*Form:* ${submissionData.formTitle}\n*Submitted:* ${new Date(submissionData.submittedAt).toLocaleString()}`
          }
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Responses:*\n${fieldsList}`
          }
        }
      ]
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      throw new Error(`Slack webhook failed with status: ${response.status}`);
    }
  }

  private static async executeZapierIntegration(
    integration: FormIntegration,
    submissionData: IntegrationSubmissionData
  ): Promise<void> {
    const { webhookUrl } = integration.config;
    
    if (!webhookUrl) {
      throw new Error('Zapier integration missing webhook URL');
    }

    const zapierData = {
      form_title: submissionData.formTitle,
      submitted_at: submissionData.submittedAt,
      fields: submissionData.fields.reduce((acc, field) => {
        acc[field.label.toLowerCase().replace(/\s+/g, '_')] = field.value;
        return acc;
      }, {} as Record<string, any>),
      metadata: submissionData.metadata
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zapierData)
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook failed with status: ${response.status}`);
    }
  }
}
