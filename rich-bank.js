const accounts = [
  { id: 1, owner: "Alice", balance: 500 },
  { id: 2, owner: "Bob", balance: 300 },
];

function getAccountById(id) {
  for (const account of accounts) {
    if (account.id == id) {
      return account;
    }
  }
}

function createAccount(newAccountId, newAccountOwner) {
  if (getAccountById(newAccountId)) {
    throw new Error("An account already exists for this ID.");
  }
  if (newAccountId <= 0 || !Number.isInteger(newAccountId)) {
    throw new Error("Must enter a positive whole number.");
  }
  if (typeof newAccountOwner !== "string" || newAccountOwner.trim() === "") {
    throw new Error("Must enter the account owner.");
  }

  accounts.push({
    id: newAccountId,
    owner: newAccountOwner,
    balance: 0,
  });
}

function depositMoney(accountId, amount) {
  if (amount <= 0 || !Number.isFinite(amount)) {
    throw new Error("Must enter a positive number to deposit.");
  }

  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found.");
  }

  account.balance += amount;
}

function withdrawMoney(accountId, amount) {
  const account = getAccountById(accountId);

  if (!account) {
    throw new Error("Account not found.");
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error(
      "Invalid value for withdrawal amount: The amount must be a finite number."
    );
  }

  if (account.balance - amount >= 0) {
    account.balance -= amount;
  } else {
    throw new Error("You can't withdraw more money than is in the account.");
  }
}

function transferMoney(fromAccountId, toAccountId, amount) {
  const fromAccount = getAccountById(fromAccountId);
  const toAccount = getAccountById(toAccountId);

  if (!fromAccount) {
    throw new Error("Source account not found.");
  }

  if (!toAccount) {
    throw new Error("Target account not found.");
  }

  if (!Number.isFinite(amount) || amount < 0) {
    throw new Error(
      "Invalid value for transfer amount: The amount must be a positive finite number."
    );
  }

  if (fromAccount.balance - amount >= 0) {
    fromAccount.balance -= amount;
    toAccount.balance += amount;
  } else {
    throw new Error("You can't transfer more money than is in the account.");
  }
}

/*
Hints:

getAccountById("1");

createAccount(1, "Alice");
createAccount("3", "Charlie");
createAccount(-3, "Charlie");
createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

depositMoney(1, "300")
depositMoney(1, -300)
depositMoney(1, 0)
depositMoney(1, Infinity)
depositMoney(4, 100)

withdrawMoney(1, -100)
withdrawMoney(1, 0)
withdrawMoney(1, 501)

transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);
*/
