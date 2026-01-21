import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, UserCheck } from 'lucide-react'
import { useRecentRegistrations } from '@/hooks'

export function RecentRegistrationNotification() {
  const { registration, isVisible } = useRecentRegistrations()

  return (
    <AnimatePresence>
      {isVisible && registration && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="glass-card rounded-lg p-4 shadow-xl max-w-xs">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {registration.name} just registered
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{registration.location}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {registration.timeAgo}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
