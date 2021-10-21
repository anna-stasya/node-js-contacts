const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const readContact = async () => {
  const result = await fs.readFile(
    path.join(__dirname, "contacts.json"),
    "utf8"
  );
  return JSON.parse(result);
};

const listContacts = async () => {
  return await readContact();
};

function getContactById(contactId) {
  // ...твой код
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}

module.exports = { listContacts, getContactById, removeContact, addContact };
