import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let validateLogin = async () => {
    let dataToSend = new FormData();
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);

    let requestOption = {
      method: "POST",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:1357/login", requestOption);
    let JSOData = await JSONData.json();

    if (JSOData.status === "Success") {
      dispatch({ type: "login", data: JSOData.data });
      navigate("/home");
    } else {
      alert(JSOData.msg);
    }
    console.log(JSOData);
  };

  return (
    <div>
      <form>
        <h1>Login</h1>
        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>
        <button
          type="button"
          onClick={() => {
            validateLogin();
          }}
        >
          Login
        </button>
      </form>
      <br></br>
      <button>
        <Link to="/signup">Signup</Link>
      </button>
    </div>
  );
}

export default Login;
