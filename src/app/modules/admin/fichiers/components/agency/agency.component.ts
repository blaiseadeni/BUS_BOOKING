import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface AgencyModel {
  companyId: number;
  name: string;
  city?: string;
  address: string;
  phone: string;
}

interface Company {
  id: number;
  name: string;
}

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss'],
  providers: [MessageService]
})


export class AgencyComponent {
  agencies: AgencyModel[] = [];
  agencyForm: FormGroup;
  formDialog: boolean = false;
  isEdit: boolean = false;
  selectedAgencyIndex: number | null = null;
  companies: Company[] = [
    { id: 1, name: 'Company A' },
    { id: 2, name: 'Company B' },
    { id: 3, name: 'Company C' }
  ];

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.agencyForm = this.fb.group({
      companyId: [null, Validators.required],
      name: ['', Validators.required],
      city: [''],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Charger les données initiales si nécessaire
  }

  openFormDialog() {
    this.agencyForm.reset();
    this.formDialog = true;
  }

  hideFormDialog() {
    this.formDialog = false;
  }

  onSubmitForm() {
    if (this.agencyForm.valid) {
      if (this.isEdit && this.selectedAgencyIndex !== null) {
        this.agencies[this.selectedAgencyIndex] = this.agencyForm.value;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agency updated' });
      } else {
        this.agencies.push(this.agencyForm.value);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agency added' });
      }
      this.formDialog = false;
      this.isEdit = false;
      this.selectedAgencyIndex = null;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
    }
  }

  deleteAgency(index: number) {
    this.agencies.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Agency deleted' });
  }

  editAgency(agency: AgencyModel, index: number) {
    this.agencyForm.patchValue(agency);
    this.formDialog = true;
    this.isEdit = true;
    this.selectedAgencyIndex = index;
  }

  getCompanyNameById(companyId: number): string {
    const company = this.companies.find(company => company.id === companyId);
    return company ? company.name : 'Unknown';
  }
}
