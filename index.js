const { Command } = require("commander");
const chalk = require("chalk");
const { listContacts } = require("./contacts");

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
      case "list":
        const contacts = await listContacts();
        console.table(contacts);
        break;

      case "get":
        // ... id
        break;

      case "add":
        // ... name email phone
        break;

      case "remove":
        // ... id
        break;

      default:
        console.warn(chalk.red("Unknown action type!"));
    }
  } catch (err) {
    console.error(chalk.red(err.message));
  }
})(argv);


