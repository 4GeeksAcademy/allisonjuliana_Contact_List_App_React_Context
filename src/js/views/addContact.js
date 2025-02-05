import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../../styles/home.css";

export const AddContact = ({ onAddContact, onEditContact }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });

  const editMode = location.state?.editMode || false;
  const contactIndex = location.state?.index;

  useEffect(() => {
    if (editMode && location.state?.contact) {
      setContact(location.state.contact);
    }
  }, [editMode, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({
      ...contact,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      onEditContact(contact, contactIndex);
    } else {
      onAddContact(contact);
    }
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">{editMode ? "Edit Contact" : "Add a new contact"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter full name"
            name="fullName"
            value={contact.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            name="email"
            value={contact.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter phone"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter address"
            name="address"
            value={contact.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn2 btn-primary">{editMode ? "Save Changes" : "Save"}</button>
        <Link to="/" className=" ">or get back to contacts</Link>
      </form>
    </div>
  );
};