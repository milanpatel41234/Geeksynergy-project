import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import style from "./Page.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import Modal from "../UI/AlertModal/Modal";
import { Link ,useNavigate } from "react-router-dom";

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

function Login() {
  const navigate = useNavigate();
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    navigate('/')
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
      setFormIsValid(
        emailState.isValid && passwordState.isValid && ConfirmPassword === passwordState.value
      )
  }, [emailState.isValid, passwordState, ConfirmPassword]);

  const HandleEmail = (e) => {
    dispatchEmail({ type: "input_val", val: e.target.value });
  };
  const HandlePassword = (e) => {
    dispatchPassword({ type: "input_val", val: e.target.value });
  };
  const HandleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };


  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      let Authentications = localStorage.authentications ? localStorage.getItem('authentications') : null;
      Authentications = Authentications ? JSON.parse(Authentications) : {};
      if(Authentications[emailState.value]){
      alert('This email already registered')
      }else{
       Authentications[emailState.value] = passwordState.value ;
       const data = JSON.stringify(Authentications);
       localStorage.setItem('authentications', data);
       setIsModalOpen(true);
      }
    } catch (error) {
      alert(error.message);
    }
  
  };

  return (
    <>
    {isModalOpen && (
        <Modal onClose={closeModal}>
          <h3>Account Created Successfully</h3>
        </Modal>)}
    <Card className={style.container}>
       <h1>Sign Up</h1>
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
        <Input
          id="ConfirmPassword"
          type="password"
          state={ConfirmPassword}
          onChange={HandleConfirmPassword}
          value={ConfirmPassword}
          />

        <div className={style.actions}>
          <Button type="submit" disabled={!formIsValid}>
          Create Account
          </Button>
        <Link to='/login' >Login</Link>
          </div>
      </form>
    </Card>
          </>
  );
}

export default Login;
