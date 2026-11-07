import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm.js";
import ContactTable from "./components/ContactTable";
import styles from "./styles/app.module.css";

function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      return JSON.parse(savedContacts);
    } else {
      return [];
    }
  });

  const [editContact, setEditContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContact = (contact) => {
    if (editContact) {
      setContacts(
        contacts.map((c) => (c.email === editContact.email ? contact : c)),
      );
      setEditContact(null);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  const deleteContact = (email) => {
    setContacts(contacts.filter((contact) => contact.email !== email));
  };

  const editContactHandler = (contact) => {
    setEditContact(contact);
  };

  const filteredContacts = contacts.filter((contact) => {
    return (
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)
    );
  });

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.heading}>Contact Keeper</h1>
      <input
        type="text"
        placeholder="Search contact"
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className={styles.mainContent}>
        <ContactForm addContact={addContact} editContact={editContact} />
        <ContactTable
          contacts={filteredContacts}
          deleteContact={deleteContact}
          editContactHandler={editContactHandler}
        />
      </div>
    </div>
  );
}

export default App;
