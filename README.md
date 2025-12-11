# Dashboard Application

Owner and Admin dashboards for space rental platform.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000/` for Owner Dashboard or `http://localhost:3000/admin` for Admin Dashboard.

## Setup

1. **Install dependencies:**
```bash
npm install express
npm install --save-dev @types/express @types/node typescript ts-node nodemon
```

2. **Update Supabase credentials in `src/server.ts`:**
```typescript
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
```

3. **Add scripts to `package.json`:**
```json
"scripts": {
  "dev": "nodemon --exec ts-node src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js"
}
```

## Project Structure

```
├── src/
│   └── server.ts              # Express server
├── public/
│   ├── owner-dashboard.html   # Owner dashboard
│   └── admin.html             # Admin dashboard
└── package.json
```

## Dashboards

### Owner Dashboard (`/`)
- Last 2 Weeks Income (with comparison)
- Last 2 Weeks Bookings (with comparison)
- Space Rating

### Admin Dashboard (`/admin`)
- Total Platform Revenue
- Total Users
- Total Spaces Listed

## Required Supabase Functions

Create these functions in your Supabase database:

**Owner:**
- `get_owner_2weeks_income(owner_id)`
- `get_owner_2weeks_bookings(owner_id)`
- `get_owner_average_rating(owner_id)`

**Admin:**
- `ad_get_total_platform_revenue()`
- `ad_get_total_spaces_listed()`
- `ad_get_total_users()`

## API Endpoints

**Owner:**
- `POST /api/owner/2weeks-income` - 2-week income comparison
- `POST /api/owner/2weeks-bookings` - 2-week bookings comparison
- `POST /api/owner/rating` - Space rating

**Admin:**
- `POST /api/admin/platform-revenue` - Platform revenue
- `POST /api/admin/total-spaces` - Total spaces
- `POST /api/admin/total-users` - Total users

**Other:**
- `GET /api/health` - Health check

## Troubleshooting

**Port in use:** Change port with `PORT=3001 npm run dev`

**Supabase error:** Check URL and API key in `server.ts`

**Function not found:** Create all required Supabase functions
