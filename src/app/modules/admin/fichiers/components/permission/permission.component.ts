import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Permission {
  permissionName: string;
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class PermissionComponent {
  permissions: Permission[] = [];
  permissionForm: FormGroup;
  formDialog: boolean = false;
  selectedPermission: Permission;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.permissionForm = this.fb.group({
      permissionName: ['', Validators.required]
    });
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.permissionForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  savePermission(): void {
    if (this.permissionForm.valid) {
      const permission: Permission = this.permissionForm.value;
      if (this.isEdit) {
        const index = this.permissions.findIndex(p => p === this.selectedPermission);
        this.permissions[index] = permission;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Permission updated successfully' });
      } else {
        this.permissions.push(permission);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Permission added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editPermission(permission: Permission): void {
    this.isEdit = true;
    this.selectedPermission = permission;
    this.permissionForm.patchValue(permission);
    this.formDialog = true;
  }

  deletePermission(permission: Permission): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this permission?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.permissions = this.permissions.filter(p => p !== permission);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Permission deleted successfully' });
      }
    });
  }
}
