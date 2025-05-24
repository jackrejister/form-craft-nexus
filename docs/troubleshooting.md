
# Troubleshooting Guide

Common issues and solutions for the Form Builder application.

## Installation Issues

### Node.js Version Conflicts

**Problem**: Build errors related to Node.js version
```
Error: Unsupported Node.js version
```

**Solution**: 
- Ensure you're using Node.js 18 or higher
- Use nvm to manage Node versions:
```bash
nvm install 18
nvm use 18
```

### Dependency Installation Failures

**Problem**: npm install fails with permission errors

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

## Build and Development Issues

### Vite Build Errors

**Problem**: Build fails with TypeScript errors

**Solution**:
1. Check for type errors in the console
2. Ensure all imports have correct file extensions
3. Verify TypeScript configuration:
```bash
npx tsc --noEmit
```

### Hot Reload Not Working

**Problem**: Changes don't reflect in the browser

**Solution**:
1. Restart the development server
2. Clear browser cache
3. Check console for errors
4. Verify file is being watched:
```bash
npm run dev -- --force
```

## Form Builder Issues

### Drag and Drop Not Working

**Problem**: Cannot drag fields in form builder

**Solution**:
1. Check browser console for JavaScript errors
2. Verify @dnd-kit dependencies are installed
3. Clear browser cache and reload
4. Try in incognito/private browsing mode

### Field Configuration Panel Missing

**Problem**: Properties panel doesn't appear when selecting fields

**Solution**:
1. Ensure the field is properly selected (highlighted)
2. Check responsive layout on smaller screens
3. Verify React state is updating correctly
4. Look for console errors

### Form Preview Not Updating

**Problem**: Preview doesn't reflect builder changes

**Solution**:
1. Check if preview is in sync with builder state
2. Verify form data is being passed correctly
3. Look for prop passing issues between components
4. Clear component state and refresh

## Integration Issues

### Google Sheets Integration

**Problem**: "Spreadsheet not found" error

**Solutions**:
1. Verify spreadsheet ID is correct
2. Ensure spreadsheet is publicly accessible or properly shared
3. Check Google Sheets API quotas
4. Verify internet connection

**Problem**: Data not appearing in spreadsheet

**Solutions**:
1. Check column headers match form field labels
2. Verify the sheet name is correct
3. Ensure the spreadsheet isn't read-only
4. Test with a simple form first

### Webhook Integration

**Problem**: Webhook requests failing

**Solutions**:
1. Verify webhook URL is accessible
2. Check endpoint returns proper status codes
3. Ensure endpoint accepts POST requests
4. Test endpoint independently with tools like Postman

**Problem**: Webhook receiving malformed data

**Solutions**:
1. Check Content-Type header is set to application/json
2. Verify endpoint can parse JSON
3. Log incoming requests to debug data format
4. Check for special characters in form data

### Slack Integration

**Problem**: Messages not appearing in Slack

**Solutions**:
1. Verify webhook URL is correct and active
2. Check channel permissions
3. Ensure workspace allows incoming webhooks
4. Test webhook URL directly

## Form Submission Issues

### Validation Errors

**Problem**: Form won't submit due to validation

**Solutions**:
1. Check required fields are filled
2. Verify email format is correct
3. Ensure number fields contain valid numbers
4. Check custom validation patterns

**Problem**: Custom validation not working

**Solutions**:
1. Verify regex patterns are valid
2. Check validation logic in `validateField` function
3. Ensure proper error messages are displayed
4. Test validation with various inputs

### File Upload Issues

**Problem**: File uploads failing

**Solutions**:
1. Check file size limits
2. Verify file type restrictions
3. Ensure proper mime type validation
4. Check browser file API support

## Performance Issues

### Slow Form Loading

**Problem**: Forms take long time to load

**Solutions**:
1. Optimize form complexity (reduce number of fields)
2. Check network requests in browser dev tools
3. Minimize external dependencies
4. Consider lazy loading for complex components

### Browser Memory Issues

**Problem**: Browser becomes unresponsive

**Solutions**:
1. Check for memory leaks in React components
2. Properly clean up event listeners
3. Avoid creating unnecessary re-renders
4. Use React Developer Tools to profile components

## Browser Compatibility

### Internet Explorer Issues

**Problem**: Application doesn't work in older browsers

**Solution**: 
The application requires modern browser features. Recommend users upgrade to:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Mobile Browser Issues

**Problem**: Touch interactions not working properly

**Solutions**:
1. Test touch events on actual devices
2. Verify viewport meta tag is set
3. Check CSS touch-action properties
4. Ensure responsive design works correctly

## Data Issues

### Form Data Not Saving

**Problem**: Form responses are lost

**Solutions**:
1. Check browser local storage
2. Verify form submission handlers
3. Ensure proper error handling
4. Check network requests in dev tools

### Export/Import Issues

**Problem**: Cannot export or import forms

**Solutions**:
1. Check JSON format validity
2. Verify file permissions
3. Ensure proper serialization/deserialization
4. Test with smaller datasets first

## Development Debugging

### Enabling Debug Mode

Add debug logging to components:

```typescript
const DEBUG = import.meta.env.DEV;

const debugLog = (message: string, data?: any) => {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data);
  }
};
```

### React Developer Tools

1. Install React Developer Tools browser extension
2. Use Components tab to inspect component state
3. Use Profiler tab to identify performance issues
4. Check component re-renders and props

### Network Debugging

1. Open browser Developer Tools
2. Go to Network tab
3. Monitor API requests and responses
4. Check for failed requests or slow responses

### Console Debugging

Monitor browser console for:
- JavaScript errors
- Network failures
- React warnings
- Custom debug messages

## Getting Help

### Before Seeking Help

1. Check this troubleshooting guide
2. Search existing issues in the repository
3. Reproduce the issue with minimal steps
4. Gather relevant error messages and logs

### Reporting Issues

When reporting issues, include:

1. **Environment Information**:
   - Operating system
   - Browser version
   - Node.js version
   - npm/yarn version

2. **Steps to Reproduce**:
   - Detailed steps to recreate the issue
   - Expected vs actual behavior
   - Screenshots or screen recordings

3. **Error Information**:
   - Console error messages
   - Network request failures
   - Stack traces

4. **Configuration**:
   - Relevant code snippets
   - Form configuration
   - Integration settings

### Community Support

- Check project documentation
- Search community forums
- Review existing GitHub issues
- Join project Discord/Slack if available

### Emergency Issues

For critical production issues:

1. Check service status pages for external dependencies
2. Implement temporary workarounds if possible
3. Monitor error rates and user impact
4. Document the issue and resolution for future reference
