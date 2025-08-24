# 🚀 Deployment Checklist for Netlify

## Before Deployment

- [x] ✅ Contact information updated (email & phone)
- [x] ✅ Environment variables configured
- [x] ✅ Admin security implemented (5-minute sessions)
- [x] ✅ Responsive design tested
- [x] ✅ All pages working correctly

## Netlify Deployment Steps

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Choose GitHub
4. Select your `Papagala` repository
5. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`

### 3. Environment Variables
Add these in Netlify Dashboard → Site Settings → Environment Variables:

```env
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://your-site-name.netlify.app
NEXT_PUBLIC_SITE_NAME=Papagajët e Arbërisë
NEXT_PUBLIC_CONTACT_EMAIL=epapagala_al@outlook.com
NEXT_PUBLIC_CONTACT_PHONE=+355 69 454 5405
NEXT_PUBLIC_SUPABASE_URL=https://epjjvvjawvmuttdopijl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwamp2dmphd3ZtdXR0ZG9waWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYwMjYzOTgsImV4cCI6MjA3MTYwMjM5OH0.Uk7yNKIdADw3i2uH5s4IOkOOOTmfm_EzBmRhCBimM2k
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwamp2dmphd3ZtdXR0ZG9waWpsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NjAyNjM5OCwiZXhwIjoyMDcxNjAyMzk4fQ.8zJErCNAS-gsYt0mfU3gQOjYwgM9dZGocJCiG6OHo2c
ADMIN_PASSWORD=Ervinsead2000
ADMIN_JWT_SECRET=Erviniasht25
```

### 4. Deploy!
- Click "Deploy site"
- Wait for build to complete
- Your site will be live at `https://your-site-name.netlify.app`

## After Deployment

### Test Everything:
- [ ] Homepage loads correctly
- [ ] Parrot listings display properly
- [ ] Contact information is correct
- [ ] Admin panel works (`/ErvinAdmin`)
- [ ] Mobile responsiveness
- [ ] All links work

### Update URLs:
- [ ] Update `NEXT_PUBLIC_BASE_URL` with your actual Netlify URL
- [ ] Test admin login
- [ ] Verify Supabase connection

## Custom Domain (Optional)
1. In Netlify: Site Settings → Domain Management
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_BASE_URL` to your custom domain

## 🎉 Your Website is Live!

Admin Access: `https://your-site.netlify.app/ErvinAdmin`
Password: `Ervinsead2000` (change this in environment variables for security)

---

**Need help?** Check the build logs in Netlify dashboard if deployment fails.