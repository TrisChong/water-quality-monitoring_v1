# Water Quality Monitoring System - Program Structure

```mermaid
graph TD
    A[Frontend] --> B[Components]
    A --> C[Services]
    A --> D[Types]
    
    B --> B1[Auth]
    B --> B2[Dashboard]
    B --> B3[Common]
    
    B2 --> B2a[Sensors]
    B2 --> B2b[Profile]
    B2 --> B2c[Reports]
    
    C --> C1[API Services]
    C --> C2[Arduino Service]
    C --> C3[Storage]
    
    E[Backend] --> F[Routes]
    E --> G[Models]
    E --> H[Services]
    E --> I[Config]
    
    F --> F1[auth.js]
    F --> F2[readings.js]
    F --> F3[sensors.js]
    F --> F4[users.js]
    
    G --> G1[Reading.js]
    G --> G2[Sensor.js]
    G --> G3[User.js]
    
    H --> H1[exportService.js]
    H --> H2[sensorService.js]
```

## Sensor Data Flow
```mermaid
sequenceDiagram
    participant A as Arduino
    participant B as Backend
    participant F as Frontend
    participant U as User
    
    A->>B: Send sensor readings
    B->>B: Process & validate data
    B->>F: WebSocket update
    F->>U: Display real-time data
    
    alt Alert Condition
        B->>F: Send alert
        F->>U: Show notification
    end
```

## System Architecture
```mermaid
flowchart LR
    A[Arduino] -->|Sensor Data| B[Backend API]
    B -->|WebSocket| C[Frontend]
    B -->|Store| D[(MongoDB)]
    C -->|Display| E[User Interface]
    C -->|Auth| B
```

## Key Components
1. **Arduino Hardware**
   - TDS Sensor
   - pH Sensor
   - Turbidity Sensor
   - Flow Rate Sensor

2. **Backend Server**
   - Express.js API
   - MongoDB Database
   - WebSocket Server
   - Data Processing

3. **Frontend Application**
   - React Dashboard
   - Real-time Updates
   - Data Visualization
   - User Management

## Data Flow
1. Sensors collect water quality data
2. Arduino sends data to backend
3. Backend processes and stores data
4. Frontend receives updates via WebSocket
5. UI displays real-time information
6. Alerts triggered for abnormal readings

## Security Features
- JWT Authentication
- Role-based Access Control
- Secure WebSocket Connection
- Data Validation
- Error Handling