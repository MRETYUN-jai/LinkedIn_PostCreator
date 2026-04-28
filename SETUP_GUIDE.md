# 🚀 LinkedIn Auto Poster — Setup Guide

## Step 1: Create a LinkedIn Developer App

1. Go to **[https://www.linkedin.com/developers/](https://www.linkedin.com/developers/)**
2. Click **"Create App"**
3. Fill in:
   - **App name:** `LinkedIn Auto Poster`
   - **LinkedIn Page:** Select your page (or create one)
   - **App logo:** Upload any image
   - **Legal agreement:** Check the box
4. Click **"Create App"**

## Step 2: Configure the App

1. Go to the **"Auth"** tab in your app settings
2. Under **"Authorized redirect URLs"**, add:
   ```
   http://localhost:3000/callback
   ```
3. Copy your **Client ID** and **Client Secret**

## Step 3: Request "Share on LinkedIn" Product

1. Go to the **"Products"** tab
2. Find **"Share on LinkedIn"**
3. Click **"Request Access"**
4. Wait for approval (usually instant to a few hours)

> ⚠️ This step is CRITICAL — without it, the API cannot post on your behalf.

## Step 4: Add Credentials

1. Open `server/.env`
2. Replace the placeholder values:
   ```
   CLIENT_ID=your_actual_client_id
   CLIENT_SECRET=your_actual_client_secret
   ```

## Step 5: Install & Run

```bash
cd server
npm install
npm start
```

## Step 6: Authenticate

1. Open **http://localhost:3000** in your browser
2. Click **"🔐 Connect LinkedIn Account"**
3. Log into LinkedIn and authorize the app
4. You'll be redirected back — done!

## Step 7: You're Live! 🎉

The server will now:
- ✅ Auto-post at **8:30 AM** and **6:00 PM** daily
- ✅ Rotate between 5 content types
- ✅ Never repeat the same type within 3 posts
- ✅ Keep running as long as the server is on

### Manual Controls
- **http://localhost:3000** — Dashboard & status
- **http://localhost:3000/post-now** — Post immediately
- **http://localhost:3000/preview** — Preview next post

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Not authenticated" | Visit http://localhost:3000/auth |
| "Token expired" | Re-authenticate (tokens last ~60 days) |
| "Share on LinkedIn not available" | Wait for product approval in developer portal |
| Posts not publishing | Check console logs for API error details |

## Keep Server Running 24/7

To keep the auto-poster running permanently, use **PM2**:

```bash
npm install -g pm2
pm2 start server.js --name linkedin-poster
pm2 save
pm2 startup
```
