import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/userSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  padding: 1rem 2rem;
  h1 {
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
    input {
      outline: none;
      border: none;
      height: 2.4rem;
      padding: 0 1rem;
      border-radius: 4px;
      font-size: 1rem;
    }
    button {
      height: 2.4rem;
      margin-top: 1rem;
      border: none;
      outline: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
`;

const FormController = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password){
      dispatch(login({email, password}));
      navigate("/profile");
    }
  }

  return (
    <LoginContainer>
      <h1>Login {isLoggedIn}</h1>
      <form>
        <FormController>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="email" onChange={(ev) => setEmail(ev.target.value)} />
        </FormController>
        <FormController>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="password" onChange={(ev) => setPassword(ev.target.value)} />
        </FormController>
        <button onClick={handleLogin}>Login</button>
      </form>
    </LoginContainer>
  );
};

export default Login;
