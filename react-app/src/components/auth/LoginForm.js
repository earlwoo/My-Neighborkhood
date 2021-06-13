import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { Text, Flex, Image } from "@chakra-ui/react"
import dog from "../main/dog.png"
import "./LoginForm.css"


const LoginForm = ({ setShowLIModal }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data.errors) {
      setErrors(data.errors);
    }

    if (user) {
      setShowLIModal(false)
      return <Redirect to="/main" />;
    }

  };

  useEffect(() => {
    if (user) {
      setShowLIModal(false)
      return <Redirect to="/main" />;
    }

  }, [setShowLIModal, user])

  return (
    <>
      <Flex borderTopRadius="7" backgroundColor="#92ddb6" justifyContent="center" alignItems="center">
        <Image src={dog} marginRight="3"></Image>
        <Text letterSpacing="4px" fontSize="16px" fontWeight="bold" >Log In</Text>
      </Flex>
      <Flex justifyContent="center">
        <form onSubmit={onLogin}>
            <div className="errors">
              {errors.map((error) => (
                <div key={error}>{error}</div>
              ))}
            </div>
            <div className="login__input">
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="login__input">
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="off"
              />
            </div>
            <div className="login__button">
              <button style={{ cursor: 'pointer' }} type="submit">Login</button>
            </div>
        </form>
      </Flex>
    </>
  );
};

// {/* <div className="login__wrapper">

// </div> */}

export default LoginForm;
