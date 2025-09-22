'use client'

import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Crown, Users, Calendar, Award, Star, Trophy, Target, Sparkles, Camera, FileText } from 'lucide-react'
import { LottieAnimation } from '@/components/ui/LottieAnimation'
import eliteCreativeAnimation from '@/components/lottie/elite creative netwrk.json'
import collaborationHighAnimation from '@/components/lottie/colaboration at a high level.json'
import leadingNotCatchingUpAnimation from '@/components/lottie/leading not catching up.json'
import fueledByVisionAnimation from '@/components/lottie/fuled by vision.json'

const roleDescriptions: Record<string, string> = {
  'FOUNDER': 'Founded AURA and continues to mentor the leadership team, ensuring the club\'s vision, culture, and long-term growth.',
  'PRESIDENT': 'Provides vision and strategic direction; oversees all club activities and operations.',
  'VICE-PRESIDENT': 'Assists the Chair; coordinates inter-departmental and external collaborations.',
  'SECRETARY': 'Manages communication, meetings, documentation, and schedules.',
  'TREASURER': 'Manages club funds and budget.',
  'EVENTS COORDINATOR': 'Plans and executes events.',
  'EVENTS COORDINATOR - HEAD': 'Plans and executes events.',
  'CULTURAL COORDINATOR': 'Manages culture-based events.',
  'PUBLIC RELATIONS & OUTREACH HEAD': 'Manages social media, branding, and external communication.',
  'PUBLIC RELATIONS & OUTREACH - HEAD': 'Manages social media, branding, and external communication.',
  'MASTER OF CEREMONIES': 'Hosts and engages the audience during events (Anchors).',
  'CREATIVE & DESIGN LEAD': 'Designs posters, event visuals, social media creatives, and club branding.',
  'PHOTOGRAPHY & VIDEOGRAPHY': 'Captures event highlights and maintains archives.',
  'MEMBERSHIP COORDINATOR': 'Recruits and onboards new members; organizes ice-breaking sessions and fun activities.',
  'CONTENT & DOCUMENTATION LEAD': 'Writes event reports, blogs, newsletters, and manages online repositories.'
}

const getRoleDescription = (position: string) => roleDescriptions[position] || ''

const clubMembers = [

  { id: 39, name: 'DR, S MALATHI M.E.,Ph.D', position: 'PROFESSOR & HOD', bio: 'Dr. S. Malath is a highly accomplished academician and researcher with expertise in engineering education and leadership. With extensive teaching and research experience, Dr. Malath has guided numerous students in their academic pursuits while fostering innovation, discipline, and excellence in the department. As Head of the Department, she has played a key role in curriculum development, student mentorship, and promoting industry–institute collaboration.',  imageUrl: '', achievements: [], icon: Crown, color: 'text-yellow-400' },
  { id: 40, name: 'DR, A JOSHI M.E.,Ph.D', position: 'EVENT SECRETARY', bio: 'Dr. A. Joshi is a dynamic academician and event coordinator recognized for his contributions to academic development and student engagement. With a strong background in engineering and research, he has actively organized and managed departmental and institutional events, seminars, and workshops. His efforts have created platforms for students to showcase talent, enhance technical knowledge, and build leadership skills.',  imageUrl: '', achievements: [], icon: Crown, color: 'text-yellow-400', },
  { id: 0, name: 'Mrs. S. SWATHI, M.E., (Ph.D)', position: 'Staff  cordinator', bio: 'Mrs. S. Swathi is the visionary founder of AURA and serves as its Event Coordinator. With a strong academic background and an unyielding passion for fostering creativity, she has been instrumental in shaping AURA’s mission and bringing groundbreaking events to life. Her leadership blends innovation with organization, ensuring every event leaves a lasting impact.',  imageUrl: '', achievements: [], icon: Crown, color: 'text-yellow-400' },
  { id: 1, name: 'Mrs. R. Vidhya Muthulakshmi, M.E., (Ph.D)', position: 'Staff  cordinator', bio: 'Mrs. R. Vidhya Muthulakshmi is a dedicated Event Coordinator and Consultant at AURA, known for her strategic guidance and commitment to excellence. Her expertise in planning and consulting ensures that each event aligns with AURA’s vision, delivering memorable experiences that inspire and engage the community.',  imageUrl: '', achievements: [], icon: Crown, color: 'text-yellow-400', },



  // President
  // President
  { id: 2, name: 'HARIVISHNU K C (III G)', position: 'PRESIDENT', bio: '', imageUrl: '', achievements: [], icon: Crown, color: 'text-aura-primary' },
  { id: 3, name: 'HARSHAVARTHINI T ( III A)', position: 'PRESIDENT', bio: '', imageUrl: '', achievements: [], icon: Crown, color: 'text-aura-primary' },

  // Vice President
  { id: 4, name: 'HARI PREETH S K (II E)', position: 'VICE-PRESIDENT', bio: '', imageUrl: '', achievements: [], icon: Users, color: 'text-neon-blue' },
  { id: 5, name: 'KAKU KRISHNA PRIYA(II B)', position: 'VICE-PRESIDENT', bio: '', imageUrl: '', achievements: [], icon: Users, color: 'text-neon-blue' },

  // Secretary
  { id: 6, name: 'HARIPRASAANTH K (III G)', position: 'SECRETARY', bio: '', imageUrl: '', achievements: [], icon: Calendar, color: 'text-neon-purple' },
  { id: 7, name: 'SWEETY VINCENT(III C)', position: 'SECRETARY', bio: '', imageUrl: '', achievements: [], icon: Calendar, color: 'text-neon-purple' },

  // Treasurer
  { id: 8, name: 'FARIH MD (III G) ', position: 'TREASURER', bio: '', imageUrl: '', achievements: [], icon: Award, color: 'text-neon-pink' },
  { id: 9, name: 'ALLEN JOSH (II D)', position: 'TREASURER', bio: '', imageUrl: '', achievements: [], icon: Award, color: 'text-neon-pink' },

    // Public Relations & Outreach - Head
  { id: 14, name: 'MOHAMED ARSHAD M ( III F)', position: 'PUBLIC RELATIONS & OUTREACH ', bio: 'MANAGES SOCIAL MEDIA, BRANDS AND EXTERNAL COMMUNICATIONS', imageUrl: '', achievements: [], icon: Target, color: 'text-neon-blue' },
  { id: 15, name: 'PRAVEENSANKAR R S (III E)', position: 'PUBLIC RELATIONS & OUTREACH ', bio: 'MANAGES SOCIAL MEDIA, BRANDS AND EXTERNAL COMMUNICATIONS', imageUrl: '', achievements: [], icon: Target, color: 'text-neon-blue' },
  { id: 37, name: 'DIYANATH K (III F)', position: 'PUBLIC RELATIONS & OUTREACH ', bio: 'MANAGES SOCIAL MEDIA, BRANDS AND EXTERNAL COMMUNICATIONS', imageUrl: '', achievements: [], icon: Target, color: 'text-neon-blue' },
  { id: 16, name: 'POOVARASAN S (III E)', position: 'PUBLIC RELATIONS & OUTREACH', bio: 'MANAGES SOCIAL MEDIA, BRANDS AND EXTERNAL COMMUNICATIONS', imageUrl: 'MANAGES SOCIAL MEDIA, BRANDS AND EXTERNAL COMMUNICATIONS', achievements: [], icon: Target, color: 'text-neon-blue' },

  // Cultural Coordinator
  { id: 10, name: 'HARISH J (III G)', position: 'CULTURAL COORDINATOR', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },
  { id: 11, name: 'BOOMIGA V (III A)', position: 'CULTURAL COORDINATOR', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },

  // Events Coordinator - Head
  { id: 12, name: 'SURYA K (III D)', position: 'EVENTS COORDINATOR - HEAD', bio: '', imageUrl: '', achievements: [], icon: Trophy, color: 'text-neon-green' },
  { id: 13, name: 'HEPZHIBHA RACHEL S (III B)', position: 'EVENTS COORDINATOR - HEAD', bio: '', imageUrl: '', achievements: [], icon: Trophy, color: 'text-neon-green' },



  // Master of Ceremonies
  { id: 17, name: 'JENISH J (III G)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  { id: 18, name: 'SIDDA GNANA CHARISHMA (III C)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  { id: 19, name: 'RAMYA S (III C)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },

  { id: 21, name: 'DHARSHINI(III A)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  { id: 22, name: 'KUNGUMAYEE M (II B)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  { id: 23, name: 'TARUN PADMANABHAN (II H)', position: 'MASTER OF CEREMONIES', bio: '', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },

  // Creative & Design Lead
  { id: 24, name: 'ABISHEK RANGARAJ M (III H)', position: 'CREATIVE & DESIGN LEAD', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },
  { id: 25, name: 'SHARAN RAJ P (III E)', position: 'CREATIVE & DESIGN LEAD', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },
  { id: 26, name: 'GURUCHARAN G(III G)', position: 'CREATIVE & DESIGN LEAD', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },
  { id: 27, name: 'HARI PREETH S K (II E)', position: 'CREATIVE & DESIGN LEAD', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },
  { id: 28, name: 'GAUTHAM E (II E)', position: 'CREATIVE & DESIGN LEAD', bio: '', imageUrl: '', achievements: [], icon: Star, color: 'text-yellow-400' },

  // Photography & Videography
  { id: 29, name: 'MONISH MEGHANATHAN (III F)', position: 'PHOTOGRAPHY & VIDEOGRAPHY', bio: '', imageUrl: '', achievements: [], icon: Camera, color: 'text-neon-blue' },
  { id: 30, name: 'NARESH R (III F)', position: 'PHOTOGRAPHY & VIDEOGRAPHY', bio: '', imageUrl: '', achievements: [], icon: Camera, color: 'text-neon-blue' },
    { id: 33, name: 'NAVEEN C (III F)', position: 'MEMBERSHIP COORDINATOR', bio: '', imageUrl: '', achievements: [], icon: Users, color: 'text-aura-primary' },
  { id: 31, name: 'VISHAL M (II H)', position: 'PHOTOGRAPHY & VIDEOGRAPHY', bio: '', imageUrl: '', achievements: [], icon: Camera, color: 'text-neon-blue' },
  { id: 32, name: 'SUBASH (II H)', position: 'PHOTOGRAPHY & VIDEOGRAPHY', bio: '', imageUrl: '', achievements: [], icon: Camera, color: 'text-neon-blue' },

  // Membership Coordinator

  { id: 34, name: 'JAGAN S (III G)', position: 'MEMBERSHIP COORDINATOR', bio: '', imageUrl: '', achievements: [], icon: Users, color: 'text-aura-primary' },

  // Content & Documentation Lead
  { id: 35, name: 'MUTHULAKSHMI A (III B)', position: 'CONTENT & DOCUMENTATION LEAD', bio: '', imageUrl: '', achievements: [], icon: FileText, color: 'text-neon-purple' },
  { id: 36, name: 'SANCTA FANNIE S (III C)', position: 'CONTENT & DOCUMENTATION LEAD', bio: '', imageUrl: '', achievements: [], icon: FileText, color: 'text-neon-purple' },

  { id: 20, name: 'HIBBAN RASHID (III G)', position: 'MARKETING COORDINATOR', bio: 'Drives marketing initiatives, ensuring maximum participation and student engagement in AURA activities.', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  { id: 20, name: 'HARISH RAGHAVENDRAN (II E)', position: 'MARKETING COORDINATOR', bio: 'Drives marketing initiatives, ensuring maximum participation and student engagement in AURA activities.', imageUrl: '', achievements: [], icon: Sparkles, color: 'text-neon-pink' },
  
  
  
]

const clubStats = [
  {
    title: 'Elite Creative Network',
    description: 'Where top talent meets true collaboration.',
    color: 'text-yellow-400',
    animation: eliteCreativeAnimation,
  },
  {
    title: 'Collaboration at a Higher Level',
    description: 'Where others network, we create legacies.',
    color: 'text-aura-primary',
    animation: collaborationHighAnimation,
  },
  {
    title: 'Leading, Not Catching Up',
    description: 'We set the trend. Others follow.',
    color: 'text-neon-purple',
    animation: leadingNotCatchingUpAnimation,
  },
  {
    title: 'Fuelled by Vision. Powered by Skill.',
    description: 'We don’t guess — we craft.',
    color: 'text-neon-pink',
    animation: fueledByVisionAnimation,
  },
]

export function SimpleClubMembersSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(false)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clubMembers.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextMember = () => {
    setCurrentIndex((prev) => (prev + 1) % clubMembers.length)
    setIsAutoPlaying(false)
  }

  const prevMember = () => {
    setCurrentIndex((prev) => (prev - 1 + clubMembers.length) % clubMembers.length)
    setIsAutoPlaying(false)
  }

  const currentMember = clubMembers[currentIndex]
  const IconComponent = currentMember.icon

  return (
    <section id="members" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold gradient-text mb-6">
            Meet Our Leadership
          </h2>
          <p className="text-xl text-gray-400 font-urbanist max-w-3xl mx-auto">
            Get to know the passionate leaders who drive AURA's mission and 
            create an inspiring environment for creativity and innovation.
          </p>
        </div>

        {/* Members Carousel */}
        <div className="mb-20">
          <div className="relative max-w-3xl mx-auto">
            {/* Main Member Card */}
            <div className="glass p-8 md:p-12 rounded-2xl min-h-[400px] flex items-center">
              <div className="w-full">
                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
                  {/* Name & Position */}
                  <div className="text-center lg:text-left lg:basis-1/3 lg:max-w-md break-words">
                    <h3 className="text-xl sm:text-2xl lg:text-xl font-syne font-bold text-white mb-2">
                      {currentMember.name}
                    </h3>
                    <p className={`text-lg font-urbanist font-semibold ${currentMember.color} mb-4`}>
                      {currentMember.position}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="flex-1 lg:basis-2/3">
                    <div className="text-sm sm:text-base text-gray-300 font-urbanist leading-relaxed max-w-prose mx-auto lg:mx-0">
                      {currentMember.bio || getRoleDescription(currentMember.position)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              {/* Hide arrows on small screens to allow touch drag/scroll */}
              <button
                onClick={prevMember}
                className="glass p-3 rounded-full text-white hover:text-neon-blue transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Dots Indicator removed as requested */}

              <button
                onClick={nextMember}
                className="glass p-3 rounded-full text-white hover:text-neon-blue transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Club Stats Grid */}
        <div>
          <h3 className="text-3xl font-syne font-bold text-center gradient-text mb-12">
            Our Impact
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clubStats.map((stat, index) => {
              return (
                <div
                  key={stat.title}
                  className="glass p-6 rounded-xl text-center group"
                >
                  <div className={`mb-4 inline-flex justify-center group-hover:scale-110 transition-transform duration-300`}>
                    {/* Prefer Lottie; colors are handled in animation */}
                    <LottieAnimation
                      animationData={stat.animation}
                      className="w-12 h-12"
                      loop={true}
                      autoplay={true}
                    />
                  </div>
                  <h4 className="text-lg font-syne font-semibold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                    {stat.title}
                  </h4>
                  <p className="text-gray-400 font-urbanist text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full opacity-60 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  )
}