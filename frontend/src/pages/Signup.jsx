import { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_URL } from "../constants";
import { useAuth } from "../contexts/AuthContextProvider";

function Signup() {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (password !== confirmPassword) {
        throw Error("Password Must Match");
      }

      const response = await axios.post(
        SIGNUP_URL,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setAuth(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data?.error || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sign  up..." : "Sign Up"}
          </button>
          {/* {isLoading && <p>Loading ....</p>} */}
          {error && <p>{error}</p>}
        </div>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}
export default Signup;
