import { useState, useEffect } from 'react';
import ContactList from './ContactList';
import './App.css';
import ContactForm from './ContactForm';

//java script class or function is a component of a react page - returns back some html
function App() {
  //state is a js object used to represent information in or about a particular component. In this case it's used to create a component state
  const [contacts, setContacts]=useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({})

  // method that allows us to work with each part of a component
  useEffect(() => {
    fetchContacts()
  }, []);

  //requesting some data from our API
  const fetchContacts = async() => {
    const response= await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json();
    setContacts(data.contacts);
  };

  // cycles of the componet
  const openCreateModal=() => {
    if (!isModalOpen) setIsModalOpen(true)
  }

  const openEditModal= (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact)
    setIsModalOpen(true)
  }

  const closeModal=() => {
    setIsModalOpen(false)
    setCurrentContact({})
  }

  const onUpdate = () => {
    closeModal()
    fetchContacts()
  }

  return (
    <>
      <ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate}/>
      {/* onClick : how event handlers are added */}
      <button onClick={openCreateModal}>Create New Contact</button>
      {isModalOpen && <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
        </div>
      </div>
      }
    </>
  );
}

export default App;
