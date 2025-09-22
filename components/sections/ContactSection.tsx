'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Instagram, 
  Linkedin, 
  Facebook,
  Youtube,
  MessageCircle,
  Clock,
  Globe
} from 'lucide-react'
import { addContactSubmission } from '@/lib/firebaseServices'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'aurapecai@gmail.com',
    description: 'Get in touch for general inquiries',
    color: 'text-neon-blue'
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 6379 279 094',
    description: 'Available Mon-Fri, 9AM-6PM',
    color: 'text-neon-purple'
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    content: 'PANIMALAR AI&DS Block',
    description: 'Panimalar Engineering College',
    color: 'text-teal-400'
  },
  {
    icon: Clock,
    title: 'Office Hours',
    content: 'Mon-Fri: 9AM-6PM',
    description: 'Weekend events by appointment',
    color: 'text-teal-300'
  },
]

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/auraclub.pec?igsh=MXEwemFqOThnOWJyYw%3D%3D&utm_source=qr', color: 'hover:text-pink-400' },
  { name: 'LinkedIn', icon: Linkedin, href: 'http://linkedin.com/company/auraclub-pec/', color: 'text-blue-500' },
  { name: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/auraclub.pec', color: 'hover:text-blue-400' },
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@auraclubpec', color: 'hover:text-red-500' },
]

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    
    try {
      console.log('🚀 Submitting contact form:', formData)
      
      // Validate form data
      if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
        throw new Error('Please fill in all required fields')
      }
      
      const result = await addContactSubmission({
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      })
      
      console.log('✅ Contact form submitted successfully with ID:', result)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000)
    } catch (error: any) {
      console.error('❌ Error submitting contact form:', error)
      setError(error.message || 'Failed to send message. Please check your connection and try again.')
      setTimeout(() => setError(''), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 font-urbanist max-w-3xl mx-auto">
            Ready to start your creative journey? Have questions about our programs? 
            We&apos;d love to hear from you and help you take the next step.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-syne font-bold text-white mb-6 flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-aura-secondary" />
                  <span>Contact Information</span>
                </h3>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      whileHover={{ color: '#06d6a0' }}
                      className="glass p-4 rounded-xl cursor-pointer group hover:text-teal-400"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-syne font-semibold text-white mb-1 group-hover:text-aura-primary transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-gray-300 font-urbanist font-medium text-sm mb-1">
                            {info.content}
                          </p>
                          <p className="text-gray-400 font-urbanist text-xs">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass p-4 rounded-xl"
              >
                <h4 className="text-base font-syne font-semibold text-white mb-3">
                  Follow Us
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileTap={{ scale: 0.95 }}
                      className={`p-2 glass rounded-lg text-gray-400 ${social.color} transition-colors duration-300`}
                    >
                      <social.icon className="w-4 h-4" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass p-6 rounded-2xl flex flex-col justify-center"
            >
              <h3 className="text-xl font-syne font-bold text-white mb-4 flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-aura-primary" />
                <span>Send us a Message</span>
              </h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-neon-green/20 border border-neon-green rounded-lg text-neon-green font-urbanist text-sm"
                >
                  ✅ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-urbanist text-sm"
                >
                  ❌ {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="events">Event Information</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-urbanist font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist resize-none text-sm"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <div className="flex justify-center pt-3">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full btn-neon glass px-6 py-3 rounded-lg font-syne font-semibold text-white border border-aura-primary hover:bg-aura-primary/20 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner w-5 h-5"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Map Section Below - Desktop */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass p-6 rounded-xl mt-12"
          >
            <h4 className="text-lg font-syne font-semibold text-white mb-4">
              Find Us
            </h4>
            <div className="h-48 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.0765582!3d13.0497964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b0f9c10674d%3A0xcb7caa7469b205da!2sPANIMALAR%20AI%26DS%20block!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </div>
            <div className="mt-3 text-center">
              <p className="text-gray-400 font-urbanist text-sm">
                Panimalar Engineering College, Poonamallee
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-4 lg:p-6 rounded-2xl max-w-full flex flex-col justify-center"
            >
              <h3 className="text-xl lg:text-2xl font-syne font-bold text-white mb-4 flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-aura-primary" />
                <span>Send us a Message</span>
              </h3>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-3 bg-neon-green/20 border border-neon-green rounded-lg text-neon-green font-urbanist text-sm"
                >
                  ✅ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-3 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-400 font-urbanist text-sm"
                >
                  ❌ {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex flex-col justify-center">
                    <label htmlFor="name-mobile" className="block text-xs font-urbanist font-medium text-gray-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name-mobile"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-center text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <label htmlFor="email-mobile" className="block text-xs font-urbanist font-medium text-gray-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email-mobile"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-center text-sm"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <label htmlFor="subject-mobile" className="block text-xs font-urbanist font-medium text-gray-300 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject-mobile"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist text-center text-sm"
                  >
                    <option value="">Select a subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="events">Event Information</option>
                    <option value="collaboration">Collaboration Opportunity</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex flex-col justify-center">
                  <label htmlFor="message-mobile" className="block text-xs font-urbanist font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message-mobile"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={2}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-aura-primary focus:bg-white/10 transition-all duration-300 font-urbanist resize-none text-center text-sm"
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                <div className="flex justify-center pt-1">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full max-w-xs btn-neon glass px-4 py-2 rounded-lg font-syne font-semibold text-white border border-aura-primary hover:bg-aura-primary/20 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="loading-spinner w-4 h-4"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-syne font-bold text-white mb-6 flex items-center space-x-2">
                  <Globe className="w-6 h-6 text-aura-secondary" />
                  <span>Contact Information</span>
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 10 }}
                      className="glass p-6 rounded-xl cursor-pointer group"
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`${info.color} group-hover:scale-110 transition-transform duration-300`}>
                          <info.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="text-lg font-syne font-semibold text-white mb-1 group-hover:text-aura-primary transition-colors duration-300">
                            {info.title}
                          </h4>
                          <p className="text-gray-300 font-urbanist font-medium mb-1">
                            {info.content}
                          </p>
                          <p className="text-gray-400 font-urbanist text-sm">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
                className="glass p-6 rounded-xl"
              >
                <h4 className="text-lg font-syne font-semibold text-white mb-4">
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 glass rounded-lg text-gray-400 ${social.color} transition-colors duration-300`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="glass p-6 rounded-xl"
              >
                <h4 className="text-lg font-syne font-semibold text-white mb-4">
                  Find Us
                </h4>
                <div className="h-48 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d80.0765582!3d13.0497964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a528b0f9c10674d%3A0xcb7caa7469b205da!2sPANIMALAR%20AI%26DS%20block!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-gray-400 font-urbanist text-sm">
                    Panimalar Engineering College, Poonamallee
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-neon-pink rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 6 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}