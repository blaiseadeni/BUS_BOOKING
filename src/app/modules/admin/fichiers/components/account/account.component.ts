// account.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  providers:[MessageService]
})
export class AccountComponent implements OnInit {
  formDialog: boolean = false;
  accountForm: FormGroup;
  accounts: any[] = [];
  editIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private accountService: AccountService
  ) {
    this.accountForm = this.fb.group({
      accountName: ['', Validators.required],
      accountType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }

  openFormDialog() {
    this.accountForm.reset();
    this.editIndex = null;
    this.formDialog = true;
  }

  hideFormDialog() {
    this.formDialog = false;
  }

  saveAccount() {
    if (this.accountForm.valid) {
      if (this.editIndex === null) {
        this.accountService.addAccount(this.accountForm.value);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account added' });
      } else {
        this.accountService.updateAccount(this.editIndex, this.accountForm.value);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account updated' });
      }
      this.accounts = this.accountService.getAccounts();
      this.formDialog = false;
    }
  }

  editAccount(account: any, index: number) {
    this.accountForm.patchValue(account);
    this.editIndex = index;
    this.formDialog = true;
  }

  deleteAccount(index: number) {
    this.accountService.deleteAccount(index);
    this.accounts = this.accountService.getAccounts();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account deleted' });
  }
}
