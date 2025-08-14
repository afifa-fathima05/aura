import HeroSection from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { PureFirestoreEventsSection } from '@/components/sections/PureFirestoreEventsSection'

import { JoinUsSection } from '@/components/sections/JoinUsSection'
import { SimpleClubMembersSection } from '@/components/sections/SimpleClubMembersSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { HashNavigationHandler } from '@/components/navigation/HashNavigationHandler'

export default function Home() {
  return (
    <div className="relative">
      <HashNavigationHandler />
      <HeroSection />
      <AboutSection />
      <PureFirestoreEventsSection />
      <JoinUsSection />
      <SimpleClubMembersSection />
      <ContactSection />
    </div>
  )
}