import { useState, useEffect } from 'react'

interface RecentRegistration {
  id: string
  name: string
  location: string
  timeAgo: string
}

const sampleNames = [
  'John', 'Emily', 'Michael', 'Sarah', 'David', 'Lisa', 'James', 'Emma',
  'Robert', 'Sophia', 'William', 'Olivia', 'Daniel', 'Ava', 'Matthew',
]

const sampleLocations = [
  'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
  'Boston, MA', 'Chicago, IL', 'Denver, CO', 'Miami, FL', 'Portland, OR',
  'London, UK', 'Toronto, CA', 'Sydney, AU', 'Berlin, DE', 'Paris, FR',
]

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export function useRecentRegistrations(interval = 8000) {
  const [registration, setRegistration] = useState<RecentRegistration | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const generateRegistration = () => {
      const newRegistration: RecentRegistration = {
        id: Math.random().toString(36).substring(7),
        name: getRandomItem(sampleNames),
        location: getRandomItem(sampleLocations),
        timeAgo: `${Math.floor(Math.random() * 5) + 1} minutes ago`,
      }
      setRegistration(newRegistration)
      setIsVisible(true)

      // Hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false)
      }, 5000)
    }

    // Show first notification after 3 seconds
    const initialTimeout = setTimeout(generateRegistration, 3000)

    // Then show new notifications at the specified interval
    const intervalId = setInterval(generateRegistration, interval)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(intervalId)
    }
  }, [interval])

  return { registration, isVisible }
}
