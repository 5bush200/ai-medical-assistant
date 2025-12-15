# Medical AI Assistant Backend

A comprehensive Node.js/Express backend for the Medical AI Assistance System, providing RESTful APIs for chat, conversations, medical information, and appointment management.

## Features

- ✅ **Chat Interface**: Send and receive AI-powered medical responses
- ✅ **Conversation Management**: Create, retrieve, and manage conversation history
- ✅ **Medical Topics**: Browse medical categories and suggestions
- ✅ **Appointment Management**: Schedule and manage medical appointments
- ✅ **Medical Information**: Access comprehensive medical database (conditions, medications, lab tests)
- ✅ **User Management**: User registration, authentication, and profile management
- ✅ **Rate Limiting**: Built-in protection against abuse
- ✅ **CORS Support**: Enabled for frontend integration
- ✅ **Error Handling**: Comprehensive error handling and logging

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Dependencies**:
  - `cors`: Cross-Origin Resource Sharing
  - `helmet`: Security middleware
  - `express-rate-limit`: Rate limiting
  - `uuid`: Unique ID generation
  - `dotenv`: Environment variables

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm

### Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (already provided):
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
OPENAI_API_KEY=your_api_key_here
```

## Running the Server

### Development Mode
```bash
npm run dev
```
Uses nodemon for auto-restart on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Chat Endpoints
```
POST /api/chat/send                    - Send a message
GET  /api/chat/:conversationId         - Get conversation messages
```

### Conversations
```
GET    /api/conversations              - Get all user conversations
POST   /api/conversations              - Create new conversation
GET    /api/conversations/:id          - Get single conversation
PUT    /api/conversations/:id          - Update conversation
DELETE /api/conversations/:id          - Delete conversation
```

### Topics
```
GET  /api/topics                       - Get all topics
GET  /api/topics/:id                   - Get single topic
GET  /api/topics/category/:category    - Get topics by category
```

### Appointments
```
GET    /api/appointments               - Get user appointments
POST   /api/appointments               - Create appointment
GET    /api/appointments/:id           - Get appointment details
PUT    /api/appointments/:id           - Update appointment
DELETE /api/appointments/:id           - Cancel appointment
```

### Medical Information
```
GET  /api/medical-info/conditions      - Get all conditions
GET  /api/medical-info/conditions/:id  - Get condition details
GET  /api/medical-info/medications     - Get all medications
GET  /api/medical-info/medications/:id - Get medication details
GET  /api/medical-info/lab-tests       - Get all lab tests
GET  /api/medical-info/lab-tests/:id   - Get lab test details
POST /api/medical-info/search          - Search medical information
```

### User Management
```
POST   /api/users/register             - Register new user
POST   /api/users/login                - Login user
GET    /api/users/:userId              - Get user profile
PUT    /api/users/:userId              - Update user profile
DELETE /api/users/:userId              - Delete user account
```

## Example API Requests

### Send a Chat Message
```bash
curl -X POST http://localhost:5000/api/chat/send \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are the symptoms of flu?",
    "conversationId": "conv-123",
    "userId": "user-456"
  }'
```

### Create an Appointment
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user-456",
    "doctorName": "Dr. Smith",
    "specialty": "General Practice",
    "date": "2024-12-20",
    "time": "10:00 AM",
    "reason": "Annual checkup"
  }'
```

### Register a User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `CORS_ORIGIN`: Frontend URL for CORS
- `OPENAI_API_KEY`: OpenAI API key for enhanced AI responses

## Current Data Storage

The backend uses in-memory storage (JavaScript Maps) for demo purposes. For production:

1. Replace with a proper database (MongoDB, PostgreSQL, etc.)
2. Add authentication middleware
3. Implement data validation schemas
4. Add comprehensive logging
5. Use environment-specific configurations

## Security Notes

- ✅ Uses Helmet for security headers
- ✅ Implements rate limiting
- ✅ CORS enabled for frontend
- ✅ Input validation on critical endpoints

For production deployment:
- Add JWT authentication
- Implement proper password hashing
- Use HTTPS
- Add database encryption
- Implement proper access control

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
# Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5000 | xargs kill -9
```

### CORS Issues
Verify `CORS_ORIGIN` in `.env` matches your frontend URL

### Rate Limiting
The API allows 100 requests per 15 minutes from a single IP

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] JWT authentication
- [ ] File upload for medical records
- [ ] Real-time WebSocket chat
- [ ] Integration with external medical APIs
- [ ] Advanced medical AI using OpenAI
- [ ] Push notifications
- [ ] Analytics and reporting

## Support

For issues or questions, please contact support or create an issue in the repository.
