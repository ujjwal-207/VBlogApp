
"use client";

export default function BlogLoading() {
  const placeholderPosts = Array.from({ length: 3 });

  return (
    <div className="space-y-6 p-4">
      {placeholderPosts.map((_, index) => (
        <div
          key={index}
          className="animate-pulse border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 shadow"
        >
          <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      ))}
    </div>
  );
}

