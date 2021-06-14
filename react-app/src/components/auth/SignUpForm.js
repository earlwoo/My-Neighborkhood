import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import { Text, Flex, Image } from "@chakra-ui/react"
import dog from "../main/dog.png"
import "./SignUpForm.css"

const SignUpForm = ({ setShowSUModal }) => {
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
      if(data.errors) {
        setErrors(data.errors)
      }

    } else {
      const valErrors = [...errors, "Passwords must match."]
      setErrors(valErrors);
    }

  };

  useEffect(() => {
    if (user) {
      // setShowSUModal(false)
      return <Redirect to="/" />;
    }
  }, [setShowSUModal, user])

  return (
    <>
      <Flex borderTopRadius="7" backgroundColor="#92ddb6" justifyContent="center" alignItems="center">
        <Image src={dog} marginRight="3"></Image>
        <Text letterSpacing="4px" fontSize="16px" fontWeight="bold" >Sign Up</Text>
      </Flex>
      <div className="signup__wrapper">
        <form onSubmit={onSignUp}>
          <div className="errors">
            {errors?.map((error) => (
              <div key={error}>{error}</div>
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
          <Flex>
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
            <select className="select-age" required name="age" value={age} onChange={e => setAge(e.target.value)}>
              <option className="select-default" value="" defaultValue >Age</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>

            </select>
            </div>
          </Flex>
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
          <div className="signup__input address">
            <input
              type="text"
              name="street"
              placeholder="Street address"
              onChange={e => setStreet(e.target.value)}
              value={street}
              required
              autoComplete="off"
            ></input>
          </div>
          <Flex className="signup__input" >
            <input
              className="city"
              type="text"
              name="city"
              placeholder="City"
              onChange={e => setCity(e.target.value)}
              value={city}
              required
              autoComplete="off"
            ></input>
            <select className="select-state" required name="state" value={state} onChange={e => setState(e.target.value)}>
              <option className="select-default" value="" defaultValue>State</option>
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
              className="zip"
              type="number"
              max="99999"
              min="10000"
              name="zip"
              placeholder="Zip"
              onChange={e => setZip(e.target.value)}
              value={zip}
              required
              autoComplete="off"
            ></input>
          </Flex>
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
          <div className="signup__button">
            <button style={{ cursor: 'pointer' }} type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
