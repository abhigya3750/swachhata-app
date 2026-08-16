# Swachhata Citizen Application — End-User Functionalities & Specifications

> **Project**: Project WISE (Waste Integrated Sanitation Ecosystem)  
> **Implementing Authority**: Indore Municipal Corporation (IMC)  
> **Technology Service Provider (TSP)**: NERDS Technology  
> **Target Audience**: Citizens & Commercial Establishments of Indore (3.5M+ Residents across 85+ Municipal Wards)  
> **City Honor**: 8-Time Consecutive National Cleanest City Champion (MoHUA Swachh Survekshan)  
> **Platform**: Mobile-First Progressive Web Application (iPhone Viewport ~390px)  
> **Version**: 2.0 Production Prototype

---

## 1. Executive Summary & Application Overview

The **Swachhata Citizen Application** is a unified civic service platform engineered for the residents and businesses of Indore by the **Indore Municipal Corporation (IMC)** in collaboration with **NERDS Technology** under **Project WISE**.

The application delivers transparency, punctuality, and citizen participation in urban sanitation through 10 core functional pillars:
1. **8-Time National Cleanest City 7-Star Achievement Dossier & Golden Seal**.
2. **Live GPS Fleet Tracking & Vehicle #42 IOT Telematics HUD** (Speed, lane route progress, wet/dry bin capacity, and arrival chime).
3. **Citizen Grievance & Community Spot-a-Dump (+50 Eco-Points Reward Loop)** for open dumps and 16+ municipal categories.
4. **Public Toilet Locator (CT/PT & She-Lounge Pink Toilets)** with 5-star cleanliness ratings, distance, free/paid filters, and citizen hygiene feedback.
5. **Commercial & Bulk Waste Producer Workflow (Shops, Hotels & Markets)** with dedicated evening tipper scheduling and GST sanitation compliance certificates.
6. **BBPS-Integrated Waste Utility Bill Payments** with instant digital PDF receipts.
7. **On-Demand Bulk Waste Logistics with Real-Time Safai Mitra Bidirectional Sync** (4-Digit Handshake OTP `4821` validation and live telemetry).
8. **Pavitra Sacred Floral Waste Scheduling** supporting the circular economy.
9. **Self-Help Group (SHG) Eco-Marketplace** with 80G tax deductions and Eco-Points redemption.
10. **Swachhata AI Co-Pilot** with interactive 4-stream waste segregation guide (🟢 Wet, 🔵 Dry, 🟡 Hazardous, 🌸 Sacred).

---

## 2. Comprehensive Module Breakdown & End-User Functionalities

```
                    ┌────────────────────────────────────────────────────────┐
                    │      Swachhata Citizen Application (IMC - WISE)        │
                    └──────────────────────────┬─────────────────────────────┘
                                               │
       ┌───────────────────┬───────────────────┼───────────────────┬───────────────────┐
       ▼                   ▼                   ▼                   ▼                   ▼
 ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐
 │Onboarding │       │Live Fleet │       │ Community │       │  Public   │       │Commercial │
 │  & Ward   │       │ Van #42   │       │Spot-a-Dump│       │  Toilet   │       │  & Market │
 │ 8x Seal   │       │Telematics │       │ (+50 PTS) │       │  Locator  │       │ Logistics │
 └───────────┘       └───────────┘       └───────────┘       └───────────┘       └───────────┘
       │                   │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼                   ▼
 ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐       ┌───────────┐
 │Safai Mitra│       │  Utility  │       │ AI Civic  │       │ Pavitra & │       │ Profile & │
 │ Sync (OTP)│       │  Billing  │       │ Co-Pilot  │       │ Eco-Store │       │ Helpdesk  │
 │  4821     │       │  (BBPS)   │       │ 4-Bin     │       │  Rewards  │       │ Property  │
 └───────────┘       └───────────┘       └───────────┘       └───────────┘       └───────────┘
```

---

### Module 1: 8-Time National Cleanest City Seal & Onboarding
* **8x National Award Seal**:
  * Golden seal on the home dashboard celebrating Indore's **8 consecutive years as India's #1 Cleanest City**.
  * Interactive modal detailing the 7-Star Garbage Free City (GFC) rating, Water+ certification, 99.8% doorstep segregation rate, and 550 TPD Gobar-Dhan Bio-CNG production.
* **Animated Splash & Language Selector**:
  * Project WISE emblem, IMC seal, and NERDS Technology TSP accreditation.
  * Instant bilingual toggle between Hindi (हिंदी) and English.
* **Ward Auto-Detect**:
  * GPS auto-detection mapping coordinates to Indore municipal wards (e.g., *Vijay Nagar - Ward 34*).

---

### Module 2: Live Fleet Radar & Vehicle #42 IOT Telematics HUD
* **Dynamic Proximity Banners**:
  * Real-time notification when Tipper Van #42 is within ~3 minutes of the citizen's residential lane.
* **Vehicle Live Telematics HUD**:
  * Live speed (**16 km/h**), lane route progress (**14/18 houses serviced**), and compartment capacity status.
  * **IOT Compartment Telemetry**: Visual meters for Wet Waste (65%), Dry Recyclables (42%), and Hazardous/Sanitary (18%).
  * **Arrival Chime Player**: Preview button simulating the iconic *"Gadi Wala Aaya"* audio chime.
  * **Driver Direct Dialer**: Phone link to driver Ramesh Sharma (`MP-09-CZ-8832`, ★ 4.9).

---

### Module 3: Community Spot-a-Dump & Citizen Grievances
* **Community Spot-a-Dump (+50 PTS Reward)**:
  * Citizens capture photo proof and GPS location of open dumps or litter.
  * Immediate **+50 Eco-Points reward** credited to the citizen wallet upon ticket submission.
* **6 Primary & 10 Detailed Subcategories**:
  * Visual cards for Garbage Truck Missed, Garbage Dump, Street Sweeping, Open Drain, Public Toilet Cleanliness, and Dead Animal Removal.
* **Evidence & Low-Literacy Inclusivity**:
  * Voice recording (*"Bol kar batayein"*), photo preview, and draggable GPS map pin.
* **48-Hour Municipal SLA Guarantee**:
  * Visual progress bar tracking: *Logged (Now) ➔ Supervisor Inspection ➔ Resolved (48h Max)* with ticket ID (e.g., `#IMC-ORD-8832`).

---

### Module 4: Public Toilet Locator (CT/PT & She-Lounge)
* **Smart Filter Chips**:
  * Filter by **All**, **🌸 She-Lounge Pink Toilets (Women Exclusive)**, **Free Entry**, **24x7 Open**, and **Wheelchair Accessible**.
* **Interactive Map & Distance Readout**:
  * Visual map pins with distance (e.g. *180m away*), cleanliness star ratings (★ 4.9), and listed facilities (Sanitary pad dispenser, Baby feeding zone, AC, Touchless sensors).
* **Citizen Hygiene Rating Modal**:
  * Citizens can rate restroom cleanliness from 1 to 5 stars, transmitting real-time hygiene data to the Municipal Control Room.

---

### Module 5: Commercial & Bulk Waste Producer Flow
* **Dedicated Business Profiling**:
  * Registration for shops, restaurants, hotels, and wholesale traders with GST number and trade categories.
* **Evening Commercial Tipper Logistics**:
  * Scheduled evening collection (21:00 – 23:00) with volume tiers: Small Retail (20 kg, ₹350/mo), Restaurant (50-80 kg, ₹650/mo), and Heavy Bulk (100 kg+, ₹1200/mo).
* **Municipal Trade Waste Compliance Certificate**:
  * View and download official PDF compliance certificates (`IMC-COM-2026-8891`) required for trade license renewals.

---

### Module 6: On-Demand Bulk Logistics & Safai Mitra Sync
* **Porter-Style Fleet Selection**:
  * Small Pickup Bike (₹50-80), Mini 3-Wheeler Tipper (₹100-120), Bulk 4-Wheeler Truck (₹160-180).
* **Real-Time Safai Mitra Bidirectional Sync**:
  * Live status mirroring with Driver Ramesh Sharma's field application.
  * **4-Digit Secure Handshake OTP (`4821`)**: Citizen shares code with the driver upon arrival.
  * Driver numeric keypad validation modal simulating instantaneous load confirmation and awarding **+50 Eco-Points**.

---

### Module 7: Pavitra Sacred Waste & Eco-Store Marketplace
* **Pavitra Sacred Floral Waste**:
  * Free doorstep pickup scheduling for home and temple floral offerings.
  * Converts floral waste into charcoal-free *Pavitra Agarbatti* and organic dyes through Women Self Help Groups.
* **SHG Eco-Store Marketplace**:
  * Upcycled goods: Indore Organic Compost (5kg), Pavitra Incense, Recycled Cloth Bags, Terracotta Pots.
  * **80G Income Tax Exemption** certificates.
  * **Eco-Points Redemption**: Spend points earned from Spot-a-Dump and on-demand pickups for store discounts.

---

### Module 8: Swachhata AI Co-Pilot
* **Interactive 4-Bin Segregation Guide**:
  * Instant rules for 🟢 Wet (Bio-CNG), 🔵 Dry (MRF Sorting), 🟡 Domestic Hazardous (Incineration), and 🌸 Sacred Floral.
* **Quick Service Shortcuts**:
  * One-tap shortcuts for Spot-a-Dump (+50 PTS), Toilet Locator, Commercial Pickup, Bill Pay, and Van Tracking.
* **Smart Ticket Escalation**:
  * Automatically converts custom conversational grievances into formal municipal tickets.

---

### Module 9: Waste Utility Billing (BBPS) & Profile
* **BBPS Multi-Channel Payment**:
  * BHIM UPI, Cards, and Net Banking for monthly property waste tariffs (₹150).
  * Download official municipal payment receipt PDFs.
* **Profile & Multi-Property Management**:
  * Citizen identity card, saved addresses (Home, Office, Shop), linked property tax accounts, and civic helpdesk tickets.
