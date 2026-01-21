import { useState, useEffect, useCallback } from 'react'
import { getTimeUntil } from '@/lib/utils'

interface CountdownTime {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number
  isExpired: boolean
}

export function useCountdown(targetDate: Date | string): CountdownTime {
  const calculateTimeLeft = useCallback(() => {
    const time = getTimeUntil(targetDate)
    return {
      ...time,
      isExpired: time.total <= 0,
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<CountdownTime>(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return timeLeft
}
