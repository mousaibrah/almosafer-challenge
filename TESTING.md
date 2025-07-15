# Testing Guide

This document provides information about the testing setup and how to run tests for the GitHub Search application.

## Testing Setup

The project uses the following testing technologies:

- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM testing
- **@testing-library/user-event**: User event simulation utilities

## Test Structure

Tests are organized in the following structure:

```
src/
├── components/
│   └── __tests__/
│       ├── SearchInput.test.tsx
│       ├── SearchResults.test.tsx
│       ├── RepositoryCard.test.tsx
│       ├── UserCard.test.tsx
│       ├── SearchTypeSelector.test.tsx
│       ├── EmptyState.test.tsx
│       ├── ErrorMessage.test.tsx
│       └── LoadingSpinner.test.tsx
├── hooks/
│   └── __tests__/
│       ├── use-github-search.test.ts
│       └── use-debounce.test.ts
├── lib/
│   ├── __tests__/
│   │   └── utils.test.ts
│   └── store/
│       └── __tests__/
│           └── useIsFirstTime.test.ts
└── app/
    └── __tests__/
        └── page.test.tsx
```

## Running Tests

### Run all tests

```bash
yarn test
```

### Run tests in watch mode

```bash
yarn test:watch
```

### Run tests with coverage

```bash
yarn test:coverage
```

## Test Coverage

The test suite aims to achieve at least 70% coverage across:

- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Test Categories

### Component Tests

- **SearchInput**: Tests input functionality, value changes, and styling
- **SearchResults**: Tests result display, loading states, error handling, and pagination
- **RepositoryCard**: Tests repository information display and formatting
- **UserCard**: Tests user information display and formatting
- **SearchTypeSelector**: Tests search type switching functionality
- **EmptyState**: Tests empty state display and messaging
- **ErrorMessage**: Tests error message display and styling
- **LoadingSpinner**: Tests loading indicator functionality

### Hook Tests

- **useGitHubSearch**: Tests GitHub API integration, state management, and pagination
- **useDebounce**: Tests debouncing functionality and timing

### Utility Tests

- **utils**: Tests number formatting and utility functions
- **useIsFirstTime**: Tests first-time user detection and cookie management

### Page Tests

- **Page**: Tests main page functionality, user interactions, and component integration

## Testing Patterns

### Component Testing

Components are tested using React Testing Library with the following patterns:

1. **Render and Assert**: Render components and assert expected elements are present
2. **User Interactions**: Simulate user interactions using `fireEvent` or `userEvent`
3. **Props Testing**: Test components with different prop combinations
4. **Accessibility**: Ensure components have proper ARIA attributes and semantic structure
5. **Styling**: Verify CSS classes are applied correctly

### Hook Testing

Custom hooks are tested using `renderHook` from React Testing Library:

1. **Initial State**: Test initial return values
2. **State Changes**: Test state updates when hooks are called
3. **Side Effects**: Test side effects like API calls and timers
4. **Cleanup**: Ensure proper cleanup of timers and subscriptions

### Mocking Strategy

- **External Dependencies**: Mock external libraries and APIs
- **Browser APIs**: Mock browser APIs like `IntersectionObserver`
- **Next.js Features**: Mock Next.js router and authentication
- **Third-party Libraries**: Mock libraries like `framer-motion` and `js-cookie`

## Test Utilities

### Custom Matchers

The project uses `@testing-library/jest-dom` for additional matchers:

- `toBeInTheDocument()`
- `toHaveClass()`
- `toHaveAttribute()`
- `toBeVisible()`
- `toHaveTextContent()`

### Mock Data

Test files include comprehensive mock data for:

- GitHub repositories
- GitHub users
- API responses
- User interactions

## Best Practices

### Writing Tests

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Descriptive Test Names**: Test names should clearly describe what is being tested
3. **Arrange-Act-Assert**: Structure tests with clear setup, action, and verification phases
4. **Test Edge Cases**: Include tests for error states, empty data, and boundary conditions
5. **Keep Tests Simple**: Each test should verify one specific behavior

### Test Organization

1. **Group Related Tests**: Use `describe` blocks to group related test cases
2. **Use Meaningful Descriptions**: Describe the component or functionality being tested
3. **Setup and Teardown**: Use `beforeEach` and `afterEach` for common setup and cleanup
4. **Mock Management**: Clear mocks between tests to avoid interference

### Accessibility Testing

1. **ARIA Attributes**: Verify proper ARIA attributes are present
2. **Semantic Structure**: Ensure proper heading hierarchy and semantic elements
3. **Keyboard Navigation**: Test keyboard accessibility where applicable
4. **Screen Reader Support**: Verify content is accessible to screen readers

## Debugging Tests

### Common Issues

1. **Async Operations**: Use `waitFor` for asynchronous operations
2. **Mock Timing**: Use `jest.useFakeTimers()` for timer-based functionality
3. **Component Updates**: Use `act()` when testing state changes
4. **Mock Cleanup**: Ensure mocks are properly cleaned up between tests

### Debugging Commands

```bash
# Run specific test file
yarn test SearchInput.test.tsx

# Run tests with verbose output
yarn test --verbose

# Run tests and show console output
yarn test --silent=false

# Run tests in debug mode
yarn test --detectOpenHandles
```

## Continuous Integration

Tests are automatically run in CI/CD pipelines to ensure:

- All tests pass before deployment
- Code coverage meets minimum thresholds
- No regressions are introduced

## Contributing

When adding new features or components:

1. Write tests alongside the implementation
2. Ensure test coverage meets project standards
3. Follow existing testing patterns and conventions
4. Update this documentation if new testing patterns are introduced
