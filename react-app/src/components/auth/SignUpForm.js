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
      // setShowSUModal(false)
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
          <select name="state" value={state} onChange={e => setState(e.target.value)} >
            <option defaultValue>State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AZ">AZ</option>
            <option value="AR">AR</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DE">DE</option>
            <option value="DC">DC</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="IA">IA</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="ME">ME</option>
            <option value="MD">MD</option>
            <option value="MA">MA</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MS">MS</option>
            <option value="MO">MO</option>
            <option value="MT">MT</option>
            <option value="NE">NE</option>
            <option value="NV">NV</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NY">NY</option>
            <option value="NC">NC</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WV">WV</option>
            <option value="WI">WI</option>
            <option value="WY">WY</option>
          </select>

          <input
            type="text"
            name="zip"
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

export default SignUpForm;


{/* <input
            type="text"
            name="state"
            placeholder="State"
            onChange={e => setState(e.target.value)}
            value={state}
            required
            autoComplete="off"
          ></input> */}
