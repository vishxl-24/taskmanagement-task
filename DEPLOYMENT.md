# Deployment Guide (Vercel & Firebase)

This guide provides step-by-step instructions for deploying the **Task Management Application** to Vercel and configuring Firebase.

---

## Step 1: Firebase Console Setup

Before deploying to Vercel, set up your Firebase project:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and follow the prompts to create a new project.
3. In the project overview, click the **Web icon (`</>`)** to add a Web App.
4. Register the app (e.g., `TaskFlow Web`) and copy the Firebase configuration object keys:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Enable Google Authentication
1. Navigation menu: **Build > Authentication**.
2. Click **Get Started** if not enabled.
3. Select the **Sign-in method** tab and click **Google**.
4. Enable Google sign-in, select your support email, and click **Save**.

### Enable Cloud Firestore
1. Navigation menu: **Build > Firestore Database**.
2. Click **Create Database**.
3. Choose your location and start in **Production Mode**.
4. Go to the **Rules** tab, paste the contents of `firestore.rules`, and click **Publish**.

---

## Step 2: Deploying to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Push your code to a GitHub repository.
2. Log in to [Vercel](https://vercel.com).
3. Click **Add New > Project**.
4. Import your GitHub repository.
5. In **Framework Preset**, Vercel will automatically select **Vite**.
6. Expand **Environment Variables** and add the following keys from your `.env` file:

| Key | Value |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | `your_actual_api_key` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `your_project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `your_project_id` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `your_project.appspot.com` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `your_messaging_sender_id` |
| `VITE_FIREBASE_APP_ID` | `your_app_id` |

7. Click **Deploy**.

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
```

Follow the CLI prompts and add environment variables when prompted or via `vercel env add`.

---

## Step 3: Add Vercel Domain to Firebase Authorized Domains

Once Vercel finishes deploying, copy your production URL (e.g., `https://task-management-app.vercel.app`).

1. Go to **Firebase Console > Authentication > Settings**.
2. Select **Authorized domains**.
3. Click **Add domain**.
4. Paste your Vercel deployment domain (without `https://`, e.g., `task-management-app.vercel.app`).
5. Click **Save**.

---

## Verification

1. Open your live Vercel URL.
2. Click **Continue with Google** and complete authentication.
3. Verify that you arrive at your Dashboard.
4. Create a task and update its status to test Firestore connectivity.
