const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");
const filePath = path.join(__dirname, "./db/contacts.json");
// TODO: задокументировать каждую функцию
async function listContacts() {
  const data = await fs.readFile(filePath, {
    encoding: "utf-8",
  });
  return JSON.parse(data);
  // ...твой код. Возвращает массив контактов.
}

async function getContactById(contactId) {
  console.log(contactId);
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  return findContact || null;
  // ...твой код. Возвращает объект контакта с таким id. Возвращает null, если объект с таким id не найден.
}

async function removeContact(contactId) {
  const allContacts = await listContacts();
  const contactIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactIndex === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(contactIndex, 1);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2));
  return removeContact;
}

async function addContact(name, email, phone) {
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  const allContacts = await listContacts();
  allContacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
