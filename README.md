# Jira Client

This is a project management client inspired by Jira, built using **React 18** and **Material UI (MUI)**. The application provides a complete solution for managing projects, tasks, and reports. It also includes authentication and authorization features to ensure secure access to various functionalities.

## Table of Contents

- [Environment Variables](#environment-variables)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Run Locally](#run-locally)
- [License](#license)

## Environment Variables

Before running the project locally, you need to configure a few environment variables. Create a `.env` file in the root directory of your project, and add the following key:

- **`VITE_API_URL`**: This should be the base URL for your API. For example:

This environment variable is crucial for the client to make requests to the backend server.

## Features

This project comes with a range of features designed to facilitate project management:

- **Authentication & Authorization**: Users can sign up, log in, and access different parts of the app based on their roles and permissions.

- **Project Management**: Create, update, and manage multiple projects. Assign team members and track project progress efficiently.

- **Task Management**: Each project can contain multiple tasks. You can create, assign, and manage tasks.

- **Project Reporting**: Generate detailed reports for each project. Monitor overall progress, completed tasks, pending tasks, and other key metrics.

## Tech Stack

**Client:** React, MUI, Zustand

**Server:** Node, Express, MongoDb

### Client:

- **React 18**: A modern JavaScript library for building fast and interactive user interfaces.

- **MUI (Material UI)**: A popular React UI framework that offers a wide variety of customizable and accessible components.

- **Zustand**: A small, fast, and scalable state management library for React.

### Server:

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, used for server-side scripting.

- **Express**: A minimal and flexible Node.js web application framework, used for building the RESTful API.

- **MongoDB**: A NoSQL database used for storing project and task data.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/jira-client.git
```

2. Navigate to the project directory:

```bash
cd jira-client
```

3. Install the dependencies:

```bash
yarn install
```

## Run Locally

Once you have installed the dependencies and set the environment variables, you can start the development server by running:

1. Set up the environment variables by creating a .env file and adding the VITE_API_URL as described in the [Environment Variables](#environment-variables) section.

2. Start dev Application:

```bash
yarn dev
```

This will start the React application, and you can view it by navigating to http://localhost:3001 in your browser.

License
This project is open-source and available under the MIT License.

## Screenshots
![image](https://github.com/user-attachments/assets/87297184-1419-4ade-9aaf-9f851342d38f)
![image](https://github.com/user-attachments/assets/7722170b-5c37-459e-b587-a64ef4a3fa87)


