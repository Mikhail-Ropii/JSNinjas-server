// const fs = require('fs/promises')
const fs = require("fs/promises");
const path = require("path");
const ObjectId = require("bson-objectid");

const contactsPath = path.join(__dirname, "../models/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  console.log(data);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === id);
  if (!findContact) {
    return null;
  }
  return findContact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removeContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    name,
    email,
    phone,
    id: ObjectId(),
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
