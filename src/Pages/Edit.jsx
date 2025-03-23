import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Edit = () => {
  // Extract route parameters and initialize navigation
  const { type, id } = useParams();
  const navigate = useNavigate();

  // State to hold initial form values, error messages, and loading status
  const [initialValues, setInitialValues] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Validation schema for book form
  const bookSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string()
      .matches(/^\d{10}|\d{13}$/, "ISBN must be 10 or 13 digits")
      .required("ISBN is required"),
    publicationDate: Yup.date().required("Publication date is required"),
  });

  // Validation schema for author form
  const authorSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    birthDate: Yup.date().required("Birth date is required"),
    biography: Yup.string()
      .min(10, "Biography must be at least 10 characters")
      .required("Biography is required"),
  });

  // useEffect hook to fetch data when the component mounts or when type/id changes
  useEffect(() => {
    fetchdata(type, id);
  }, [type, id]);

  // Function to fetch data for the item to be edited
  const fetchdata = async (type, id) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://67dfdb827635238f9aab65a2.mockapi.io/api/${type}/${id}`
      );
      setInitialValues(res.data);
      setError(null);
    } catch (error) {
      const errorMessage = `Failed to fetch ${
        type === "books" ? "book" : "author"
      }: ${error.message}`;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle form submission (update the item)
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.put(
        `https://67dfdb827635238f9aab65a2.mockapi.io/api/${type}/${id}`,
        values
      );
      navigate("/");
    } catch (error) {
      const errorMessage = `Failed to update ${
        type === "books" ? "book" : "author"
      }:${error.message}`;
      setErrors({ submit: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  // Render loading state while data is being fetched
  if (loading) return <div className="text-center mt-5">Loading...</div>;

  // Render error message if fetching data fails
  if (error)
    return <div className="text-center text-danger mt-5">Error: {error}</div>;

  // Render the edit form using Formik
  return (
    <div>
      <h2>Edit {type === "books" ? "Book" : "Author"}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={type === "books" ? bookSchema : authorSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting, errors }) => (
          <Form className="card p-4 shadow">
            {/* Conditional rendering of form fields based on type */}
            {type === "books" ? (
              <>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <Field name="title" type="text" className="form-control" />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Author
                  </label>
                  <Field name="author" type="text" className="form-control" />
                  <ErrorMessage
                    name="author"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="isbn" className="form-label">
                    ISBN
                  </label>
                  <Field name="isbn" type="text" className="form-control" />
                  <ErrorMessage
                    name="isbn"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="publicationDate" className="form-label">
                    Publication Date
                  </label>
                  <Field
                    name="publicationDate"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="publicationDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <Field name="name" type="text" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="birthDate" className="form-label">
                    Birth Date
                  </label>
                  <Field
                    name="birthDate"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="birthDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="biography" className="form-label">
                    Biography
                  </label>
                  <Field
                    name="biography"
                    as="textarea"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="biography"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </>
            )}
            {/* Display submission errors if any */}
            {errors.submit && (
              <div className="text-danger mb-3">{errors.submit}</div>
            )}
            {/* Submit button with loading state */}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Updating..."
                : `Update ${type === "books" ? "Book" : "Author"}`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Edit;