import React from "react";
import styles from "../styles/ContactTable.module.css";

const ContactTable = ({ contacts, deleteContact, editContactHandler }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.contactTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => editContactHandler(contact)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteContact(contact.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
