import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";

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

  };

  useEffect(() => {
    if (user) {
      setShowLIModal(false)
      return <Redirect to="/main" />;
    }

  }, [setShowLIModal, user])

  return (
    <div className="login__wrapper">
      <form onSubmit={onLogin}>
        <div className="login__header">
          <h1>Login to </h1>
          {/* <img src={} alt=""></img> */}
          <h1> slackX </h1>
        </div>
        <div className="errors">
          {errors.map((error) => (
            <div key={error}>・{error}</div>
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
        <div className="goto__signup">
          <p>New to slackX?</p>
          {/* <h3 onClick={handleSignUpModal} style={{ cursor: 'pointer' }}>Create an account</h3> */}
        </div>
      </form>
    </div>
  );
};

//   return (
//     <form onSubmit={onLogin}>
//       <div>
//         {errors.map((error) => (
//           <div>{error}</div>
//         ))}
//       </div>
//       <div>
//         <label htmlFor="email">Email</label>
//         <input
//           name="email"
//           type="text"
//           placeholder="Email"
//           value={email}
//           onChange={updateEmail}
//         />
//       </div>
//       <div>
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={updatePassword}
//         />
//         <button type="submit">Login</button>
//       </div>
//     </form>
//   );
// };

export default LoginForm;
