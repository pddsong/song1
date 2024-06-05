import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContexProvider.jsx";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",

    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  function handleOnchage(e) {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);

      setErr(null);
      navigate("/");
    } catch (err) {
      console.log(err);
      // setErr(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleOnchage}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleOnchage}
        />
        <button>Login</button>
        {err && <p>{err}!</p>}
        <span>
          还没账号？ <Link to="/register">注册</Link>
        </span>
      </form>
    </div>
  );
}

export default Login;
