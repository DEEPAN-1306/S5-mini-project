# Capstone Connect – Full-Stack Web Application

## 1. Project Overview

**Capstone Connect** is a full-stack web application designed to provide a centralized platform for managing and connecting capstone project activities. The application follows a modular architecture, separating the frontend and backend to make development, testing, maintenance, and future improvements easier.

The backend provides API functionality and integrates with MongoDB Atlas for database storage. The application can be developed locally and deployed online using a hosting platform such as Render.

## 2. Problem Statement

Managing project-related information through separate tools can make it difficult to organize data, maintain consistency, and coordinate application activities.

Capstone Connect aims to provide a structured web application with a dedicated backend and database, creating a foundation for managing project information efficiently.

## 3. Project Objectives

- Develop a full-stack web application with a modular architecture.
- Create a backend API to handle application requests.
- Integrate MongoDB for persistent data storage.
- Separate frontend and backend responsibilities.
- Use environment variables to manage configuration securely.
- Deploy the backend to a cloud hosting platform.
- Improve maintainability through organized source code.
- Provide a foundation for future features and enhancements.

## 4. Key Features

- **Full-stack architecture:** Supports separate frontend and backend components.
- **Backend API:** Provides a structured place for application business logic.
- **MongoDB integration:** Supports persistent database storage through MongoDB Atlas.
- **Environment configuration:** Keeps deployment-specific settings outside source code.
- **Modular code structure:** Makes the application easier to maintain and extend.
- **Cloud deployment:** Supports hosting the backend on Render.
- **Scalable foundation:** Allows additional modules and features to be developed in future versions.

*Note: The exact implemented features depend on the current source code. Update this section to match the functionality available in your application.*

## 5. Technologies Used

### Backend
- Node.js
- Express.js
- JavaScript with ES modules
- Mongoose

### Database
- MongoDB
- MongoDB Atlas

### Development Tools
- Visual Studio Code
- Git
- GitHub
- npm

### Deployment
- Render

### Frontend
- Add the actual frontend framework and libraries used in this project, such as React, Angular, or standard HTML, CSS, and JavaScript.

## 6. System Architecture

The application follows a client-server architecture.

1. The user interacts with the frontend.
2. The frontend sends HTTP requests to the backend API.
3. The Express.js server processes the requests.
4. The backend communicates with MongoDB through Mongoose.
5. MongoDB stores or retrieves the required data.
6. The backend returns an appropriate response to the frontend.

### Architecture Flow

User  
↓  
Frontend Application  
↓  
Backend API – Node.js and Express.js  
↓  
Mongoose  
↓  
MongoDB Atlas

## 7. Project Structure

The repository uses a separate backend directory.

```text
capstone-connect-monorepo/
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── README.md
├── .gitignore
└── package.json
```

The structure above is a guide based on the known backend files. Your actual repository may contain additional frontend folders, routes, controllers, models, middleware, and configuration files.

## 8. Prerequisites

Before running the project, install:

- Node.js and npm
- Git
- Visual Studio Code or another code editor
- A MongoDB Atlas account
- A GitHub account

Verify your Node.js and npm installations:

```bash
node --version
npm --version
git --version
```

## 9. Installation and Setup

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd capstone-connect-monorepo
```

Replace the placeholder with your actual GitHub repository URL.

### Step 2: Install Dependencies

Install the root dependencies:

```bash
npm install
```

Install the backend dependencies:

```bash
npm --prefix server install
```

### Step 3: Configure Environment Variables

Create a `.env` file inside the `server` directory.

Add your MongoDB connection string:

```env
MONGODB_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING
```

Use your own valid MongoDB Atlas URI. Do not publish your actual database username, password, or connection string.

Ensure that the backend configuration loads environment variables correctly.

### Step 4: Configure MongoDB Atlas

1. Create or select a MongoDB Atlas cluster.
2. Create a database user with an appropriate password.
3. Configure Network Access to allow the deployed application to connect.
4. Copy the application's connection string.
5. Place the connection string in the backend environment configuration.
6. Confirm that the database user has the required database permissions.

Avoid committing database credentials to GitHub.

### Step 5: Start the Backend

Use the development script configured in the backend package:

```bash
npm --prefix server run dev
```

The server should start if its dependencies, configuration, port, and database connection are valid.

## 10. Environment Variables

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `PORT` | Port on which the server listens, if supported by the configuration |
| `NODE_ENV` | Environment mode, if configured by the application |

Set production environment variables in the hosting platform rather than hardcoding credentials in the source code.

## 11. Database Integration

Capstone Connect uses MongoDB Atlas as its cloud database service.

Mongoose provides an interface for connecting the Node.js backend to MongoDB and working with database models.

The database connection configuration should:

- Read the MongoDB URI from an environment variable.
- Establish a database connection before accepting requests that require it.
- Report connection errors clearly.
- Avoid exposing passwords or sensitive connection details in logs.
- Handle database disconnections appropriately.

The actual collections and data models depend on the schemas implemented in the project.

## 12. API Documentation

The backend API can be documented here as routes are verified.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | Add verified endpoint | Retrieve application data |
| POST | Add verified endpoint | Create application data |
| PUT/PATCH | Add verified endpoint | Update application data |
| DELETE | Add verified endpoint | Delete application data |

Replace these examples with the actual routes implemented in the source code. Do not assume that these endpoints already exist.

For each endpoint, document the request body, response format, status codes, and authentication requirements, if applicable.

## 13. Deployment on Render

The backend can be deployed as a Render Web Service.

### Deployment Steps

1. Push the project repository to GitHub.
2. Sign in to Render.
3. Create a new Web Service.
4. Connect the GitHub repository.
5. Configure the correct root directory and build command for the repository structure.
6. Configure the backend start command using the scripts in `server/package.json`.
7. Add `MONGODB_URI` in the Render Environment settings.
8. Ensure the application listens on the port provided by the hosting environment.
9. Deploy the service.
10. Check the deployment logs for startup and database connection errors.

### Deployment Configuration

The following are examples; confirm the scripts and directory settings in your repository before using them.

**Build command:**

```bash
npm install && npm --prefix server install
```

**Start command:**

```bash
npm --prefix server start
```

The start command requires a suitable `start` script in `server/package.json`. Add or adjust that script if necessary.

### Production Checklist

- MongoDB Atlas allows connections from the deployed service.
- Required environment variables are configured.
- The server listens on the hosting platform's assigned port.
- The start command matches the backend package scripts.
- The service starts successfully.
- API routes respond as expected.
- Sensitive credentials are not committed to GitHub.

## 14. Security Considerations

- Never upload `.env` files containing credentials.
- Store secrets in environment variables.
- Use a strong database password.
- Grant the database user only the permissions it needs.
- Validate incoming request data.
- Handle errors without exposing sensitive internal information.
- Use HTTPS for public application traffic.
- Restrict database network access where practical.
- Keep project dependencies updated.

## 15. Testing and Troubleshooting

### Server Port Already in Use

If the configured port is occupied, identify the process using that port and stop only the appropriate process, or configure a different port.

On Windows:

```cmd
netstat -ano | findstr :5000
```

### MongoDB Connection Failure

Check the following:

- The connection string is correct.
- The database username and password are valid.
- Special characters in the password are URL-encoded where required.
- MongoDB Atlas network access permits the connection.
- The database user has the required permissions.
- The Render environment variables are configured correctly.

### Git Push Failure

Check the remote repository:

```bash
git remote -v
```

Check your current branch:

```bash
git branch
```

Then push the correct branch to the configured remote.

## 16. Future Enhancements

Possible future improvements include:

- User authentication and authorization.
- Role-based access control.
- Project creation and management.
- Search, filtering, and sorting.
- Input validation and centralized error handling.
- Automated testing.
- API documentation.
- Improved logging and monitoring.
- Responsive user interface improvements.
- Continuous integration and deployment.

These are proposed enhancements, not claims that the features are already implemented.

## 17. Learning Outcomes

This project provides practical experience with:

- Full-stack application architecture.
- Backend development using Node.js and Express.js.
- Database integration with MongoDB Atlas.
- Environment-based application configuration.
- Git version control and GitHub collaboration.
- Cloud deployment using Render.
- Debugging, configuration management, and deployment troubleshooting.

## 18. Contributors

**Project Developer:** Deepan

Add the names and responsibilities of other contributors here if this is a team project.

## 19. License

Choose and add an appropriate open-source license if you intend to distribute the project publicly. Do not claim that the project uses a license until one has been selected and added to the repository.

## 20. Conclusion

Capstone Connect provides a foundation for a maintainable full-stack web application using a Node.js backend, Express.js, MongoDB Atlas, and cloud deployment. Its modular structure supports future improvements while providing hands-on experience with database integration, version control, and deployment workflows.
