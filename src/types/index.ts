// Database types matching the schema

export interface Webinar {
  id: string
  title: string
  description: string | null
  scheduled_at: string
  duration_minutes: number
  host_name: string | null
  host_bio: string | null
  host_image_url: string | null
  max_capacity: number | null
  cal_com_event_type_id: string | null
  replay_url: string | null
  is_active: boolean
  created_at: string
  // Computed fields
  registrations_count?: number
  available_spots?: number
}

export interface Registration {
  id: string
  webinar_id: string
  name: string
  email: string
  company: string | null
  phone: string | null
  timezone: string
  cal_com_booking_id: string | null
  attended: boolean
  created_at: string
  // Relations
  webinar?: Webinar
}

export interface EmailLog {
  id: string
  registration_id: string
  email_type: EmailType
  sent_at: string
  delivered: boolean
  opened: boolean
  clicked: boolean
  // Relations
  registration?: Registration
}

export type EmailType = 'confirmation' | 'reminder_24h' | 'reminder_1h' | 'followup'

export interface EmailTemplate {
  id: string
  type: EmailType
  subject: string
  body_html: string
  updated_at: string
}

export interface ReplayView {
  id: string
  webinar_id: string
  viewer_email: string
  watched_seconds: number
  created_at: string
  // Relations
  webinar?: Webinar
}

export interface Setting {
  id: string
  key: string
  value: Record<string, unknown>
}

// Form types
export interface RegistrationFormData {
  name: string
  email: string
  company?: string
  phone?: string
  timezone: string
  terms_accepted: boolean
}

export interface WebinarFormData {
  title: string
  description: string
  scheduled_at: string
  duration_minutes: number
  host_name: string
  host_bio: string
  host_image_url: string
  max_capacity: number
  cal_com_event_type_id: string
  is_active: boolean
}

export interface EmailTemplateFormData {
  type: EmailType
  subject: string
  body_html: string
}

// Dashboard metrics
export interface DashboardMetrics {
  totalRegistrations: number
  upcomingAttendees: number
  replayViews: number
  emailOpenRate: number
  registrationsTrend: {
    date: string
    registrations: number
  }[]
}

// Settings types
export interface BrandingSettings {
  logo_url: string
  primary_color: string
  secondary_color: string
  font_family: string
}

export interface CalComSettings {
  api_key: string
  api_url: string
  default_event_type_id: string
}

export interface EmailSettings {
  sender_name: string
  sender_email: string
  reply_to_email: string
}

export interface NotificationSettings {
  email_on_registration: boolean
  email_on_replay_view: boolean
  slack_webhook_url: string
}

// Testimonial type
export interface Testimonial {
  id: string
  quote: string
  author_name: string
  author_title: string
  author_company: string
  author_image_url: string
}

// FAQ type
export interface FAQ {
  id: string
  question: string
  answer: string
}

// Benefit type for What You'll Learn section
export interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}
