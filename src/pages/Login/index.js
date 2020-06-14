import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import "./styles.css";

import logoImg from "../../assets/logo.png";
import homeImg from "../../assets/home_img.svg";

import api from "../../services/api";

export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("sessions", { id });

      localStorage.setItem("userId", id);
      localStorage.setItem("userName", response.data.name);

      history.push("/payments");
    } catch (err) {
      alert("Falha no login! Tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} width="60%" alt="Logo" />

        <form onSubmit={handleLogin}>
          <h1>Login</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Enter
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#326fff" />
            Register
          </Link>
        </form>
      </section>
      <img src={homeImg} width="55%" alt="Mobile Payment" />
    </div>
  );
}
