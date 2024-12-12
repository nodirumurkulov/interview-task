# Service Desk Dashboard

This project is a **Service Desk Dashboard** application, designed for managing and visualizing service desk tickets efficiently. The project includes features like viewing a list of issues, filtering and searching tickets, and analyzing key metrics through visual data insights.

This application was developed as part of a technical project to demonstrate my ability to build a modern web application using **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It also integrates mock APIs using **Mock Service Worker (msw)** and includes thorough unit tests.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Setup and Installation](#setup-and-installation)
5. [How to Run](#how-to-run)
6. [Project Structure](#project-structure)
7. [Usage](#usage)
8. [Testing](#testing)
9. [Acknowledgments](#acknowledgments)

---

## Features

- **Issues List**: View a list of all issues with sorting by priority.
- **Filtering**: Filter open issues by high priority.
- **Search**: Search issues by a word contained within the `organization_id`.
- **Data Insights**:
  - Visualize tickets by priority, type, status, and satisfaction ratings.
  - Interactive charts for analyzing key metrics.
- **Mock API**: Simulate API endpoints for development and testing.
- **Responsive Design**: Optimized for desktop and mobile.

---

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For type-safe development.
- **Tailwind CSS**: For modern and flexible styling.
- **Vite**: As the build and local development tool.
- **Chart.js**: For rendering interactive charts.
- **Mock Service Worker (msw)**: For API mocking and integration testing.
- **Jest** & **React Testing Library**: For writing and running unit tests.

---

## Getting Started

To run this project locally, follow these steps:

1. **Fork and Clone the Repository**:
   ```bash
   git clone https://github.com/nodirumurkulov/interview-task.git
   cd service-desk-dashboard
   ```

2. **Install Dependencies**:
   Ensure you have **Node.js (v16 or later)** and **pnpm** installed.
   ```bash
   pnpm install
   ```

3. **Run the Development Server**:
   ```bash
   pnpm dev
   ```

4. **Run Tests**:
   ```bash
   pnpm test
   ```

5. **Build for Production**:
   ```bash
   pnpm build
   ```

---

## Setup and Installation

### Prerequisites

- **Node.js** (v16 or later)
- **pnpm** (preferred package manager for the project)

### API Configuration

This project includes mock API endpoints located in the `src/api` folder. The following endpoints are available:

- `/api/data`: Provides ticket data for visualization and analysis.
- `/api/issues`: Returns a list of issues for the Issues List feature.

These APIs are mocked using `msw`. No additional server setup is required.

---

## How to Run

### Running the Application

1. **Start the Development Server**:
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:5173`.

2. **Access Features**:
   - Navigate to `/` for the Issues List.
   - Navigate to `/data` for Data Insights.

---

## Project Structure

```plaintext
src/
├── api/              # API route handlers
├── components/       # React components
├── tests/            # Unit and integration tests
├── styles/           # Tailwind CSS styles
├── App.tsx           # Main application component
├── index.tsx         # Application entry point
├── utils/            # Utility functions
└── mockData.ts       # Mock data for testing
```

---

## Usage

### Issues List

- **Sort by Priority**:
  The issues list is sorted by priority to allow quick identification of high-priority issues.
- **Filter Issues**:
  Filter all open issues that have a high priority using the provided filter button.
- **Search Issues**:
  Search for issues by a keyword in the `organization_id` field.

### Data Insights

- Visualize key metrics with bar and pie charts:
  - Tickets by type, priority, and satisfaction rating.
- Analyze trends in ticket handling over time.

---

## Testing

### Test Frameworks

- **Jest** and **React Testing Library**: Used for unit and integration testing.
- **Mock Service Worker (msw)**: Used to mock API responses for tests.

### Run Tests

To run all tests, execute:
```bash
pnpm test
```

---

## Acknowledgments

This project is a **fork** of the repository originally created by **SquaredUp**. I have extended the functionality and built additional features as part of my learning journey. The original repository can be found [here](https://github.com/squaredup).
