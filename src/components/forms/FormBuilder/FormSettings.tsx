
import { FormSettings as FormSettingsType } from "@/types/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FormSettingsProps {
  settings?: FormSettingsType;
  onUpdateSettings: (settings: Partial<FormSettingsType>) => void;
}

const FormSettings = ({ settings, onUpdateSettings }: FormSettingsProps) => {
  if (!settings) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible defaultValue="form-basic">
        <AccordionItem value="form-basic">
          <AccordionTrigger className="py-3">Basic Settings</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-4 px-2 pb-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="submitButtonText">Submit Button Text</Label>
                    <Input
                      id="submitButtonText"
                      value={settings.submitButtonText || "Submit"}
                      onChange={(e) =>
                        onUpdateSettings({ submitButtonText: e.target.value })
                      }
                      placeholder="Submit"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="redirectAfterSubmit">
                      Redirect URL (Optional)
                    </Label>
                    <Input
                      id="redirectAfterSubmit"
                      value={settings.redirectAfterSubmit || ""}
                      onChange={(e) =>
                        onUpdateSettings({ redirectAfterSubmit: e.target.value })
                      }
                      placeholder="https://example.com/thank-you"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank to show the confirmation message instead
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="form-behavior">
          <AccordionTrigger className="py-3">Behavior</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-4 px-2 pb-2">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 justify-between">
                    <Label htmlFor="savePartialResponses">
                      Save Partial Responses
                    </Label>
                    <Switch
                      id="savePartialResponses"
                      checked={settings.savePartialResponses}
                      onCheckedChange={(checked) =>
                        onUpdateSettings({ savePartialResponses: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2 justify-between">
                    <Label htmlFor="allowMultipleSubmissions">
                      Allow Multiple Submissions
                    </Label>
                    <Switch
                      id="allowMultipleSubmissions"
                      checked={settings.allowMultipleSubmissions}
                      onCheckedChange={(checked) =>
                        onUpdateSettings({ allowMultipleSubmissions: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2 justify-between">
                    <Label htmlFor="enableCaptcha">Enable CAPTCHA</Label>
                    <Switch
                      id="enableCaptcha"
                      checked={settings.enableCaptcha}
                      onCheckedChange={(checked) =>
                        onUpdateSettings({ enableCaptcha: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center space-x-2 justify-between">
                    <Label htmlFor="showProgressBar">Show Progress Bar</Label>
                    <Switch
                      id="showProgressBar"
                      checked={settings.showProgressBar}
                      onCheckedChange={(checked) =>
                        onUpdateSettings({ showProgressBar: checked })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="form-messages">
          <AccordionTrigger className="py-3">Messages</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-4 px-2 pb-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="confirmationMessage">
                      Confirmation Message
                    </Label>
                    <Textarea
                      id="confirmationMessage"
                      value={settings.confirmationMessage || ""}
                      onChange={(e) =>
                        onUpdateSettings({
                          confirmationMessage: e.target.value,
                        })
                      }
                      placeholder="Thank you for your submission!"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="closedMessage">Closed Form Message</Label>
                    <Textarea
                      id="closedMessage"
                      value={settings.closedMessage || ""}
                      onChange={(e) =>
                        onUpdateSettings({ closedMessage: e.target.value })
                      }
                      placeholder="This form is now closed."
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="form-limits">
          <AccordionTrigger className="py-3">Limits</AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-4 px-2 pb-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="limitSubmissions">
                      Submission Limit (Optional)
                    </Label>
                    <Input
                      id="limitSubmissions"
                      type="number"
                      value={settings.limitSubmissions || ""}
                      onChange={(e) =>
                        onUpdateSettings({
                          limitSubmissions: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      placeholder="No limit"
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum number of submissions allowed. Leave blank for no limit.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="formExpiry">Form Expiry Date (Optional)</Label>
                    <Input
                      id="formExpiry"
                      type="datetime-local"
                      value={settings.formExpiry || ""}
                      onChange={(e) =>
                        onUpdateSettings({ formExpiry: e.target.value })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Date and time when the form will automatically close
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FormSettings;
