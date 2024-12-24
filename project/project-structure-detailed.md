# Water Quality Monitoring System - Detailed Project Structure

```
📁 Project Root
├── 📁 server/                  # Backend server code
│   ├── 📁 config/             # Server configuration
│   │   ├── db.js              # Database connection setup
│   │   └── socket.js          # WebSocket configuration
│   │
│   ├── 📁 middleware/         # Express middleware
│   │   ├── auth.js            # JWT authentication
│   │   └── errorHandler.js    # Global error handling
│   │
│   ├── 📁 models/             # Database models
│   │   ├── Reading.js         # Water quality readings schema
│   │   ├── Sensor.js          # Sensor configuration schema
│   │   └── User.js            # User account schema
│   │
│   ├── 📁 routes/             # API endpoints
│   │   ├── auth.js            # Authentication routes
│   │   ├── readings.js        # Sensor data routes
│   │   ├── sensors.js         # Sensor management
│   │   └── users.js           # User management
│   │
│   ├── 📁 services/           # Business logic
│   │   ├── exportService.js   # Data export functionality
│   │   └── sensorService.js   # Sensor data processing
│   │
│   └── 📁 utils/              # Utility functions
│       └── logger.js          # Logging functionality
│
├── 📁 src/                    # Frontend React application
│   ├── 📁 components/         # React components
│   │   ├── 📁 auth/          # Authentication components
│   │   │   ├── LoginForm     # User login
│   │   │   └── RegisterForm  # User registration
│   │   │
│   │   ├── 📁 dashboard/     # Dashboard components
│   │   │   ├── 📁 sensors/   # Sensor-related components
│   │   │   ├── 📁 profile/   # User profile management
│   │   │   └── 📁 reports/   # Data reporting
│   │   │
│   │   └── 📁 common/        # Shared components
│   │
│   ├── 📁 contexts/          # React contexts
│   │   └── AuthContext.tsx   # Authentication state
│   │
│   ├── 📁 services/          # Frontend services
│   │   ├── 📁 api/          # API communication
│   │   ├── 📁 arduino/      # Arduino integration
│   │   └── 📁 storage/      # Local storage
│   │
│   ├── 📁 types/            # TypeScript definitions
│   │   ├── auth.ts          # Authentication types
│   │   ├── sensors.ts       # Sensor-related types
│   │   └── profile.ts       # User profile types
│   │
│   └── 📁 utils/            # Utility functions
│       └── sensorSocket.ts  # WebSocket setup
│
└── 📄 Various config files   # Project configuration
```

## Key Functions by Component

### Backend (server/)

#### Config
- Database connection management
- WebSocket server setup
- Environment configuration

#### Middleware
- JWT authentication validation
- Request/response error handling
- Role-based access control

#### Models
- Data schema definitions
- Database relationships
- Field validations

#### Routes
- API endpoint handlers
- Request validation
- Response formatting

#### Services
- Data processing logic
- Excel report generation
- Real-time sensor monitoring

### Frontend (src/)

#### Components
- User interface elements
- Real-time data display
- Interactive forms

#### Contexts
- Global state management
- Authentication state
- User session handling

#### Services
- API communication
- Local data persistence
- Arduino device integration

#### Types
- TypeScript interfaces
- Type definitions
- Data models

## Data Flow Architecture

1. **Sensor Data Collection**
   - Arduino reads sensor values
   - Data formatted and sent to backend

2. **Backend Processing**
   - Validate incoming data
   - Store in MongoDB
   - Emit via WebSocket

3. **Frontend Display**
   - Real-time updates via WebSocket
   - Data visualization
   - Alert notifications

## Key Features

1. **Real-time Monitoring**
   - TDS Level
   - pH Level
   - Turbidity
   - Flow Rate

2. **User Management**
   - Authentication
   - Role-based access
   - Profile management

3. **Data Management**
   - Historical data
   - Export functionality
   - Report generation

4. **System Administration**
   - Sensor configuration
   - User administration
   - System monitoring