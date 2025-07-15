# GitHub Search Application

A modern, feature-rich GitHub search application built with Next.js, React, and TypeScript. Search for public repositories and users across GitHub with advanced filtering, sorting, and infinite scroll pagination.

![GitHub Search App](https://img.shields.io/badge/Next.js-15.3.5-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.7-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🔍 Advanced Search

- **Dual Search Types**: Search for both repositories and users
- **Real-time Search**: Debounced search with 500ms delay for optimal performance
- **Smart Filtering**: Filter results by search type and query
- **Sort Options**: Sort repositories by stars, forks, updated date, or best match
- **Order Control**: Ascending or descending order for all sort options

### 📊 Repository Search Features

- **Repository Information**: Name, owner, description, and direct links
- **File Type Detection**: Automatic detection and display of programming languages as badges
- **Fork Information**: Shows the last 3 users who forked the repository with avatars and links
- **Repository Stats**: Stars, forks, and watchers count with hover effects
- **Owner Details**: Repository owner avatar and profile link

### 👥 User Search Features

- **User Profiles**: Avatar, username, and profile information
- **Direct Links**: Quick access to user's GitHub profile
- **Responsive Design**: Optimized display across all device sizes

### 🎨 User Experience

- **Infinite Scroll**: Seamless pagination with automatic loading
- **Loading States**: Elegant loading indicators and skeleton screens
- **Error Handling**: Comprehensive error states with user-friendly messages
- **Empty States**: Helpful messages when no results are found
- **Responsive Design**: Mobile-first design that works on all devices
- **Accessibility**: Full ARIA support and keyboard navigation

### 🚀 Performance Features

- **Debounced Search**: Prevents excessive API calls during typing
- **Caching**: React Query for efficient data caching and state management
- **Optimized Rendering**: React 19 with optimized re-renders
- **Lazy Loading**: Components load only when needed

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.5 with App Router
- **Language**: TypeScript 5.0
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.1.7
- **State Management**: Zustand + React Query
- **UI Components**: Radix UI + Custom components
- **Testing**: Jest + React Testing Library
- **Authentication**: NextAuth.js (prepared)
- **Animations**: Framer Motion
- **HTTP Client**: Axios

## 📦 Installation

### Prerequisites

- Node.js 18.0 or higher
- Yarn package manager (recommended) or npm

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd almosafer-challenge
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **Run the development server**

   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Run Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Coverage

The application maintains comprehensive test coverage:

- **Components**: All UI components are thoroughly tested
- **Hooks**: Custom hooks with full test coverage
- **Utilities**: Helper functions and utilities tested
- **Integration**: End-to-end functionality testing

## 🚀 Usage Guide

### Basic Search

1. **Select Search Type**: Choose between "Repositories" or "Users"
2. **Enter Query**: Type your search term in the search box
3. **View Results**: Results appear automatically with debounced search

### Advanced Features

#### Repository Search

- **Sort Options**: Use the sort dropdown to organize results by:
  - Best Match (default)
  - Stars (most/least starred)
  - Forks (most/least forked)
  - Updated (recently/oldest updated)
- **File Type Badges**: Hover over language badges to see file extensions
- **Fork Information**: Click on fork avatars to visit user profiles
- **Repository Stats**: View stars, forks, and watchers with hover effects

#### User Search

- **Profile Links**: Click "View Profile" to visit GitHub profiles
- **User Information**: See usernames and avatars
- **Direct Navigation**: Quick access to user repositories and activity

#### Infinite Scroll

- **Automatic Loading**: Scroll to the bottom to load more results
- **Loading Indicator**: Visual feedback during data fetching
- **Seamless Experience**: No pagination buttons needed

## 📁 Project Structure

```
src/
├── api/                    # API client and endpoints
│   ├── client.ts          # Axios client configuration
│   ├── endpoints.ts       # API endpoint definitions
│   ├── useApi.ts          # Custom API hook
│   └── QueryClientWrapper.tsx
├── app/                   # Next.js app router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── SearchInput.tsx   # Search input component
│   ├── SearchResults.tsx # Results display
│   ├── RepositoryCard.tsx # Repository card
│   ├── UserCard.tsx      # User card
│   └── __tests__/        # Component tests
├── hooks/                 # Custom React hooks
│   ├── use-github-search.ts # Main search hook
│   ├── use-debounce.ts   # Debounce utility
│   └── __tests__/        # Hook tests
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # General utilities
│   ├── helper.ts         # Helper functions
│   └── store/            # State management
└── types/                # TypeScript type definitions
```

## 🔧 Configuration

### Environment Variables

- `GITHUB_TOKEN`: GitHub API token for increased rate limits (optional)
- `NEXTAUTH_SECRET`: Secret for NextAuth.js (for future auth features)
- `NEXTAUTH_URL`: Application URL for authentication

### API Configuration

The application uses the official GitHub Search API:

- **Base URL**: `https://api.github.com`
- **Rate Limits**: 60 requests/hour (unauthenticated), 5000/hour (authenticated)
- **Endpoints**: `/search/repositories` and `/search/users`

## 🎯 Key Features Explained

### Debounced Search

Search queries are debounced with a 500ms delay to prevent excessive API calls while typing, providing a smooth user experience.

### Infinite Scroll Implementation

Uses `IntersectionObserver` API to detect when the user scrolls near the bottom and automatically loads more results.

### File Type Detection

Repository cards automatically fetch and display programming languages used in the repository, converting them to clickable badges.

### Fork Information

For each repository, the application fetches the 3 most recent forks and displays user avatars with links to their profiles.

### Error Handling

Comprehensive error handling with user-friendly messages for:

- Network errors
- API rate limiting
- Invalid queries
- Empty results

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and deploy
3. Set environment variables in Vercel dashboard

---

**Built with ❤️ for Almosafer**
