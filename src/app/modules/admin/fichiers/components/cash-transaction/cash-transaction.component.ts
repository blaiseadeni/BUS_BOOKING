import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CashTransactionService } from "../../services/cash-transaction.service";
@Component({
  selector: "app-cash-transaction",
  templateUrl: "./cash-transaction.component.html",
  styleUrls: ["./cash-transaction.component.scss"],
  providers: [MessageService],
})
export class CashTransactionComponent {
  dateForm: FormGroup;
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  totalAmount: number = 0;
  booleen : boolean = false;
  incomeTypes: any[] = [
    { label: "All", value: null },
    { label: "Income", value: true },
    { label: "Expense", value: false },
  ];

  constructor(
    private fb: FormBuilder,
    private transactionService: CashTransactionService,
    private messageService: MessageService
  ) {
    this.dateForm = this.fb.group({
      startDate: [""],
      endDate: [""],
      isIncome: [""], // Add a form control for income type filtering
    });
  }

  ngOnInit(): void {
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = [...this.transactions];
    this.calculateTotalAmount();
  }

  booleanValue(str: string): boolean {
    return str.toLowerCase() === 'true';
  }
  
  onFilter() {
    const startDate = this.dateForm.controls["startDate"].value;
    const endDate = this.dateForm.controls["endDate"].value;
    const isIncomeStr = this.dateForm.controls["isIncome"].value;

    if (startDate && endDate && isIncomeStr == '') {
      this.filteredTransactions =
        this.transactionService.filterTransactionsByDate(new Date(startDate),new Date(endDate));
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Transactions filtered by date",
      });
    }else if(startDate && endDate && isIncomeStr != null){
      const isIncome = this.booleanValue(isIncomeStr);
      this.filteredTransactions =
      this.transactionService.filterTransactionsByDateAndType(new Date(startDate),new Date(endDate), true);
    this.messageService.add({
      severity: "success",
      summary: "Success",
      detail: "Transactions filtered by date and type",
    });
    }else{
      this.filteredTransactions = this.transactionService.filterTransactionsByIncomeType(isIncomeStr);
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "Transactions filtered by income type",
      });
    }

    // if (isIncome != null) {
    //   this.filteredTransactions = this.transactionService.filterTransactionsByIncomeType(true);
    //   this.messageService.add({
    //     severity: "success",
    //     summary: "Success",
    //     detail: "Transactions filtered by income type",
    //   });
    // }

    this.calculateTotalAmount();
  }

  calculateTotalAmount() {
    this.totalAmount = this.transactionService.calculateTotalAmount(
      this.filteredTransactions
    );
  }

  clearDates() {
    this.dateForm.controls["startDate"].reset();
    this.dateForm.controls["endDate"].reset();
    this.transactions = this.transactionService.getTransactions();
    this.filteredTransactions = [...this.transactions];
    this.calculateTotalAmount();
  }
}
