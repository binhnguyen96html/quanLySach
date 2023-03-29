import { Formik, useFormik } from "formik";
import { useState } from "react";
import "./file.css";
//import BookEdit from "./BookEdit";

function QuanLySach() {
  const [books, setBook] = useState([]);

  const createBook = (id1, title1, number1) => {
    const updateBook = [
      ...books,
      {
        id: id1,
        title: title1,
        number: number1,
        showEdit: true,
      },
    ];
    setBook(updateBook);
  };

  const { errors, values, handleChange, handleSubmit, touched } = useFormik({
    initialValues: {
      id: "",
      title: "",
      number: "",
      showEdit: "",
    },


    onSubmit: (values, { resetForm }) => {
      createBook(values.id, values.title, values.number);

      console.log({ books });

      resetForm({ values: { id: "", title: "", number: "" } });
      //console.log(JSON.stringify(values));
    },


    validate: (values) => {
      const REGEX = {
        number: /^[0-9]/,
        id: /^[0-9]/,
      };
      const errors = {};

      if (!values.title) {
        errors.title = "Required";
      }

      if (!values.number) {
        errors.number = "Required";
      } else if (!REGEX.number.test(values.number)) {
        errors.number = "Invalid";
      }

      if (!values.id) {
        errors.id = "Required";
      } else if (!REGEX.id.test(values.id)) {
        errors.id = "Invalid";
      }

      return errors;
    },

  }); //end Formik

  const removedBooks = (idToRemoved) => {
    const deletedBook = books.filter((item) => {
      return item.id !== idToRemoved;
    });
    setBook(deletedBook);
    console.log({ books });
  };


  function editInfo(id) {
    const isShownEdit = books.map((item) => {
      if (id === item.id) {
        return { ...item, showEdit: !item.showEdit };
      }
      return item;
    });
    setBook(isShownEdit);
  }

  const changeTitle = (e, id, title) => {
    const editedBook = books.map((item) => {
      if (id === item.id) {
        return { ...item, title: e.target.value};
      }
      return item;
    });
    setBook(editedBook);
  };

  const changeNumber = (e, id, number) => {
    const editedBook = books.map((item) => {
      if (id === item.id) {
        return { ...item, number: e.target.value};
      }
      return item;
    });
    setBook(editedBook);
  };


  const changeSubmit = (e) => {
    e.preventDefault();

  };



  return (
    <div>
      <h1>Library</h1>
      <Formik>
        <form onSubmit={handleSubmit}>
          <div
            className={`custom-input ${
              errors.number ? "custon-input-error" : ""
            }`}
          >
            <label>ID</label>
            <input
              name="id"
              type="number"
              value={values.id}
              onChange={handleChange}
            ></input>
            {errors.id && <p className="error">{errors.id}</p>}
          </div>

          <div
            className={`custom-input ${
              errors.title ? "custon-input-error" : ""
            }`}
          >
            <label>Title</label>
            <input
              name="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            ></input>
            {errors.title && touched.title &&  <p className="error">{errors.title}</p>}
          </div>

          <div
            className={`custom-input ${
              errors.number ? "custon-input-error" : ""
            }`}
          >
            <label>Number</label>
            <input
              name="number"
              type="number"
              value={values.number}
              onChange={handleChange}
            ></input>
            {errors.number && <p className="error">{errors.number}</p>}
          </div>

          <button type="submit" onSubmit={handleSubmit}>
            Submit
          </button>
        </form>
      </Formik>

      {/* TABLE  */}
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((item) => (
              <tr key={item.id}>

                {/* ID  */}
                <td>{item.id}</td>

                {/* TITLE  */}
                <td>
                  {item.showEdit && { item } 
                  ? (item.title) 
                  : (
                    <div>
                      <form onSubmit={(e) => changeSubmit(e)}>
                        <div>
                          <input 
                          className="input2" 
                          value={item.title} 
                          onChange={(e) => changeTitle(e, item.id)}
                          ></input>
                        </div>
                      </form>
                    </div>
                  )}
                </td>

                {/* NUMBER  */}
                <td>
                  {item.showEdit && { item } 
                  ? (item.number) 
                  : (
                    <div>
                      <form onSubmit={(e) => changeSubmit(e)}>
                        <div>
                          <input
                            type="number"
                            value = {item.number}
                            className="input2"
                            onChange={(e) => changeNumber(e, item.id)}
                          ></input>
                        </div>
                      </form>
                    </div>
                  )}
                </td>


                <td>
                  <button onClick={() => editInfo(item.id)}>{item.showEdit ? "Edit" : "Done"}</button>
                  <button onClick={() => removedBooks(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default QuanLySach;
