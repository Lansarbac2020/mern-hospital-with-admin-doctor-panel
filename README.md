
# MERN Hospital with Admin & Doctor Panel

## Overview

MERN Hospital with Admin & Doctor Panel is a comprehensive web application designed to manage hospital operations efficiently. This full-stack project uses the MERN stack (MongoDB, Express.js, React, Node.js) and includes secure user, doctor, and admin login, JWT authentication, and an appointment management feature.

## Features

- **Admin Panel**: Manage hospital operations, staff, and patients. Admins can add doctors and manage doctor credentials.
- **Doctor Panel**: Doctors can view their schedules, patient details, confirm or cancel appointments.
- **User Login**: Secure login for users to book and manage their appointments.
- **Appointment Management**: Users can book appointments, and doctors can confirm or cancel them.
- **JWT Authentication**: Secure authentication mechanism for all users.
- **Technologies Used**: MongoDB, Express.js, React, Node.js, cors, bcrypt, JWT, Cloudinary, dotenv.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Lansarbac2020/mern-hospital-with-admin-doctor-panel.git
   cd mern-hospital-with-admin-doctor-panel
   ```

2. **Install dependencies:**
   For the admin panel:
   ```sh
   cd admin
   npm install
   ```
   For the frontend:
   ```sh
   cd ../frontend
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory and add the necessary environment variables:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_URL=your_cloudinary_url
   ```

## Contributing

We welcome contributions! Please read our README.md for guidelines on how to contribute to this project.



