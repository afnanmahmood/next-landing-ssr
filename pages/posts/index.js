import React from "react";

const PostsPage = ({ posts }) => {
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
    </div>
  );
};

// Fetch data at build time
export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await response.json();
  // console.log("posts", posts)

  return {
    props: { posts }, // Pass data as props to the page
  };
}

export default PostsPage;
