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



<Flex>
    
</Flex>
