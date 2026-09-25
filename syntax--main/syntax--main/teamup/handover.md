# ⚡ TeamUp — Platform Project Handover & Complete Feature Specification

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-v12.19-orange?logo=firebase)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

> **TeamUp** is a college-exclusive collaboration ecosystem designed to solve the two-way talent matching problem for college hackathons, technical competitions, academic capstones, startup incubators, and student club projects.
>
> Built with modern **Liquid Glass / Glassmorphism** aesthetics, weighted **Two-Way Skill Matching**, multi-portal switching, cloud-backed Firebase authentication, and an active **Hackathon Accelerator Suite**.

---

## 📑 Table of Contents

- [1. Executive Summary](#1-executive-summary)
- [2. Active Environment & Local Server Status](#2-active-environment--local-server-status)
- [3. Technical Stack & Architecture](#3-technical-stack--architecture)
- [4. Design System & Aesthetics](#4-design-system--aesthetics)
- [5. Complete Feature Specification & Portals](#5-complete-feature-specification--portals)
  - [5.1 Student Portal (Solo Seeker)](#51-student-portal-solo-seeker)
  - [5.2 Team Leader Portal (Squad Management)](#52-team-leader-portal-squad-management)
  - [5.3 Administrator Portal (Governance & Moderation)](#53-administrator-portal-governance--moderation)
  - [5.4 Feature #1: AI Hackathon Idea Lab & Pitch Architect (NEW)](#54-feature-1-ai-hackathon-idea-lab--pitch-architect-new)
  - [5.5 Feature #2: Live Hackathon War Room & Sprint Command Center (NEW)](#55-feature-2-live-hackathon-war-room--sprint-command-center-new)
  - [5.6 Floating Persistent Portal Switcher](#56-floating-persistent-portal-switcher)
  - [5.7 Authentication & College ID Parsing](#57-authentication--college-id-parsing)
- [6. Firebase Services & Analytics Configuration](#6-firebase-services--analytics-configuration)
- [7. Node.js & Environment Variables Setup](#7-nodejs--environment-variables-setup)
- [8. Two-Way Skill Matching Engine](#8-two-way-skill-matching-engine)
- [9. Directory & File Structure](#9-directory--file-structure)
- [10. Setup, Build & Deployment Guide](#10-setup-build--deployment-guide)

---

## 1. Executive Summary

In college tech ecosystems:
1. **Students** want to compete in hackathons but lack teammates with complementary skill sets (e.g., an ML student needing a UI/UX designer and frontend dev).
2. **Team Leaders** have an innovative idea but struggle to identify, vet, and recruit students with specific missing skills.
3. **Hackathon Teams** suffer from ideation paralysis (wasting 12+ hours deciding what to build) and lack real-time coordination during the 36-hour sprint.
4. **College Organizers** struggle with unbalanced teams, unverified students, and last-minute dropouts.

**TeamUp** unifies this entire student builder journey into one cohesive web platform:
* **Two-Way Compatibility Engine**: Evaluates both Student $\rightarrow$ Team fit and Team $\rightarrow$ Student skill gap coverage.
* **Smart Skill Gap Heatmap**: Automatically identifies missing technical proficiencies and recommends exact students to fill them.
* **AI Hackathon Idea Lab**: Generates prize-winning blueprints, system architectures, and 3-minute pitch scripts tailored to the team's combined skills.
* **Live Hackathon War Room**: Real-time countdown timer, role-based sprint Kanban board, deliverable readiness auditor, and campus mentor SOS beacon.
* **Role-Based Workspaces**: Tailored experiences for solo applicants, team leaders, and college administrators.

---

## 2. Active Environment & Local Server Status

| Component | Status | Details |
|---|---|---|
| **Vite Dev Server** | 🟢 **Active / Running** | `http://localhost:5173/` (Vite v8.3.1 with HMR) |
| **Node.js Runtime** | 🟢 **Installed** | Node.js **v24.19.0 (LTS)** |
| **npm Package Manager** | 🟢 **Installed** | npm **11.17.0** |
| **Production Build** | 🟢 **Passing** | TypeScript compile (`tsc -b`) & Vite build complete in <600ms |
| **Firebase Project** | 🟢 **Connected** | `sample-95ec0` with Auth, Firestore & Analytics |

---

## 3. Technical Stack & Architecture

### **Frontend Core**
- **React 19 (`v19.2.8`)**: Leverages modern concurrent rendering and hook patterns.
- **TypeScript (`~6.0.2`)**: Strict end-to-end typing for domain models, matching metrics, and application state.
- **Vite 8 (`v8.3.1`)**: Ultra-fast build tool and dev server featuring Hot Module Replacement (HMR).
- **Lucide React (`v1.48.0`)**: Streamlined SVG icon library.
- **Canvas Confetti (`v1.9.4`)**: Micro-interaction feedback for squad additions, sprint task completion, and 100% readiness achievements.

### **Styling & Design Engine**
- **Tailwind CSS v4 (`v4.3.3`)** with `@tailwindcss/vite`: Utility-first CSS engine with zero runtime.
- **Custom Liquid Glass System**: Specially tuned CSS filters combining `backdrop-blur(28px)`, saturation boosts (`190%`), dual-layer inset specular light reflections, and translucent frosted backdrops (`rgba(255, 255, 255, 0.75)`).
- **Typography Tokens**:
  - `font-moara`: Editorial high-contrast serif for headings and hero titles.
  - `font-athelas`: Elegant serif companion.
  - `font-uber`: Geometric clean sans-serif for UI labels, badges, inputs, and tabular data.

### **Backend & Cloud Services**
- **Firebase SDK (`v12.19.0`)**:
  - **Firebase Authentication**: Email/Password authentication & Google Sign-In with college credentials.
  - **Cloud Firestore**: Real-time NoSQL document database (`nam5`) storing student profiles, squads, join requests, ontologies, and conversations.
  - **Firebase Analytics**: Browser-supported usage telemetry and engagement metrics.
  - **Firestore Security Rules**: Role-based access control protecting student contact info and administrative operations.

### **State Management**
- **React Context (`AppContext`)**: Single source of truth managing:
  - Active user session & authenticated student profile.
  - Active demo personas (`rahul`, `anjali`, `priya`, `arjun`, `admin`).
  - Real-time squad collections, join requests, invitations, and notifications.
  - Local persistence via `localStorage` synchronization for seamless offline state recovery.

---

## 4. Design System & Aesthetics

Inspired by modern luxury SaaS and editorial web design:

| Token | Value / Effect | Usage |
|---|---|---|
| **Warm Pearl Background** | `#f8f9fa` with radial orange/amber glow | Global body background |
| **Vibrant Coral Accent** | `#ff4d15` (`.btn-primary-coral`) | Primary CTAs, active badges, highlights |
| **Dark Obsidian Pill** | `#18181b` (`.btn-dark-pill`) | Secondary actions, active tab pills |
| **Liquid Glass Card** | Translucent frosted white + `blur(24px)` | Content cards, modals, preview containers |
| **Liquid Search Bar** | Multi-segment glass dock with input dividers | Hero discovery bar |
| **Corner Lens Blur** | Radial feathered `backdrop-blur-[14px]` | Hero visual centerpiece corner treatment |

---

## 5. Complete Feature Specification & Portals

### 5.1 Student Portal (Solo Seeker)
- **Explore Squads**: Search and filter teams by hackathon, required skills, team size, and role vacancies.
- **Two-Way Match Breakdown Modal**: Inspect exactly why a team matches your profile with visual gauges for Skill (50%), Role (20%), Interests (15%), Experience (10%), and Availability (5%).
- **1-Click "Request to Join Team"**: Submit an application accompanied by an introductory pitch message.
- **Student Profile Management**: Showcase technical stack, proficiency levels, GitHub/portfolio links, college ID, and preferred roles.
- **Bookmarks**: Bookmark high-potential teams and fellow students for quick access.
- **Accelerator Quick-Launch**: Direct shortcut cards on the dashboard to jump into the **AI Idea Lab** or **War Room**.

### 5.2 Team Leader Portal (Squad Management)
- **Squad Header Banner**: Displays squad avatar, capacity gauge, recruiting status toggle, and direct squad chat link.
- **Skill Coverage Heatmap (`SkillCoverageBar`)**: Automatically calculates team-wide skill coverage and pinpoints missing technical requirements.
- **Interactive Join Applications Review**:
  - View incoming applicant cards directly on the **Overview** dashboard and **Join Requests** tab.
  - Inspect applicant match score, pitch message, department, year, and verified status.
  - 🧡 **Accept into Squad**: 1-click acceptance that adds the student to squad members, increments capacity, syncs team chat, and sends real-time congratulatory notification.
  - ✖️ **Decline**: Gracefully rejects requests.
  - 💬 **Chat with Applicant**: Pre-acceptance interview chat room.
- **Instant Candidate Recruitment**: Proactively browse recommended students and 1-click **"Instant Add to Squad"** or dispatch official team invitations.
- **Member Management**: Assign roles, review member contributions, or rebalance team seats.

### 5.3 Administrator Portal (Governance & Moderation)
- **Dedicated Top Navbar**: When entering the Admin portal, standard student features (`+ Create Team`, notifications bell) are replaced with executive administration controls:
  - 📊 **Analytics KPI**: Platform metrics (Total Students, Solo Seekers, Active Squads, Moderation Queue).
  - 🛡️ **Verify Students**: Manage student verification badges and audit college ID syntax.
  - 🗂️ **Moderate Teams**: Oversee active squads, ensure compliance, and archive inactive groups.
  - ✨ **Skills Taxonomy**: Expand the global technical taxonomy and define aliases (e.g., `React.js` $\rightarrow$ `React`).
  - 🚩 **Safety Reports**: Review and resolve student/team flags.
  - 🚪 **Exit Admin**: 1-click return to the student platform.

---

### 5.4 Feature #1: AI Hackathon Idea Lab & Pitch Architect (NEW)
**Route / Tab**: `currentTab === 'idea-lab'`  
**Source Code**: [`src/pages/IdeaLabPage.tsx`](file:///c:/Users/KASINADHSAJIKUMAR/Downloads/syntax--main/syntax--main/teamup/src/pages/IdeaLabPage.tsx) | [`src/data/ideaLabData.ts`](file:///c:/Users/KASINADHSAJIKUMAR/Downloads/syntax--main/syntax--main/teamup/src/data/ideaLabData.ts)

* **Problem Solved**: Eliminates "ideation paralysis" where newly formed teams with complementary skills spend hours debating what to build for an upcoming hackathon.
* **Squad Skill Matrix Sync**:
  - Automatically loads the active student's skills (e.g., Rahul Sharma: React, Python, TensorFlow) or lets users pick any squad from the team registry.
  - Displays skill coverage badges and calculates individual compatibility percentages against each project blueprint.
* **6 High-Value Hackathon Tracks**:
  1. 🎓 **Campus & EdTech** (e.g., *CampuSync — Multi-Modal Autonomous College Assistant*)
  2. 🤖 **AI & Autonomous Agents** (e.g., *AgentVerify — Autonomous Accessibility & Bug Hunting Swarm*)
  3. 💳 **FinTech & Web3** (e.g., *ScholarPledge — Decentralized Peer-to-Peer Student Micro-Grants*)
  4. 🏥 **HealthTech & MedTech** (e.g., *NeuroScribe — Low-Resource Emergency Bed & Triage Balancer*)
  5. 🌱 **GreenTech & IoT Energy** (e.g., *EcoGrid — Peer-to-Peer Campus Energy Harvest*)
  6. 🛡️ **Cybersecurity & Trust**
* **Full System Architecture Topologies**:
  - Visual breakdown: Frontend client, Backend API, AI inference engine, Database & memory layer, and Edge hosting infrastructure.
* **Role & Superpower Assignments**:
  - Maps specific system modules to teammates according to their individual skill strengths (e.g., Lead AI Pipeline Engineer, Liquid Glass UI Specialist, Cloud Auth Lead, Pitch Specialist).
* **36-Hour Sprint Execution Milestones**:
  - *H0–H6*: Setup, scaffolding, and database schemas.
  - *H6–H18*: Core MVP engine and API connections.
  - *H18–H30*: UI polish, real-time mock data, mobile responsiveness.
  - *H30–H36*: Demo video recording, presentation deck, judge rehearsal.
* **3-Minute Elevator Pitch Script Generator**:
  - Time-stamped script: Hook (0–30s), Problem (30–60s), Solution (60–105s), Live Demo Flow (105–150s), and Closing Ask (150–180s).
* **Direct Actions**:
  - 🚀 **"Publish to Project Board"**: Instantly pushes the idea to the TeamUp Project Board so other students can apply.
  - 📋 **"Copy Pitch Deck Script"**: 1-click clipboard copy.
  - 📥 **"Export Markdown"**: Downloads a `.md` blueprint for GitHub repositories or Devpost submissions.
  - ⚡ **"Launch in War Room"**: Direct transition into the active sprint workspace.

---

### 5.5 Feature #2: Live Hackathon War Room & Sprint Command Center (NEW)
**Route / Tab**: `currentTab === 'war-room'`  
**Source Code**: [`src/pages/WarRoomPage.tsx`](file:///c:/Users/KASINADHSAJIKUMAR/Downloads/syntax--main/syntax--main/teamup/src/pages/WarRoomPage.tsx)

* **Problem Solved**: Gives formed squads a unified, real-time command center during the intense 24h–48h hackathon crunch, replacing fragmented chat apps and unorganized tasks.
* **Live Ticking Countdown Clock HUD**:
  - Real-time countdown timer (`HH:MM:SS`) with sprint milestone indicators (*Git Init $\rightarrow$ Core MVP $\rightarrow$ Mid-Evaluation $\rightarrow$ Code Freeze $\rightarrow$ Live Pitch*).
  - Quick presets for **24h sprints**, **36h hackathons**, and **48h global events** with pause/resume and reset controls.
* **Squad Sprint Kanban Board**:
  - 4 interactive lanes: `📋 Backlog`, `⚡ In Progress`, `🧪 Review & QA`, and `🎉 Completed`.
  - Task cards badged by domain (`Frontend`, `Backend`, `AI/ML`, `UI/UX`, `Pitch`) and priority (`Critical`, `High`, `Normal`), with assigned teammate avatars.
  - One-click task advancement between lanes with micro-confetti feedback upon task completion.
  - "Add Sprint Task" modal with dynamic squad member picker.
* **Submission Readiness Audit & Deliverables Meter**:
  - Live calculated readiness score ($0\% \rightarrow 100\%$) tracking mandatory deliverables:
    1. [x] Public GitHub Repository with structured `README.md` & License
    2. [x] Deployed Production Demo URL
    3. [x] 2-Minute Video Walkthrough
    4. [x] 10-Slide Pitch Presentation Deck
    5. [x] Hackathon Portal Final Submission Form
  - Full-screen confetti shower when reaching $100\%$ readiness!
* **Campus Mentor SOS Request Beacon**:
  - Eliminates the frustration of getting stuck on build/CORS errors in the middle of the night.
  - Dispatches an emergency SOS ticket with issue category (*Build Emergency*, *API/CORS Bug*, *Model Drift*, *Pitch Rehearsal*) and exact table/arena location.
  - Live simulated mentor dispatch alert with arrival ETA timer and resolution toggle.
* **Squad Resource Locker**:
  - Centralized pinboard with 1-click copy for GitHub repositories, Figma canvases, Canva slide decks, and sandbox API tokens.

---

### 5.6 Floating Persistent Portal Switcher
- A docked frosted glass bar (`PortalSwitcherBar`) fixed at the bottom of the screen allowing seamless switching between:
  - 🎓 **Student Portal** (Rahul Sharma — Solo ML Seeker)
  - 👥 **Team Lead Portal** (Priya Nair — Leader of AI Innovators)
  - 🛡️ **Admin Portal** (Administrator — Governance & Verification)
- Features real-time active portal indicators and a minimize/expand toggle.

### 5.7 Authentication & College ID Parsing
- Seamless authentication supporting **Email/Password** and **Google Sign-In**.
- Structured College ID validation adhering to university conventions:
  $$\text{Format: } \mathbf{YYYY/DEPT/ROLL} \quad \text{(e.g., } 2025/\text{CS}/006\text{)}$$
- Automatically parses admission year and department into the student's persistent profile.

---

## 6. Firebase Services & Analytics Configuration

Configured in [`src/services/firebase.ts`](file:///c:/Users/KASINADHSAJIKUMAR/Downloads/syntax--main/syntax--main/teamup/src/services/firebase.ts):

```typescript
export const firebaseConfig = {
  apiKey: "AIzaSyD9O_0w39NKg7LG2_PFTn4q3gZJK8zKp9c",
  authDomain: "sample-95ec0.firebaseapp.com",
  projectId: "sample-95ec0",
  storageBucket: "sample-95ec0.firebasestorage.app",
  messagingSenderId: "164303306409",
  appId: "1:164303306409:web:712414bb4739b7307bf3b8",
  measurementId: "G-HHG15Z6CZ9"
};
```

### Safety & Bundler Optimization:
* **Analytics**: Safely initialized in browser environments via `isSupported().then(...)` wrapped in a graceful fallback.
* **Vite Pre-bundling**: In [`vite.config.ts`](file:///c:/Users/KASINADHSAJIKUMAR/Downloads/syntax--main/syntax--main/teamup/vite.config.ts), `optimizeDeps.include` pre-bundles `firebase/app`, `firebase/auth`, `firebase/firestore`, and `firebase/analytics` to guarantee clean module loading.

---

## 7. Node.js & Environment Variables Setup

* **Node.js Location**: `C:\Users\KASINADHSAJIKUMAR\AppData\Local\Programs\nodejs`
* **Version**: Node.js **v24.19.0 (LTS)** | npm **11.17.0**
* **Environment Variables**:
  - `Path` updated to include `C:\Users\KASINADHSAJIKUMAR\AppData\Local\Programs\nodejs`
  - `%APPDATA%\npm` added for global CLI tools
* **Execution Policy**: Configured to `RemoteSigned` for `CurrentUser` to ensure smooth script execution.

---

## 8. Two-Way Skill Matching Engine

The matching engine in `src/services/matchingEngine.ts` computes compatibility using a weighted multi-factor formula:

$$\text{Final Match Score} = S_{\text{skills}} + S_{\text{role}} + S_{\text{interest}} + S_{\text{experience}} + S_{\text{availability}}$$

| Component | Weight | Calculation Method |
|---|---|---|
| **Skills Coverage** | **50%** | Intersection of student skills and team's required/missing skills weighted by student proficiency (Beginner, Intermediate, Advanced, Expert). |
| **Role Complementarity** | **20%** | Match between student preferred roles and open positions within the squad. |
| **Interest Alignment** | **15%** | Jaccard similarity across project domains (e.g., AI/ML, Web3, FinTech, Healthcare). |
| **Experience Level** | **10%** | Compatibility between student year/experience and team target complexity. |
| **Availability & Mode** | **5%** | Overlap in weekly time commitments and collaboration preference (In-Person / Remote / Hybrid). |

---

## 9. Directory & File Structure

```
teamup/
├── public/                       # Static public assets
│   ├── hero-team.jpg             # Hero collaboration showcase visual
│   ├── favicon.svg               # Brand favicon
│   └── icons.svg
├── src/
│   ├── components/               # Reusable presentation components
│   │   ├── layout/               # Top Navbar, Bottom PortalSwitcherBar, ToastContainer
│   │   ├── matching/             # SkillCoverageBar, MatchScoreModal
│   │   ├── students/             # StudentCard, StudentProfileModal
│   │   └── teams/                # CreateTeamModal, TeamDetailsModal
│   ├── context/
│   │   └── AppContext.tsx        # Central state, persona switching, Firebase session
│   ├── data/
│   │   ├── ideaLabData.ts        # Hackathon blueprint datasets, tracks, role assignments (NEW)
│   │   └── mockData.ts           # Initial college dataset (hackathons, squads, students)
│   ├── pages/                    # Route and portal views
│   │   ├── AdminDashboard.tsx    # Governance, ID verification, skills taxonomy
│   │   ├── AuthPage.tsx          # Login & Signup with College ID format
│   │   ├── ChatPage.tsx          # Real-time team and direct messaging
│   │   ├── EventsPage.tsx        # Hackathons and technical competitions board
│   │   ├── FindTeammates.tsx     # Student discovery directory with skill filters
│   │   ├── FindTeams.tsx         # Team discovery directory with coverage inspection
│   │   ├── IdeaLabPage.tsx       # AI Hackathon Idea Lab & Pitch Architect (NEW)
│   │   ├── LandingPage.tsx       # Hero showcase, feature cards & search
│   │   ├── ProfilePage.tsx       # Editable student resume & skills portfolio
│   │   ├── ProjectBoardPage.tsx  # Student startup and research project board
│   │   ├── StudentDashboard.tsx  # Solo student recommendations and applications
│   │   ├── TeamLeaderDashboard.tsx # Squad management, applicant review & acceptance
│   │   └── WarRoomPage.tsx       # Live Hackathon War Room & Sprint Command Center (NEW)
│   ├── services/
│   │   ├── firebase.ts           # Firebase App, Auth, Firestore & Analytics initialization
│   │   └── matchingEngine.ts     # Two-way mathematical scoring algorithm
│   ├── types/
│   │   └── index.ts              # TypeScript domain interfaces
│   ├── App.tsx                   # Master root layout & navigation
│   ├── index.css                 # Tailwind v4 configuration & liquid glass utilities
│   └── main.tsx                  # Application entry point
├── .firebaserc                   # Active Firebase project alias (sample-95ec0)
├── firebase.json                 # Firebase deployment configuration
├── firestore.rules               # Cloud Firestore security rules
├── handover.md                   # Complete Platform Handover Document
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── vite.config.ts                # Vite configuration with pre-bundled Firebase modules
```

---

## 10. Setup, Build & Deployment Guide

### Running Locally
```bash
# 1. Install dependencies
npm install

# 2. Run Vite Development Server
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### Building for Production
```bash
npm run build
```
Generates optimized, minified production assets in the `dist/` directory.

### Previewing the Production Bundle
```bash
npm run preview
```

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
