
# Form Builder Documentation

Welcome to the Form Builder project documentation. This comprehensive guide will help you understand, use, and contribute to the form builder application.

## Table of Contents

- [Getting Started](./getting-started.md)
- [User Guide](./user-guide.md)
- [Developer Guide](./developer-guide.md)
- [API Reference](./api-reference.md)
- [Integration Guide](./integration-guide.md)
- [Troubleshooting](./troubleshooting.md)

## Quick Overview

This Form Builder is a modern web application built with React, TypeScript, and Tailwind CSS that allows users to create dynamic forms with various field types, integrate with external services, and collect responses efficiently.

### Key Features

- **Drag & Drop Form Builder**: Intuitive interface for creating forms
- **Multiple Field Types**: Text, email, phone, select, radio, checkbox, date, time, file upload, rating, and more
- **Real-time Preview**: See your form as you build it
- **Integrations**: Connect with Google Sheets, Slack, Webhooks, Zapier, and more
- **Response Management**: View and analyze form submissions
- **Theme Customization**: Customize colors, fonts, and branding
- **Analytics**: Track form performance and conversion rates

### Architecture

```
src/
├── components/           # Reusable UI components
│   ├── forms/           # Form-specific components
│   ├── dashboard/       # Dashboard components
│   ├── layout/          # Layout components
│   └── ui/              # Base UI components (shadcn/ui)
├── pages/               # Application pages
├── types/               # TypeScript type definitions
├── lib/                 # Utility functions
├── services/            # External service integrations
└── hooks/               # Custom React hooks
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Support

For support, please check the [Troubleshooting Guide](./troubleshooting.md) or open an issue in the repository.
