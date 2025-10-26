# TFH Admin Frontend - Church Management Dashboard

![React](https://img.shields.io/badge/React-18.2+-61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-blue) ![Vite](https://img.shields.io/badge/Vite-4.0+-646CFF) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.2+-38B2AC)

The comprehensive administrative dashboard for The Father's House Church. This React-based web application provides church administrators with complete control over content management, user administration, and church operations.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Admin Modules](#admin-modules)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Build & Deployment](#build--deployment)
- [User Roles & Permissions](#user-roles--permissions)

## 🎯 Overview

The TFH Admin Frontend serves as the central command center for The Father's House Church digital ecosystem, providing:

- **Complete Content Management**: Devotionals, events, announcements, testimonies
- **User Administration**: Member management, authentication, and permissions
- **Church Organization**: TFCC cells, leaders, zones, departments, and units
- **Analytics & Reporting**: Comprehensive statistics and insights
- **Media Management**: Image uploads, galleries, and rich text editing
- **Communication Tools**: Feedback management, visitor tracking, bulletins

**Live Dashboard**: https://tfh-admin.netlify.app/

## ✨ Features

### 📊 Dashboard & Analytics

- **Overview Dashboard**: Key metrics and recent activities
- **Statistics Module**: Detailed analytics and reporting
- **Performance Metrics**: User engagement and content performance
- **Growth Tracking**: Membership and engagement trends

### ✍️ Content Management

- **Daily Devotionals**
  - Rich text editor with formatting options
  - Scripture references and Bible reading plans
  - Scheduling and publication management
  - View tracking and analytics
- **Event Management**
  - Complete event creation and editing
  - Registration system configuration
  - Gallery management with image uploads
  - Event status and attendance tracking
- **Announcements**
  - Priority-based announcement system
  - Image attachments and formatting
  - Publication scheduling
  - Audience targeting

### 👥 User & Member Management

- **User Administration**
  - Complete user profiles and management
  - Authentication and password management
  - Member status and permissions
  - Registration source tracking
- **Admin Management**
  - Admin user creation and role assignment
  - Permission management
  - Activity logging

### 🏛️ Church Organization

- **TFCC (Cell Groups) Management**
  - Cell creation and management
  - Leader assignment and tracking
  - Zone-based organization
  - Member assignments
- **Church Structure**
  - Branch/location management
  - Department administration
  - Unit organization
  - Leadership hierarchy

### 💬 Communication & Engagement

- **Testimony Management**
  - Review and approve user testimonies
  - Category management
  - Publication control
  - Moderation tools
- **Feedback System**
  - Review user feedback and suggestions
  - Status management (read/unread)
  - Response tracking
- **Visitor Management**
  - First-timer and second-timer tracking
  - Follow-up assignments
  - Visit history and notes

### 📧 Communication Tools

- **Bulletin Subscribers**
  - Newsletter subscriber management
  - Email list management
  - Communication preferences
- **Giving Management**
  - Donation tracking and reporting
  - Giving analytics
  - Financial reporting

## 🛠️ Technology Stack

### Core Framework

- **React 18.2**: Modern React with hooks and concurrent features
- **TypeScript 4.9**: Type-safe development
- **Vite 4.0**: Fast build tool and development server

### Styling & UI

- **Tailwind CSS 3.2**: Utility-first CSS framework
- **React Icons**: Icon library
- **React Modal**: Modal dialogs and overlays
- **React Click Away Listener**: Click outside detection

### Rich Text & Forms

- **React Draft WYSIWYG**: Rich text editor
- **Draft.js**: Rich text editor framework
- **DraftJS to HTML**: Convert editor content to HTML
- **Formik 2.2**: Form handling and validation
- **Yup**: Schema-based form validation
- **React Select**: Advanced select components

### State Management & API

- **Redux Toolkit**: Predictable state management
- **React Redux**: React bindings for Redux
- **Axios**: HTTP client for API requests

### Routing & Navigation

- **React Router DOM v6**: Client-side routing
- **React Router**: Navigation and routing

### Utilities & Tools

- **React to Print**: Print functionality
- **UUID**: Unique identifier generation
- **Lodash**: Utility functions
- **React Toastify**: Toast notifications

## 📁 Project Structure

```
tfh-admin-frontend/
├── src/
│   ├── pages/                  # Admin pages/modules
│   │   ├── Admin/              # Admin user management
│   │   ├── Announcement/       # Announcements management
│   │   ├── authentication/     # Login/auth pages
│   │   ├── Church/             # Church organization
│   │   │   ├── branches/       # Church branches
│   │   │   ├── departments/    # Departments
│   │   │   └── units/          # Church units
│   │   ├── Dashboard/          # Main dashboard
│   │   ├── Devotional/         # Devotional management
│   │   ├── Event/              # Event management
│   │   │   └── gallery/        # Event galleries
│   │   ├── Feedback/           # User feedback
│   │   ├── Giving/             # Donation management
│   │   ├── Testimony/          # Testimony management
│   │   ├── TFCC/               # Cell group management
│   │   │   ├── cells/          # Individual cells
│   │   │   ├── leaders/        # Cell leaders
│   │   │   └── zones/          # Cell zones
│   │   ├── Users/              # User management
│   │   └── Visitation/         # Visitor tracking
│   │       ├── first-timer/    # First-time visitors
│   │       └── second-timer/   # Second-time visitors
│   ├── components/             # Reusable UI components
│   │   ├── common/             # Common components
│   │   ├── forms/              # Form components
│   │   ├── tables/             # Data table components
│   │   └── modals/             # Modal components
│   ├── layout/                 # Layout components
│   │   ├── AppLayout.tsx       # Main app layout
│   │   ├── AuthLayout.tsx      # Authentication layout
│   │   ├── Sidebar.tsx         # Navigation sidebar
│   │   └── Header.tsx          # Top header
│   ├── routes/                 # Routing configuration
│   │   ├── AppRoutes.tsx       # Main routing
│   │   ├── AuthRoutes.tsx      # Auth routing
│   │   └── ProtectedRoute.tsx  # Route protection
│   ├── store/                  # Redux store
│   │   ├── slices/             # Redux slices
│   │   ├── hooks.ts            # Typed hooks
│   │   └── store.ts            # Store configuration
│   ├── api/                    # API integration
│   │   └── axios.ts            # HTTP client setup
│   ├── functions/              # Utility functions
│   │   ├── environmentVariables.ts
│   │   ├── feedback.ts
│   │   ├── stringManipulations.ts
│   │   └── userSession.ts
│   ├── assets/                 # Static assets
│   │   ├── brand/              # Brand assets
│   │   ├── gifs/               # GIF files
│   │   ├── icons/              # Icon files
│   │   └── images/             # Image files
│   ├── common/                 # Common UI components
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # App entry point
│   └── index.css               # Global styles
├── types/                      # TypeScript definitions
│   ├── statistics.ts           # Statistics types
│   └── types.ts                # General types
├── dist/                       # Production build
├── public/                     # Public assets
├── vite.config.ts              # Vite configuration
├── tailwind.config.cjs         # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts
```

## 🏛️ Admin Modules

### Dashboard Module

- **Overview Statistics**: Key performance indicators
- **Recent Activities**: Latest actions and updates
- **Quick Actions**: Shortcuts to common tasks
- **Analytics Charts**: Visual data representation

### Content Management Modules

#### Devotional Management

- **Add/Edit Devotionals**: Rich text editor with full formatting
- **Content Scheduling**: Plan devotionals in advance
- **Bible References**: Scripture and reading plan management
- **Analytics**: View counts and engagement metrics

#### Event Management

- **Event Creation**: Complete event details and settings
- **Registration Setup**: Custom registration forms
- **Gallery Management**: Image uploads and organization
- **Attendance Tracking**: Event participation metrics

#### Announcement System

- **Priority Management**: Urgent vs. regular announcements
- **Media Attachments**: Images and formatting options
- **Audience Targeting**: Specific user groups
- **Publication Control**: Scheduling and visibility

### User Management Modules

#### Member Administration

- **User Profiles**: Complete member information
- **Authentication Management**: Password resets and access
- **Membership Status**: Active/inactive member tracking
- **Registration Analytics**: Source tracking and metrics

#### Admin Management

- **Admin User Creation**: Role-based admin accounts
- **Permission Management**: Granular access control
- **Activity Logging**: Admin action tracking
- **Security Settings**: Authentication and session management

### Church Organization Modules

#### TFCC Management

- **Cell Administration**: Individual cell group management
- **Leader Assignment**: Cell leader roles and responsibilities
- **Zone Organization**: Geographic/thematic cell grouping
- **Member Tracking**: Cell membership and participation

#### Church Structure

- **Branch Management**: Multiple church locations
- **Department Administration**: Church ministry departments
- **Unit Organization**: Smaller organizational units
- **Leadership Hierarchy**: Organizational structure

### Communication Modules

#### Testimony Management

- **Review System**: Approve/decline submitted testimonies
- **Content Moderation**: Ensure appropriate content
- **Category Management**: Organize testimonies by type
- **Publication Control**: Visibility and sharing settings

#### Feedback System

- **Feedback Review**: User suggestions and comments
- **Status Management**: Track response status
- **Response System**: Admin responses to feedback
- **Analytics**: Feedback trends and insights

#### Visitor Management

- **First-Timer Tracking**: New visitor information
- **Second-Timer Follow-up**: Return visitor management
- **Assignment System**: Delegate follow-up responsibilities
- **Visit History**: Comprehensive visitor records

## 🚀 Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- TFH Backend API running
- Admin account credentials

### Installation Steps

1. **Install Dependencies**

```bash
npm install
# or
yarn install
```

2. **Environment Configuration**

```bash
cp .env.example .env
# Edit .env with your configuration
```

3. **Start Development Server**

```bash
npm run dev
# or
yarn dev
```

4. **Build for Production**

```bash
npm run build
# or
yarn build
```

5. **Preview Production Build**

```bash
npm run preview
# or
yarn preview
```

The application will be available at `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api/v2
VITE_API_KEY=TFH_ADMIN

# Application Configuration
VITE_APP_NAME=TFH Admin Dashboard
VITE_APP_VERSION=1.0.0

# Authentication
VITE_SESSION_NAME=TFH_ADMIN_SESSION
VITE_SESSION_KEY=TFH_ADMIN_USER

# External Services
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_name

# Environment
VITE_NODE_ENV=development
```

## 👨‍💻 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint (if configured)
```

### Development Guidelines

#### Component Structure

```typescript
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

interface ComponentProps {
  title: string;
  onAction?: () => void;
}

const AdminComponent: React.FC<ComponentProps> = ({ title, onAction }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>{title}</h2>
      {/* Component content */}
    </div>
  );
};

export default AdminComponent;
```

#### Page Structure

```typescript
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../layout/PageLayout';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title='Page Title'>
      <div className='space-y-6'>{/* Page content */}</div>
    </PageLayout>
  );
};

export default AdminPage;
```

### API Integration

```typescript
// API service example
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-api-key': import.meta.env.VITE_API_KEY,
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const adminAPI = {
  // Devotional endpoints
  getDevotionals: () => api.get('/devotional'),
  createDevotional: (data: any) => api.post('/devotional', data),
  updateDevotional: (data: any) => api.patch('/devotional', data),
  deleteDevotional: (id: string) => api.delete(`/devotional/${id}`),

  // Event endpoints
  getEvents: () => api.get('/event'),
  createEvent: (data: any) => api.post('/event', data),

  // User endpoints
  getUsers: () => api.get('/user'),
  // ... other endpoints
};
```

### State Management

```typescript
// Redux slice example
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminState {
  currentUser: any;
  isAuthenticated: boolean;
  loading: boolean;
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
    },
  },
});
```

### Rich Text Editor Usage

```typescript
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

const RichTextEditor: React.FC = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const getHtmlContent = () => {
    return draftToHtml(convertToRaw(editorState.getCurrentContent()));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={onEditorStateChange}
      toolbar={{
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link'],
      }}
    />
  );
};
```

## 🚀 Build & Deployment

### Production Build

```bash
npm run build
```

This creates optimized production files in the `dist/` directory.

### Netlify Deployment (Current)

The admin dashboard is deployed on Netlify with automatic deployments.

**Build Settings**:

```bash
# Build command
npm run build

# Publish directory
dist
```

**Environment Variables** (set in Netlify dashboard):

- `VITE_API_URL`
- `VITE_API_KEY`
- All other environment variables

### Alternative Deployment

#### Vercel

```bash
npm i -g vercel
vercel
```

#### Custom Server

```bash
npm run build
# Serve dist/ directory with any static file server
```

## 🔐 User Roles & Permissions

### Admin Roles

#### Super Admin

- Full system access
- User management and admin creation
- System configuration
- All content management operations
- Analytics and reporting access

#### Admin

- Content management (devotionals, events, announcements)
- User management (limited)
- Testimony and feedback management
- TFCC management
- Statistics access

#### Content Manager

- Devotional creation and editing
- Event management
- Announcement creation
- Media management

### Permission System

```typescript
interface AdminPermissions {
  users: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
  content: {
    devotionals: boolean;
    events: boolean;
    announcements: boolean;
  };
  church: {
    tfcc: boolean;
    branches: boolean;
    departments: boolean;
  };
  analytics: boolean;
}
```

## 📊 Analytics & Reporting

### Available Reports

- **User Analytics**: Registration trends, active users, demographics
- **Content Performance**: Devotional views, event attendance, engagement
- **Church Growth**: Membership growth, cell group participation
- **Financial Reports**: Giving analytics and trends (if applicable)

### Dashboard Metrics

- Active users and new registrations
- Content views and engagement
- Event participation rates
- Testimony and feedback submissions

## 🔍 Features in Detail

### Content Management

- **WYSIWYG Editor**: Rich text editing with formatting options
- **Media Management**: Image upload and gallery management
- **Scheduling**: Content scheduling and publication
- **SEO Optimization**: Meta tags and content optimization

### User Experience

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Intuitive Navigation**: Easy-to-use sidebar and breadcrumbs
- **Quick Actions**: Shortcuts for common tasks
- **Toast Notifications**: User feedback for actions

### Performance

- **Code Splitting**: Lazy loading for better performance
- **Caching**: API response caching
- **Optimized Builds**: Minified production builds
- **Fast Loading**: Vite for rapid development

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Follow React and TypeScript best practices
4. Ensure responsive design
5. Test admin functionality thoroughly
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Create Pull Request

### Development Checklist

- [ ] TypeScript types properly defined
- [ ] Responsive design implemented
- [ ] API integration working
- [ ] User permissions respected
- [ ] Error handling implemented
- [ ] Toast notifications added
- [ ] Loading states handled

---

**Built with ❤️ for The Father's House Church** [https://tfhconline.org.ng/](https://tfhconline.org.ng/)

Access the admin dashboard at [https://tfh-admin.netlify.app/](https://tfh-admin.netlify.app/)
Feel free to download and use as a template to create the admin dashboard for the church you belong to
