import React from "react";



const Login = props => {
  return (
    <div  className="content">
      <h1>Login</h1>
      <form onSubmit={props.handleSubmit}>
        {props.renderInput("email", "Email")}
        {props.renderInput("password", "Password", "password")}
        <button> Login </button>
      </form>
    </div>
  );
};

export default Login;
