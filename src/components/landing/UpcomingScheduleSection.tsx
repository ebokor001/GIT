import { motion } from 'framer-motion'
import { Calendar, Clock, Users, Play, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { mockWebinars } from '@/data/mockData'
import { formatDate, formatTime, generateCalendarUrl } from '@/lib/utils'

export function UpcomingScheduleSection() {
  const upcomingWebinars = mockWebinars
    .filter(w => w.is_active && new Date(w.scheduled_at) > new Date())
    .slice(0, 4)

  const pastWebinars = mockWebinars
    .filter(w => w.replay_url)
    .slice(0, 2)

  const handleAddToCalendar = (webinar: typeof mockWebinars[0], type: 'google' | 'outlook' | 'apple') => {
    const startDate = new Date(webinar.scheduled_at)
    const endDate = new Date(startDate.getTime() + webinar.duration_minutes * 60000)
    const url = generateCalendarUrl(
      webinar.title,
      webinar.description || '',
      startDate,
      endDate,
      'Online Webinar',
      type
    )
    window.open(url, '_blank')
  }

  return (
    <section id="schedule" className="py-20 md:py-32 px-4 bg-muted/30 relative">
      <div className="container max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Schedule</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mark your calendar for our upcoming sessions. Each webinar is 60 minutes
            with live Q&A at the end.
          </p>
        </motion.div>

        {/* Upcoming Webinars */}
        <div className="space-y-4 mb-12">
          {upcomingWebinars.map((webinar, index) => (
            <motion.div
              key={webinar.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-xl p-6 card-hover"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {index === 0 && (
                      <Badge variant="default" className="animate-pulse">
                        Next Up
                      </Badge>
                    )}
                    <Badge variant="outline">Week {index + 1}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{webinar.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{formatDate(webinar.scheduled_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{formatTime(webinar.scheduled_at)} EST</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{webinar.available_spots} spots left</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToCalendar(webinar, 'google')}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Google
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToCalendar(webinar, 'outlook')}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Outlook
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAddToCalendar(webinar, 'apple')}
                    className="text-xs"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Apple
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Past Webinars Preview */}
        {pastWebinars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Recent Replays Available
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {pastWebinars.map((webinar) => (
                <div
                  key={webinar.id}
                  className="glass-card rounded-xl p-6 card-hover"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        <Play className="w-3 h-3 mr-1" />
                        Replay
                      </Badge>
                      <h4 className="font-semibold mb-1">{webinar.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(webinar.scheduled_at)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="#replays">Watch</a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
