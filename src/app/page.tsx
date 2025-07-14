"use client";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GitHub Search
          </h1>
          <p className="text-gray-600 text-lg">
            Search for repositories and users across GitHub
          </p>
        </header>
      </div>
    </div>
  );
}
