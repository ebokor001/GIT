import { motion } from 'framer-motion'
import { useCountdown } from '@/hooks'

interface CountdownTimerProps {
  targetDate: Date | string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate)

  if (isExpired) {
    return (
      <div className="text-center">
        <span className="text-xl font-semibold text-primary">
          Webinar is Live Now!
        </span>
      </div>
    )
  }

  const timeUnits = [
    { value: days, label: 'Days' },
    { value: hours, label: 'Hours' },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <div className="flex items-center justify-center gap-3 md:gap-6">
      {timeUnits.map((unit, index) => (
        <motion.div
          key={unit.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="countdown-segment"
        >
          <div className="glass-card rounded-xl px-4 py-3 md:px-6 md:py-4 min-w-[70px] md:min-w-[90px]">
            <motion.span
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="countdown-value block text-center"
            >
              {unit.value.toString().padStart(2, '0')}
            </motion.span>
            <span className="countdown-label block text-center">
              {unit.label}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
