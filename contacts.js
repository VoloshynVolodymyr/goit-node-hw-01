const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const result = JSON.parse(data);
         return result;  
      } catch (error) {
        console.log(error.message);
      }
  }

async function getItemById(contactId){
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id===contactId);
    return contact || null;
}
  
  async function getContactById(contactId) {
    const result = getItemById(contactId)
    return result || null;
  }
  
  async function removeContact (contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  }
  
  async function addContact({name, email, phone}) {
    const id = nanoid();
    const newContact = { id, name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
  }


  module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
  }