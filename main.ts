import inquirer from "inquirer";
import chalk from "chalk";

class Laptop {
    name: string;
    price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }
}

class LaptopProcess {
    laptops: Laptop[] = [];

    addLaptop(obj: Laptop) {
        this.laptops.push(obj);
    }

    showLaptopDetails() {
        if (this.laptops.length === 0) {
            console.log(chalk.red("No laptops have been purchased yet."));
        } else {
            console.log(chalk.blue("\nPurchased Laptops:\n"));
            this.laptops.forEach((laptop, index) => {
                console.log(chalk.blue(`${index + 1}. ${laptop.name} - $${laptop.price}`));
            });
        }
    }
}

const buyingLaptop = new LaptopProcess();

const startProgram = async (buyingLaptop: LaptopProcess) => {
    do {
        console.log(chalk.green.bold("\n\t\tWelcome To Our Website\n"));

        const ask = await inquirer.prompt({
            name: "qno1",
            type: "list",
            message: "What do you want to do?\n",
            choices: [
                { value: "Laptop Details", name: "Laptop Details" },
                { value: "Buy Laptop", name: "Buy Laptop" },
                { value: "Show Purchased Laptops", name: "Show Purchased Laptops" }
            ]
        });

        // ====================== Laptop details =========================  
        if (ask.qno1 === "Laptop Details") {
            console.log(chalk.blue("\nInformation About Laptops"));
            const askDetails = await inquirer.prompt({
                name: "qno2",
                type: "list",
                message: "\nWhich information of laptop do you want?",
                choices: [
                    { value: "HP", name: "HP" },
                    { value: "Dell", name: "Dell" }
                ]
            });

            if (askDetails.qno2 === "HP") {
                console.log(chalk.blue("\nInformation about HP Laptops"));
                console.log(chalk.blue("Core i7 Laptops"));
                console.log(chalk.blue("Price: $1000\n"));
            } else if (askDetails.qno2 === "Dell") {
                console.log(chalk.blue("\nInformation about Dell Laptops"));
                console.log(chalk.blue("Core i7 Laptops"));
                console.log(chalk.blue("Price: $1200\n"));
            }
        }
        // ======================== Buy laptop ===================================  
        else if (ask.qno1 === "Buy Laptop") {
            const askBuy = await inquirer.prompt({
                name: "qno3",
                type: "list",
                message: "\nWhich laptop do you want to buy?",
                choices: [
                    { value: "Dell Core i7 - $1200", name: "Dell Core i7 - $1200" },
                    { value: "HP Core i7 - $1000", name: "HP Core i7 - $1000" }
                ]
            });

            let add: Laptop;

            if (askBuy.qno3 === "Dell Core i7 - $1200") {
                add = new Laptop("Dell Core i7", 1200);
            } else if (askBuy.qno3 === "HP Core i7 - $1000") {
                add = new Laptop("HP Core i7", 1000);
            } else {
                console.log(chalk.red("Invalid option selected."));
                continue; // go back to the main menu
            }

            buyingLaptop.addLaptop(add);
            console.log(chalk.yellow(`\nYou bought ${add.name} for $${add.price}`));
            console.log(chalk.yellow(`Current list of purchased laptops:`));
            buyingLaptop.laptops.forEach((laptop, index) => {
                console.log(chalk.yellow(`${index + 1}. ${laptop.name} - $${laptop.price}\n`));
            });
        }
        // ======================== Show purchased laptops ===================================
        else if (ask.qno1 === "Show Purchased Laptops") {
            buyingLaptop.showLaptopDetails() + "\n";
        }

        const confirm = await inquirer.prompt({
            name: "select",
            type: "list",
            message: "\nDo you want to continue?",
            choices: [
                { value: "Yes", name: "Yes" },
                { value: "No", name: "No" }
            ]
        });

        if (confirm.select === "Yes") {
            console.log(chalk.green("\nStarting your program again..."));
        } else {
            console.log(chalk.red("\nExit from the program!"));
            process.exit();
        }
    } while (true);
}

startProgram(buyingLaptop);
