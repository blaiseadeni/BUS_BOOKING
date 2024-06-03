import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CashTransactionService {
  private transactions: any[] = [
    // Sample data for demonstration
    { transactionDate: new Date('2023-05-01'), amount: 100.0, description: 'Sample Transaction 1', isIncome: true },
    { transactionDate: new Date('2023-05-05'), amount: 200.0, description: 'Sample Transaction 2', isIncome: false },
    { transactionDate: new Date('2023-06-01'), amount: 150.0, description: 'Sample Transaction 3', isIncome: true },
  ];

  constructor() { }

  getTransactions(): any[] {
    return this.transactions;
  }

  filterTransactionsByDate(startDate: Date, endDate: Date): any[] {
    return this.transactions.filter(transaction => 
      transaction.transactionDate >= startDate && transaction.transactionDate <= endDate
    );
  }

  filterTransactionsByDateAndType(startDate: Date, endDate: Date , isIncome: boolean): any[] {
    return this.transactions.filter(transaction => 
      transaction.transactionDate >= startDate && transaction.transactionDate <= endDate && transaction.isIncome == isIncome
    );
  }

  filterTransactionsByIncomeType(isIncome: boolean): any[] {
    return this.transactions.filter(transaction => transaction.isIncome === isIncome);
  }

  calculateTotalAmount(transactions: any[]): number {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  }
}
