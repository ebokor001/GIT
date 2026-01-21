import { Routes, Route } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { LandingPage } from '@/pages/landing'
import { AdminLayout } from '@/components/admin'
import {
  DashboardPage,
  WebinarsPage,
  RegistrationsPage,
  EmailsPage,
  ReplaysPage,
  SettingsPage,
} from '@/pages/admin'

export default function App() {
  return (
    <TooltipProvider>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Admin Dashboard */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="webinars" element={<WebinarsPage />} />
          <Route path="registrations" element={<RegistrationsPage />} />
          <Route path="emails" element={<EmailsPage />} />
          <Route path="replays" element={<ReplaysPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </TooltipProvider>
  )
}
