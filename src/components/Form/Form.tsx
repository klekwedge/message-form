import "./Form.scss";

function Form() {
  return (
    <form className="app__form">
      <textarea
        className="app__textarea"
        placeholder="Ваше сообщение"
      />
    </form>
  );
}

export default Form;
