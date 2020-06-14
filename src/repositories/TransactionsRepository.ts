import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = { income: 0, outcome: 0, total: 0 };
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].type == 'income') {
        balance.income += this.transactions[i].value;
        balance.total += this.transactions[i].value;
      } else {
        balance.outcome += this.transactions[i].value;
        balance.total -= this.transactions[i].value;
      }
    }

    return balance;
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
