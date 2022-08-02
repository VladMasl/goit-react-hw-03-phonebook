import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  deleteContacts = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  formSubmitHandler = ({ name, number }) => {
    const todo = {
      id: nanoid(),
      name,
      number,
    };

    this.repeatControlsContact(todo)
      ? alert(`${todo.name} is already in contacts!!!`)
      : this.setState(prevState => ({
          contacts: [todo, ...prevState.contacts],
        }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleFilterList = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contacts =>
      contacts.name.toLowerCase().includes(normalizedFilter)
    );
  };

  repeatControlsContact = element => {
    const { contacts } = this.state;
    return contacts.find(
      contact => contact.name.toLowerCase() === element.name.toLowerCase()
    );
  };

  render() {
    const visibleFilterList = this.getVisibleFilterList();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 20,
          color: '#010101',
          backgroundColor: 'rgba(117, 18, 1,0.2)',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} changeFilter={this.changeFilter} />
        <ContactList
          contact={visibleFilterList}
          onDeleteContact={this.deleteContacts}
        />
      </div>
    );
  }
}

export default App;
