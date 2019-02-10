import React from "react";

const Signup = ({ renderInput, handleSubmit }) => {
  return (
    <div  className="content">
     <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderInput("phone", "Phone")}
        <button > SignUp </button>
      </form>
    </div>
  );
};

export default Signup;
