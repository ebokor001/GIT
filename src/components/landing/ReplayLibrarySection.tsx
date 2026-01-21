import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Clock, Eye, Search, Calendar, Lock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { mockWebinars } from '@/data/mockData'
import { formatDate, formatDuration } from '@/lib/utils'

export function ReplayLibrarySection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [gateEmail, setGateEmail] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)

  const replays = mockWebinars.filter((w) => w.replay_url)

  const filteredReplays = replays.filter(
    (replay) =>
      replay.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      replay.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleUnlock = () => {
    if (gateEmail) {
      setIsUnlocked(true)
    }
  }

  // Generate random view counts for demo
  const getViewCount = (id: string) => {
    return Math.floor(Math.random() * 2000) + 500
  }

  return (
    <section id="replays" className="py-20 md:py-32 px-4 bg-background relative">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Replay <span className="gradient-text">Library</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Missed a session? No problem. Access our complete library of past
            webinars anytime.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search replays by topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Replay Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReplays.map((replay, index) => (
            <motion.div
              key={replay.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="glass-card rounded-xl overflow-hidden card-hover">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-secondary/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {isUnlocked ? (
                        <Play className="w-6 h-6 text-white ml-1" />
                      ) : (
                        <Lock className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3">
                    <Badge variant="secondary" className="bg-black/60">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(replay.duration_minutes)}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {replay.title}
                  </h3>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(replay.scheduled_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{getViewCount(replay.id)} views</span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={replay.replay_url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch Now
                      </a>
                    </Button>
                  ) : (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">
                          <Lock className="w-4 h-4 mr-2" />
                          Unlock to Watch
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Unlock Replay Access</DialogTitle>
                          <DialogDescription>
                            Enter your email to get free access to all webinar
                            replays.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label htmlFor="gate-email">Email Address</Label>
                            <Input
                              id="gate-email"
                              type="email"
                              placeholder="your@email.com"
                              value={gateEmail}
                              onChange={(e) => setGateEmail(e.target.value)}
                            />
                          </div>
                          <Button
                            variant="gradient"
                            className="w-full"
                            onClick={handleUnlock}
                          >
                            Get Free Access
                          </Button>
                          <p className="text-xs text-center text-muted-foreground">
                            We'll also notify you about upcoming webinars.
                          </p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredReplays.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No replays found matching "{searchQuery}"
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
