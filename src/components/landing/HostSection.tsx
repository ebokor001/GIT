import { motion } from 'framer-motion'
import { Linkedin, Twitter, Github, Award, Building2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { mockWebinars } from '@/data/mockData'

export function HostSection() {
  const host = mockWebinars[0] // Get host info from first webinar

  const credentials = [
    { icon: Building2, text: 'Senior Engineer at Meta' },
    { icon: Award, text: '10+ Years Experience' },
    { icon: BookOpen, text: 'Speaker at React Conf' },
  ]

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
  ]

  return (
    <section className="py-20 md:py-32 px-4 bg-background relative">
      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />

              {/* Image container */}
              <div className="relative glass-card rounded-3xl p-4 overflow-hidden">
                <img
                  src={host.host_image_url || ''}
                  alt={host.host_name || 'Host'}
                  className="w-full h-full object-cover rounded-2xl"
                />

                {/* Floating badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-4 -right-4 glass-card rounded-xl p-4 shadow-xl"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold gradient-text">500+</div>
                    <div className="text-xs text-muted-foreground">
                      Webinars Hosted
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Your Host
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {host.host_name}
            </h2>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {host.host_bio}
            </p>

            {/* Credentials */}
            <div className="space-y-4 mb-8">
              {credentials.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Company Logos */}
            <div className="mb-8">
              <p className="text-sm text-muted-foreground mb-4">
                Previously worked at:
              </p>
              <div className="flex items-center gap-4">
                {['Google', 'Airbnb', 'Meta'].map((company) => (
                  <div
                    key={company}
                    className="px-4 py-2 rounded-lg glass-card text-sm font-medium"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
