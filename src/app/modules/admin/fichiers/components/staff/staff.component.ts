import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';

interface Staff {
  firstName: string;
  lastName: string;
  position: string;
  agencyId: number;
  imageFile: string;  // We'll store the base64 representation of the image
}

interface DropdownOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class StaffComponent implements OnInit {
  staffMembers: Staff[] = [];
  staffForm: FormGroup;
  formDialog: boolean = false;
  selectedStaff: Staff;
  isEdit: boolean = false;

  agencies: DropdownOption[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      agencyId: [null, Validators.required],
      imageFile: [null]
    });

    // Example data
    this.staffMembers = [
      { firstName: 'John', lastName: 'Doe', position: 'Driver', agencyId: 1, imageFile: null },
      { firstName: 'Jane', lastName: 'Smith', position: 'Conductor', agencyId: 2, imageFile: null }
    ];

    this.agencies = [
      { label: 'Agency 1', value: 1 },
      { label: 'Agency 2', value: 2 }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.staffForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveStaff(): void {
    if (this.staffForm.valid) {
      const staff: Staff = this.staffForm.value;
      if (this.isEdit) {
        const index = this.staffMembers.findIndex(s => s === this.selectedStaff);
        this.staffMembers[index] = staff;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Staff updated successfully' });
      } else {
        this.staffMembers.push(staff);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Staff added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editStaff(staff: Staff): void {
    this.isEdit = true;
    this.selectedStaff = staff;
    this.staffForm.patchValue(staff);
    this.formDialog = true;
  }

  deleteStaff(staff: Staff): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this staff?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.staffMembers = this.staffMembers.filter(s => s !== staff);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Staff deleted successfully' });
      }
    });
  }

  onImageUpload(event: any): void {
    const file = event.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.staffForm.patchValue({ imageFile: reader.result as string });
    };
    reader.readAsDataURL(file);
  }
}
