import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Library = () => {
  // State variables for books, authors, loading, and error
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch data when component mounts
  useEffect(() => {
    fetchdata();
  }, []);

  // Function to fetch book and author data from the API
  const fetchdata = async () => {
    setLoading(true);
    try {
      // Fetch books and authors concurrently
      const [booksRes, authorsRes] = await Promise.all([
        axios.get("https://67dfdb827635238f9aab65a2.mockapi.io/api/books"),
        axios.get("https://67dfdb827635238f9aab65a2.mockapi.io/api/author"),
      ]);
      setBooks(booksRes.data);
      setAuthors(authorsRes.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a book or author
  const handleDelete = async (type, id) => {
    setLoading(true);
    try {
      await axios.delete(
        `https://67dfdb827635238f9aab65a2.mockapi.io/api/${type}/${id}`
      );
      // Update state to reflect deletion
      if (type === "books") setBooks(books.filter((book) => book.id !== id));
      if (type === "author")
        setAuthors(authors.filter((author) => author.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading or error messages
  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return <div className="text-center text-danger mt-5">Error: {error}</div>;

  // Render main library content
  return (
    <div>
      {/* Header and create button */}
      <h2 className="mb-4">Library Management</h2>
      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/create")}
      >
        Create New Item
      </button>

      {/* Books Section */}
      <h3>Books</h3>
      <div className="table-responsive mb-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Publication Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.publicationDate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/books/${book.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete("books", book.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Authors Section */}
      <h3>Authors</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Biography</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {authors.map((author) => (
              <tr key={author.id}>
                <td>{author.name}</td>
                <td>{author.birthDate}</td>
                <td>{author.biography}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => navigate(`/edit/author/${author.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete("author", author.id)}
                    disabled={loading}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Library;