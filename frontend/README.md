# Event Booking System - Frontend

This is the frontend application for the Event Booking System, built with React.js and Tailwind CSS.

## Directory Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   ├── contexts/    # React contexts
│   ├── pages/       # Page components
│   ├── utils/       # Utility functions
│   ├── App.js       # Main App component
│   └── index.js     # Entry point
└── package.json     # Dependencies and scripts
```

## Features

- Modern, responsive UI with Tailwind CSS
- User authentication (login/register)
- Event browsing and searching
- Category filtering
- Event booking system
- User profile management
- Admin dashboard
- Dark mode support

## Pages

- `/` - Home page with event listing
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile management
- `/event/:id` - Event details
- `/my-bookings` - User's bookings
- `/admin/*` - Admin dashboard and management

## Components

### Common Components
- Navbar
- Footer
- EventCard
- BookingCard
- SearchBar
- CategoryFilter
- LoadingSpinner
- Toast notifications

### Admin Components
- Dashboard
- EventForm
- BookingList
- UserList
- Stats

## State Management

- React Context for global state (AuthContext)
- Local state with useState for component-level state
- Axios for API calls

## Styling

- Tailwind CSS for utility-first styling
- Custom components with responsive design
- Dark mode support
- Consistent color scheme and typography

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm start
```

3. Build for production:
```bash
npm run build
```

## Dependencies

- react - UI library
- react-router-dom - Routing
- axios - HTTP client
- react-toastify - Toast notifications
- sweetalert2 - Modal dialogs
- tailwindcss - CSS framework
- @heroicons/react - Icons

## Development

### Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Code Style
- Follow ESLint configuration
- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement error boundaries

## Features to Implement

- [ ] Event image upload
- [ ] Payment integration
- [ ] Email notifications
- [ ] Social sharing
- [ ] Event ratings and reviews
- [ ] Advanced search filters
- [ ] Calendar view
- [ ] Export bookings to PDF

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Code splitting with React.lazy
- Image optimization
- Memoization where needed
- Efficient re-renders
- Proper loading states

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast
- Screen reader support 