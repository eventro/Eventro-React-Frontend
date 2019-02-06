import React from "react";

const Signup = ({ renderInput, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {renderInput("email", "Email")}
        {renderInput("password", "Password", "password")}
        {renderInput("name", "Name")}
        {renderInput("phone", "Phone")}
        <button className="btn btn-primary"> SignUp </button>
      </form>
    </div>
  );
};

export default Signup;
