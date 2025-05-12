# Event Booking System

A full-stack web application for managing and booking events. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- User authentication and authorization
- Browse and search events
- Filter events by category
- Book tickets for events
- Manage bookings (view, edit, cancel)
- User profile management
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- React Toastify for notifications
- SweetAlert2 for modals

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/HemaEzzat123/Event-Booking-System.git>
cd event-booking-system
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

5. Create a `.env` file in the frontend directory with the following variables:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- PUT /api/auth/profile - Update user profile
- PUT /api/auth/password - Update user password

### Events
- GET /api/events - Get all events
- GET /api/events/:id - Get single event
- POST /api/events - Create new event (admin only)
- PUT /api/events/:id - Update event (admin only)
- DELETE /api/events/:id - Delete event (admin only)

### Bookings
- GET /api/bookings/my-bookings - Get user's bookings
- POST /api/bookings - Create new booking
- PATCH /api/bookings/:id - Update booking
- DELETE /api/bookings/:id - Cancel booking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 