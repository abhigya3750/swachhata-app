# Swachhata Citizen Application (Indore Municipal Corporation - Project WISE)

A clickable, high-fidelity mobile-first web app prototype for the **Swachhata Citizen Application** built according to PRD v1.0 specifications.

![Project WISE](public/wise_logo.png)

## 🚀 Features & Scope

- **Mobile Viewport Frame**: Rendered in a fixed ~390px iPhone-style frame with status bar, notch, and home indicator bar.
- **Municipal Design Tokens**: Official IMC colors (Primary Municipal Blue `#1A73E3`, Eco Green `#0F9D58`, Civic Warning Yellow `#F59E0B`, Action Red `#DC3545`).
- **Interactive Demo State Control Bar**: Instant toggles for Bill Status (Unpaid/Paid/Unlinked), Live Van Radar (Nearby/Away/Offline), Saved Addresses (Populated/Empty), and Language (English/Hindi).
- **Opening Animated Splash**: Powered by **Project WISE • Powered by NERDS** (Technology Service Provider).
- **8 Complete Flow Modules**:
  1. Onboarding & Ward Setup (Animated intro, mock OTP, Ward 34 GPS detect/search, optional property linking)
  2. Homepage Dashboard & Live Radar (Moving van simulation, proximity banner, utility cards)
  3. Raise Query / Complaint Flow (6 visual categories, 10 subcategories accordion, photo/voice/draggable pin evidence, ticket `#IMC-ORD-8832`, 48-hr SLA graphic)
  4. AI Chatbot (Swachhata Assistant with 7 intent chips, canned response + ticket escalation, category handoff)
  5. Waste Utility Bill Payment (BBPS invoice, UPI/Card selection, processing overlay, PDF receipt modal, passbook history)
  6. On-Demand Bulk Pickup (5-screen Porter-style flow: waste type/qty, fleet pricing tiers, location pin, price review, live tracking with driver Ramesh Sharma & OTP `4821`)
  7. Eco-Store & Pavitra Sacred Waste Scheduler (Floral waste date/time picker, SHG marketplace with 80G tax exemption badges, checkout modal)
  8. Profile & Account (Verified identity card, linked property tax IDs, saved address book, helpdesk support ticket)

---

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Lucide Icons
- **Deployment**: Vercel SPA + GitHub CI/CD

---

## 💻 Local Development

```bash
# Clone repository
git clone https://github.com/YOUR_USERNAME/swachhata-citizen-app.git
cd swachhata-citizen-app

# Install dependencies
npm install

# Start local dev server
npm run dev
```

Open `http://127.0.0.1:5173` in any web browser.

---

## 🌐 Deploy to Vercel

### Option 1: Direct Vercel CLI (Recommended)
```bash
npx vercel
```

### Option 2: GitHub Integration
1. Push code to GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Keep default settings (`Framework: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
4. Click **Deploy**.

---

### Accreditation
* **Implementation Authority**: Indore Municipal Corporation (IMC)
* **Project**: Project WISE (Waste Integrated Sanitation Ecosystem)
* **Technology Service Provider (TSP)**: NERDS Technology
