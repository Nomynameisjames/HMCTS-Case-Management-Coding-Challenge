
# Project Title
HMCTS Task Management System

A modern task management web application built with Express, React, Chakra UI, Zustand, and Framer Motion.
## Live Demo

Try out the deployed version here:

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hmcts-case-management-coding-challenge.onrender.com/)


## Features

- Light/dark mode toggle
- Create, edit, delete, and restore tasks
- Soft-delete with animation to a "bin"
- Responsive and accessible design using Chakra UI
- State management with Zustand
- Local development and production-ready deployment setup


## Screenshots

![App Screenshot](https://ucarecdn.com/c0532b19-e145-43d0-beac-fe956354b19c/-/preview/1000x565/)

![App Screenshot](https://ucarecdn.com/33b34213-cec5-49f8-834a-2e8dac2732e3/-/preview/1000x566/)


![App Screenshot](https://ucarecdn.com/02eac1a6-0bd1-4bba-b1e7-e2e50d939910/-/preview/1000x568/)


## Tech Stack

**Client:** React, Chakra UI, Framer Motion, Zustand

**Server:** Node, Express, Mongoose

## Installation

1. Clone the repository

```bash
  git clone https://github.com/Nomynameisjames/HMCTS-Case-Management-Coding-Challenge.git

  cd HMCTS-Case-Management-Coding-Challenge/
```

2. Install dependencies

```bash
npm install
```
3. Setup environment variables
~~~
touch .env
MONGODB_URL=enter_mongodb_connection_string_here
~~~


4. Run the development server

```bash
npm run dev
```




## File Structure (Frontend)

```bash
src/
├── assets/
├── components/
│   ├── TaskCard.jsx
│   ├── Bin.jsx
│   └── Navbar.jsx
├── hooks/
│   └── useTaskFunc.js
├── pages/
│   ├── HomePage.jsx
│   └── CreatePage.jsx
├── store/
│   └── taskStore.js
├── App.jsx
└── main.jsx

```
## Running Tests

To run tests, run the following command

```bash
  npm run test
```

### API Documentation

You can find a comprehensive guide for the API documentation at the link below

[![API Documentation](https://documenter.getpostman.com/view/25617595/2sB2x8GCB2)