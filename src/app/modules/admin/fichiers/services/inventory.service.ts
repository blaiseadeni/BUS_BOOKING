import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private transactions: any[] = [
    // Example transactions
    { transactionDate: new Date(), amount: 100, description: 'Income 1', isIncome: true },
    { transactionDate: new Date(), amount: 50, description: 'Expense 1', isIncome: false },
    // Add more transactions as needed
  ];

  getTransactions(): any[] {
    return this.transactions;
  }

  filterTransactionsByDate(startDate: Date, endDate: Date): any[] {
    return this.transactions.filter(transaction => {
      return transaction.transactionDate >= startDate && transaction.transactionDate <= endDate;
    });
  }

  calculateTotalAmount(transactions: any[], isIncome: boolean): number {
    return transactions
      .filter(transaction => transaction.isIncome === isIncome)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }
}
