import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Role {
  roleName: string;
}

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RoleComponent implements OnInit {
 
  roles: any[] = [];
  permissions: any[] = [];
  formDialog: boolean = false;
  roleForm: FormGroup;
  currentRoleIndex: number | null = null;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.roleForm = this.fb.group({
      roleName: ['', Validators.required]
    });
    this.loadPermissions();
  }
  ngOnInit(): void {
  }

  loadPermissions() {
    // Replace this with a real API call to get the list of permissions
    this.permissions = [
      { name: 'Create User', authorized: true },
      { name: 'Edit User', authorized: false },
      { name: 'Delete User', authorized: false },
      { name: 'View Reports', authorized: false },
      // Add more permissions as needed
    ];
  }

  openFormDialog() {
    this.formDialog = true;
    this.currentRoleIndex = null;
    this.roleForm.reset();
    this.loadPermissions();
  }

  hideFormDialog() {
    this.formDialog = false;
    this.roleForm.reset();
  }

  saveRole() {
    if (this.roleForm.valid) {
      const newRole = {
        roleName: this.roleForm.value.roleName,
        permissions: this.permissions.filter(permission => permission.authorized)
      };

      if (this.currentRoleIndex !== null) {
        this.roles[this.currentRoleIndex] = newRole;
      } else {
        this.roles.push(newRole);
      }

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role saved successfully' });
      this.hideFormDialog();
    }
  }

  editRole(role: any) {
    this.formDialog = true;
    this.currentRoleIndex = this.roles.indexOf(role);
    this.roleForm.patchValue({ roleName: role.roleName });
    this.permissions.forEach(permission => {
      permission.authorized = role.permissions.some((p: any) => p.name === permission.name);
    });
  }

  deleteRole(role: any) {
    this.roles.splice(this.roles.indexOf(role), 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role deleted successfully' });
  }
}
