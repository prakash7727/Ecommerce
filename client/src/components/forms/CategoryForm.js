
export default function CategoryForm({ value, setValue, handleSubmit, buttonText="submit", handleDelete}) {
 

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          className="form-control p-3"
          placeholder="write category name"
          onChange={(e) => setValue(e.target.value)}
        />
       <div className="d-flex justify-content-between">
       <button className="btn btn-primary mt-3"> {buttonText}</button>
        {handleDelete && <button onClick={handleDelete} className="btn btn-danger mt-3"> Delete</button>}
       </div>

      </form>
    </>
  );
}
