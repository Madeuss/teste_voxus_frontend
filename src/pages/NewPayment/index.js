import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MaskedInput from "react-text-mask";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

export default function New() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState();
  const [date, setDate] = useState("");
  const [external_tax, setExternalTax] = useState();
  const [comments, setComments] = useState("");

  const history = useHistory();

  async function handleNewPayment(e) {
    e.preventDefault();

    const data = {
      title,
      value,
      date,
      external_tax,
      comments,
    };

    try {
      await api.post("payments", data);
      history.push("/payments");
    } catch (err) {
      alert("Erro ao cadastrar pagamento, tente novamente.");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <Link to="/payments">
            <img src={logoImg} width="60%" alt="Voxus" />
          </Link>

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhamente para que possamos encontrar um herói
            que consiga resolve-lo{" "}
          </p>

          <Link className="back-link" to="/payments">
            <FiArrowLeft size={16} color="#326fff" />
            Voltar para a home
          </Link>
        </section>

        <form onSubmit={handleNewPayment}>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Value (R$)"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <MaskedInput
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            mask={[/\d/, /\d/, /\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/]}
          />
          <input
            placeholder="External Tax"
            value={value * 0.05}
            onChange={(e) => setExternalTax(e.target.value)}
          />
          <textarea
            placeholder="Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
