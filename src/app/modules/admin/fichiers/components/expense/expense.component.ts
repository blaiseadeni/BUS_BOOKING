import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Expense {
  description: string;
  amount: number;
  date: Date;
  category: string;
  busId?: number;
  staffId?: number;
}

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ExpenseComponent {
  expenses: Expense[] = [];
  expenseForm: FormGroup;
  formDialog: boolean = false;
  selectedExpense: Expense;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required],
      busId: [''],
      staffId: ['']
    });
  }

  openFormDialog(): void {
    this.expenseForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  onSubmitForm(): void {
    if (this.expenseForm.valid) {
      const expense: Expense = this.expenseForm.value;
      this.expenses.push(expense);
      this.hideFormDialog();
      this.messageService.add({severity:'success', summary:'Success', detail:'Expense added successfully'});
    } else {
      this.messageService.add({severity:'error', summary:'Error', detail:'Please fill all required fields'});
    }
  }

  editExpense(expense: Expense): void {
    this.selectedExpense = { ...expense };
    this.formDialog = true;
  }

  deleteExpense(index: number): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this expense?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenses.splice(index, 1);
        this.messageService.add({severity:'success', summary:'Success', detail:'Expense deleted successfully'});
      }
    });
  }
}
