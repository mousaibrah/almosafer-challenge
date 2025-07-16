# GitHub Search Application

A modern, high-performance Single Page Application (SPA) built with React and Next.js that allows users to search for GitHub repositories and users with advanced filtering, sorting, and infinite scroll pagination.

## 🚀 Features

### Core Functionality

- **Dual Search Types**: Search for both repositories and users
- **Real-time Search**: Debounced search with 1-second delay for optimal performance
- **Advanced Filtering**: Sort by stars, forks, updated date, or best match
- **Infinite Scroll**: Seamless pagination with intersection observer
- **GitHub Authentication**: Secure OAuth integration with GitHub

### Repository Search Features

- **File Type Detection**: Automatic language detection with file extension mapping
- **Fork Information**: Display last 3 users who forked the repository
- **Repository Stats**: Stars, forks, and watchers count
- **Owner Information**: Avatar and profile links
- **Direct Repository Access**: External links to GitHub repositories

### User Search Features

- **User Profiles**: Avatar, username, and profile information
- **Profile Links**: Direct access to GitHub user profiles

### User Experience

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Loading States**: loaders and spinners
- **Error Handling**: Comprehensive error boundaries and user-friendly messages
- **Empty States**: Helpful messages when no results are found
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **First-time User Experience**: Welcome modal for new users

## 🛠️ Technology Stack

### Frontend Framework

- **Next.js 15.3.5**: React framework with App Router
- **React 19.0.0**: Latest React with concurrent features
- **TypeScript 5**: Type-safe development

### State Management & Data Fetching

- **TanStack Query (React Query)**: Server state management with caching
- **Zustand**: Lightweight client state management
- **Axios**: HTTP client for API requests

### UI & Styling

- **Tailwind CSS 4.1.7**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icon library
- **Sonner**: Toast notifications

### Authentication

- **NextAuth.js**: Authentication framework
- **GitHub OAuth**: Provider integration

### Testing

- **Jest**: Testing framework
- **React Testing Library**: Component testing utilities
- **jsdom**: DOM environment for tests

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler for development

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/auth/          # Authentication API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── accessibility/     # Accessibility wrappers
│   ├── auth-popover/      # Authentication UI
│   ├── cards/            # Repository and User cards
│   ├── error-handler/     # Error boundaries and messages
│   ├── first-time-modal/  # Welcome modal
│   ├── loading/          # Loading components
│   ├── search-services/   # Search-related components
│   └── ui/               # Base UI components
├── constants/            # Application constants
├── helpers/              # Utility functions
├── hooks/                # Custom React hooks
├── query-client/         # API client configuration
├── store/                # State management
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Yarn or npm
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mousaibrah/almosafer-challenge
   cd almosafer-challenge
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```


3. **Run the development server**

   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
yarn build

# Start the production server
yarn start
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

### Test Coverage

The project maintains a minimum coverage threshold of 70% for:

- Branches
- Functions
- Lines
- Statements

### Test Structure

- **Component Tests**: Located in `src/components/__tests__/`
- **Hook Tests**: Located in `src/hooks/__tests__/`
- **Store Tests**: Located in `src/store/__tests__/`

## 🏗️ Architecture & Design Patterns

### Component Architecture

- **Atomic Design**: Components organized by complexity and reusability
- **Composition Pattern**: Flexible component composition over inheritance
- **Container/Presentational**: Separation of logic and presentation

### State Management Strategy

- **Server State**: Managed by TanStack Query with intelligent caching
- **Client State**: Local component state and Zustand for global state
- **URL State**: Search parameters synchronized with URL

### Performance Optimizations

- **Debounced Search**: 1-second delay to prevent excessive API calls
- **Infinite Scroll**: Efficient pagination with intersection observer
- **Query Caching**: Intelligent caching with stale-while-revalidate
- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component for optimized loading

### Error Handling Strategy

- **Error Boundaries**: React Error Boundary for component-level error catching
- **API Error Handling**: Comprehensive error handling in API layer
- **User Feedback**: Toast notifications and error messages
- **Graceful Degradation**: Fallback UI for failed components

## 🔐 Authentication

### GitHub OAuth Flow

1. User clicks "Sign In" button
2. Redirected to GitHub OAuth authorization
3. User authorizes the application
4. GitHub redirects back with authorization code
5. NextAuth.js exchanges code for access token
6. User session is established with GitHub profile data

### Security Features

- **JWT Tokens**: Secure session management
- **Environment Variables**: Sensitive data protection
- **CSRF Protection**: Built-in NextAuth.js protection
- **Secure Headers**: Next.js security headers

## 🎨 UI/UX Design

### Design Principles

- **Mobile-First**: Responsive design starting from mobile
- **Accessibility**: WCAG 2.1 AA compliance
- **Performance**: Fast loading and smooth interactions
- **Consistency**: Unified design system with Tailwind CSS

### Component Library

- **Radix UI Primitives**: Accessible component foundations
- **Custom Components**: Tailored components for specific use cases
- **Design Tokens**: Consistent spacing, colors, and typography

## 📊 Performance Metrics

### Optimization Techniques

- **Bundle Size**: Optimized with Next.js and Turbopack
- **Loading Speed**: Lazy loading and code splitting
- **API Efficiency**: Debounced requests and intelligent caching
- **Memory Management**: Proper cleanup and garbage collection


## 🔧 Development Workflow

### Code Quality

- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting (integrated with ESLint)

### Development Tools

- **Hot Reload**: Fast development with Turbopack
- **Type Checking**: Real-time TypeScript validation
- **Error Overlay**: In-browser error display
- **Debug Tools**: React DevTools integration


## 📝 License

This project is developed as part of a technical challenge for Almosafer.

---

**Built with ❤️ for Almosafer**
