
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  BookOpen, 
  Rocket, 
  Users, 
  Code, 
  Settings, 
  HelpCircle,
  ExternalLink,
  FileText,
  Zap
} from "lucide-react";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const documentationSections = [
    {
      id: "overview",
      title: "Overview",
      icon: BookOpen,
      description: "Get started with Form Builder basics",
      content: `
# Form Builder Documentation

Welcome to the comprehensive Form Builder documentation. This powerful tool allows you to create dynamic forms with drag-and-drop simplicity, connect to external services, and analyze responses.

## Key Features

- **Intuitive Form Builder**: Drag-and-drop interface for creating forms
- **Multiple Field Types**: Text, email, phone, select, radio, checkbox, date, time, file upload, rating, and more
- **Real-time Preview**: See your form as you build it
- **External Integrations**: Connect with Google Sheets, Slack, Webhooks, Zapier, and more
- **Response Management**: View and analyze form submissions
- **Theme Customization**: Customize colors, fonts, and branding
- **Analytics Dashboard**: Track form performance and conversion rates

## Quick Navigation

Use the tabs above to explore different sections:
- **Getting Started**: Installation and first steps
- **User Guide**: Complete usage instructions
- **Developer Guide**: Technical documentation
- **Integrations**: External service connections
- **Troubleshooting**: Common issues and solutions
      `
    },
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Rocket,
      description: "Installation and setup instructions",
      content: `
# Getting Started

## Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Modern web browser

## Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd form-builder
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open in browser**
   Navigate to \`http://localhost:5173\`

## Creating Your First Form

1. Click "Create New Form" from the dashboard
2. Add a title and description
3. Drag fields from the field picker to the form canvas
4. Configure field properties in the right panel
5. Use the preview tab to test your form
6. Save and share your form

## Basic Concepts

- **Form Canvas**: The main area where you build your form
- **Field Picker**: Available field types on the left
- **Properties Panel**: Configure selected field settings
- **Preview**: See how your form looks to users
- **Integrations**: Connect external services
      `
    },
    {
      id: "user-guide",
      title: "User Guide",
      icon: Users,
      description: "Complete usage instructions",
      content: `
# User Guide

## Form Builder Interface

The form builder consists of three main areas:

### Field Picker (Left Panel)
Available field types to add to your form:
- **Text Fields**: Text, textarea, email, phone, URL
- **Selection Fields**: Select, radio, checkbox, multi-select
- **Date/Time**: Date picker, time picker
- **Advanced**: File upload, rating, signature, payment
- **Layout**: Headings, dividers

### Form Canvas (Center)
Your form being built. Drag fields here and arrange them.

### Properties Panel (Right)
Configure the selected field:
- Basic properties (label, placeholder, required)
- Validation rules (min/max length, patterns)
- Conditional logic (show/hide based on other fields)

## Field Configuration

Each field can be customized with:

- **Label**: Display name for the field
- **Placeholder**: Helper text shown in empty fields
- **Required**: Whether the field must be filled
- **Default Value**: Pre-filled value
- **Help Text**: Additional guidance for users
- **Validation**: Rules to ensure data quality

## Form Settings

Configure form behavior:
- **Submission**: Redirect URL after form completion
- **Security**: Enable CAPTCHA protection
- **Limits**: Maximum submissions, expiration dates
- **Progress**: Show completion progress bar
- **Confirmation**: Custom success message

## Theme Customization

Personalize your form's appearance:
- **Colors**: Background, text, and accent colors
- **Typography**: Font family and sizes
- **Branding**: Add logo and cover images
- **Layout**: Border radius and spacing
      `
    },
    {
      id: "developer",
      title: "Developer Guide",
      icon: Code,
      description: "Technical documentation",
      content: `
# Developer Guide

## Architecture

Built with modern web technologies:
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Vite** for build tooling
- **React Router** for navigation

## Project Structure

\`\`\`
src/
├── components/           # Reusable components
│   ├── forms/           # Form-specific components
│   ├── dashboard/       # Dashboard widgets
│   ├── layout/          # Layout components
│   └── ui/              # Base UI components
├── pages/               # Application pages
├── types/               # TypeScript definitions
├── lib/                 # Utility functions
├── services/            # External integrations
└── hooks/               # Custom React hooks
\`\`\`

## Key Types

\`\`\`typescript
interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  validation?: ValidationConfig;
  // ... more properties
}

interface Form {
  id: string;
  title: string;
  fields: FormField[];
  theme: FormTheme;
  settings: FormSettings;
  integrations: FormIntegration[];
}
\`\`\`

## Adding New Field Types

1. Update \`FieldType\` in types
2. Add field to \`FormFieldPicker\`
3. Implement rendering in \`FormPreview\`
4. Add validation logic if needed

## Custom Integrations

Create new integrations by:
1. Adding integration type
2. Implementing service handler
3. Creating configuration UI
4. Adding test functionality
      `
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: Zap,
      description: "External service connections",
      content: `
# Integration Guide

## Available Integrations

### Google Sheets
Send form responses directly to spreadsheets.

**Setup:**
1. Create a Google Sheets spreadsheet
2. Note the spreadsheet ID from the URL
3. Add column headers matching your form fields
4. Configure integration with spreadsheet ID

### Webhooks
Send data to custom API endpoints.

**Setup:**
1. Create an endpoint that accepts POST requests
2. Configure webhook URL in integration settings
3. Test with sample data

**Data Format:**
\`\`\`json
{
  "formId": "form-123",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
\`\`\`

### Slack
Post notifications to Slack channels.

**Setup:**
1. Create incoming webhook in Slack
2. Copy webhook URL
3. Configure integration with URL
4. Customize message format

### Other Services
- **Zapier**: Trigger automated workflows
- **Notion**: Save to databases
- **Airtable**: Store in bases
- **Excel**: Microsoft Excel integration

## Testing Integrations

Always test before going live:
1. Use built-in test feature
2. Submit sample data
3. Verify data appears correctly
4. Check error logs

## Multiple Integrations

Enable multiple services simultaneously:
- Google Sheets for storage
- Slack for notifications
- Webhook for custom processing
      `
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: HelpCircle,
      description: "Common issues and solutions",
      content: `
# Troubleshooting Guide

## Common Issues

### Build Errors
**Problem**: TypeScript compilation errors
**Solution**: 
- Check import statements
- Verify type definitions
- Run \`npx tsc --noEmit\` to check types

### Form Builder Issues
**Problem**: Drag and drop not working
**Solutions**:
- Clear browser cache
- Check console for errors
- Try incognito mode
- Verify @dnd-kit dependencies

### Integration Failures
**Problem**: Google Sheets integration not working
**Solutions**:
- Verify spreadsheet ID
- Check sharing permissions
- Ensure column headers match field labels
- Test with simple data first

**Problem**: Webhook requests failing
**Solutions**:
- Verify endpoint URL is accessible
- Check endpoint accepts POST requests
- Ensure proper JSON parsing
- Test endpoint independently

### Performance Issues
**Problem**: Slow form loading
**Solutions**:
- Reduce form complexity
- Check network requests
- Optimize component re-renders
- Use React Developer Tools

## Browser Compatibility

Supports modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Getting Help

1. Check this documentation
2. Search existing issues
3. Provide detailed error information
4. Include environment details

## Debug Mode

Enable debug logging:
\`\`\`typescript
const DEBUG = import.meta.env.DEV;
console.log('[DEBUG]', message, data);
\`\`\`
      `
    }
  ];

  const currentSection = documentationSections.find(section => section.id === activeSection);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Form Builder Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive guide to building, customizing, and managing forms
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Documentation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {documentationSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant={activeSection === section.id ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setActiveSection(section.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {section.title}
                      </Button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/forms" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Go to Forms
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/create" className="flex items-center gap-2">
                    <Rocket className="h-4 w-4" />
                    Create New Form
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/dashboard" className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Dashboard
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {currentSection && <currentSection.icon className="h-6 w-6" />}
                  <div>
                    <CardTitle>{currentSection?.title}</CardTitle>
                    <p className="text-muted-foreground mt-1">
                      {currentSection?.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {currentSection?.content}
                    </pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
