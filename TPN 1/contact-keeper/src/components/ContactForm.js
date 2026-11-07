import React, { useState, useEffect } from "react";
import styles from "../styles/ContactForm.module.css";

const ContactForm = ({ addContact, editContact }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (editContact) {
      setName(editContact.name);
      setEmail(editContact.email);
      setPhone(editContact.phone);
    } else {
      setName("");
      setEmail("");
      setPhone("");
    }
  }, [editContact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && phone) {
      addContact({ name, email, phone });
      setName("");
      setEmail("");
      setPhone("");
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        className={styles.inputField}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className={styles.inputField}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        className={styles.inputField}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button type="submit" className={styles.submitButton}>
        {editContact ? "Update Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
