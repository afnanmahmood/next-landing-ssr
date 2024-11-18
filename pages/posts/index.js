import React from "react";

const PostsPage = ({ posts, currentPage, totalPages }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Posts</h1>

      <section className="w-full max-w-4xl space-y-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </section>

      {/* Pagination Controls */}
      <div className="mt-8 flex space-x-4">
        <a
          href={`?page=${currentPage - 1}`}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === 1 ? "opacity-50 pointer-events-none" : "hover:bg-blue-600"
          }`}
        >
          Previous
        </a>
        <span className="px-4 py-2 bg-gray-200 rounded">
          Page {currentPage} of {totalPages}
        </span>
        <a
          href={`?page=${currentPage + 1}`}
          className={`px-4 py-2 bg-blue-500 text-white rounded ${
            currentPage === totalPages
              ? "opacity-50 pointer-events-none"
              : "hover:bg-blue-600"
          }`}
        >
          Next
        </a>
      </div>
    </div>
  );
};

// Fetch data server-side
export async function getServerSideProps(context) {
  const { query } = context;
  const currentPage = parseInt(query.page || "1", 10); // Default to page 1
  const postsPerPage = 10;

  // Calculate pagination parameters
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  // Fetch all posts
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const allPosts = await response.json();

  // Paginate posts
  const posts = allPosts.slice(start, end);

  // Calculate total pages
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return {
    props: {
      posts,
      currentPage,
      totalPages,
    },
  };
}

export default PostsPage;
