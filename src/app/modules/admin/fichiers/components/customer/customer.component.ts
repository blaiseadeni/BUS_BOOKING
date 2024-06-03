import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

export interface CustomerModel {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [MessageService]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: CustomerModel[] = [];
  selectedCustomer: CustomerModel | null = null;
  formDialog: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  openNew(): void {
    this.customerForm.reset();
    this.selectedCustomer = null;
    this.formDialog = true;
  }

  editCustomer(customer: CustomerModel): void {
    this.selectedCustomer = customer;
    this.customerForm.patchValue(customer);
    this.formDialog = true;
  }

  deleteCustomer(customer: CustomerModel): void {
    const index = this.customers.indexOf(customer);
    if (index !== -1) {
      this.customers.splice(index, 1);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer deleted' });
    }
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      if (this.selectedCustomer) {
        // Update existing customer
        const index = this.customers.indexOf(this.selectedCustomer);
        this.customers[index] = this.customerForm.value;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer updated' });
      } else {
        // Add new customer
        this.customers.push(this.customerForm.value);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Customer added' });
      }
      this.formDialog = false;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill the form correctly' });
    }
  }

  hideDialog(): void {
    this.formDialog = false;
  }
}
