import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MaskedInput from "react-text-mask";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      telefone,
    };

    try {
      const response = await api.post("users", data);

      alert(`Seu ID de acesso: ${response.data.id}  Faça login com ele`);

      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, tente novamente.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <Link to="/">
            <img src={logoImg} width="60%" alt="Voxus" />
          </Link>

          <h1>Cadastro</h1>
          <p>Register yourself like a Voxus employer</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#326fff" />
            Voltar e realizar o login
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <MaskedInput
            placeholder="Whatsapp"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            mask={[
              "(",
              /\d/,
              /\d/,
              ")",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
          />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
