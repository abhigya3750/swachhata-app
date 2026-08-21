# Project WISE: Swachhata Citizen Application
## Comprehensive Product Specification & Operational Blueprint

> **Authority**: Indore Municipal Corporation (IMC)  
> **Technology Service Provider (TSP)**: NERDS Technology  
> **City Honor**: 8-Time Consecutive National Cleanest City Champion (MoHUA Swachh Survekshan)  
> **Document Version**: 2.0 (Master Blueprint)  
> **Target Audience**: IMC Leadership, Municipal Engineers, Product Managers & System Integrators  
> **Live Prototype**: [swachhata-app.vercel.app](https://swachhata-app.vercel.app)  
> **GitHub Repository**: [github.com/abhigya3750/swachhata-app](https://github.com/abhigya3750/swachhata-app)

---

## 1. Executive Summary & Vision

### 1.1 Objective
**Project WISE (Waste Integrated Sanitation Ecosystem)** is an end-to-end civic technology platform designed to maintain and elevate Indore’s benchmark status as India’s **8-Time Consecutive Cleanest City**. Engineered for the **Indore Municipal Corporation (IMC)** by **NERDS Technology**, the platform unifies doorstep collection tracking, gamified citizen dump reporting, commercial waste compliance, public toilet hygiene tracking, utility payments, and circular economy marketplaces into a single mobile-first ecosystem.

### 1.2 Core Pillars
1. **Transparency through Real-Time Telematics**: Live GPS fleet tracking, vehicle proximity alerts, and transparent BBPS utility billing.
2. **Gamified Citizen Participation**: Reward loops (**+50 Eco-Points**) for reporting roadside open dumps (**Spot-a-Dump**), redeemable in the Self-Help Group (SHG) Eco-Store.
3. **Digital Inclusivity & Accessibility**: Low-literacy design featuring voice notes (*"Bol kar batayein"*), photo-first reporting, and full bilingual (Hindi/English) mirroring.
4. **Closed-Loop Command Integration**: Bidirectional telemetry syncing citizens, Safai Mitras (sanitation workers), and the IMC Command & Control Center (CCC).

---

## 2. Platform Architecture & Technical Stack

```
                              ┌──────────────────────────────────────────────────────────┐
                              │            IMC COMMAND & CONTROL CENTER (CCC)            │
                              │          Central Analytics, GIS Tracking & SLAs          │
                              └─────────────────────────────┬────────────────────────────┘
                                                            │
                                  ┌─────────────────────────┴─────────────────────────┐
                                  ▼                                                   ▼
       ┌─────────────────────────────────────────────────────┐     ┌─────────────────────────────────────────────────────┐
       │             CITIZEN MOBILE PWA (WISE)               │     │             SAFAI MITRA FIELD DRIVER APP            │
       │  • Fleet Radar & Telematics                         │     │  • Vehicle Route Telematics & Speed                 │
       │  • Community Spot-a-Dump (+50 PTS)                  │◄───►│  • Handshake 4-Digit OTP (`4821`) Sync             │
       │  • Public Toilet Locator & Ratings                  │     │  • GTS Transfer Station Load Verification           │
       │  • Commercial Waste & GST Compliance                │     │  • Automated Geo-Fenced Ward Check-ins              │
       │  • BBPS Utility Bill Payment                        │     └─────────────────────────────────────────────────────┘
       │  • Swachhata AI Co-Pilot & 4-Bin Guide              │
       │  • Eco-Store SHG Marketplace & Pavitra              │
       └─────────────────────────────────────────────────────┘
```

* **Frontend Framework**: React 19, TypeScript, Tailwind CSS v4.
* **Architecture**: Mobile-First PWA (iPhone Viewport ~390px).
* **State Management**: React Context (`AppStateContext`) with persistent client state.
* **Geospatial Mapping**: SVG-based dynamic route map viewports with interactive pin placement.
* **Hosting & CI/CD**: Pushed to GitHub (`abhigya3750/swachhata-app`) and hosted on **Vercel** with Vite production optimization.

---

## 3. Master Module Specifications (10 Core Modules)

### Module 1: 8-Time National Cleanest City Honor & Onboarding
* **Golden Achievement Seal**: Embedded on the top header celebrating Indore's 8 consecutive Swachh Survekshan titles.
* **Municipal Dossier Modal**: Interactive breakdown displaying:
  * **7-Star Garbage Free City (GFC)** accreditation.
  * **Water+ Certification** (100% urban sewage treated).
  * **99.8% Doorstep 6-Bin Segregation** rate.
  * **550 TPD Gobar-Dhan Bio-CNG** green fuel output.
* **Dynamic Ward Auto-Detection**: GPS location lookup mapping user coordinates to 85+ IMC municipal wards (e.g., *Rajwada - Ward 12*, *Vijay Nagar - Ward 34*).
* **Bilingual Switcher**: Instant one-tap toggle between Hindi (हिंदी) and English.

### Module 2: Live Fleet Radar & Tipper Van Telematics
* **Proximity Alert Banner**: Automated banner alerting residents when Tipper Van #42 is within 3 minutes of their lane.
* **Live GPS Map Viewport**: Interactive vector map rendering vehicle route vectors and ETA calculations.
* **Vehicle Spec Badge**: Tap-to-view modal for Tipper #42 details (Vehicle No. `MP-09-CZ-8832`, assigned driver, route #34A).

### Module 3: Community Spot-a-Dump (+50 Eco-Points Reward)
* **Open Dump Reporting**: Citizens capture geotagged photos of roadside litter or uncollected garbage.
* **Multi-Modal Evidence Input**:
  * Geotagged camera photo.
  * Voice recording note (*"Bol kar batayein"*) for low-literacy users.
  * Interactive map pin fine-tuning.
* **Automated Reward Credit**: Submitting a verified dump ticket instantly credits **+50 Eco-Points** to the citizen wallet.
* **48-Hour Municipal SLA**: Visual progress tracking: *Logged (Now) ➔ Supervisor Inspection ➔ Resolved (48h Max)* with unique tracking IDs (e.g., `#IMC-ORD-8832`).

### Module 4: Public Toilet Locator (CT/PT & She-Lounge)
* **Smart Categorization & Filters**:
  * **All Restrooms**
  * **🌸 She-Lounge (Women Exclusive Pink Restrooms)**
  * **Free Entry (Zero Charge)**
  * **24x7 Open**
* **Facility Tags**: Sanitary pad dispensers, baby nursing rooms, AC, touchless sensors, wheelchair ramps.
* **Live Citizen Hygiene Ratings**: 1 to 5 star rating modal feeding real-time hygiene telemetry directly to the IMC Control Room.

### Module 5: Commercial Waste Producer Workflow
* **Establishment Profiling**: Registration for shops, restaurants, and market traders with GSTIN (`23AABCV1234F1Z8`).
* **Commercial Volume Tiers & Evening Tipper Logistics**:
  * **Small Retail & Shops**: Up to 20 kg/day, ₹350/month (21:00 PM collection).
  * **Restaurants & Food Joints**: 50–80 kg/day, ₹650/month (21:30 PM collection).
  * **Wholesale Markets & Traders**: 100 kg+/day, ₹1,200/month (22:30 PM heavy tipper).
* **Municipal Sanitation Compliance Certificate**: Downloadable PDF certificate (`IMC-COM-2026-8891`) required for annual IMC trade license renewal.

### Module 6: Real-Time Safai Mitra Bidirectional Sync
* **4-Digit Secure Handshake OTP**: Displayed on the citizen app upon driver arrival (`4821`).
* **Field App Verification Simulator**: Interactive modal simulating Driver Ramesh Sharma entering the OTP into the Safai Mitra handheld terminal.
* **Handover Validation**: Successful OTP entry marks waste as loaded, syncs GPS coordinates to the GTS transfer station, and credits **+50 Eco-Points**.

### Module 7: Waste Utility Billing (BBPS)
* **Bharat Bill Payment System (BBPS)** integration for monthly waste management tariffs (₹150/month).
* Multi-payment gateway support (BHIM UPI, Cards, Net Banking).
* Instant municipal digital receipt download with transaction hash.

### Module 8: Swachhata AI Co-Pilot & 4-Bin Segregation Guide
* **Interactive 4-Bin Sorting Rules**:
  * 🟢 **Wet Waste**: Processed at Bio-CNG Gobar-Dhan plant.
  * 🔵 **Dry Waste**: Sorted into 24 streams at MRF facilities.
  * 🟡 **Domestic Hazardous & Sanitary**: Incinerated safely.
  * 🌸 **Pavitra Sacred Floral**: Processed into charcoal-free incense by SHGs.
* **One-Tap Intent Chips**: Instant shortcuts for Spot-a-Dump, Toilet Locator, Commercial Pickup, Bill Pay, and Van Tracking.

### Module 9: Pavitra Sacred Waste & SHG Eco-Store
* **Pavitra Floral Pickup**: Doorstep collection scheduling for temple and festival flowers.
* **Eco-Store Marketplace**: Upcycled products (Indore Organic Compost, Pavitra Dhoop, Cloth Bags) crafted by Women Self Help Groups.
* **80G Income Tax Deductions**: Tax relief receipts for Eco-Store purchases.

### Module 10: Integrated Property & Helpdesk
* Saved citizen addresses (Home, Office, Shop), linked municipal property tax accounts, and civic helpdesk ticket archives.

---

## 4. End-to-End User Personas & Operational Use Cases

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CORE USER PERSONAS                                     │
├───────────────────────┬───────────────────────┬───────────────────┬────────────────────┤
│ 1. DAILY RESIDENT     │ 2. COMMERCIAL OWNER   │ 3. SAFAI MITRA    │ 4. WARD INSPECTOR  │
│ (Rajesh Kumar)        │ (Verma Sweet House)   │ (Ramesh Sharma)   │ (IMC Official)     │
└───────────────────────┴───────────────────────┴───────────────────┴────────────────────┘
```

### Use Case 1: Daily Resident (Doorstep Pickup & Dump Reporting)
* **Actor**: Resident of Ward 34 (Scheme 54).
* **Scenario**: Receives an app alert that Tipper Van #42 is 3 minutes away. Brings segregated 6-bin waste to the vehicle. Later notices an illegal garbage dump near a park, takes a photo via **Spot-a-Dump**, receives ticket `#IMC-ORD-8832`, and is credited **+50 Eco-Points**.

### Use Case 2: Commercial Restaurant Owner (Evening Tipper & GST Cert)
* **Actor**: Owner of Verma Sweet House & Restaurant (Rajwada - Ward 12).
* **Scenario**: Operates late into the night and cannot use morning residential vans. Registers business GSTIN on the **Commercial Waste** portal, selects the ₹650/month tier for 21:30 PM collection, and downloads the official **IMC Sanitation Compliance Certificate** for trade license renewal.

### Use Case 3: Safai Mitra Driver (Bulk Handshake & Load Sync)
* **Actor**: Tipper Van Driver on Route #34A.
* **Scenario**: Arrives at a scheduled bulk pickup location. Asks the citizen for their **4-digit handshake OTP (`4821`)**, inputs it into the Safai Mitra field app, validating waste loading and updating the Command Control Center.

### Use Case 4: Female Citizen in Market (She-Lounge Pink Toilet)
* **Actor**: Female shopper at 56 Dukan / Palasia.
* **Scenario**: Opens **Public Toilet Locator**, filters by **🌸 She-Lounge (Pink Toilet)**, navigates using live GPS, uses the facility, and submits a 5-star cleanliness rating.

### Use Case 5: Ward Sanitation Inspector (SLA Breach Management)
* **Actor**: IMC Sanitation Inspector for Ward 34.
* **Scenario**: Receives real-time geotagged ticket `#IMC-ORD-8832` on their inspection tablet. Dispatches clean-up crew to Scheme 54, uploads resolution photo, closes ticket within 48-hour SLA guarantee, and updates citizen dashboard.

---

## 5. Telematics & Data Shared with IMC Command Control Center (CCC)

To enable operational control, automated dispatch, and performance auditing, the Swachhata Citizen App collects and transmits the following real-time data streams to the **IMC Command & Control Center (CCC)**:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                     IMC COMMAND & CONTROL CENTER (CCC) TELEMETRY                       │
├──────────────────────────┬───────────────────────────┬─────────────────────────────────┤
│ DATA STREAM              │ DATA ATTRIBUTES TRANSMITTED│ MUNICIPAL USE CASE / ACTION     │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 1. Vehicle Telematics    │ • Vehicle ID & Driver ID  │ • Route deviation alerts        │
│    (Tipper #42)          │ • Real-time GPS Lat/Lng   │ • Geofenced speed compliance    │
│                          │ • Speed & Ignition Status │ • Missed lane detection         │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 2. Spot-a-Dump Tickets   │ • Geotagged Photo & GPS   │ • Auto-dispatch ward inspector  │
│    (+50 Eco-Points)      │ • Audio Note / Text       │ • 48-Hour SLA countdown timer   │
│                          │ • Timestamp & Citizen ID  │ • Contractor penalty triggers   │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 3. Restroom Hygiene      │ • Facility ID & Location  │ • Low-rating alert (< 3 Stars)  │
│    Feedback              │ • Star Rating (1–5 Stars) │ • Automated janitorial dispatch │
│                          │ • Timestamps & Usage      │ • Contractor payment audit      │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 4. Commercial Waste      │ • Business Name & GSTIN   │ • Commercial tax reconciliation │
│    & Compliance          │ • Trade Category & Volume │ • Night tipper route optimization│
│                          │ • Monthly Fee & Cert ID   │ • Illegal dumping audit         │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 5. Safai Mitra Sync      │ • Citizen-Driver Handshake│ • Proof of doorstep collection  │
│    (OTP `4821`)          │ • 4-Digit OTP Code        │ • GTS Transfer Station weight   │
│                          │ • Timestamp & Load Status │ • Driver incentive calculation  │
├──────────────────────────┼───────────────────────────┼─────────────────────────────────┤
│ 6. Eco-Points & SHG      │ • Citizen Points Balance  │ • SHG revenue allocation        │
│    Marketplace           │ • Redemptions & Purchases │ • Waste upcycling volume audit  │
│                          │ • 80G Tax Certificates    │ • Circular economy metrics      │
└──────────────────────────┴───────────────────────────┴─────────────────────────────────┘
```

### Key Performance Indicators (KPIs) Monitored by IMC Leadership:
1. **Ward Cleanliness Index (WCI)**: Percentage of tickets resolved within 48-hour SLA per ward.
2. **Doorstep Segregation Rate**: Verification percentage from Safai Mitra OTP handshakes.
3. **Restroom Sanitation Index**: Average star rating of 5-Star CT/PTs & She-Lounges across Wards.
4. **Commercial Compliance Percentage**: Active GST commercial subscribers vs. registered municipal shops.
5. **Bio-CNG Feedstock Yield**: Total wet organic waste delivered to 550 TPD Gobar-Dhan plant.

---

## 6. Required IMC Infrastructure & Hardware Integrations

To operationalize the Swachhata Citizen App, **Indore Municipal Corporation (IMC)** must maintain and integrate the following hardware, software, and field operational assets:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        REQUIRED IMC INFRASTRUCTURE & INTEGRATIONS                      │
├───────────────────────────────┬────────────────────────────────────────────────────────┤
│ CATEGORY                      │ REQUIRED ASSET / INTEGRATION                           │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 1. Vehicle Hardware           │ • AIS-140 Compliant GPS Trackers on all 600+ Tipper    │
│                               │   vans, door-to-door vehicles, and heavy trucks.       │
│                               │ • Driver Handheld Android Devices running Safai Mitra  │
│                               │   Field App for OTP validation.                        │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 2. Public Toilet Hardware     │ • QR Code Feedback Plaques inside all CT/PTs.         │
│                               │ • IoT Occupancy & Odor Sensors on 5-Star CT/PTs and    │
│                               │   She-Lounges for automated janitorial alerts.         │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 3. Software & API Gateways    │ • IMC Property Tax & Utility Billing Database API.     │
│                               │ • BBPS Biller Integration for payment reconciliation.  │
│                               │ • SMS & WhatsApp Business API for OTP delivery.       │
├───────────────────────────────┼────────────────────────────────────────────────────────┤
│ 4. Ground Operations          │ • Ward Supervisors equipped with inspection tablets.   │
│                               │ • Central GTS (Garbage Transfer Station) Weighing      │
│                               │   Bridge Automated Scale APIs.                         │
│                               │ • Women SHG Compost & Upcycling Units integration.     │
└───────────────────────────────┴────────────────────────────────────────────────────────┘
```

---

## 7. Product Roadmap & Deployment Phases

```
  Phase 1: Prototype UI/UX & Client State Simulation (Completed)
  Phase 2: IMC AIS-140 GPS & Safai Mitra Field App API Integration
  Phase 3: Pilot Ward Launch (Ward 34 Vijay Nagar & Ward 12 Rajwada Market)
  Phase 4: Citywide Rollout across all 85 IMC Wards & Commercial Hubs
```

1. **Phase 1 (Completed)**: Web PWA Prototype UI/UX, 27 screens, client state simulation, Vercel hosting.
2. **Phase 2 (Systems Integration)**: Connecting IMC AIS-140 vehicle telemetry, Safai Mitra field application APIs, and BBPS biller gateway.
3. **Phase 3 (Pilot Ward Rollout)**: Field pilot deployment in **Ward 34 (Scheme 54 / Vijay Nagar)** and **Ward 12 (Rajwada Commercial Market)**.
4. **Phase 4 (Citywide Expansion)**: Scaled deployment across all 85 IMC Wards, commercial zones, and industrial belts.
