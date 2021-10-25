const { Command } = require("commander");
const chalk = require("chalk");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
} = require("./contacts");

const program = new Command();
program
  .requiredOption("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

(async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      //=======================================list============================
      case "list":
        const list = await listContacts();
        console.table(list);
        break;
      
      //=====================================get================================
      case "get":
        const contactById = await getContactById(id);
        if (contactById) {
          console.log(chalk.blue("Contact found by id"));
          console.table(contactById);
        } else {
          console.log(chalk.red("Contact not found"));
          console.table(contactById);
        }
        break;

      //=====================================add================================
      case "add":
        const newContact = await addContact(name, email, phone);
        if (!name || !email || !phone) {
          console.log(chalk.red("Not found name, email, or phone"));
        }
        console.log(chalk.green("Add new contact"));
        console.table(newContact);
        break;

      //=====================================remove================================
      case "remove":
        const delContact = await removeContact(id);
        if (delContact) {
          console.log(chalk.yellow("remove contact"));
          console.table(delContact);
        } else {
          console.log(chalk.red("Contact not found"));
          console.table(delContact);
        }

        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (err) {
    console.error(chalk.red(err.message));
  }
})(argv);
