import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { makeRequest } from "../../axios.js";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  function handleOnchage(e) {
    setInputs((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await makeRequest.post("/auth/register", inputs);
      if (res) navigate("/login");
    } catch (err) {
      setErr(err.response.data);
      console.log(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
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
          type="email"
          placeholder="email"
          name="email"
          onChange={handleOnchage}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={handleOnchage}
        />
        <button>Register</button>
        {err && <p>{err}!</p>}
        <span>
          你是否有账号？ <Link to="/login">登录</Link>
        </span>
      </form>
    </div>
  );
}

export default Register;
