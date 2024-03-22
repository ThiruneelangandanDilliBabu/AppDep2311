import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  let firstNameInputRef = useRef();
  let lastNameInputRef = useRef();
  let ageInputRef = useRef();
  let emailInputRef = useRef();
  let passwordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilepicInputRef = useRef();

  let [profilePic, setProflePic] = useState("./images/no image.png");



  let onSignUpUsingFD = async () => {
    let dataToSend = new FormData();

    dataToSend.append("firstName", firstNameInputRef.current.value);
    dataToSend.append("lastName", lastNameInputRef.current.value);
    dataToSend.append("age", ageInputRef.current.value);
    dataToSend.append("email", emailInputRef.current.value);
    dataToSend.append("password", passwordInputRef.current.value);
    dataToSend.append("mobileNo", mobileNoInputRef.current.value);

    for (let i =0; i<profilepicInputRef.current.files.length; i++) {
      dataToSend.append("profilePic", profilepicInputRef.current.files[i]);
    }

    let requestOption = {
      method: "Post",
      body: dataToSend,
    };

    let JSONData = await fetch("http://localhost:1357/signup", requestOption);
    let JSOData = await JSONData.json();
     console.log(JSOData);
  };

  return (
    <div>
      <form>
        <h1>Signup</h1>

        <div>
          <label>First Name</label>
          <input ref={firstNameInputRef}></input>
        </div>

        <div>
          <label>Last Name</label>
          <input ref={lastNameInputRef}></input>
        </div>

        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>

        <div>
          <label>Email</label>
          <input ref={emailInputRef}></input>
        </div>

        <div>
          <label>Password</label>
          <input ref={passwordInputRef}></input>
        </div>

        <div>
          <label>Mobile Number</label>
          <input ref={mobileNoInputRef}></input>
        </div>

        <div>
          <label>Profile Pic</label>
          <input
            type="file"
            ref={profilepicInputRef}
            onChange={(eventObj) => {
              let selectedFile = URL.createObjectURL(eventObj.target.files[0]);
               setProflePic(selectedFile);
            }}
          ></input>
        </div>
        <div>
          <img className="profilePicPreview" src={profilePic} alt=""></img>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              onSignUpUsingFD();
            }}
          >
            Sign Up (FORM Data)
          </button>
        </div>
        <button><Link to='/'>Login</Link></button>

      </form>
    </div>
  );
}

export default Signup;
