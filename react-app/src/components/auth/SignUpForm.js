import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./SignUpForm.css"

const SignUpForm = ({setShowSUModal}) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState([])

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(firstname, lastname, email, password, street, city, state, zip, age, name));

      // if (data.errors) {
      //   setErrors(data.errors)
      // }
    }
  };

  useEffect(() => {
    if (user) {
      setShowSUModal(false)
      return <Redirect to="/" />;
    }
  }, [setShowSUModal, user])

  return (
    <div className="signup__wrapper">
      <form onSubmit={onSignUp}>
        <div className="signup__header">
          <h1>Sign up to</h1>
          {/* <img src={slackLogo} alt=""></img> */}
          <h1>My Neigborkhood</h1>
        </div>
        <div className="errors">
          {errors?.map((error) => (
            <div key={error}>・{error}</div>
          ))}
        </div>
        <div className="signup__input">
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            onChange={e => setFirstname(e.target.value)}
            value={firstname}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            onChange={e => setLastname(e.target.value)}
            value={lastname}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input-address">
          <input
            type="text"
            name="street"
            placeholder="Street address"
            onChange={e => setStreet(e.target.value)}
            value={street}
            required
            autoComplete="off"
          ></input>
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={e => setCity(e.target.value)}
            value={city}
            required
            autoComplete="off"
           ></input>
          <input
            type="text"
            name="city"
            placeholder="State"
            onChange={e => setState(e.target.value)}
            value={state}
            required
            autoComplete="off"
          ></input>
          <input
            type="text"
            name="city"
            placeholder="Zip"
            onChange={e => setZip(e.target.value)}
            value={zip}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={e => setEmail(e.target.value)}
            value={email}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            value={password}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="password"
            placeholder="Confirm password"
            name="confirm_password"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="text"
            placeholder="Pet's name"
            name="name"
            onChange={e => setName(e.target.value)}
            value={name}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__input">
          <input
            type="text"
            placeholder="Pet's age"
            name="age"
            onChange={e => setAge(e.target.value)}
            value={age}
            required
            autoComplete="off"
          ></input>
        </div>
        <div className="signup__button">
          <button style={{ cursor: 'pointer' }} type="submit">Sign Up</button>
        </div>
        <div className="goto__login">
          <p>Already have an account? </p>
          {/* <h3 onClick={handleLoginModal} style={{ cursor: 'pointer' }}>Log in instead</h3> */}
        </div>
      </form>
    </div>

  );
};

//   return (
//     <form onSubmit={onSignUp}>
//       <div>
//         <label>User Name</label>
//         <input
//           type="text"
//           name="username"
//           onChange={updateUsername}
//           value={username}
//         ></input>
//       </div>
//       <div>
//         <label>Email</label>
//         <input
//           type="text"
//           name="email"
//           onChange={updateEmail}
//           value={email}
//         ></input>
//       </div>
//       <div>
//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           onChange={updatePassword}
//           value={password}
//         ></input>
//       </div>
//       <div>
//         <label>Repeat Password</label>
//         <input
//           type="password"
//           name="repeat_password"
//           onChange={updateRepeatPassword}
//           value={repeatPassword}
//           required={true}
//         ></input>
//       </div>
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// };

export default SignUpForm;
