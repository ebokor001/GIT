import { motion } from 'framer-motion'
import { Calendar, Clock, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CountdownTimer } from './CountdownTimer'
import { mockWebinars } from '@/data/mockData'
import { formatDate, formatTime } from '@/lib/utils'

interface HeroSectionProps {
  onRegisterClick: () => void
}

export function HeroSection({ onRegisterClick }: HeroSectionProps) {
  const nextWebinar = mockWebinars.find(w => w.is_active && new Date(w.scheduled_at) > new Date())

  if (!nextWebinar) return null

  return (
    <section className="hero-bg min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="container max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-primary">
              Live Every Thursday at 2 PM EST
            </span>
          </motion.div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Master Modern{' '}
            <span className="gradient-text">Web Development</span>
            <br />
            One Week at a Time
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of developers in our free weekly webinar series.
            Learn from industry experts at Meta, Google, and more.
          </p>

          {/* Next Webinar Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mb-10"
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 gradient-text">
              Next Up: {nextWebinar.title}
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{formatDate(nextWebinar.scheduled_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <span>{formatTime(nextWebinar.scheduled_at)} EST</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{nextWebinar.available_spots} spots remaining</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <CountdownTimer targetDate={nextWebinar.scheduled_at} />
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              variant="gradient"
              size="xl"
              onClick={onRegisterClick}
              className="btn-glow animate-pulse-glow"
            >
              Reserve Your Free Spot
            </Button>
            <Button variant="outline" size="xl" asChild>
              <a href="#replays">Watch Past Replays</a>
            </Button>
          </motion.div>

          {/* Social Proof Mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 flex items-center justify-center gap-2"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 border-2 border-background flex items-center justify-center text-xs font-semibold"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground ml-2">
              <strong className="text-foreground">2,847+</strong> developers already registered
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>
    </section>
  )
}
