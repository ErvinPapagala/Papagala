# 🦜 Papagajët e Arbërisë

A beautiful, modern website for selling tropical parrots with professional training services.

## ✨ Features

- **Modern Design** - Beautiful, responsive design with smooth animations
- **Parrot Gallery** - Showcase parrots with detailed information and images
- **Training Services** - Professional parrot training and consultation
- **Admin Panel** - Secure admin interface for managing parrots and content
- **Contact Integration** - Email, phone, and WhatsApp integration
- **Mobile Responsive** - Works perfectly on all devices

## 🚀 Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/GSGU/Papagala)

### Quick Deployment Steps:

1. **Fork this repository** to your GitHub account
2. **Connect to Netlify:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose GitHub and select your forked repository
3. **Configure Environment Variables** in Netlify:
   - Go to Site Settings → Environment Variables
   - Add all variables from `.env.example`
4. **Deploy!** - Netlify will automatically build and deploy your site

### Required Environment Variables:

```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-site.netlify.app
NEXT_PUBLIC_SITE_NAME=Papagajët e Arbërisë
NEXT_PUBLIC_CONTACT_EMAIL=epapagala_al@outlook.com
NEXT_PUBLIC_CONTACT_PHONE=+355 69 454 5405
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_key
ADMIN_PASSWORD=your_secure_admin_password
ADMIN_JWT_SECRET=your_jwt_secret
```

## 🔧 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GSGU/Papagala.git
   cd Papagala
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## 🔐 Admin Access

- **Admin URL:** `/ErvinAdmin`
- **Features:** Manage parrots, training services, and content
- **Security:** 5-minute session timeout for enhanced security

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Styling:** Custom CSS with modern design system
- **Database:** Supabase
- **Authentication:** JWT with secure admin panel
- **Deployment:** Netlify
- **Language:** TypeScript

## 📱 Contact

- **Email:** epapagala_al@outlook.com
- **Phone:** +355 69 454 5405
- **WhatsApp:** Available through website

## 📄 License

This project is private and proprietary.

---

Made with ❤️ for tropical parrot enthusiasts in Albania