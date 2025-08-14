# AURA - Creative Club Website

A futuristic, premium web experience for a university-level creative club. Built with Next.js, featuring immersive 3D visuals, glassmorphism UI, neon effects, and elegant typography.

## ✨ Features

### 🎨 Design & UI
- **Dark mode default** with glowing gradients and particle backgrounds
- **Glassmorphism UI** with backdrop blur effects
- **Neon/glow effects** throughout the interface
- Rich visuals and animations (Framer Motion, Lottie)
- **Elegant typography** using Orbitron, Syne, and Urbanist fonts
- **Fully responsive** design with mobile optimization

### 🚀 Animations & Interactions
- **Smooth scroll** and parallax effects
- **Entrance animations** via Framer Motion
- **Interactive 3D objects** in hero section
- **Hover effects** with 3D transformations
- **Floating animations** and particle systems

### 📱 Pages & Sections
1. **Homepage** - Hero with 3D object and tagline "Where Creativity Meets Reality"
2. **About AURA** - Animated timeline with club history and values
3. **Events Gallery** - Filterable grid (Upcoming, Live, Archived) with modal previews
4. **Join Us CTA** - Membership tiers with interactive pricing cards
5. **Testimonials** - Animated carousel with success stories
6. **Contact** - Futuristic form with social links

### 🛠️ Admin Dashboard
- **Firebase Authentication** for secure admin access
- **Event Management** - Create, edit, delete events
- **Real-time updates** with Firestore integration
- **Image upload** with Firebase Storage
- **Live preview** of event forms
- **Responsive admin interface** matching the futuristic theme

## 🔧 Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom theme extensions
- **Framer Motion** for animations
- Video support on hero (right side), Framer Motion interactions
- **Firebase** (Auth + Firestore + Storage)
- **Lucide React** for icons

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for backend services)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AURA_1.1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Enable Storage
   - Copy your Firebase config

4. **Environment Setup**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Firebase configuration in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Admin Access

1. **Create an admin user** in Firebase Authentication console
2. **Access admin panel** at `/admin`
3. **Demo credentials** (if using mock auth):
   - Email: `admin@aura.club`
   - Password: `password123`

## 📁 Project Structure

```
AURA_1.1/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── 3d/               # 3D components
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## 🎨 Customization

### Colors
The color palette is defined in `tailwind.config.ts`:
- **Neon Blue**: `#00f5ff`
- **Neon Purple**: `#bf00ff`
- **Neon Pink**: `#ff0080`
- **Neon Green**: `#00ff41`

### Fonts
- **Orbitron**: Headings and brand text
- **Syne**: Subheadings and accent text
- **Urbanist**: Body text and UI elements

### Animations
Custom animations are defined in the Tailwind config:
- `float`: Floating animation for elements
- `glow`: Neon glow effect
- `pulse-neon`: Neon pulsing effect

## 🔥 Key Features Implementation

### 3D Graphics


### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Particle Background
```tsx
// Animated particle system with Canvas API
const ParticleBackground = () => {
  // Creates floating particles with connections
}
```

### Firebase Integration
```tsx
// Real-time event management
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Configure build settings
- **Custom Server**: Build with `npm run build`

Note: Firebase Hosting is not used in this project anymore.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Contact: contact@aura.club

---

**Built with ❤️ for the creative community**# AURACLUB-EVENT
# Auraclub
# Auraclub
# aura
