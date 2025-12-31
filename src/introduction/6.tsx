// JSX types are provided by React
// No React runtime import needed with Vite

function Events(): JSX.Element {
  // Fired when the button is clicked
  const handleClick = () => {
    alert("Button clicked");
  };

  // Fired when the button is double-clicked
  const handleDoubleClick = () => {
    alert("Double click detected");
  };

  // Fired when input value changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value:", event.target.value);
  };

  // Fired when the form is submitted
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form submitted");
  };

  // Fired when the input gains focus
  const handleFocus = () => {
    console.log("Input focused");
  };

  // Fired when the input loses focus
  const handleBlur = () => {
    console.log("Input blurred");
  };

  // Fired when a key is pressed
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("Key pressed:", event.key);
  };

  // Fired when the mouse enters the element
  const handleMouseEnter = () => {
    console.log("Mouse entered");
  };

  // Fired when the mouse leaves the element
  const handleMouseLeave = () => {
    console.log("Mouse left");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>React Events (TSX, no state)</h2>

      <button onClick={handleClick}>Click</button>

      <button onDoubleClick={handleDoubleClick} style={{ marginLeft: "10px" }}>
        Double Click
      </button>

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Type here"
          onChange={handleChange}
          onInput={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <button type="submit">Submit</button>
      </form>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          border: "1px solid black",
          width: "220px",
          textAlign: "center"
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        Hover me
      </div>
    </div>
  );
}

export default Events;
