// inventory.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InventoryService } from '../../services/inventory.service';

interface InventoryRecord {
  date: Date;
  startDate: Date;
  endDate: Date;
  entryTotal: number;
  exitTotal: number;
  balance: number;
}

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
  providers:[MessageService]
})
export class InventoryComponent implements OnInit {
  dateForm: FormGroup;
  transactions: any[] = [];
  entryTotal: number = 0;
  exitTotal: number = 0;
  balance: number = 0;
  inventories: InventoryRecord[] = [];

  constructor(
    private fb: FormBuilder,
    private transactionService: InventoryService,
    private messageService: MessageService
  ) {
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
  }

  calculateInventory() {
    const startDate = this.dateForm.controls['startDate'].value;
    const endDate = this.dateForm.controls['endDate'].value;

    if (startDate && endDate) {
      const filteredTransactions = this.transactionService.filterTransactionsByDate(new Date(startDate), new Date(endDate));
      this.entryTotal = this.transactionService.calculateTotalAmount(filteredTransactions, true);
      this.exitTotal = this.transactionService.calculateTotalAmount(filteredTransactions, false);
      this.balance = this.entryTotal - this.exitTotal;

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory calculated successfully' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select start and end dates' });
    }
  }

  saveInventory() {
    const startDate = this.dateForm.controls['startDate'].value;
    const endDate = this.dateForm.controls['endDate'].value;
    const currentDate = new Date();

    if (startDate && endDate) {
      const inventoryRecord: InventoryRecord = {
        date: currentDate,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        entryTotal: this.entryTotal,
        exitTotal: this.exitTotal,
        balance: this.balance
      };

      this.inventories.push(inventoryRecord);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inventory saved successfully' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please select start and end dates' });
    }
  }
}
