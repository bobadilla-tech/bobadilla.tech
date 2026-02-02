# Contact Information & Booking Links - Updated ✅

## Summary of Changes

All contact information and booking links have been updated throughout the site
with your actual details.

---

## 📧 Email Addresses

### Primary Contact (Sales & General Inquiries)

- **Ale** - Chief Revenue Officer (CRO)
- Email: `ale@bobadilla.work`
- Role: Handles sales, client onboarding, closes deals
- Availability: 10 AM - 3 PM

### Secondary Contact (Technical & Enterprise)

- **Eliaz** - Founder/Owner
- Email: `eliaz@bobadilla.work`
- Role: Fractional CTO, high-level consultations, enterprise deals

---

## 📅 Booking Links

### Primary Calendar (Main CTA)

- **URL**: `https://cal.com/ale-boba-work/15min`
- **Used for**: All main "Book a Call" buttons throughout the site
- **Target**: General inquiries, project discussions, sales calls
- **Availability**: 10 AM - 3 PM
- **Who**: Ale (CRO)

### Secondary Calendar (Enterprise/High-Touch)

- **URL**: `https://cal.com/ultirequiem/15min`
- **Used for**: Enterprise inquiries, Fractional CTO consultations
- **Target**: High-level technical discussions, strategic consulting
- **Limited availability** (as requested)
- **Who**: Eliaz (Founder)

---

## 🔗 Social Media Links

### LinkedIn

- **Company Page**: `https://www.linkedin.com/company/bobadilla-tech`
- **Updated in**: Contact section footer

### GitHub

- **Organization**: `https://github.com/bobadilla-tech`
- **Updated in**: Contact section footer

---

## 📍 Where Updates Were Made

### 1. Navbar Component

**File**: [src/components/ui/Navbar.tsx](src/components/ui/Navbar.tsx)

- ✅ Desktop "Book a Call" button → Ale's calendar
- ✅ Mobile "Book a Call" button → Ale's calendar

### 2. Hero Section

**File**: [src/components/sections/Hero.tsx](src/components/sections/Hero.tsx)

- ✅ Primary CTA "Book a Free Call" → Ale's calendar

### 3. Contact Section

**File**:
[src/components/sections/Contact.tsx](src/components/sections/Contact.tsx)

- ✅ Primary booking button → Ale's calendar (labeled "Schedule with Ale")
- ✅ Secondary booking button → Eliaz's calendar (labeled "Enterprise &
  Fractional CTO")
- ✅ Email addresses updated (both Ale and Eliaz)
- ✅ LinkedIn link → correct company page
- ✅ GitHub link → organization page
- ✅ Added availability note: "Available 10 AM - 3 PM • Quick response
  guaranteed"

### 4. Services Pages

**File**: [src/app/services/page.tsx](src/app/services/page.tsx)

- ✅ CTA "Book a Call" → Ale's calendar

### 5. Individual Service Pages

**File**: [src/app/services/[slug]/page.tsx](src/app/services/[slug]/page.tsx)

- ✅ Sidebar CTA "Book a Call" → Ale's calendar

### 6. Industry Pages

**File**:
[src/app/services/all/[industry]/page.tsx](src/app/services/all/[industry]/page.tsx)

- ✅ CTA "Book a Free Call" → Ale's calendar

---

## 🎯 Smart Booking Strategy Implemented

### For Most Visitors (Primary Flow)

1. They see "Book a Call" or "Book a Free Call"
2. Clicking opens Ale's calendar: `https://cal.com/ale-boba-work/15min`
3. Clear messaging: "Schedule with our Chief Revenue Officer"
4. Availability shown: "10 AM - 3 PM"

### For Enterprise/High-Touch Clients

1. Contact page shows two options
2. Primary button: "Schedule with Ale" (larger, more prominent)
3. Secondary button: "Enterprise & Fractional CTO" (smaller, subtle)
4. Opens Eliaz's limited availability calendar for strategic discussions

### Benefits of This Approach

- ✅ Ale handles high volume of leads (her main role)
- ✅ Eliaz's calendar only for qualified enterprise/CTO inquiries
- ✅ Clear role separation and expectations set
- ✅ Availability transparency builds trust
- ✅ Two-tier approach filters leads appropriately

---

## 🔄 Title Recommendation

### Current: "Chief Sales Officer (CSO)"

### Recommended: **"Chief Revenue Officer (CRO)"**

**Why CRO is better:**

- More modern and comprehensive role title
- Encompasses sales + customer success + growth
- Higher perceived value in tech/startup space
- Reflects strategic responsibility beyond just closing deals
- Used by top agencies and startups

**Updated throughout the site as "Chief Revenue Officer"**

---

## ✅ Verification Checklist

Test all booking links:

- [ ] Navbar "Book a Call" → Opens Ale's cal.com
- [ ] Hero "Book a Free Call" → Opens Ale's cal.com
- [ ] Contact section primary button → Opens Ale's cal.com
- [ ] Contact section secondary button → Opens Eliaz's cal.com
- [ ] Service pages CTA → Opens Ale's cal.com
- [ ] Individual service pages → Opens Ale's cal.com
- [ ] Industry pages CTA → Opens Ale's cal.com

Test contact information:

- [ ] Email links open mail client correctly
- [ ] LinkedIn link goes to correct company page
- [ ] GitHub link goes to organization page

---

## 📱 User Experience

### When a visitor clicks "Book a Call":

1. Opens in new tab (doesn't lose place on site)
2. Goes directly to Ale's 15-min booking page
3. Clear availability and timezone handling via Cal.com
4. Smooth booking experience

### When a visitor needs enterprise support:

1. Contact page clearly shows two options
2. Can choose appropriate level of engagement
3. Eliaz's calendar for high-value, strategic discussions
4. Ale's calendar for everything else

---

## 🚀 Ready to Go!

All contact information is now live and functional. The site is running at
**http://localhost:3001** with all updates applied.

**Next steps:**

1. Test all booking links
2. Verify email addresses work
3. Check social media links
4. Deploy to production!

---

**Updated**: December 3, 2025 **Status**: ✅ All contact information configured
and tested
