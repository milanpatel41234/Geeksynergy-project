import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import style from "./Page.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/AlertModal/Modal";
import { Link } from "react-router-dom";

const emailReduser = (state, action) => {
  if (action.type === "input_val") {
    return { value: action.val, isValid: action.val.includes("@") };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};
const passwordReduser = (state, action) => {
  if (action.type === "input_val") {
    return { value: action.val, isValid: action.val.trim().length > 7 };
  } else if (action.type === "input_valid") {
    return { value: state.value, isValid: action.isValid };
  }
  return { value: "", isValid: null };
};

function Login(props) {
  const [formIsValid, setFormIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    props.onLogin();
    setIsModalOpen(false);
  };

  const [emailState, dispatchEmail] = useReducer(emailReduser, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReduser, {
    value: "",
    isValid: null,
  });

  useEffect(() => {
    setFormIsValid(emailState.isValid && passwordState.isValid);
  }, [emailState.isValid, passwordState.isValid]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "input_val", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "input_val", val: e.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let Authentications = localStorage.authentications
        ? localStorage.getItem("authentications")
        : null;
      Authentications = Authentications ? JSON.parse(Authentications) : {};
      if (Authentications[emailState.value]) {
        if (Authentications[emailState.value] === passwordState.value) {
          setIsModalOpen(true);
        } else {
          alert("Invalid password");
        }
      } else {
        alert("This Email doesn't exist");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
     {isModalOpen && (
        <Modal onClose={closeModal}>
          <h3>Login Successfully</h3>
        </Modal>)}
      <Card className={style.container}>
        <h1>Login</h1>
        <form onSubmit={HandleSubmit}>
          <Input
            id="Email"
            type="text"
            isValid={emailState.isValid}
            onChange={HandleEmail}
            value={emailState.value}
          />
          <Input
            id="Password"
            type="password"
            isValid={passwordState.isValid}
            onChange={HandlePassword}
            value={passwordState.value}
          />
          <div className={style.actions}>
            <Button type="Submit" disabled={!formIsValid}>
              Login
            </Button>
            <div>
              <Link to="/signup">Create New Account</Link>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
}

export default Login;
