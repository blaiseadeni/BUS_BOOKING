import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface CompanyModel {
  name?: string;
  creationDate?: Date;
  registrationNumber?: string;
  nationalId?: string;
  phone?: string;
  email?: string;
  city?: string;
  address?: string;
  socialSecurityNumber: number;
  pensionFundNumber: number;
  taxNumber: number;
  imageFile: any[];
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.Scss'],
  providers: [MessageService]
})
export class CompanyComponent implements OnInit {
  companies: CompanyModel[] = [];
  companyForm: FormGroup;
  formDialog: boolean = false;
  isEdit: boolean = false;
  selectedCompanyIndex: number | null = null;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      creationDate: [null, Validators.required],
      registrationNumber: ['', Validators.required],
      nationalId: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: [''],
      address: ['', Validators.required],
      socialSecurityNumber: ['', Validators.required],
      pensionFundNumber: ['', Validators.required],
      taxNumber: ['', Validators.required],
      imageFile: [null]
    });
  }

  ngOnInit(): void {
    // Charger les données initiales si nécessaire
  }

  openFormDialog() {
    this.companyForm.reset();
    this.formDialog = true;
    this.isEdit = false;
  }

  hideFormDialog() {
    this.formDialog = false;
  }

  onSubmitForm() {
    if (this.companyForm.valid) {
      if (this.isEdit && this.selectedCompanyIndex !== null) {
        this.companies[this.selectedCompanyIndex] = this.companyForm.value;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company updated' });
      } else {
        this.companies.push(this.companyForm.value);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company added' });
      }
      this.formDialog = false;
      this.isEdit = false;
      this.selectedCompanyIndex = null;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
    }
  }

  deleteCompany(index: number) {
    this.companies.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Company deleted' });
  }

  editCompany(company: CompanyModel, index: number) {
    this.companyForm.patchValue(company);
    this.formDialog = true;
    this.isEdit = true;
    this.selectedCompanyIndex = index;
  }

  onImageUpload(event: any): void {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.companyForm.patchValue({ imageFile: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
  
}
