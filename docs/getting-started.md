
# Getting Started

This guide will help you set up and start using the Form Builder application.

## Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd form-builder
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory (if needed for integrations):

```env
# Example environment variables
VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
VITE_SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## First Steps

### Creating Your First Form

1. **Navigate to Dashboard**: Open the application and go to the dashboard
2. **Create New Form**: Click "Create New Form" button
3. **Add Form Details**: Enter form title and description
4. **Add Fields**: Use the field picker to add different types of fields
5. **Customize**: Adjust field properties, validation, and styling
6. **Preview**: Use the preview tab to test your form
7. **Save**: Save your form when ready

### Understanding the Interface

- **Dashboard**: Overview of all your forms and analytics
- **Form Builder**: Drag-and-drop interface for creating forms
- **Preview**: Real-time preview of your form
- **Integrations**: Connect your forms to external services
- **Responses**: View and manage form submissions
- **Settings**: Configure form behavior and appearance

## Next Steps

- Read the [User Guide](./user-guide.md) for detailed usage instructions
- Check out [Integration Guide](./integration-guide.md) to connect external services
- Explore [Developer Guide](./developer-guide.md) if you want to customize or extend the application
