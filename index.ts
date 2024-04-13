import inquirer from 'inquirer';

// Assume pin and password
const correctPin = '1234';
const correctPassword = 'password';

let balance = 100000; // Initial balance

async function main() {
    // Ask for pin
    const { pin } = await inquirer.prompt([
        {
            type: 'password',
            name: 'pin',
            message: 'Enter your PIN:'
        }
    ]);

    // Validate pin
    if (pin !== correctPin) {
        console.log('Invalid PIN. Exiting...');
        return;
    }

    // Ask for password
    const { password } = await inquirer.prompt([
        {
            type: 'password',
            name: 'password',
            message: 'Enter your password:'
        }
    ]);

    // Validate password
    if (password !== correctPassword) {
        console.log('Invalid password. Exiting...');
        return;
    }

    // If pin and password are correct, show options
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Check Balance', 'Deposit', 'Withdraw']
        }
    ]);

    switch (answer.action) {
        case 'Check Balance':
            console.log(`Your balance is $${balance}`);
            break;
        case 'Deposit':
            const { depositAmount } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'depositAmount',
                    message: 'Enter deposit amount:'
                }
            ]);
            balance += depositAmount;
            console.log(`Deposited $${depositAmount}. Your new balance is $${balance}`);
            break;
        case 'Withdraw':
            const { withdrawAmount } = await inquirer.prompt([
                {
                    type: 'number',
                    name: 'withdrawAmount',
                    message: 'Enter withdraw amount:'
                }
            ]);
            if (withdrawAmount > balance) {
                console.log('Insufficient funds. Your balance is less than requested amount.');
            } else {
                balance -= withdrawAmount;
                console.log(`Withdrawn $${withdrawAmount}. Your new balance is $${balance}`);
            }
            break;
        default:
            console.log('Invalid option');
    }
}

main();

