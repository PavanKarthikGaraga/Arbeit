# Arbeit

Arbeit is a comprehensive Next.js application designed to streamline career mentorship and project planning. It leverages AI to generate personalized career roadmaps and provides a platform for mentorship and business management.

## Features

- **AI-Powered Roadmap Generation**: Utilizes Google Gemini AI to create detailed, step-by-step career roadmaps based on user goals and current skills.
- **Authentication**: Secure user authentication using Google OAuth and JWT (JSON Web Tokens) with refresh token rotation.
- **Database Integration**: Built with MongoDB and Prisma ORM for efficient data management.
- **PDF Generation**: integrated functionality to generate and download PDF reports.
- **Role-Based Access**: Specialized features for different user roles including Mentorship and Business.
- **Responsive UI**: Modern, responsive user interface built with React and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB 
- **Authentication**: NextAuth (custom implementation), JWT, Google OAuth
- **AI Integration**: Google Generative AI (Gemini)
- **Deployment**: Vercel (recommended)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Arbeit/my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `my-app` directory and add the following variables:

   ```env
   # Database
   MONGO_URL=your_mongodb_connection_string

   # Authentication
   ACCESS_TOKEN=your_access_token_secret
   REFRESH_TOKEN=your_refresh_token_secret
   
   # Google OAuth
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # AI Configuration
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   

   ```

4. Run the development server:
   ```bash
   npm run dev
   

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.

## Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable React components.
- `src/config`: Configuration files for database and authentication.
- `src/middleware`: Middleware for request handling and protection.
- `public`: Static assets.

## License

This project is licensed under the terms found in the LICENSE file.