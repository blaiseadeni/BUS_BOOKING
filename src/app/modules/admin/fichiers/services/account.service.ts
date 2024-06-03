// account.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: any[] = [];

  constructor() { }

  getAccounts(): any[] {
    return this.accounts;
  }

  addAccount(account: any) {
    this.accounts.push(account);
  }

  updateAccount(index: number, account: any) {
    this.accounts[index] = account;
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
  }
}
