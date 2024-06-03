import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface CashRegister {
  currentBalance: number;
}

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class CashRegisterComponent implements OnInit {
  cashRegisters: CashRegister[] = [];
  cashRegisterForm: FormGroup;
  formDialog: boolean = false;
  selectedCashRegister: CashRegister;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.cashRegisterForm = this.fb.group({
      currentBalance: [0, [Validators.required, Validators.min(0)]]
    });

    // Example data
    this.cashRegisters = [
      { currentBalance: 1000 },
      { currentBalance: 2000 },
      { currentBalance: 3000 },
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.cashRegisterForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveCashRegister(): void {
    if (this.cashRegisterForm.valid) {
      const cashRegister: CashRegister = this.cashRegisterForm.value;
      if (this.isEdit) {
        const index = this.cashRegisters.findIndex(cr => cr === this.selectedCashRegister);
        this.cashRegisters[index] = cashRegister;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cash Register updated successfully' });
      } else {
        this.cashRegisters.push(cashRegister);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cash Register added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editCashRegister(cashRegister: CashRegister): void {
    this.isEdit = true;
    this.selectedCashRegister = cashRegister;
    this.cashRegisterForm.patchValue(cashRegister);
    this.formDialog = true;
  }

  deleteCashRegister(cashRegister: CashRegister): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this cash register?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cashRegisters = this.cashRegisters.filter(cr => cr !== cashRegister);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cash Register deleted successfully' });
      }
    });
  }
}
