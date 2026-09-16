# Task Management Application

A simple, polished, and secure Task Management web application built for a Graduate Support Engineer Trainee placement assessment.

## Overview

TaskFlow is a responsive, user-isolated task management application that allows users to sign in securely using Google Authentication, create tasks, view their personal tasks, and update task statuses in real-time using Firebase Firestore.

## Features

- **Google Authentication**: Seamless popup sign-in with Google via Firebase Auth.
- **Create Tasks**: Quickly create tasks with required titles and optional descriptions.
- **View Tasks**: View a real-time list of user-owned tasks with summary counts for each status.
- **Update Task Status**: Transition tasks between `Planned`, `In Progress`, and `Complete` statuses with optimistic UI updates.
- **User-Specific Task Access**: strict data isolation ensuring users can only read and modify their own tasks.

## Technology Stack

- **Frontend**: React 19, Vite, JavaScript, Plain CSS (vanilla design system with HSL colors & dark mode accents)
- **Backend & Database**: Firebase Authentication (Google Auth Provider), Firebase Firestore (NoSQL realtime database)
- **Deployment Target**: Vercel

## How to Access the Application

- **Live Deployed Application**: `[ADD DEPLOYED URL HERE]`

## How to Use

1. **Open Application**: Navigate to the live web app URL in your browser.
2. **Click Continue with Google**: Click the "Continue with Google" button on the login card.
3. **Sign In**: Select your Google account in the popup modal.
4. **Open Dashboard**: Upon successful sign-in, you will automatically be redirected to your personal dashboard.
5. **Create a Task**: Click the **+ Create Task** button, fill in the required Task Title and optional Description, and click **Create Task**.
6. **View Tasks**: View your tasks listed on the dashboard along with real-time status summary cards at the top.
7. **Change Task Status**: Use the status dropdown on any task card to change its status between `Planned`, `In Progress`, and `Complete`.
8. **Logout**: Click the **Logout** button in the top navbar to log out safely.

## Login Instructions

1. Click **Continue with Google**.
2. If prompted by your browser, allow popups for authentication.
3. Select your preferred Google account.
4. If authentication succeeds, your name and profile avatar will appear in the top navbar.

## Task Statuses

Each task in TaskFlow follows a strict status lifecycle:
- **Planned**: Default status for newly created tasks.
- **In Progress**: Tasks currently being worked on.
- **Complete**: Finished tasks.

## Requirement Assumptions

1. **User Isolation**: Each authenticated user manages their own private tasks.
2. **Task Schema**: A task requires a non-empty title (up to 100 characters) and may optionally contain a description (up to 500 characters).
3. **Default Status**: All new tasks start automatically in `Planned` status.
4. **Status Transitions**: Tasks can move directly between any of the three allowed statuses (`Planned`, `In Progress`, `Complete`).
5. **Simplified Scope**: Tasks do not require due dates, priorities, categories, tags, or file attachments.
6. **No Deletion/Full Edit**: Task deletion and editing of title/description after creation are intentionally excluded per assessment scope.
7. **Single User Workspace**: There are no teams, shared workspaces, admin roles, or notifications.

## Known Limitations

- Only Google authentication is supported.
- Tasks are strictly private to each authenticated user (no sharing or multi-user assignment).
- No task deletion or task title editing (status update only).
- No team or organization management.

## Important Notes / Warnings

- **Firebase Configuration Required**: You must populate `.env` with valid credentials from your Firebase Console.
- **Firestore Security Rules**: The provided `firestore.rules` must be deployed to your Firebase project to enforce backend data isolation.
- **Google Auth Provider**: Google Sign-In must be enabled in your Firebase Console (**Authentication > Sign-in method > Google**).
- **Authorized Domains**: Add your local (`localhost`) and Vercel production domains under **Firebase Console > Authentication > Settings > Authorized domains**.

## Local Setup

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd taskpse
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Open `.env` and fill in your Firebase Web App credentials:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Local Development Server

```bash
npm run dev
```

Navigate to `http://localhost:5173`.

### 4. Build for Production Verification

```bash
npm run build
```

## Deployment

Refer to `DEPLOYMENT.md` for detailed instructions on deploying the frontend to Vercel and configuring environment variables.

## Project Structure

```text
taskpse/
├── .env.example            # Environment variables placeholder template
├── .env                    # Local environment variables (do not commit secrets)
├── firestore.rules         # Security rules for Firestore data isolation & validation
├── index.html              # Main HTML document with Inter font & metadata
├── package.json            # Project dependencies & scripts
├── vite.config.js          # Vite build configuration with React plugin
├── src/
│   ├── main.jsx            # React root mount point
│   ├── App.jsx             # Main application component & Auth state router
│   ├── index.css           # Global CSS variables, reset, & loaders
│   ├── App.css             # Component-specific styles & responsive layouts
│   ├── components/
│   │   ├── Login.jsx       # Google Sign-In view
│   │   ├── Dashboard.jsx   # Main dashboard with summaries & task grid
│   │   ├── TaskForm.jsx    # Task creation modal dialog
│   │   └── TaskCard.jsx    # Individual task card component with status select
│   ├── firebase/
│   │   └── config.js       # Firebase SDK initialization
│   └── services/
│       ├── authService.js  # Google Auth & state listener wrappers
│       └── taskService.js  # Firestore CRUD operations & real-time subscriptions
└── README.md               # Main project documentation
```

## Security Implementation

1. **Authentication Boundary**: Unauthenticated users cannot access the dashboard view. Auth state is persisted securely via Firebase Auth.
2. **User Data Isolation**: Every task document stores `userId: request.auth.uid`. Queries filter strictly by `userId`.
3. **Firestore Security Rules**: Security is enforced at the database level (`firestore.rules`). Users cannot read, write, or mutate tasks belonging to other Firebase UIDs.
