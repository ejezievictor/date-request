# 📧 Automated Email Setup Guide

## 🚀 Quick Setup Options

### Option 1: Netlify Forms (Recommended)
1. Deploy to Netlify (drag & drop the `queen` folder)
2. Go to Site Settings → Forms
3. Enable form notifications to `ejezievictor7@gmail.com`
4. Done! You'll get automatic emails

### Option 2: Zapier Webhook
1. Go to zapier.com and create a new Zap
2. Trigger: Webhooks by Zapier → Catch Hook
3. Action: Email by Zapier → Send Outbound Email
4. Copy the webhook URL and replace in `script.js` line 545:
   ```javascript
   const zapierWebhook = 'YOUR_ZAPIER_WEBHOOK_URL_HERE';
   ```

### Option 3: Make.com Webhook
1. Go to make.com and create a new scenario
2. Add Webhook → Custom webhook
3. Add Email → Send an email
4. Copy the webhook URL and replace in `script.js` line 556:
   ```javascript
   const makeWebhook = 'YOUR_MAKE_WEBHOOK_URL_HERE';
   ```

### Option 4: Formspree (Simple)
1. Go to formspree.io
2. Create a new form with endpoint
3. Replace the form action in the HTML forms with your Formspree endpoint

## 📊 What You'll Receive

### 🎉 Success Emails (When Queen Says Yes)
```
Subject: 👑 Queen Said YES! - session_123456
Content: Complete interaction log with all answers
```

### 😔 Abandonment Emails (When Queen Leaves)
```
Subject: 😔 Queen Left Without Saying Yes - session_123456
Content: How far she got, time spent, partial answers
```

### 📈 Tracking Features
- ✅ Unique session IDs for each visitor
- ✅ Complete interaction timeline
- ✅ Browser and device information
- ✅ Time spent on each question
- ✅ Abandonment detection (30 seconds inactivity)
- ✅ Page visibility tracking
- ✅ Mobile responsive tracking

## 🔧 Current Configuration

The system is set up to send emails via:
1. **Netlify Forms** (primary method)
2. **Zapier webhook** (backup)
3. **Make.com webhook** (backup)
4. **Local storage** (emergency backup)

## 📱 Mobile Responsive

All tracking works on:
- ✅ Desktop browsers
- ✅ Mobile phones
- ✅ Tablets
- ✅ Touch devices

## 🛠 Customization

To change the email address, update:
- Line 525 in `script.js`: Netlify form email
- Line 545 in `script.js`: Zapier webhook email
- Line 640 in `script.js`: Abandonment email
- `netlify.toml`: Notification email

## 🚀 Deployment

### Netlify (Recommended)
1. Zip the `queen` folder
2. Go to netlify.com
3. Drag & drop the zip file
4. Enable form notifications in settings

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the queen folder
3. Set up form handling separately

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages
3. Use external webhook services for emails

## 📧 Email Templates

The system sends beautifully formatted emails with:
- Session tracking information
- Complete question/answer logs
- Timestamps for each interaction
- Browser and device details
- Abandonment analysis (if applicable)

## 🔍 Debugging

Check browser console for:
- `📧 Automated emails sent for session: [ID]`
- `✅ Netlify form submitted successfully`
- `💾 Data saved to localStorage as backup`

## 📞 Support

If emails aren't working:
1. Check browser console for errors
2. Verify webhook URLs are correct
3. Test with a simple form submission
4. Check spam folder for emails
5. Verify email address is correct in code
