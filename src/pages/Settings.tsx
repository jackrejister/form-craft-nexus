
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label"; // Use Label instead of FormLabel
import { 
  Bell, 
  CreditCard, 
  Download, 
  Key, 
  LogOut, 
  Mail, 
  Shield, 
  UserCircle 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Settings saved",
        description: "Your settings have been saved successfully",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs
        defaultValue="profile"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="sticky top-0 z-10 bg-background pb-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="profile" className="flex gap-2 items-center">
              <UserCircle className="h-4 w-4" /> Profile
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" /> Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="api" className="flex gap-2 items-center">
              <Key className="h-4 w-4" /> API
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col-reverse sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Avatar</h3>
                    <p className="text-sm text-muted-foreground">
                      Your profile picture visible to others
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-xl font-semibold">
                      JS
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm">
                        Change
                      </Button>
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Smith" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" defaultValue="john.smith@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" defaultValue="Acme Inc." />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Product manager with over 5 years of experience in SaaS"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your subscription and billing information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">Pro Plan</h3>
                      <span className="bg-primary/20 text-primary text-xs rounded-full px-2 py-0.5">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      $29/month, renews on June 1, 2023
                    </p>
                  </div>
                  <Button variant="outline">Manage Subscription</Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>
                <div className="flex items-center justify-between border rounded-md p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-16 rounded bg-muted flex items-center justify-center text-sm">
                      VISA
                    </div>
                    <div>
                      <p>•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/2024
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">Billing History</h3>
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p>May 1, 2023</p>
                      <p className="text-sm text-muted-foreground">
                        Pro Plan - Monthly
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>$29.00</span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p>April 1, 2023</p>
                      <p className="text-sm text-muted-foreground">
                        Pro Plan - Monthly
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>$29.00</span>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline">Download All Invoices</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Manage how you receive notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Email Notifications</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Form Submissions</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone submits your form
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Comment Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when someone comments on your forms
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive emails about new features and promotions
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Manage your account security and authentication methods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Change Password</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold text-destructive">Danger Zone</h3>
                <div className="space-y-4">
                  <div className="border border-destructive/20 rounded-md p-4 bg-destructive/5">
                    <h4 className="font-semibold">Delete Account</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>
                Manage API keys to integrate with our services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <h3 className="font-semibold">Your API Keys</h3>
                    <p className="text-sm text-muted-foreground">
                      Use these keys to authenticate API requests
                    </p>
                  </div>
                  <Button>Generate New Key</Button>
                </div>

                <div className="border rounded-md divide-y">
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">Production Key</p>
                        <p className="text-sm text-muted-foreground">
                          Created on May 1, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          className="font-mono w-52"
                          value="•••••••••••••••••••••••••"
                          readOnly
                        />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">Development Key</p>
                        <p className="text-sm text-muted-foreground">
                          Created on April 15, 2023
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          className="font-mono w-52"
                          value="•••••••••••••••••••••••••"
                          readOnly
                        />
                        <Button variant="outline" size="sm">
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="font-semibold">API Documentation</h3>
                <p className="text-muted-foreground">
                  Learn how to integrate our API into your applications
                </p>
                <Button variant="outline">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
