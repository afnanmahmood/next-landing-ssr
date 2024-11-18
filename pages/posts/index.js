import React, { useState } from "react";
import Card from "../../components/Card/Card";

const PostsPage = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const getPaginatedPosts = () => {
    const start = (currentPage - 1) * postsPerPage;
    return posts.slice(start, start + postsPerPage);
  };

  const handlePageChange = (direction) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage((prev) => prev + direction);
      setLoading(false);
    }, 500); // Simulate loading delay
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Posts</h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="loader border-t-4 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {getPaginatedPosts().map((post) => (
            <Card key={post.id} title={post.title} body={post.body} id={post.id} />
          ))}
        </section>
      )}

      <div className="mt-8 flex flex-col items-center space-y-4">
        {/* Pagination Controls */}
        <div className="flex space-x-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(-1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Previous
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(1)}
            className={`px-4 py-2 rounded-md ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
        {/* Current Page Display */}
        <p className="text-gray-600">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();

  return {
    props: { posts },
  };
}

export default PostsPage;
