import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Upload,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Clock,
  Download,
  Lock,
  Unlock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
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
import { mockWebinars, mockReplayViews } from '@/data/mockData'
import { formatDate, formatDuration } from '@/lib/utils'

export function ReplaysPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const replays = mockWebinars.filter((w) => w.replay_url)

  const filteredReplays = replays.filter(
    (replay) =>
      replay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replay.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Calculate stats
  const totalViews = mockReplayViews.length * 150 // Mock multiplier
  const avgWatchTime = Math.round(
    mockReplayViews.reduce((acc, v) => acc + v.watched_seconds, 0) /
      mockReplayViews.length /
      60
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Replay Library</h1>
          <p className="text-muted-foreground">
            Manage webinar recordings and view analytics.
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="gradient">
              <Upload className="w-4 h-4 mr-2" />
              Upload Replay
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload New Replay</DialogTitle>
              <DialogDescription>
                Upload a recording for a past webinar.
              </DialogDescription>
            </DialogHeader>
            <UploadForm onClose={() => setIsUploadDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-violet-500/10">
                <Play className="w-5 h-5 text-violet-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{replays.length}</p>
                <p className="text-sm text-muted-foreground">Total Replays</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Eye className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalViews.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <Clock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgWatchTime} min</p>
                <p className="text-sm text-muted-foreground">Avg Watch Time</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Download className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">78%</p>
                <p className="text-sm text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search replays..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Replay Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReplays.map((replay, index) => {
          const views = Math.floor(Math.random() * 2000) + 500

          return (
            <motion.div
              key={replay.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60">
                      {formatDuration(replay.duration_minutes)}
                    </Badge>
                  </div>

                  {/* Access badge */}
                  <div className="absolute top-2 right-2">
                    <Badge variant="outline" className="bg-black/60">
                      <Lock className="w-3 h-3 mr-1" />
                      Gated
                    </Badge>
                  </div>
                </div>

                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {replay.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{formatDate(replay.scheduled_at)}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {views.toLocaleString()} views
                    </div>
                  </div>

                  {/* Progress bar placeholder */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Avg. completion</span>
                      <span>78%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '78%' }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Unlock className="w-4 h-4 mr-2" />
                          Make Public
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredReplays.length === 0 && (
        <div className="text-center py-12">
          <Play className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No replays found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery
              ? `No replays match "${searchQuery}"`
              : 'Upload your first replay to get started.'}
          </p>
          <Button variant="gradient" onClick={() => setIsUploadDialogOpen(true)}>
            <Upload className="w-4 h-4 mr-2" />
            Upload Replay
          </Button>
        </div>
      )}
    </div>
  )
}

interface UploadFormProps {
  onClose: () => void
}

function UploadForm({ onClose }: UploadFormProps) {
  const [isGated, setIsGated] = useState(true)

  const webinarsWithoutReplay = mockWebinars.filter((w) => !w.replay_url)

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="webinar">Select Webinar</Label>
        <select
          id="webinar"
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Select a webinar...</option>
          {webinarsWithoutReplay.map((w) => (
            <option key={w.id} value={w.id}>
              {w.title}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="replay_url">Video URL</Label>
        <Input
          id="replay_url"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-muted-foreground">
          Supports YouTube, Vimeo, or direct video links
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (Optional)</Label>
        <Textarea
          id="description"
          placeholder="Add a custom description for this replay..."
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Thumbnail</Label>
        <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Drop an image or click to upload
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Gated Access</Label>
          <p className="text-sm text-muted-foreground">
            Require email to watch
          </p>
        </div>
        <Switch checked={isGated} onCheckedChange={setIsGated} />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" onClick={onClose}>
          Upload Replay
        </Button>
      </DialogFooter>
    </div>
  )
}
