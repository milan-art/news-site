## Daily Pulse — Modern News UI (React + Vite)

A minimalist, accessible, and responsive news website UI built with React and Vite. It features:

- Large hero carousel for trending stories
- Grid-based article cards with images and headlines
- Category tabs (Top Stories, Politics, Sports, Tech, Entertainment)
- Sticky header, search bar, login/signup placeholders
- Infinite scroll for articles
- Social media sharing buttons
- Dedicated ad/banner spaces
- Newsletter subscription pop-up (accessible)
- Readable typography with dark mode

### Requirements
- Node.js 18+

### Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (default `http://localhost:5173`).

### Production Build

```bash
npm run build
npm run preview
```

### API Integration

The app integrates with a backend API for fetching articles. Configure the API base URL in the `.env` file:

```env
VITE_API_BASE_URL=http://localhost:4000
```

The app fetches published articles from:
```
GET /api/articles?status=published&pageSize=10
```

The trending carousel displays the top 4-6 articles sorted by:
1. Featured status (featured articles first)
2. View count (highest views first)
3. Creation date (newest first)

If the API is unavailable, the app falls back to mock data for development.

### Notes
- All data is mocked by default and images are from `picsum.photos`.
- Dark mode respects system preference and can be toggled in the header.
- The newsletter pop-up will reappear after one week unless you resubscribe or dismiss again.
- The trending carousel automatically filters and sorts articles by viewCount and featured status.


