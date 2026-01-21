import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  Send,
  Eye,
  Edit,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { mockEmailTemplates, mockEmailLogs } from '@/data/mockData'
import { formatDate, getRelativeTime } from '@/lib/utils'
import type { EmailTemplate, EmailType } from '@/types'

const emailTypeLabels: Record<EmailType, string> = {
  confirmation: 'Confirmation',
  reminder_24h: '24h Reminder',
  reminder_1h: '1h Reminder',
  followup: 'Follow-up',
}

const emailTypeColors: Record<EmailType, string> = {
  confirmation: 'bg-emerald-500/10 text-emerald-500',
  reminder_24h: 'bg-amber-500/10 text-amber-500',
  reminder_1h: 'bg-orange-500/10 text-orange-500',
  followup: 'bg-blue-500/10 text-blue-500',
}

export function EmailsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(
    null
  )
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('templates')

  const stats = {
    sent: mockEmailLogs.length,
    delivered: mockEmailLogs.filter((l) => l.delivered).length,
    opened: mockEmailLogs.filter((l) => l.opened).length,
    clicked: mockEmailLogs.filter((l) => l.clicked).length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Email Management</h1>
          <p className="text-muted-foreground">
            Configure email templates and view delivery logs.
          </p>
        </div>
        <Button variant="gradient">
          <Send className="w-4 h-4 mr-2" />
          Send Broadcast
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.sent}</p>
                <p className="text-sm text-muted-foreground">Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.delivered}</p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Eye className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.opened}</p>
                <p className="text-sm text-muted-foreground">Opened</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Send className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.clicked}</p>
                <p className="text-sm text-muted-foreground">Clicked</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {mockEmailTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge
                        className={emailTypeColors[template.type]}
                        variant="outline"
                      >
                        {emailTypeLabels[template.type]}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Updated {getRelativeTime(template.updated_at)}
                      </span>
                    </div>
                    <CardTitle className="text-lg mt-2">
                      {template.subject}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {template.body_html
                        .replace(/<[^>]*>/g, '')
                        .substring(0, 100)}
                      ...
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTemplate(template)
                          setIsPreviewOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Send className="w-4 h-4 mr-1" />
                        Test Send
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {mockEmailLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={emailTypeColors[log.email_type]}
                            variant="outline"
                          >
                            {emailTypeLabels[log.email_type]}
                          </Badge>
                          <span className="text-sm font-medium">
                            Registration #{log.registration_id}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Sent {getRelativeTime(log.sent_at)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        {log.delivered ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-500" />
                        )}
                        <span>
                          {log.delivered ? 'Delivered' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Eye
                          className={`w-4 h-4 ${
                            log.opened
                              ? 'text-emerald-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                        <span>{log.opened ? 'Opened' : 'Not opened'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Send
                          className={`w-4 h-4 ${
                            log.clicked
                              ? 'text-emerald-500'
                              : 'text-muted-foreground'
                          }`}
                        />
                        <span>{log.clicked ? 'Clicked' : 'No clicks'}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit/Preview Dialog */}
      <Dialog
        open={!!selectedTemplate && !isPreviewOpen}
        onOpenChange={(open) => !open && setSelectedTemplate(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Email Template</DialogTitle>
            <DialogDescription>
              Customize your {selectedTemplate && emailTypeLabels[selectedTemplate.type]} email template.
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Type</Label>
                <Badge
                  className={emailTypeColors[selectedTemplate.type]}
                  variant="outline"
                >
                  {emailTypeLabels[selectedTemplate.type]}
                </Badge>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject Line</Label>
                <Input
                  id="subject"
                  defaultValue={selectedTemplate.subject}
                />
                <p className="text-xs text-muted-foreground">
                  Available tokens: {`{{name}}, {{webinar_title}}, {{webinar_date}}, {{webinar_time}}`}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Email Body (HTML)</Label>
                <Textarea
                  id="body"
                  defaultValue={selectedTemplate.body_html}
                  rows={10}
                  className="font-mono text-sm"
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Cancel
                </Button>
                <Button variant="gradient" onClick={() => setSelectedTemplate(null)}>
                  Save Template
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Email Preview</DialogTitle>
            <DialogDescription>
              Preview of the {selectedTemplate && emailTypeLabels[selectedTemplate.type]} email.
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <div className="space-y-4 py-4">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-sm text-muted-foreground mb-1">Subject:</p>
                <p className="font-medium">
                  {selectedTemplate.subject
                    .replace('{{webinar_title}}', 'Mastering Modern React Patterns')}
                </p>
              </div>

              <div className="p-6 rounded-lg bg-white text-gray-900">
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedTemplate.body_html
                      .replace('{{name}}', 'John')
                      .replace('{{webinar_title}}', 'Mastering Modern React Patterns')
                      .replace('{{webinar_date}}', 'Thursday, January 23, 2025')
                      .replace('{{webinar_time}}', '2:00 PM')
                      .replace('{{timezone}}', 'EST'),
                  }}
                />
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
                  Close
                </Button>
                <Button variant="ghost">
                  <Send className="w-4 h-4 mr-2" />
                  Send Test Email
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
