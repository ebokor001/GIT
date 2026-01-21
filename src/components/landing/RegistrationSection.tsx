import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getTimezones, detectTimezone } from '@/lib/utils'

const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  phone: z.string().optional(),
  timezone: z.string().min(1, 'Please select a timezone'),
  terms_accepted: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the terms and conditions' }),
  }),
})

type RegistrationFormData = z.infer<typeof registrationSchema>

interface RegistrationSectionProps {
  id?: string
}

export function RegistrationSection({ id }: RegistrationSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      timezone: detectTimezone(),
      terms_accepted: false,
    },
  })

  const termsAccepted = watch('terms_accepted')
  const timezones = getTimezones()

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log('Registration data:', data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  if (isSuccess) {
    return (
      <section id={id} className="py-20 md:py-32 px-4 bg-muted/30 relative">
        <div className="container max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 md:p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </motion.div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              You're All Set!
            </h2>
            <p className="text-muted-foreground mb-6">
              Check your email for a confirmation with calendar invites and all
              the details you need to join the webinar.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>What happens next:</p>
              <ul className="space-y-1">
                <li>Confirmation email with calendar links</li>
                <li>24-hour reminder before the webinar</li>
                <li>1-hour reminder with join link</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id={id} className="py-20 md:py-32 px-4 bg-muted/30 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Cal.com placeholder or info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Reserve Your <span className="gradient-text">Free Spot</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of developers who are leveling up their skills
              every week. Registration takes less than 30 seconds.
            </p>

            <div className="space-y-4">
              {[
                'Instant confirmation email with calendar invites',
                'Automatic reminders so you never miss a session',
                'Access to exclusive replay library',
                'Q&A priority for registered attendees',
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Cal.com embed placeholder */}
            <div className="mt-8 p-6 rounded-xl border-2 border-dashed border-muted-foreground/20 text-center">
              <p className="text-sm text-muted-foreground">
                Cal.com scheduling widget can be embedded here.
                <br />
                Configure your Cal.com Event Type ID in settings.
              </p>
            </div>
          </motion.div>

          {/* Right side - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">Register Now</h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    placeholder="John Smith"
                    {...register('name')}
                    className={errors.name ? 'border-destructive' : ''}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register('email')}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      placeholder="Optional"
                      {...register('company')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      placeholder="Optional"
                      {...register('phone')}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone *</Label>
                  <Select
                    defaultValue={detectTimezone()}
                    onValueChange={(value) => setValue('timezone', value)}
                  >
                    <SelectTrigger
                      className={errors.timezone ? 'border-destructive' : ''}
                    >
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.timezone && (
                    <p className="text-sm text-destructive">
                      {errors.timezone.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) =>
                      setValue('terms_accepted', checked === true)
                    }
                    className={errors.terms_accepted ? 'border-destructive' : ''}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal cursor-pointer"
                    >
                      I agree to receive email communications about the webinar
                      and future updates. *
                    </Label>
                    {errors.terms_accepted && (
                      <p className="text-sm text-destructive">
                        {errors.terms_accepted.message}
                      </p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    'Reserve My Free Spot'
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By registering, you agree to our{' '}
                  <a href="#" className="text-primary hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
