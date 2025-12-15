# 🎯 System Architecture Overview

## Complete System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Medical AI Assistant System                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┐    ┌──────────────────────────────┐
│      FRONTEND (React)        │    │    BACKEND (Node.js)         │
├─────────────────────────────┤    ├──────────────────────────────┤
│                              │    │                               │
│  http://localhost:5173      │◄──►│  http://localhost:5000       │
│                              │    │                               │
│  ┌────────────────────────┐  │    │  ┌──────────────────────────┐ │
│  │  App.jsx               │  │    │  │  server.js               │ │
│  │  (Main Component)      │  │    │  │  (Express Setup)         │ │
│  └────────────────────────┘  │    │  └──────────────────────────┘ │
│           │                   │    │           │                   │
│           ▼                   │    │           ▼                   │
│  ┌────────────────────────┐  │    │  ┌──────────────────────────┐ │
│  │ ChatInterface.jsx      │  │    │  │ routes/                  │ │
│  │ (Main Chat UI)         │  │    │  │ ├─ chat.js              │ │
│  └────────────────────────┘  │    │  │ ├─ conversations.js     │ │
│           │                   │    │  │ ├─ topics.js            │ │
│      ┌────┴─────┬────┬─────┐  │    │  │ ├─ appointments.js      │ │
│      │           │    │     │  │    │  │ ├─ medicalInfo.js       │ │
│      ▼           ▼    ▼     ▼  │    │  │ └─ users.js             │ │
│  ┌─────────┐ ┌──────┐ ┌─────────┐ │    │  └──────────────────────┘ │
│  │Sidebar  │ │Topic │ │Message  │ │    │                          │
│  │Component│ │Button│ │Bubble   │ │    │  ┌──────────────────────┐ │
│  └─────────┘ └──────┘ └─────────┘ │    │  │ Middleware:          │ │
│      │                              │    │  │ • CORS               │ │
│      └──────────────────────────────┼───►  │ • Helmet             │ │
│                API Client           │    │  │ • Rate Limiting      │ │
│            (apiClient.js)           │    │  │ • Error Handler      │ │
│                                     │    │  └──────────────────────┘ │
│  ┌────────────────────────────────┐ │    │                          │
│  │ hooks/useLocalStorage.js       │ │    │  ┌──────────────────────┐ │
│  │ (Session Persistence)          │ │    │  │ Data Storage:        │ │
│  └────────────────────────────────┘ │    │  │ • In-Memory Maps     │ │
│                                     │    │  │ • JSON responses     │ │
│  ┌────────────────────────────────┐ │    │  └──────────────────────┘ │
│  │ Styling:                       │ │    │                          │
│  │ • Tailwind CSS                 │ │    │  ┌──────────────────────┐ │
│  │ • Framer Motion (Animations)   │ │    │  │ Knowledge Base:      │ │
│  │ • Responsive Design            │ │    │  │ • Conditions DB      │ │
│  └────────────────────────────────┘ │    │  │ • Medications DB     │ │
│                                     │    │  │ • Lab Tests DB       │ │
└─────────────────────────────────────┘    │  └──────────────────────┘ │
                                           └──────────────────────────┘
                                                    │
                                                    ▼
                                           ┌─────────────────┐
                                           │   .env Config   │
                                           │   (Port, CORS)  │
                                           └─────────────────┘
```

## Request/Response Flow

```
┌──────────────┐
│ User Types   │
│ Message      │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────────┐
│ ChatInterface Component           │
│ • Captures input                  │
│ • Creates message object          │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ apiClient.chatAPI.sendMessage()  │
│ • Validates message              │
│ • Makes HTTP POST request        │
└──────┬───────────────────────────┘
       │
       ▼ (HTTP POST /api/chat/send)
       │
┌──────┴───────────────────────────┐
│ Backend - Express Server         │
│ • Routes request                 │
│ • Passes to chat.js              │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ routes/chat.js                   │
│ • Validates input                │
│ • Finds matching response        │
│ • Creates AI message             │
│ • Stores in conversation         │
└──────┬───────────────────────────┘
       │
       ▼ (HTTP Response - JSON)
       │
┌──────┴───────────────────────────┐
│ Frontend - apiClient receives    │
│ • User message                   │
│ • AI response                    │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ ChatInterface Component           │
│ • Updates messages state         │
│ • Re-renders component           │
│ • Shows new messages             │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ User Sees:                        │
│ ✓ Their message in blue bubble   │
│ ✓ AI response in gray bubble     │
│ ✓ Timestamp added                │
└──────────────────────────────────┘
```

## Component Hierarchy

```
frontend/
├── App.jsx
│   └── ChatInterface.jsx (Main Container)
│       ├── Sidebar (Left Panel)
│       │   ├── Conversation List
│       │   ├── New Chat Button
│       │   └── Responsive Toggle
│       │
│       ├── Header (Top Bar)
│       │   ├── Menu Toggle (Mobile)
│       │   ├── App Logo
│       │   └── New Chat Button (Desktop)
│       │
│       ├── Main Content Area
│       │   ├── Topic Buttons Grid (First Message Only)
│       │   │   └── TopicButton (x6)
│       │   │
│       │   └── Message List
│       │       └── MessageBubble (Dynamic)
│       │           ├── User Messages (Blue)
│       │           ├── AI Messages (Gray)
│       │           └── Timestamps
│       │
│       └── Input Area (Bottom)
│           ├── Text Input
│           └── Send Button
│
└── API Client Layer (apiClient.js)
    ├── chatAPI
    ├── conversationsAPI
    ├── topicsAPI
    ├── appointmentsAPI
    ├── medicalInfoAPI
    └── usersAPI
```

## API Route Structure

```
Backend Routes:
│
├── /api/health
│   └── GET → Server health status
│
├── /api/chat
│   ├── POST /send → Send message, get AI response
│   └── GET /:conversationId → Get conversation history
│
├── /api/conversations
│   ├── GET → Get all user conversations
│   ├── POST → Create new conversation
│   ├── GET /:id → Get single conversation
│   ├── PUT /:id → Update conversation
│   └── DELETE /:id → Delete conversation
│
├── /api/topics
│   ├── GET → Get all topics
│   ├── GET /:id → Get specific topic
│   └── GET /category/:category → Filter by category
│
├── /api/appointments
│   ├── GET → Get user appointments
│   ├── POST → Schedule appointment
│   ├── GET /:id → Get appointment details
│   ├── PUT /:id → Update appointment
│   └── DELETE /:id → Cancel appointment
│
├── /api/medical-info
│   ├── GET /conditions → Get conditions
│   ├── GET /conditions/:id → Get condition details
│   ├── GET /medications → Get medications
│   ├── GET /medications/:id → Get medication details
│   ├── GET /lab-tests → Get lab tests
│   ├── GET /lab-tests/:id → Get lab test details
│   └── POST /search → Search medical info
│
└── /api/users
    ├── POST /register → Register user
    ├── POST /login → Login user
    ├── GET /:userId → Get user profile
    ├── PUT /:userId → Update profile
    └── DELETE /:userId → Delete account
```

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                        User Interaction                           │
└──────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  React Component  │
                    │   State Update    │
                    └─────────┬─────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
         ▼                    ▼                    ▼
    ┌─────────┐         ┌──────────┐        ┌──────────┐
    │ Message │         │ Store in │        │ Trigger  │
    │ Objects │         │ Local    │        │ API Call │
    │         │         │ Storage  │        │          │
    └────┬────┘         └──────────┘        └────┬─────┘
         │                                        │
         └────────────────┬───────────────────────┘
                          │
                    ┌─────▼──────┐
                    │  HTTP POST │
                    │  /api/...  │
                    └─────┬──────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
    ┌────────┐      ┌──────────┐    ┌──────────────┐
    │Validate│      │Process   │    │Store in      │
    │Request │      │Request   │    │In-Memory DB  │
    └────┬───┘      └────┬─────┘    └──────┬───────┘
         │                │                 │
         └────────────────┼─────────────────┘
                          │
                    ┌─────▼──────────┐
                    │Generate        │
                    │Response        │
                    └─────┬──────────┘
                          │
                    ┌─────▼──────────┐
                    │Return JSON     │
                    │Response        │
                    └─────┬──────────┘
                          │
                    ┌─────▼──────────┐
                    │Frontend        │
                    │Updates State   │
                    │Re-renders UI   │
                    └────────────────┘
```

## Responsive Breakpoints

```
┌─────────────────────────────────────────────────────────┐
│              Responsive Design Strategy                 │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Mobile (< 640px)                                       │
│  ├─ Single column layout                                │
│  ├─ Hamburger menu (hidden sidebar)                     │
│  ├─ Full-width inputs                                   │
│  └─ Stacked buttons                                     │
│                                                          │
│  Tablet (640px - 1024px)                                │
│  ├─ Two-column grid                                     │
│  ├─ Optimized spacing                                   │
│  ├─ Touch-optimized tap targets                         │
│  └─ Responsive typography                              │
│                                                          │
│  Desktop (> 1024px)                                     │
│  ├─ Three-column grid                                   │
│  ├─ Visible sidebar                                     │
│  ├─ Full navigation bar                                 │
│  └─ Wide layouts with max-width constraints            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Technology Integration

```
┌────────────────────────────────────────────────────────┐
│                  Frontend Stack                         │
├────────────────────────────────────────────────────────┤
│                                                         │
│  React 19                    JavaScript Framework      │
│    ├─ Components (JSX)                                 │
│    ├─ Hooks (useState, useEffect, etc.)               │
│    └─ State Management                                 │
│                                                         │
│  Vite                        Build Tool                │
│    ├─ Fast bundling                                    │
│    ├─ Hot module replacement                           │
│    └─ Optimized for production                         │
│                                                         │
│  Tailwind CSS                Styling Framework         │
│    ├─ Utility-first approach                           │
│    ├─ Responsive classes                              │
│    └─ Pre-built components                             │
│                                                         │
│  Framer Motion               Animation Library         │
│    ├─ Smooth transitions                               │
│    ├─ GPU accelerated                                  │
│    └─ Component-based                                  │
│                                                         │
│  Lucide React                Icon Library              │
│    ├─ Beautiful icons                                  │
│    ├─ Customizable                                     │
│    └─ Lightweight                                      │
│                                                         │
│  UUID                        ID Generation             │
│    ├─ Unique identifiers                               │
│    ├─ For conversations                                │
│    └─ For users                                        │
│                                                         │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│                  Backend Stack                          │
├────────────────────────────────────────────────────────┤
│                                                         │
│  Node.js                     Runtime Environment       │
│    ├─ JavaScript execution                             │
│    ├─ Non-blocking I/O                                 │
│    └─ NPM ecosystem                                    │
│                                                         │
│  Express.js                  Web Framework             │
│    ├─ Routing                                          │
│    ├─ Middleware                                       │
│    └─ Request handling                                 │
│                                                         │
│  CORS                        Cross-Origin Support      │
│    ├─ Allows frontend requests                         │
│    ├─ Security boundaries                              │
│    └─ Preflight handling                               │
│                                                         │
│  Helmet                      Security Headers         │
│    ├─ Sets security headers                            │
│    ├─ Prevents attacks                                 │
│    └─ Best practices                                   │
│                                                         │
│  Rate Limiter                Request Limiting          │
│    ├─ 100 requests per 15 min                          │
│    ├─ Per IP address                                   │
│    └─ Abuse prevention                                 │
│                                                         │
│  UUID                        ID Generation             │
│    ├─ Unique identifiers                               │
│    ├─ Conversations & Users                            │
│    └─ Random & unique                                  │
│                                                         │
│  dotenv                      Configuration            │
│    ├─ Environment variables                            │
│    ├─ .env file support                                │
│    └─ Development & production                         │
│                                                         │
└────────────────────────────────────────────────────────┘
```

## Deployment Architecture (Optional)

```
┌─────────────────────────────────────────────────────────┐
│           Recommended Deployment Setup                  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Frontend Deployment Options:                           │
│  ├─ Vercel (Recommended for Vite)                       │
│  ├─ Netlify                                             │
│  ├─ GitHub Pages                                        │
│  └─ AWS S3 + CloudFront                                 │
│                                                          │
│  Backend Deployment Options:                            │
│  ├─ Railway (Recommended)                               │
│  ├─ Heroku                                              │
│  ├─ AWS Lambda/EC2                                      │
│  └─ DigitalOcean                                        │
│                                                          │
│  Database Options (For Production):                     │
│  ├─ MongoDB Atlas (Cloud)                               │
│  ├─ PostgreSQL (Supabase)                               │
│  ├─ Firebase (Serverless)                               │
│  └─ AWS RDS                                             │
│                                                          │
│  CI/CD Pipeline (Optional):                             │
│  ├─ GitHub Actions                                      │
│  ├─ GitLab CI                                           │
│  └─ Jenkins                                             │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

**Architecture Overview Created**: December 14, 2025
**Version**: 1.0.0
**Status**: Complete
