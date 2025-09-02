import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className='container'>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>

        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2 rounded w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : filteredPosts.length > 0 ? (
          <ul className="space-y-4">
            {filteredPosts.map((post) => (
              <li key={post.id} className="p-4 border rounded shadow-sm">
                <h2 className="font-semibold text-lg">{post.title}</h2>
                <p className="text-gray-600">{post.body}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
}