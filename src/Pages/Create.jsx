import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Create = () => {
  // State to manage the type of item being created (book or author)
  const [itemType, setItemType] = useState("book");
  const navigate = useNavigate();

  // Validation schema for book creation form
  const bookSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    isbn: Yup.string()
      .matches(/^\d{10}|\d{13}$/, "ISBN must be 10 or 13 digits")
      .required("ISBN is required"),
    publicationDate: Yup.date().required("Publication date is required"),
  });

  // Validation schema for author creation form
  const authorSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    birthDate: Yup.date().required("Birth date is required"),
    biography: Yup.string()
      .min(10, "Biography must be at least 10 characters")
      .required("Biography is required"),
  });

  // Initial form values for both book and author forms
  const initialValues = {
    book: { title: "", author: "", isbn: "", publicationDate: "" },
    author: { name: "", birthDate: "", biography: "" },
  };

  // Function to handle form submission for creating a new item
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const endpoint = itemType === "book" ? "books" : "author";
    try {
      await axios.post(
        `https://67dfdb827635238f9aab65a2.mockapi.io/api/${endpoint}`,
        values
      );
      navigate("/");
    } catch (error) {
      const errorMessage = `Failed to create ${
        endpoint === "books" ? "book" : "author"
      }:${error.message}`;
      setErrors({ submit: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  // Render the create item form
  return (
    <div>
      <h2>Add New Item</h2>
      {/* Buttons to switch between book and author creation forms */}
      <div className="mb-3">
        <button
          className={`btn ${
            itemType === "book" ? "btn-primary" : "btn-outline-primary"
          } me-2`}
          onClick={() => setItemType("book")}
        >
          Add Book
        </button>
        <button
          className={`btn ${
            itemType === "author" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setItemType("author")}
        >
          Add Author
        </button>
      </div>

      {/* Formik form for handling book and author creation */}
      <Formik
        initialValues={initialValues[itemType]}
        validationSchema={itemType === "book" ? bookSchema : authorSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="card p-4 shadow">
            {/* Conditional rendering of form fields based on itemType */}
            {itemType === "book" ? (
              <>
                {/* Book form fields */}
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
                {/* Author form fields */}
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

            {/* Submit button with loading state */}
            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Adding..."
                : `Add ${itemType === "book" ? "Book" : "Author"}`}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;