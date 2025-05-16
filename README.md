# Task Manager Application - README

![image](https://github.com/user-attachments/assets/629ecbe9-0d2f-4edf-81da-f09758631ba2)

![image](https://github.com/user-attachments/assets/d3e5d38f-24b6-466f-8a59-8ce7a462b057)

![image](https://github.com/user-attachments/assets/2c2e20ca-0ceb-4fd8-95da-09e5c6c6b2d5)

![image](https://github.com/user-attachments/assets/f9bab358-74d7-419c-badb-09c539d51356)


## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

✅ **Drag and Drop Interface** - Easily move tasks between columns (To Do, In Progress, Done)  
✅ **Task Management** - Add, edit, and delete tasks with titles, descriptions, and due dates  
✅ **User Authentication** - Secure email/password login system  
✅ **Real-time Sync** - All changes are saved to Firebase Firestore  
✅ **Responsive Design** - Works on both desktop and mobile devices  
✅ **Visual Indicators** - Color-coded due dates and drag previews  

## Technologies Used

- **Frontend**: React.js
- **State Management**: React Hooks
- **Drag and Drop**: react-beautiful-dnd
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Routing**: React Router
- **Icons**: react-icons

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open in your default browser at `http://localhost:3000`

## Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Set up Authentication (Email/Password method)
3. Create a Firestore database
4. Copy your Firebase config and replace in `src/firebase/firebase.js`

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Usage

1. **Login Page**:
   - Enter your email and password to access the dashboard
   - New users will be automatically registered on first login

2. **Dashboard**:
   - View your task board with three columns (To Do, In Progress, Done)
   - Add new tasks by clicking "+ Add Task" in any column
   - Edit tasks by clicking the edit icon
   - Delete tasks by clicking the delete icon
   - Drag and drop tasks between columns

3. **Task Management**:
   - Each task can have:
     - Title (required)
     - Description
     - Due date (with visual overdue indicator)

## Folder Structure

```
src/
├── components/         # Reusable UI components
│   ├── Board.js        # Main board component
│   ├── Column.js       # Column component
│   ├── TaskCard.js     # Individual task component
│   ├── TaskForm.js     # Form for adding/editing tasks
│   └── TaskModal.js    # Modal for editing tasks
├── firebase/           # Firebase configuration
│   └── firebase.js     
├── pages/              # Page components
│   ├── Dashboard.js    # Main dashboard page
│   └── Login.js        # Login page
├── routes/             # Route components
│   └── PrivateRoute.js # Protected route component
├── App.js              # Main app component
├── App.css             # Global styles
└── index.js            # Entry point
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Happy Task Managing!** 🚀
