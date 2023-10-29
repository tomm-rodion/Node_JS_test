const { Command } = require("commander");
const program = new Command();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <action>", "Action to invoke")
  .option("-i, --id <id>", "Id of the contacts")
  .option("-n, --name <name>", "Name contact")
  .option("-e, --email <email>", "Email contact")
  .option("-p, --phone <phone>", "Phone contact");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      await listContacts()
        .then((data) => console.log("contactsList:", data))
        .catch((error) => console.log(error.message));
      break;
    case "get":
      await getContactById(id)
        .then((data) => console.log("Get contact by id:", data))
        .catch((error) => console.log(error.message));
      break;
    case "remove":
      await removeContact(id)
        .then((data) => console.log("Result remove contact:", data))
        .catch((error) => console.log(error.message));
      break;
    case "add":
      await addContact(name, email, phone)
        .then((data) => console.log("Result add contact:", data))
        .catch((error) => console.log(error.message));
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// .option("-ac, --action <action>", "Action to invoke")
// .option("-a, --allContact <list>", "Array all contacts")
// .option("-i, --id <type>", "user id")
// .option("-n, --name <type>", "user name")
// .option("-e, --email <type>", "user email")
// .option("-p, --phone <type>", "user phone")
// .option("-i, --id <get>", "Get contact by id")
// .option("-r, --remove <remove>", "Remove contact by id")
// .option("-add, --addContact <add>", "Add new contact in list contacts");

// console.log(argv);
