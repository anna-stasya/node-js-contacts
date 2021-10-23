const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

const updateContact = async(newContact)=> {
    const contactStr = JSON.stringify(newContact);
    await fs.writeFile(contactsPath, contactStr);
  };

const readContact = async () => {
  const result = await fs.readFile(contactsPath,"utf8");
  return JSON.parse(result);
};

//=======================================list============================
const listContacts = async () => {
  return await readContact();
};
//=====================================get================================
const getContactById = async (contactId) => {
  const contact = await readContact();
  const result = contact.filter((item) => item.id === +contactId);
  if(!result) {
        return null;
    }
  return result;
};
//=====================================add================================
const addContact = async (name, email, phone) => {
  const contact = await readContact();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contact.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contact, null, 2)
    
  );
  return newContact;
};
//=====================================remove================================
const removeContact = async (contactId) => {
  const contact = await readContact();
  const idx = contact.findIndex((item) => item.id === +contactId);
  if (idx === -1) {
    return null;
  }
  const delContact = contact.splice(idx, 1);
  await updateContact(contact);
  return delContact;
};


module.exports = { listContacts, getContactById, removeContact, addContact };
