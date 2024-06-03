// transaction.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
  providers:[MessageService]
})
export class TransactionComponent implements OnInit {
  dateForm: FormGroup;
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  totalAmount: number = 0;
  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private messageService: MessageService
  ) {
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = [...this.transactions];
    this. calculateTotalAmount();
  }

  onFilter() {
    const startDate = this.dateForm.controls['startDate'].value;
    const endDate = this.dateForm.controls['endDate'].value;

    if (startDate && endDate) {
      this.filteredTransactions = this.transactionService.filterTransactionsByDate(new Date(startDate), new Date(endDate));
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Transactions filtered' });
    } else {
      this.filteredTransactions = [...this.transactions];
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please select both start and end dates' });
    }
    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  clearDates() {
    this.dateForm.controls['startDate'].reset();
    this.dateForm.controls['endDate'].reset();
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = [...this.transactions];
    this. calculateTotalAmount();
  }
}
