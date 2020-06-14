import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MaskedInput from "react-text-mask";

import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";

import api from "../../services/api";

import "./styles.css";

import logoImg from "../../assets/logo.png";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title required")
    .max(100, "Woow, so long! ")
    .min(5, "So short :/")
    .notOneOf(["admin", "administrador"], "'-'"),
});

export default function New() {
  const history = useHistory();
  const paymentId = localStorage.getItem("paymentId");
  const paymentTitle = localStorage.getItem("paymentTitle");
  const paymentValue = localStorage.getItem("paymentValue");
  const paymentDate = localStorage.getItem("paymentDate");
  const paymentTax = localStorage.getItem("paymentTax");
  const paymentComments = localStorage.getItem("paymentComments");

  const [title, setTitle] = useState(paymentTitle);
  const [value, setValue] = useState(paymentValue);
  const [date, setDate] = useState(paymentDate);
  const [external_tax, setExternalTax] = useState(value * 0.05);
  const [comments, setComments] = useState(paymentComments);

  const { values, errors } = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema,
  });
  const Span = styled.span`
    color: #31b5ff;
    font-size: 1em;
    opacity: 0.8;
    @media (max-width: 500px) {
      font-size: 2em;
    }
  `;
  async function handleEditPayment(e) {
    e.preventDefault();

    const data = {
      title,
      value,
      date,
      external_tax,
      comments,
    };

    try {
      await api.put(`payments/${paymentId}`, data);
      history.push("/payments");
    } catch (err) {
      alert("Erro ao editar o pagamento, tente novamente.");
    }
  }

  return (
    <div className="new-payment-container">
      <div className="content">
        <section>
          <Link to="/payments">
            <img src={logoImg} width="60%" alt="Voxus" />
          </Link>

          <h1>Edit Payment</h1>
          <p>Describe the new values for this payment </p>

          <Link className="back-link" to="/payments">
            <FiArrowLeft size={16} color="#326fff" />
            Back home
          </Link>
        </section>

        <form onSubmit={handleEditPayment}>
          <input
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title ? <Span>{errors.title}</Span> : null}
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
