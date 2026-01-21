import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Palette,
  Link2,
  Mail,
  Bell,
  Globe,
  Save,
  Check,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getTimezones } from '@/lib/utils'

export function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)
  const [savedSection, setSavedSection] = useState<string | null>(null)

  const timezones = getTimezones()

  const handleSave = (section: string) => {
    setIsSaving(true)
    setSavedSection(section)

    setTimeout(() => {
      setIsSaving(false)
      setTimeout(() => setSavedSection(null), 2000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your webinar platform settings.
        </p>
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
          <TabsTrigger value="branding" className="gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Branding</span>
          </TabsTrigger>
          <TabsTrigger value="calcom" className="gap-2">
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Cal.com</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="w-4 h-4" />
            <span className="hidden sm:inline">Email</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="general" className="gap-2">
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
        </TabsList>

        {/* Branding Settings */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Customize the look and feel of your webinar platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  placeholder="https://example.com/logo.png"
                  defaultValue=""
                />
                <p className="text-xs text-muted-foreground">
                  Recommended size: 200x50px. PNG or SVG.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary_color"
                      type="color"
                      defaultValue="#8b5cf6"
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      defaultValue="#8b5cf6"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary_color"
                      type="color"
                      defaultValue="#3b82f6"
                      className="w-12 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      defaultValue="#3b82f6"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font">Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="opensans">Open Sans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={() => handleSave('branding')}
                  disabled={isSaving}
                >
                  {savedSection === 'branding' ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cal.com Settings */}
        <TabsContent value="calcom">
          <Card>
            <CardHeader>
              <CardTitle>Cal.com Integration</CardTitle>
              <CardDescription>
                Connect your Cal.com account for seamless scheduling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="calcom_api_key">API Key</Label>
                <Input
                  id="calcom_api_key"
                  type="password"
                  placeholder="cal_live_..."
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from Cal.com Settings &gt; Developer &gt; API Keys
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="calcom_url">Cal.com URL</Label>
                <Input
                  id="calcom_url"
                  placeholder="https://cal.com/your-username"
                  defaultValue="https://cal.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_event_type">Default Event Type ID</Label>
                <Input
                  id="default_event_type"
                  placeholder="webinar-session"
                />
                <p className="text-xs text-muted-foreground">
                  The default Cal.com event type to use for new webinars.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-muted">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Connection Status</p>
                    <p className="text-sm text-muted-foreground">
                      Not connected. Add your API key to connect.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Test Connection
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={() => handleSave('calcom')}
                  disabled={isSaving}
                >
                  {savedSection === 'calcom' ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure your email sender settings (via Resend).
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sender_name">Sender Name</Label>
                <Input
                  id="sender_name"
                  placeholder="WebinarDev"
                  defaultValue="WebinarDev"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender_email">Sender Email</Label>
                <Input
                  id="sender_email"
                  type="email"
                  placeholder="webinars@yourdomain.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reply_to">Reply-To Email</Label>
                <Input
                  id="reply_to"
                  type="email"
                  placeholder="support@yourdomain.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resend_api_key">Resend API Key</Label>
                <Input
                  id="resend_api_key"
                  type="password"
                  placeholder="re_..."
                />
                <p className="text-xs text-muted-foreground">
                  Get your API key from resend.com/api-keys
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={() => handleSave('email')}
                  disabled={isSaving}
                >
                  {savedSection === 'email' ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>New Registration Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone registers for a webinar.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Replay View Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone watches a replay.
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Daily Summary Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily summary of registrations and activity.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slack_webhook">Slack Webhook URL (Optional)</Label>
                <Input
                  id="slack_webhook"
                  placeholder="https://hooks.slack.com/..."
                />
                <p className="text-xs text-muted-foreground">
                  Send notifications to a Slack channel.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={() => handleSave('notifications')}
                  disabled={isSaving}
                >
                  {savedSection === 'notifications' ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general platform settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="default_timezone">Default Timezone</Label>
                <Select defaultValue="America/New_York">
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {timezones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_duration">Default Webinar Duration</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="default_capacity">Default Max Capacity</Label>
                <Input
                  id="default_capacity"
                  type="number"
                  defaultValue="500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require Email Verification</Label>
                  <p className="text-sm text-muted-foreground">
                    Require registrants to verify their email address.
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Gate Replay Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Require email to access replay library by default.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="gradient"
                  onClick={() => handleSave('general')}
                  disabled={isSaving}
                >
                  {savedSection === 'general' ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
