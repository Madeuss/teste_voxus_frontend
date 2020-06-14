import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { FiPower, FiTrash2 } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";

import api from "../../services/api";

import logoImg from "../../assets/logo.png";

import "./styles.css";

export default function Payments() {
  const [payments, setPayments] = useState([]);

  const history = useHistory();
  const userName = localStorage.getItem("userName");

  useEffect(() => {
    api.get("payments").then((response) => {
      setPayments(response.data);
    });
  }, [payments]);

  /* Delete Payment Function */
  async function handleDeletePayment(id) {
    try {
      await api.delete(`payments/${id}`);

      setPayments(payments.filter((payment) => payment.id !== id));
    } catch (err) {
      alert("Erro ao deletar caso, tente novamente.");
    }
  }

  /* Logout function */
  function handleLogout() {
    localStorage.clear(); /* Clear the storage data */
    history.push("/"); /*  Return to '/' route */
  }

  return (
    <div className="payment-container">
      <header>
        <img src={logoImg} alt="Voxus" />
        <span>Welcome, {userName}</span>

        <Link className="button" to="/newpayments">
          Post new payment
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#362fff" />
        </button>
      </header>
      <h1>All Payments</h1>

      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <strong>Title:</strong>
            <p>{payment.title}</p>

            <strong>Value:</strong>
            <p>R$ {payment.value}</p>

            <strong>Date:</strong>
            <p>{payment.date}</p>

            <strong>External Tax:</strong>
            <p>R$ {payment.external_tax}</p>

            <strong>Comments:</strong>
            <p>{payment.comments}</p>

            <button
              onClick={() => handleDeletePayment(payment.id)}
              type="button"
            >
              <FiTrash2 size={20} color="a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
