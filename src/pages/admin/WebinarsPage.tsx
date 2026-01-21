import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  Video,
  Calendar,
  Users,
  Play,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { mockWebinars } from '@/data/mockData'
import { formatDate, formatTime, formatDuration } from '@/lib/utils'
import type { Webinar } from '@/types'

export function WebinarsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingWebinar, setEditingWebinar] = useState<Webinar | null>(null)

  const filteredWebinars = mockWebinars.filter(
    (webinar) =>
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const upcomingCount = filteredWebinars.filter(
    (w) => w.is_active && new Date(w.scheduled_at) > new Date()
  ).length

  const pastCount = filteredWebinars.filter(
    (w) => new Date(w.scheduled_at) <= new Date()
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Webinars</h1>
          <p className="text-muted-foreground">
            Manage your webinar schedule and content.
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Plus className="w-4 h-4 mr-2" />
              Create Webinar
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Webinar</DialogTitle>
              <DialogDescription>
                Set up a new webinar session. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <WebinarForm onClose={() => setIsCreateDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Video className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{filteredWebinars.length}</p>
                <p className="text-sm text-muted-foreground">Total Webinars</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Calendar className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingCount}</p>
                <p className="text-sm text-muted-foreground">Upcoming</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Play className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pastCount}</p>
                <p className="text-sm text-muted-foreground">Past (with replays)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search webinars..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Webinar List */}
      <div className="space-y-4">
        {filteredWebinars.map((webinar, index) => {
          const isPast = new Date(webinar.scheduled_at) <= new Date()

          return (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {isPast ? (
                          <Badge variant="secondary">Past</Badge>
                        ) : webinar.is_active ? (
                          <Badge variant="success">Active</Badge>
                        ) : (
                          <Badge variant="outline">Draft</Badge>
                        )}
                        {webinar.replay_url && (
                          <Badge variant="outline">
                            <Play className="w-3 h-3 mr-1" />
                            Replay
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold mb-1">
                        {webinar.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {webinar.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(webinar.scheduled_at)}
                        </div>
                        <div className="flex items-center gap-1">
                          {formatTime(webinar.scheduled_at)} EST
                        </div>
                        <div className="flex items-center gap-1">
                          {formatDuration(webinar.duration_minutes)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {webinar.registrations_count || 0} registrations
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingWebinar(webinar)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="w-4 h-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingWebinar}
        onOpenChange={(open) => !open && setEditingWebinar(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Webinar</DialogTitle>
            <DialogDescription>
              Make changes to your webinar.
            </DialogDescription>
          </DialogHeader>
          {editingWebinar && (
            <WebinarForm
              webinar={editingWebinar}
              onClose={() => setEditingWebinar(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface WebinarFormProps {
  webinar?: Webinar
  onClose: () => void
}

function WebinarForm({ webinar, onClose }: WebinarFormProps) {
  const [isActive, setIsActive] = useState(webinar?.is_active ?? true)

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            defaultValue={webinar?.title}
            placeholder="Webinar title"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            defaultValue={webinar?.description || ''}
            placeholder="Webinar description"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            defaultValue={
              webinar
                ? new Date(webinar.scheduled_at).toISOString().split('T')[0]
                : ''
            }
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Time (EST)</Label>
          <Input id="time" type="time" defaultValue="14:00" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            defaultValue={webinar?.duration_minutes || 60}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Max Capacity</Label>
          <Input
            id="capacity"
            type="number"
            defaultValue={webinar?.max_capacity || 500}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="host_name">Host Name</Label>
          <Input
            id="host_name"
            defaultValue={webinar?.host_name || ''}
            placeholder="Host name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cal_event_id">Cal.com Event Type ID</Label>
          <Input
            id="cal_event_id"
            defaultValue={webinar?.cal_com_event_type_id || ''}
            placeholder="e.g., webinar-react"
          />
        </div>

        <div className="col-span-2 space-y-2">
          <Label htmlFor="replay_url">Replay URL (after webinar)</Label>
          <Input
            id="replay_url"
            defaultValue={webinar?.replay_url || ''}
            placeholder="https://youtube.com/..."
          />
        </div>

        <div className="col-span-2 flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Active</Label>
            <p className="text-sm text-muted-foreground">
              Make this webinar visible and accepting registrations.
            </p>
          </div>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" onClick={onClose}>
          {webinar ? 'Save Changes' : 'Create Webinar'}
        </Button>
      </DialogFooter>
    </div>
  )
}
