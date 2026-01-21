import type {
  Webinar,
  Registration,
  EmailLog,
  EmailTemplate,
  ReplayView,
  Testimonial,
  FAQ,
  Benefit,
  DashboardMetrics
} from '@/types'

// Helper to generate dates
const addDays = (date: Date, days: number) => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const now = new Date()

// Get next Thursday at 2 PM EST
const getNextThursday = () => {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const daysUntilThursday = (4 - dayOfWeek + 7) % 7 || 7
  const nextThursday = new Date(today)
  nextThursday.setDate(today.getDate() + daysUntilThursday)
  nextThursday.setHours(14, 0, 0, 0)
  return nextThursday
}

export const mockWebinars: Webinar[] = [
  {
    id: '1',
    title: 'Mastering Modern React Patterns',
    description: 'Learn advanced React patterns including custom hooks, compound components, render props, and state management best practices. Perfect for developers looking to level up their React skills.',
    scheduled_at: getNextThursday().toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience building scalable React applications. Previously at Google and Airbnb. Speaker at React Conf and JSConf.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-react',
    replay_url: null,
    is_active: true,
    created_at: addDays(now, -30).toISOString(),
    registrations_count: 347,
    available_spots: 153,
  },
  {
    id: '2',
    title: 'Building Scalable APIs with Node.js',
    description: 'Deep dive into building production-ready APIs using Node.js, Express, and best practices for performance, security, and maintainability.',
    scheduled_at: addDays(getNextThursday(), 7).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-nodejs',
    replay_url: null,
    is_active: true,
    created_at: addDays(now, -20).toISOString(),
    registrations_count: 189,
    available_spots: 311,
  },
  {
    id: '3',
    title: 'TypeScript Deep Dive',
    description: 'Master TypeScript generics, utility types, and advanced type inference to write more robust and maintainable code.',
    scheduled_at: addDays(getNextThursday(), 14).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-typescript',
    replay_url: null,
    is_active: true,
    created_at: addDays(now, -15).toISOString(),
    registrations_count: 124,
    available_spots: 376,
  },
  {
    id: '4',
    title: 'CSS Architecture & Modern Styling',
    description: 'Learn modern CSS techniques including CSS Grid, Flexbox, CSS variables, and Tailwind CSS best practices.',
    scheduled_at: addDays(getNextThursday(), 21).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-css',
    replay_url: null,
    is_active: true,
    created_at: addDays(now, -10).toISOString(),
    registrations_count: 87,
    available_spots: 413,
  },
  // Past webinars with replays
  {
    id: '5',
    title: 'Introduction to Web Performance',
    description: 'Learn the fundamentals of web performance optimization including Core Web Vitals, lazy loading, and caching strategies.',
    scheduled_at: addDays(now, -7).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-performance',
    replay_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    is_active: false,
    created_at: addDays(now, -40).toISOString(),
    registrations_count: 423,
    available_spots: 0,
  },
  {
    id: '6',
    title: 'GraphQL Fundamentals',
    description: 'Get started with GraphQL and learn how to build efficient, type-safe APIs.',
    scheduled_at: addDays(now, -14).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-graphql',
    replay_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    is_active: false,
    created_at: addDays(now, -50).toISOString(),
    registrations_count: 389,
    available_spots: 0,
  },
  {
    id: '7',
    title: 'Testing Best Practices',
    description: 'Master unit testing, integration testing, and E2E testing with Jest, React Testing Library, and Playwright.',
    scheduled_at: addDays(now, -21).toISOString(),
    duration_minutes: 60,
    host_name: 'Sarah Chen',
    host_bio: 'Senior Software Engineer at Meta with 10+ years of experience.',
    host_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    max_capacity: 500,
    cal_com_event_type_id: 'webinar-testing',
    replay_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    is_active: false,
    created_at: addDays(now, -60).toISOString(),
    registrations_count: 356,
    available_spots: 0,
  },
]

export const mockRegistrations: Registration[] = [
  {
    id: '1',
    webinar_id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    company: 'Tech Corp',
    phone: '+1 555-0123',
    timezone: 'America/New_York',
    cal_com_booking_id: 'cal_123',
    attended: false,
    created_at: addDays(now, -5).toISOString(),
  },
  {
    id: '2',
    webinar_id: '1',
    name: 'Emily Johnson',
    email: 'emily.j@startup.io',
    company: 'Startup.io',
    phone: null,
    timezone: 'America/Los_Angeles',
    cal_com_booking_id: 'cal_124',
    attended: false,
    created_at: addDays(now, -4).toISOString(),
  },
  {
    id: '3',
    webinar_id: '1',
    name: 'Michael Chen',
    email: 'mchen@bigtech.com',
    company: 'BigTech Inc',
    phone: '+1 555-0456',
    timezone: 'America/Chicago',
    cal_com_booking_id: 'cal_125',
    attended: false,
    created_at: addDays(now, -3).toISOString(),
  },
  {
    id: '4',
    webinar_id: '5',
    name: 'Sarah Williams',
    email: 'swilliams@corp.com',
    company: 'Corp Industries',
    phone: null,
    timezone: 'Europe/London',
    cal_com_booking_id: 'cal_126',
    attended: true,
    created_at: addDays(now, -20).toISOString(),
  },
  {
    id: '5',
    webinar_id: '5',
    name: 'David Brown',
    email: 'dbrown@agency.co',
    company: 'Creative Agency',
    phone: '+1 555-0789',
    timezone: 'America/New_York',
    cal_com_booking_id: 'cal_127',
    attended: true,
    created_at: addDays(now, -18).toISOString(),
  },
]

export const mockEmailLogs: EmailLog[] = [
  {
    id: '1',
    registration_id: '1',
    email_type: 'confirmation',
    sent_at: addDays(now, -5).toISOString(),
    delivered: true,
    opened: true,
    clicked: true,
  },
  {
    id: '2',
    registration_id: '2',
    email_type: 'confirmation',
    sent_at: addDays(now, -4).toISOString(),
    delivered: true,
    opened: true,
    clicked: false,
  },
  {
    id: '3',
    registration_id: '3',
    email_type: 'confirmation',
    sent_at: addDays(now, -3).toISOString(),
    delivered: true,
    opened: false,
    clicked: false,
  },
  {
    id: '4',
    registration_id: '4',
    email_type: 'confirmation',
    sent_at: addDays(now, -20).toISOString(),
    delivered: true,
    opened: true,
    clicked: true,
  },
  {
    id: '5',
    registration_id: '4',
    email_type: 'reminder_24h',
    sent_at: addDays(now, -8).toISOString(),
    delivered: true,
    opened: true,
    clicked: true,
  },
  {
    id: '6',
    registration_id: '4',
    email_type: 'followup',
    sent_at: addDays(now, -7).toISOString(),
    delivered: true,
    opened: true,
    clicked: true,
  },
]

export const mockEmailTemplates: EmailTemplate[] = [
  {
    id: '1',
    type: 'confirmation',
    subject: 'You\'re registered for {{webinar_title}}!',
    body_html: `
      <h1>Welcome, {{name}}!</h1>
      <p>You're all set for our upcoming webinar:</p>
      <h2>{{webinar_title}}</h2>
      <p><strong>Date:</strong> {{webinar_date}}</p>
      <p><strong>Time:</strong> {{webinar_time}} ({{timezone}})</p>
      <p>Add this event to your calendar:</p>
      <p>
        <a href="{{google_calendar_link}}">Google Calendar</a> |
        <a href="{{outlook_calendar_link}}">Outlook</a> |
        <a href="{{apple_calendar_link}}">Apple Calendar</a>
      </p>
      <p>See you there!</p>
    `,
    updated_at: addDays(now, -30).toISOString(),
  },
  {
    id: '2',
    type: 'reminder_24h',
    subject: 'Reminder: {{webinar_title}} is tomorrow!',
    body_html: `
      <h1>Hi {{name}},</h1>
      <p>Just a friendly reminder that our webinar is happening tomorrow!</p>
      <h2>{{webinar_title}}</h2>
      <p><strong>Date:</strong> {{webinar_date}}</p>
      <p><strong>Time:</strong> {{webinar_time}} ({{timezone}})</p>
      <p>Prepare your questions and we'll see you there!</p>
    `,
    updated_at: addDays(now, -30).toISOString(),
  },
  {
    id: '3',
    type: 'reminder_1h',
    subject: '{{webinar_title}} starts in 1 hour!',
    body_html: `
      <h1>Hey {{name}},</h1>
      <p>The webinar is about to start in just 1 hour!</p>
      <h2>{{webinar_title}}</h2>
      <p><a href="{{join_link}}">Click here to join</a></p>
      <p>See you soon!</p>
    `,
    updated_at: addDays(now, -30).toISOString(),
  },
  {
    id: '4',
    type: 'followup',
    subject: 'Thanks for attending {{webinar_title}}!',
    body_html: `
      <h1>Thanks for joining, {{name}}!</h1>
      <p>We hope you enjoyed the webinar on {{webinar_title}}.</p>
      <p><a href="{{replay_link}}">Watch the replay</a></p>
      <p>Join us next week for our next session!</p>
      <p><a href="{{next_webinar_link}}">Register for next week</a></p>
    `,
    updated_at: addDays(now, -30).toISOString(),
  },
]

export const mockReplayViews: ReplayView[] = [
  {
    id: '1',
    webinar_id: '5',
    viewer_email: 'viewer1@example.com',
    watched_seconds: 3200,
    created_at: addDays(now, -5).toISOString(),
  },
  {
    id: '2',
    webinar_id: '5',
    viewer_email: 'viewer2@example.com',
    watched_seconds: 2800,
    created_at: addDays(now, -4).toISOString(),
  },
  {
    id: '3',
    webinar_id: '6',
    viewer_email: 'viewer3@example.com',
    watched_seconds: 3600,
    created_at: addDays(now, -3).toISOString(),
  },
]

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'These webinars have completely transformed how I approach React development. The practical examples and real-world insights are invaluable.',
    author_name: 'Alex Rivera',
    author_title: 'Senior Developer',
    author_company: 'Netflix',
    author_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '2',
    quote: 'Finally found a webinar series that goes beyond the basics. Sarah\'s expertise and teaching style make complex topics accessible.',
    author_name: 'Maria Santos',
    author_title: 'Tech Lead',
    author_company: 'Spotify',
    author_image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '3',
    quote: 'I\'ve attended dozens of webinars, but these stand out. The Q&A sessions alone are worth joining. Highly recommended for any developer.',
    author_name: 'James Wilson',
    author_title: 'Full Stack Developer',
    author_company: 'Stripe',
    author_image_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
  },
  {
    id: '4',
    quote: 'The depth of content is impressive. Each session builds on the previous one, creating a comprehensive learning path.',
    author_name: 'Priya Sharma',
    author_title: 'Engineering Manager',
    author_company: 'Uber',
    author_image_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
  },
]

export const mockFAQs: FAQ[] = [
  {
    id: '1',
    question: 'What time are the webinars held?',
    answer: 'Our webinars are held every Thursday at 2:00 PM Eastern Time (EST/EDT). We chose this time to accommodate attendees from various time zones across North America and Europe.',
  },
  {
    id: '2',
    question: 'Will I receive a recording if I can\'t attend live?',
    answer: 'Yes! All registered attendees receive access to the full recording within 24 hours of the live session. You can access replays anytime from our Replay Library.',
  },
  {
    id: '3',
    question: 'How long are the webinars?',
    answer: 'Each webinar runs for approximately 60 minutes, including a 15-minute Q&A session at the end where you can ask questions directly to our speaker.',
  },
  {
    id: '4',
    question: 'Is there a cost to attend?',
    answer: 'Our weekly webinars are completely free to attend. Simply register with your email address and you\'ll receive all the information you need to join.',
  },
  {
    id: '5',
    question: 'What topics do you cover?',
    answer: 'We cover a wide range of modern web development topics including React, TypeScript, Node.js, CSS, testing, performance optimization, and more. Check our upcoming schedule to see what\'s next!',
  },
  {
    id: '6',
    question: 'Can I ask questions during the webinar?',
    answer: 'Absolutely! We encourage questions throughout the session via the chat. We also have a dedicated Q&A section at the end where our speaker answers the most popular questions.',
  },
  {
    id: '7',
    question: 'Do I need any prerequisites?',
    answer: 'Most of our webinars are designed for intermediate to advanced developers with some experience in web development. Each session description includes specific prerequisites if any are required.',
  },
]

export const mockBenefits: Benefit[] = [
  {
    id: '1',
    icon: 'Code',
    title: 'Practical Code Examples',
    description: 'Every concept is backed by real-world code examples you can use in your projects immediately.',
  },
  {
    id: '2',
    icon: 'Users',
    title: 'Live Q&A Sessions',
    description: 'Get your questions answered directly by industry experts during our interactive Q&A segments.',
  },
  {
    id: '3',
    icon: 'Video',
    title: 'Lifetime Replay Access',
    description: 'Missed a session? No problem. All recordings are available in our comprehensive replay library.',
  },
  {
    id: '4',
    icon: 'TrendingUp',
    title: 'Career Growth',
    description: 'Stay ahead of the curve with the latest technologies and best practices in modern web development.',
  },
  {
    id: '5',
    icon: 'Award',
    title: 'Certificate of Completion',
    description: 'Receive certificates for attended webinars to showcase your continuous learning journey.',
  },
  {
    id: '6',
    icon: 'Globe',
    title: 'Global Community',
    description: 'Join thousands of developers worldwide and expand your professional network.',
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  totalRegistrations: 2847,
  upcomingAttendees: 747,
  replayViews: 12453,
  emailOpenRate: 68.5,
  registrationsTrend: [
    { date: addDays(now, -29).toISOString().split('T')[0], registrations: 45 },
    { date: addDays(now, -28).toISOString().split('T')[0], registrations: 52 },
    { date: addDays(now, -27).toISOString().split('T')[0], registrations: 48 },
    { date: addDays(now, -26).toISOString().split('T')[0], registrations: 61 },
    { date: addDays(now, -25).toISOString().split('T')[0], registrations: 55 },
    { date: addDays(now, -24).toISOString().split('T')[0], registrations: 67 },
    { date: addDays(now, -23).toISOString().split('T')[0], registrations: 72 },
    { date: addDays(now, -22).toISOString().split('T')[0], registrations: 58 },
    { date: addDays(now, -21).toISOString().split('T')[0], registrations: 63 },
    { date: addDays(now, -20).toISOString().split('T')[0], registrations: 71 },
    { date: addDays(now, -19).toISOString().split('T')[0], registrations: 84 },
    { date: addDays(now, -18).toISOString().split('T')[0], registrations: 78 },
    { date: addDays(now, -17).toISOString().split('T')[0], registrations: 92 },
    { date: addDays(now, -16).toISOString().split('T')[0], registrations: 86 },
    { date: addDays(now, -15).toISOString().split('T')[0], registrations: 95 },
    { date: addDays(now, -14).toISOString().split('T')[0], registrations: 103 },
    { date: addDays(now, -13).toISOString().split('T')[0], registrations: 89 },
    { date: addDays(now, -12).toISOString().split('T')[0], registrations: 97 },
    { date: addDays(now, -11).toISOString().split('T')[0], registrations: 112 },
    { date: addDays(now, -10).toISOString().split('T')[0], registrations: 105 },
    { date: addDays(now, -9).toISOString().split('T')[0], registrations: 118 },
    { date: addDays(now, -8).toISOString().split('T')[0], registrations: 124 },
    { date: addDays(now, -7).toISOString().split('T')[0], registrations: 131 },
    { date: addDays(now, -6).toISOString().split('T')[0], registrations: 119 },
    { date: addDays(now, -5).toISOString().split('T')[0], registrations: 127 },
    { date: addDays(now, -4).toISOString().split('T')[0], registrations: 142 },
    { date: addDays(now, -3).toISOString().split('T')[0], registrations: 138 },
    { date: addDays(now, -2).toISOString().split('T')[0], registrations: 156 },
    { date: addDays(now, -1).toISOString().split('T')[0], registrations: 163 },
    { date: now.toISOString().split('T')[0], registrations: 147 },
  ],
}

export const companyLogos = [
  { name: 'Google', logo: 'G' },
  { name: 'Meta', logo: 'M' },
  { name: 'Apple', logo: 'A' },
  { name: 'Amazon', logo: 'A' },
  { name: 'Netflix', logo: 'N' },
  { name: 'Spotify', logo: 'S' },
  { name: 'Stripe', logo: 'S' },
  { name: 'Uber', logo: 'U' },
]
