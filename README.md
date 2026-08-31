<div align="center">

# 🌍 SmartJourney

### AI-Powered Trip Planner for Your Perfect Journey

[![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Plan your perfect trip with AI assistance • Get personalized itineraries • Explore with interactive maps**

[🚀 Live Demo](#) • [📖 Documentation](#) • [🐛 Report Bug](https://github.com/yourusername/smart-journey/issues) • [✨ Request Feature](https://github.com/yourusername/smart-journey/issues)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="./public/logo.svg" alt="SmartJourney Logo" width="120" />
</div>

> **Note:** Add screenshots of your app here for better visual appeal

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🤖 AI-Powered Planning
Chat with an intelligent assistant powered by Google Gemini to plan your entire trip conversationally

### 🗺️ Interactive 3D Maps
Visualize your destinations on a beautiful 3D globe with Mapbox integration

### 🏨 Smart Recommendations
Get personalized hotel and activity suggestions based on your preferences

</td>
<td width="50%">

### 💰 Currency Localization
Prices automatically displayed in your local currency based on your origin

### 🌙 Dark Mode Support
Beautiful UI with full dark mode support for comfortable viewing

### ⚡ Real-time Sync
Live data updates with Convex for seamless collaboration

</td>
</tr>
</table>

### 🎯 Additional Features

- 🔐 **Secure Authentication** - Powered by Clerk with social login support
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🛡️ **Rate Limiting** - Protected by Arcjet security
- 💾 **Save Places** - Bookmark your favorite hotels and activities
- 📤 **Export Itinerary** - Download your trip plan
- 🎨 **Beautiful UI** - Modern design with smooth animations

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **Git** for version control

### API Keys Required

You'll need to sign up for the following services (all have free tiers):

| Service | Purpose | Sign Up Link |
|---------|---------|--------------|
| 🔐 Clerk | Authentication | [clerk.com](https://clerk.com) |
| 💾 Convex | Real-time Database | [convex.dev](https://convex.dev) |
| 🤖 Google Gemini | AI Trip Planning | [ai.google.dev](https://ai.google.dev) |
| 📍 Google Places | Location Data | [developers.google.com](https://developers.google.com/maps) |
| 🗺️ Mapbox | Interactive Maps | [mapbox.com](https://mapbox.com) |
| 🛡️ Arcjet | Security & Rate Limiting | [arcjet.com](https://arcjet.com) |

### Installation

1️⃣ **Clone the repository**
```bash
git clone https://github.com/yourusername/smart-journey.git
cd smart-journey
```

2️⃣ **Install dependencies**
```bash
npm install
# or
yarn install
```

3️⃣ **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Convex Backend
CONVEX_DEPLOYMENT=your-deployment-id
NEXT_PUBLIC_CONVEX_URL=your-convex-url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key

# Google AI & Places
GEMINI_API_KEY=your-gemini-api-key
GOOGLE_PLACE_API_KEY=your-google-places-api-key

# Mapbox Maps
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-access-token

# Arcjet Security
ARCJET_KEY=your-arcjet-key
```

4️⃣ **Run the development server**
```bash
npm run dev
# or
yarn dev
```

5️⃣ **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) 🎉

---

## 🏗️ Tech Stack

<div align="center">

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-16.1.4-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=flat-square&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.29.2-FF0055?style=flat-square&logo=framer)

### Backend & Services
![Convex](https://img.shields.io/badge/Convex-1.31.6-FF6B6B?style=flat-square)
![Clerk](https://img.shields.io/badge/Clerk-6.36.10-6C47FF?style=flat-square)
![Google Gemini](https://img.shields.io/badge/Gemini-2.0_Flash-4285F4?style=flat-square&logo=google)
![Arcjet](https://img.shields.io/badge/Arcjet-1.0.0-000000?style=flat-square)

### UI & Components
![Radix UI](https://img.shields.io/badge/Radix_UI-Latest-161618?style=flat-square)
![Lucide](https://img.shields.io/badge/Lucide-0.563.0-F56565?style=flat-square)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-000000?style=flat-square)

</div>

---

## 📁 Project Structure

```
smart-journey/
│
├── 📂 app/                          # Next.js App Router
│   ├── 📂 api/                      # API Routes
│   │   ├── 📂 aimodel/              # AI Trip Planning Endpoint
│   │   ├── 📂 arcjet/               # Rate Limiting
│   │   └── 📂 google-place-detail/  # Google Places Integration
│   │
│   ├── 📂 create-new-trip/          # Trip Creation Flow
│   │   └── 📂 _components/          # Trip-specific Components
│   │       ├── ChatBox.tsx          # AI Chat Interface
│   │       ├── GlobalMap.tsx        # 3D Interactive Map
│   │       ├── Itinerary.tsx        # Timeline View
│   │       └── ...
│   │
│   ├── 📂 dashboard/                # User Dashboard
│   │   └── 📂 _components/          # Dashboard Components
│   │
│   ├── 📂 _components/              # Shared Components
│   │   ├── Header.tsx               # Navigation Header
│   │   ├── Hero.tsx                 # Landing Page Hero
│   │   └── ...
│   │
│   ├── layout.tsx                   # Root Layout
│   ├── page.tsx                     # Landing Page
│   └── globals.css                  # Global Styles
│
├── 📂 components/                   # Reusable UI Components
│   └── 📂 ui/                       # shadcn/ui Components
│       ├── button.tsx
│       ├── dialog.tsx
│       └── ...
│
├── 📂 convex/                       # Convex Backend
│   ├── schema.ts                    # Database Schema
│   ├── chat.ts                      # Chat Functions
│   ├── tripDetail.ts                # Trip CRUD Operations
│   ├── savedPlaces.ts               # Saved Places Logic
│   └── user.ts                      # User Management
│
├── 📂 context/                      # React Context Providers
│   ├── UserDetailContext.tsx
│   └── TripDetailContext.tsx
│
├── 📂 lib/                          # Utility Functions
│   └── utils.ts
│
├── 📂 public/                       # Static Assets
│   ├── logo.svg
│   └── ...
│
├── .env.local                       # Environment Variables
├── next.config.ts                   # Next.js Configuration
├── tailwind.config.ts               # Tailwind Configuration
└── package.json                     # Dependencies
```

---

## 🎯 How It Works

### 1️⃣ **Conversational Planning**

The AI assistant asks you questions to understand your preferences:

```
🤖 Where are you traveling from?
👤 Mumbai

🤖 Where would you like to go?
👤 Paris

🤖 How many people are traveling?
👤 Couple

🤖 What's your budget?
👤 Medium

... and so on
```

### 2️⃣ **Smart Currency Localization**

Prices are automatically shown in your local currency:

| Origin | Currency | Example |
|--------|----------|---------|
| 🇮🇳 India | ₹ INR | ₹8,000 per night |
| 🇺🇸 USA | $ USD | $100 per night |
| 🇬🇧 UK | £ GBP | £80 per night |
| 🇪🇺 Europe | € EUR | €90 per night |
| 🇯🇵 Japan | ¥ JPY | ¥12,000 per night |

### 3️⃣ **Personalized Itinerary**

Based on your inputs, the AI generates:

- ✅ **8-10 Hotel Options** with ratings, prices, and locations
- ✅ **Day-by-Day Itinerary** with activities and timings
- ✅ **Interactive Map** showing all destinations
- ✅ **Budget Breakdown** for your trip
- ✅ **Local Tips** and hidden gems

### 4️⃣ **Interactive Features**

- 🗺️ View all locations on a 3D globe
- 💾 Save favorite hotels and activities
- 📝 Edit trip details anytime
- 📤 Export your itinerary

---

## 🛠️ Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

### Code Quality

This project uses:
- **TypeScript** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting (recommended)
- **Strict mode** enabled

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/smart-journey)

**Manual Deployment:**

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables
6. Click "Deploy"

### Environment Variables

Make sure to add all environment variables from `.env.local` to your Vercel project settings.

### Convex Deployment

```bash
# Deploy Convex backend
npx convex deploy
```

---

## 📖 API Documentation

### AI Model Endpoint

**POST** `/api/aimodel`

```typescript
{
  "messages": [
    { "role": "user", "content": "Plan a trip to Paris" }
  ],
  "isFinal": false
}
```

### Google Place Details

**POST** `/api/google-place-detail`

```typescript
{
  "placeName": "Eiffel Tower"
}
```

---

## 🤝 Contributing

Contributions are what make the open-source community amazing! Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact & Support

- **Email:** support@smartjourney.com
- **GitHub Issues:** [Report a bug](https://github.com/yourusername/smart-journey/issues)
- **Discussions:** [Join the conversation](https://github.com/yourusername/smart-journey/discussions)

---

## 🙏 Acknowledgments

Special thanks to these amazing projects and services:

- [Next.js](https://nextjs.org) - The React Framework for Production
- [Convex](https://convex.dev) - Real-time Backend Platform
- [Clerk](https://clerk.com) - Authentication Made Easy
- [Google Gemini](https://ai.google.dev) - Powerful AI Models
- [Mapbox](https://mapbox.com) - Beautiful Interactive Maps
- [shadcn/ui](https://ui.shadcn.com) - Beautifully Designed Components
- [Radix UI](https://radix-ui.com) - Accessible Component Primitives
- [Tailwind CSS](https://tailwindcss.com) - Utility-First CSS Framework
- [Framer Motion](https://framer.com/motion) - Animation Library
- [Lucide Icons](https://lucide.dev) - Beautiful Icon Set

---

<div align="center">

### Made with ❤️ by the Awais Ansari

**[⬆ Back to Top](#-smartjourney)**

</div>
