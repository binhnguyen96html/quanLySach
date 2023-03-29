import { useState } from "react";

function BookEdit() {
  const [title, setTitle] = useState();

  const [showSave, setShowSave] = useState(true);

  const handleChange = (e) => {
    setTitle({
      ...title,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSave(!showSave);
    console.log({ title });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {showSave && (
          <div>
            <input
              name="title1"
              className="input2"
              onChange={(e) => handleChange(e)}
            ></input>
            <button type="submit" onSubmit={(e) => handleSubmit(e)}>
              Save
            </button>
          </div>
        )}

        {!showSave && <h1>{title.title1}</h1>}
      </form>
    </div>
  );
}

export default BookEdit;
