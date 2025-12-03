"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Supabase configuration
const SUPABASE_URL = 'https://ndbzwrhgfrspeiycrnxs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYnp3cmhnZnJzcGVpeWNybnhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MTc1NzYsImV4cCI6MjA3NzA5MzU3Nn0.TRPZcIqEe4eWmG0w8e_Q-V1pQlB_TKVNzMc7lbR7Fko';
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// API endpoint to fetch all bookings from Supabase
app.post('/api/bookings', async (_req, res) => {
    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_total_bookings`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({})
        });
        if (!response.ok) {
            const errorData = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch bookings',
                details: errorData.hint || errorData.details
            });
            return;
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// API endpoint to fetch owner totals with owner_id parameter
app.post('/api/owner-totals', async (req, res) => {
    try {
        const { owner_id } = req.body;
        if (!owner_id) {
            res.status(400).json({
                error: 'Bad request',
                message: 'owner_id is required'
            });
            return;
        }
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_owner_totals`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ p_owner_id: parseInt(owner_id) })
        });
        if (!response.ok) {
            const errorData = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch owner totals',
                details: errorData.hint || errorData.details
            });
            return;
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching owner totals:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// API endpoint to fetch owner income by day
app.post('/api/owner-income', async (req, res) => {
    try {
        const { owner_id } = req.body;
        if (!owner_id) {
            res.status(400).json({
                error: 'Bad request',
                message: 'owner_id is required'
            });
            return;
        }
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_owner_income_by_day`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({ p_owner_id: parseInt(owner_id) })
        });
        if (!response.ok) {
            const errorData = await response.json();
            res.status(response.status).json({
                error: errorData.message || 'Failed to fetch owner income',
                details: errorData.hint || errorData.details
            });
            return;
        }
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching owner income:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// Health check endpoint
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});
// Serve the main HTML page
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public', 'index.html'));
});
// 404 handler
app.use((_req, res) => {
    res.status(404).json({ error: 'Not found' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server is running at http://localhost:${PORT}`);
    console.log(`📊 Open your browser and go to http://localhost:${PORT}`);
    console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});
exports.default = app;
//# sourceMappingURL=server.js.map