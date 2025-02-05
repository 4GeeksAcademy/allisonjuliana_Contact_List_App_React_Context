import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Home = ({ contacts, onAddContact, onDeleteContact, onEditContact }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (contactToDelete !== null) {
      onDeleteContact(contactToDelete.index); // Llamamos a la función de eliminación
    }
    setModalVisible(false); // Cerramos el modal después de eliminar
  };

  const handleEdit = (contact, index) => {
    navigate("/add-contact", { state: { contact, index, editMode: true } });
  };

  const openDeleteModal = (contact, index) => {
    setContactToDelete({ contact, index });
    setModalVisible(true);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3">
        <Link to="/add-contact" className="btn btn-success">Add new contact</Link>
      </div>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <div className="contact-card mb-2" key={index}>
            <div className="contact-image">
              <i className="fas fa-user"></i>
            </div>
            <div className="contact-info ml-3">
              <h2>{contact.fullName}</h2>
              <p><i className="fas fa-map-marker-alt"></i> {contact.address}</p>
              <p><i className="fas fa-phone"></i> {contact.phone}</p>
              <p><i className="fas fa-envelope"></i> {contact.email}</p>
            </div>
            <div className="contact-actions">
              <i className="fas fa-pencil-alt" onClick={() => handleEdit(contact, index)}></i>
              <i className="fas fa-trash" onClick={() => openDeleteModal(contact, index)}></i>
            </div>
          </div>
        ))}
      </div>
      
      {modalVisible && (
        <div className="modal fade show" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                <button type="button" className="btn-close" onClick={() => setModalVisible(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                ¿Do you want to delete {contactToDelete?.contact.fullName}?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => setModalVisible(false)}>Close</button>
                <button type="button" onClick={handleDelete} className="btn btn-secondary">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
