
# Integration Guide

Complete guide for setting up and managing integrations with external services.

## Overview

The Form Builder supports multiple integrations to automatically send form submissions to external services. This eliminates the need for manual data transfer and enables real-time workflow automation.

## Available Integrations

### Google Sheets
Send form responses directly to a Google Sheets spreadsheet.

### Webhooks
Send data to any custom API endpoint.

### Slack
Post notifications to Slack channels when forms are submitted.

### Zapier
Trigger Zapier workflows with form submissions.

### Notion
Save responses to Notion databases.

### Other Services
- Airtable
- Microsoft Excel
- Coda
- Pipedream
- Google Analytics
- Meta Pixel

## Setting Up Integrations

### Google Sheets Integration

#### Step 1: Prepare Your Spreadsheet

1. Create a new Google Sheets spreadsheet
2. Add column headers that match your form fields
3. Note the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
   ```

#### Step 2: Configure Integration

1. Go to your form's Integrations tab
2. Click "Add Integration" → "Google Sheets"
3. Enter the following:
   - **Name**: Descriptive name for this integration
   - **Spreadsheet ID**: The ID from your Google Sheets URL
   - **Sheet Name**: Name of the specific sheet tab (default: "Sheet1")

#### Step 3: Map Fields

The integration automatically maps form fields to spreadsheet columns based on field labels. Ensure your spreadsheet headers match your form field labels.

#### Step 4: Test Integration

1. Click "Test Integration" to verify the connection
2. Check your spreadsheet for a test row
3. Enable the integration when ready

### Webhook Integration

#### Step 1: Prepare Your Endpoint

Create an API endpoint that can receive POST requests with JSON data:

```javascript
// Example Node.js endpoint
app.post('/webhook', (req, res) => {
  const formData = req.body;
  console.log('Received form submission:', formData);
  
  // Process the data
  // Save to database, send emails, etc.
  
  res.status(200).json({ success: true });
});
```

#### Step 2: Configure Webhook

1. Go to Integrations tab
2. Add "Webhook" integration
3. Configure:
   - **Name**: Description of this webhook
   - **URL**: Your endpoint URL
   - **Method**: POST (recommended)
   - **Headers**: Any required headers (optional)

#### Step 3: Data Format

Form submissions are sent as JSON:

```json
{
  "formId": "form-123",
  "submissionId": "sub-456",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello world!"
  }
}
```

#### Step 4: Test Webhook

Use the test feature to verify your endpoint receives data correctly.

### Slack Integration

#### Step 1: Create Slack Webhook

1. Go to your Slack workspace
2. Navigate to Apps → Incoming Webhooks
3. Create a new webhook for your desired channel
4. Copy the webhook URL

#### Step 2: Configure Integration

1. Add "Slack" integration
2. Enter:
   - **Name**: Integration description
   - **Webhook URL**: The URL from Slack
   - **Channel**: Target channel (optional override)

#### Step 3: Customize Message Format

The default message includes all form fields. You can customize the notification format in the integration settings.

#### Step 4: Test Integration

Send a test notification to verify the setup works correctly.

## Advanced Configuration

### Field Mapping

For services like Google Sheets and Notion, you can customize how form fields map to destination columns:

```typescript
const fieldMapping = {
  "field-id-1": "Column A",
  "field-id-2": "Column B",
  "field-id-3": "Custom Column Name"
};
```

### Conditional Integrations

Set up integrations that only trigger based on form responses:

1. Enable conditional logic in integration settings
2. Specify the condition (field equals value, contains text, etc.)
3. Integration only runs when condition is met

### Multiple Integrations

You can enable multiple integrations simultaneously:

- Send to Google Sheets for storage
- Notify via Slack for awareness
- Trigger Zapier for complex workflows
- Send webhook for custom processing

## Troubleshooting

### Common Issues

#### Google Sheets Errors

**Problem**: "Spreadsheet not found"
- **Solution**: Verify the spreadsheet ID and ensure it's publicly accessible or properly shared

**Problem**: "Permission denied"
- **Solution**: Make sure the spreadsheet is shared with appropriate permissions

#### Webhook Errors

**Problem**: "Connection timeout"
- **Solution**: Check that your endpoint is accessible and responds quickly

**Problem**: "404 Not Found"
- **Solution**: Verify the webhook URL is correct and the endpoint exists

#### Slack Errors

**Problem**: "Invalid webhook URL"
- **Solution**: Regenerate the webhook URL in Slack and update the integration

**Problem**: "Channel not found"
- **Solution**: Ensure the channel exists and the webhook has permission to post

### Testing Integrations

Always test integrations before going live:

1. Use the built-in test feature
2. Submit test forms with sample data
3. Verify data appears correctly in destination services
4. Check error logs for any issues

### Rate Limits

Be aware of rate limits for external services:

- **Google Sheets**: 100 requests per 100 seconds per user
- **Slack**: 1 message per second
- **Webhooks**: Depends on your server capacity

### Security Considerations

- Use HTTPS endpoints for webhooks
- Implement authentication for sensitive endpoints
- Validate incoming data before processing
- Log integration activities for debugging

### Monitoring

Set up monitoring for your integrations:

- Track success/failure rates
- Monitor response times
- Set up alerts for integration failures
- Review logs regularly

## Best Practices

### Integration Design

1. **Start Simple**: Begin with one integration and add more as needed
2. **Test Thoroughly**: Always test with sample data before production use
3. **Handle Errors**: Implement proper error handling in your endpoints
4. **Monitor Performance**: Keep track of integration success rates

### Data Management

1. **Field Consistency**: Keep form fields consistent with destination schemas
2. **Data Validation**: Validate data before sending to external services
3. **Backup Strategy**: Consider multiple integrations for important data
4. **Privacy Compliance**: Ensure integrations comply with data protection regulations

### Maintenance

1. **Regular Testing**: Periodically test integrations to ensure they still work
2. **Update Configurations**: Keep integration settings up to date
3. **Monitor Logs**: Review integration logs for errors or performance issues
4. **Documentation**: Document your integration setups for team members
