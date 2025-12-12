# iOS Backend Admin - React Frontend

A modern React frontend application for managing all functionalities of the iOS Backend API.

## 🚀 Features

- **Authentication**: Login and registration with Firebase
- **Dashboard**: Central hub for configuration and navigation
- **Announcements**: Create, read, update, and delete announcements
- **Subjects**: Manage student subjects with teacher and schedule information
- **Tasks**: Track student tasks with completion status
- **Grades**: View and manage grades by subject with average calculation
- **Students**: Manage student profiles with photos

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (default: http://localhost:3000)

## 🛠️ Installation

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment configuration:
```bash
cp .env.example .env
```

4. Edit `.env` file with your configuration:
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_INSTITUTION_ID=your-institution-id
VITE_STUDENT_ID=your-default-student-id
```

## 🚦 Running the Application

### Development Mode
```bash
npm run dev
```
The application will open at `http://localhost:5173`

### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist` folder.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Navbar.jsx        # Top navigation bar
│   │   │   ├── Sidebar.jsx       # Side navigation menu
│   │   │   └── Layout.jsx        # Main layout wrapper
│   │   ├── Announcements/
│   │   │   ├── AnnouncementsList.jsx
│   │   │   └── AnnouncementForm.jsx
│   │   ├── Subjects/
│   │   │   ├── SubjectsList.jsx
│   │   │   └── SubjectForm.jsx
│   │   ├── Tasks/
│   │   │   ├── TasksList.jsx
│   │   │   └── TaskForm.jsx
│   │   ├── Grades/
│   │   │   ├── GradesList.jsx
│   │   │   └── GradeForm.jsx
│   │   ├── Students/
│   │   │   ├── StudentsList.jsx
│   │   │   └── StudentForm.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── Common/
│   │       ├── Modal.jsx         # Reusable modal component
│   │       └── Loading.jsx       # Loading spinner
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication state management
│   │   └── AppContext.jsx        # App-wide state (institutionId, studentId)
│   ├── services/
│   │   ├── api.js                # Axios instance with interceptors
│   │   ├── authService.js        # Authentication API calls
│   │   ├── announcementsService.js
│   │   ├── subjectsService.js
│   │   ├── tasksService.js
│   │   ├── gradesService.js
│   │   └── studentsService.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── AnnouncementsPage.jsx
│   │   ├── SubjectsPage.jsx
│   │   ├── TasksPage.jsx
│   │   ├── GradesPage.jsx
│   │   └── StudentsPage.jsx
│   ├── styles/
│   │   └── global.css            # Global styles and utilities
│   ├── App.jsx                   # Main app component with routing
│   └── main.jsx                  # Application entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

### API Base URL
The API base URL can be configured in the `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Institution and Student IDs
You can set default values in `.env`:
```env
VITE_INSTITUTION_ID=test-institution
VITE_STUDENT_ID=test-student
```

These can also be configured dynamically through the Dashboard once logged in.

## 📱 Usage

### First Time Setup

1. **Start the backend API** (must be running on port 3000 or configured URL)

2. **Register a new account**:
   - Navigate to the registration page
   - Enter your name, email, and password
   - Click "Sign Up"

3. **Configure Institution and Student IDs**:
   - After login, go to the Dashboard
   - Enter your Institution ID and Student ID
   - Click "Save Configuration"

4. **Start using the modules**:
   - Use the sidebar to navigate to different modules
   - Each module supports full CRUD operations

### Module-Specific Notes

#### Announcements
- Only requires Institution ID
- Date field uses ISO format

#### Subjects
- Requires both Institution ID and Student ID
- Schedule can be in any text format (e.g., "Mon-Wed 10:00-12:00")

#### Tasks
- Checkbox to mark tasks as completed
- Due date in YYYY-MM-DD format
- Visual indicators for completed vs pending tasks

#### Grades
- Select a subject from the dropdown first
- Shows average grade calculation
- Value must be between 0 and 100

#### Students
- Photo URL is optional
- Email is used to generate student ID when creating
- Shows initials if no photo is provided

## 🔐 Authentication

The application uses Firebase Authentication through the backend API. All API requests automatically include the authentication token in the Authorization header.

### Login Credentials
Use the credentials you created during registration. The token and user data are stored in localStorage for persistence.

## 🎨 Styling

The application uses a custom CSS design with:
- Responsive layout (mobile-friendly)
- Clean and modern UI
- Consistent color scheme
- Smooth animations and transitions
- Accessible form controls

## 📦 Dependencies

- **React 18**: UI library
- **React Router DOM 6**: Routing and navigation
- **Axios**: HTTP client for API requests
- **Firebase**: Authentication (through backend)
- **Vite**: Build tool and dev server

## 🐛 Troubleshooting

### CORS Issues
Make sure the backend has CORS enabled for your frontend URL.

### API Connection Failed
1. Verify the backend is running
2. Check the `VITE_API_BASE_URL` in your `.env` file
3. Ensure the backend port matches

### Authentication Issues
1. Clear localStorage: `localStorage.clear()` in browser console
2. Try logging out and back in
3. Check if Firebase is properly configured in the backend

### Missing Data
1. Ensure Institution ID and Student ID are configured
2. Check browser console for error messages
3. Verify the backend endpoints are working

## 🔄 API Endpoints

The frontend consumes the following backend endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Announcements
- `GET /announcements/:institutionId`
- `GET /announcements/:institutionId/:announcementId`
- `POST /announcements/:institutionId`
- `PUT /announcements/:institutionId/:announcementId`
- `DELETE /announcements/:institutionId/:announcementId`

### Subjects
- `GET /subjects/:institutionId/:studentId`
- `GET /subjects/:institutionId/:studentId/:subjectId`
- `POST /subjects/:institutionId/:studentId`
- `PUT /subjects/:institutionId/:studentId/:subjectId`
- `DELETE /subjects/:institutionId/:studentId/:subjectId`

### Tasks
- `GET /tasks/:institutionId/:studentId`
- `GET /tasks/:institutionId/:studentId/:taskId`
- `POST /tasks/:institutionId/:studentId`
- `PUT /tasks/:institutionId/:studentId/:taskId`
- `DELETE /tasks/:institutionId/:studentId/:taskId`

### Grades
- `GET /grades/:institutionId/:studentId/:subjectId`
- `GET /grades/:institutionId/:studentId/:subjectId/:gradeId`
- `POST /grades/:institutionId/:studentId/:subjectId`
- `PUT /grades/:institutionId/:studentId/:subjectId/:gradeId`
- `DELETE /grades/:institutionId/:studentId/:subjectId/:gradeId`

### Students
- `GET /student/all/:institutionId`
- `GET /student/:institutionId/:studentId`
- `POST /student/:institutionId/:studentId`
- `PUT /student/:institutionId/:studentId`
- `DELETE /student/:institutionId/:studentId`

## 📄 License

ISC

## 👥 Authors

iOS Backend Admin Team - 2025
