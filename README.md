# Pando Project

A full-stack application for managing transport, vehicles, materials, and shipments with multi-trip coordination.

## Project Structure

```
pando/
├── client/          # React frontend application
├── server/          # Node.js/Express backend API
└── package.json     # Root package.json with scripts
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Guhanmsd77/pando.git
cd pando
```

2. Install dependencies for both client and server:
```bash
npm install
```

## Running the Application

### Run Both Server and Client Concurrently
```bash
npm start
```
This command runs both the server and client simultaneously using the `concurrently` package.

### Run Server Only
```bash
npm run server
```
The server will start on the configured port (typically 5000).

### Run Client Only
```bash
npm run client
```
The client will start on the configured port (typically 3000).

---

## Client (Frontend)

Built with **React** and **React Router DOM** for navigation.

### Directory Structure
```
client/src/
├── Components/       # All reusable frontend components
├── styles/          # CSS files for styling
├── App.js           # Main application component
└── index.js         # Entry point
```

### Routes

The application has 5 main routes:

| Route | Path | Description |
|-------|------|-------------|
| Home | `/` | Landing/home page |
| Transport | `/transport` | Transport management |
| Vehicle | `/vehicle` | Vehicle management |
| Materials | `/material` | Materials management |
| Shipment | `/shipment` | Shipment management with multi-trip support |

### Features

#### Shipment Management with Multi-Trip Support
- **Group Shipments**: Create shipments with the same group ID to organize related shipments
- **Multi-Trip Details**: Group 2 or more shipments with the same group ID to create a multi-trip
- **View Multi-Trip Details**: Click on a shipment row to view complete multi-trip information
- **Add Resources to Multi-Trip**: Assign vehicles and material types to multi-trip shipments

#### Other Components
- Each component (Transport, Vehicle, Materials) has:
  - A dedicated database connection
  - A form to create new records
  - A table view to display and retrieve data

---

## Server (Backend)

Built with **Node.js** and **Express.js** with **MongoDB** for data persistence.

### Directory Structure
```
server/
├── controller/      # API route controllers
├── lib/            # Service/business logic
├── models/         # Data models
├── Schema/         # MongoDB schemas
├── routes/         # API endpoints
├── validator/      # Request validation
├── db/             # Database connection
├── presentation/   # Response formatting
├── tests/          # Unit and integration tests
└── server.js       # Entry point
```

### API Endpoints

The server provides REST APIs for:
- **Materials** - Create, read, update, delete materials
- **Vehicles** - Manage vehicle fleet
- **Transport** - Handle transport operations
- **Shipments** - Create and manage shipments with multi-trip support

### Key Features
- Request validation using custom validators
- Service layer for business logic separation
- MongoDB integration for data persistence
- Error handling and response formatting

---

## Technology Stack

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Jest** - Testing framework

### DevOps
- **concurrently** - Run multiple npm scripts simultaneously
- **Git** - Version control

---

## Project Workflow

1. **Frontend**: User interacts with React components and navigates using React Router
2. **API Call**: Frontend makes REST API calls to the backend
3. **Backend Processing**: 
   - Validates request using validators
   - Processes business logic in service layer
   - Interacts with MongoDB database
   - Returns formatted response
4. **Response**: Frontend receives data and updates the UI

---
