# TeamHub Dashboard 🚀

A modern, responsive Space Omid dashboard built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS. Features complete authentication system with beautiful UI/UX.

![TeamHub Dashboard](https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=1200&h=600&fit=crop)

## ✨ Features

- **🔐 Complete Authentication System**
  - Login with email/password
  - User registration
  - Password reset functionality
  - Persistent authentication with localStorage
  - Protected routes with automatic redirects

- **👥 Team Management**
  - View team members in modern card layout
  - Add new team members
  - Edit existing member details
  - Delete members with confirmation
  - Search and filter functionality
  - Pagination support

- **🎨 Modern UI/UX**
  - Beautiful gradient backgrounds
  - Glass-morphism effects with backdrop blur
  - Smooth animations and transitions
  - Responsive design for all devices
  - Loading states with skeleton animations
  - Professional error handling

- **⚡ Performance Optimized**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Redux Toolkit for state management
  - Optimized images and assets
  - Production-ready build configuration

## 🛠️ Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **Icons:** Heroicons (SVG)
- **Deployment:** Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd teamhub-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Demo Credentials

Use these credentials to test the authentication system:

**Admin Account:**
- Email: `admin@teamhub.com`
- Password: `admin123`

**Regular User:**
- Email: `john@teamhub.com`
- Password: `password123`

## 📁 Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Header.tsx      # Navigation header with user dropdown
│   └── ProtectedRoute.tsx # Route protection wrapper
├── pages/              # Next.js pages
│   ├── auth/           # Authentication pages
│   │   ├── login.tsx   # Login page
│   │   ├── register.tsx # Registration page
│   │   └── forgot-password.tsx # Password reset
│   ├── users/          # User management pages
│   │   ├── index.tsx   # Users list
│   │   ├── create.tsx  # Add new user
│   │   ├── [id].tsx    # User details
│   │   └── [id]/edit.tsx # Edit user
│   ├── _app.tsx        # App wrapper with Redux provider
│   ├── index.tsx       # Home page with auto-redirect
│   └── 404.tsx         # Custom 404 page
├── store/              # Redux store configuration
│   ├── store.ts        # Store setup
│   ├── authSlice.ts    # Authentication state
│   └── userSlice.ts    # User management state
├── types/              # TypeScript type definitions
│   ├── auth.ts         # Authentication types
│   └── user.ts         # User types
├── services/           # API services
│   └── authApi.ts      # Mock authentication API
└── styles/
    └── globals.css     # Global styles and Tailwind imports
```

## 🚀 Deployment on Vercel

### Automatic Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and configure settings

3. **Deploy**
   - Click "Deploy"
   - Your app will be available at `https://your-app-name.vercel.app`

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Environment Variables (Optional)

If you want to add environment variables in Vercel:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add variables like:
   - `NEXT_PUBLIC_APP_NAME=TeamHub Dashboard`
   - `NEXT_PUBLIC_APP_URL=https://your-app.vercel.app`

## 📱 Features Overview

### Authentication Pages
- **Login:** Clean form with validation and demo credentials
- **Register:** Multi-step form with strong password requirements
- **Forgot Password:** Email-based password reset simulation

### Dashboard Pages
- **Users List:** Modern card grid with search and pagination
- **User Details:** Comprehensive profile view with actions
- **Create User:** Form with real-time validation
- **Edit User:** Pre-populated form with change tracking

### Navigation
- **Header:** User profile dropdown with logout
- **Protected Routes:** Automatic authentication checking
- **404 Page:** Custom page that preserves auth state

## 🎨 Design System

- **Colors:** Blue and purple gradients with neutral grays
- **Typography:** Clean, modern fonts with proper hierarchy
- **Spacing:** Consistent 8px grid system
- **Components:** Reusable with consistent styling
- **Animations:** Smooth transitions and hover effects

## 🔧 Configuration Files

- `next.config.js` - Next.js configuration with optimizations
- `vercel.json` - Vercel deployment configuration
- `tailwind.config.js` - Tailwind CSS customization
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## 📦 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Heroicons](https://heroicons.com/) for beautiful icons
- [Unsplash](https://unsplash.com/) for demo images

---

**Made with ❤️ for modern Space Omid**
