# Event Booking System - Backend

This is the backend server for the Event Booking System, built with Node.js, Express.js, and MongoDB.

## Directory Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── utils/          # Utility functions
└── server.js       # Entry point
```

## API Documentation

### Authentication Routes
- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `PUT /api/auth/profile` - Update user profile
  - Body: `{ name }`
  - Auth required
- `PUT /api/auth/password` - Update password
  - Body: `{ currentPassword, newPassword }`
  - Auth required

### Event Routes
- `GET /api/events` - Get all events
  - Query params: `category`, `search`, `page`, `limit`
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (admin only)
  - Body: `{ name, description, date, venue, price, category, image }`
- `PUT /api/events/:id` - Update event (admin only)
  - Body: `{ name, description, date, venue, price, category, image }`
- `DELETE /api/events/:id` - Delete event (admin only)

### Booking Routes
- `GET /api/bookings/my-bookings` - Get user's bookings
  - Auth required
- `POST /api/bookings` - Create new booking
  - Body: `{ eventId, ticketCount }`
  - Auth required
- `PATCH /api/bookings/:id` - Update booking
  - Body: `{ ticketCount }`
  - Auth required
- `DELETE /api/bookings/:id` - Cancel booking
  - Auth required

### Admin Routes
- `GET /api/admin/stats` - Get dashboard statistics
  - Auth required (admin only)
- `GET /api/admin/users` - Get all users
  - Auth required (admin only)
- `GET /api/admin/bookings` - Get all bookings
  - Auth required (admin only)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
NODE_ENV=development
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Start production server:
```bash
npm start
```

## Dependencies

- express - Web framework
- mongoose - MongoDB object modeling
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- express-validator - Input validation
- multer - File uploads
- morgan - HTTP request logger

## Development

### Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Code Style
- Follow ESLint configuration
- Use async/await for asynchronous operations
- Use proper error handling with try/catch
- Follow REST API best practices

## Security

- JWT authentication for protected routes
- Password hashing with bcrypt
- Input validation and sanitization
- CORS enabled
- Rate limiting on auth routes
- Helmet for security headers

## Error Handling

The API uses a centralized error handling mechanism:
- All errors are passed to the error handling middleware
- Custom AppError class for operational errors
- Proper error messages and status codes
- Development vs Production error responses