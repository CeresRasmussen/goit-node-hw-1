const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    return data.find((el) => el.id === contactId) || null;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const index = data.findIndex((el) => el.id === contactId);
    if (index === -1) {
      return null;
    }
    const [deletedContact] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact(contactData) {
  try {
    const data = await listContacts();
    const contact = { id: nanoid(), ...contactData };
    data.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return contact;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
