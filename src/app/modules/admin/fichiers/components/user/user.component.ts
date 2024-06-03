import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface User {
  username: string;
  passwordHash: string;
  isActive: boolean;
  staffId: number;
  roleId: number;
}

interface Staff {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  formDialog: boolean = false;
  selectedUser: User;
  isEdit: boolean = false;
  staffList: Staff[] = [];
  roleList: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      passwordHash: ['', Validators.required],
      isActive: [false],
      staffId: [null, Validators.required],
      roleId: [null, Validators.required]
    });

    // Example data
    this.users = [
      { username: 'johndoe', passwordHash: 'hash1', isActive: true, staffId: 1, roleId: 1 },
      { username: 'janedoe', passwordHash: 'hash2', isActive: false, staffId: 2, roleId: 2 }
    ];

    this.staffList = [
      { id: 1, name: 'Staff A' },
      { id: 2, name: 'Staff B' }
    ];

    this.roleList = [
      { id: 1, name: 'Admin' },
      { id: 2, name: 'User' }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.userForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveUser(): void {
    if (this.userForm.valid) {
      const user: User = this.userForm.value;
      if (this.isEdit) {
        const index = this.users.findIndex(u => u === this.selectedUser);
        this.users[index] = user;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully' });
      } else {
        this.users.push(user);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editUser(user: User): void {
    this.isEdit = true;
    this.selectedUser = user;
    this.userForm.patchValue(user);
    this.formDialog = true;
  }

  deleteUser(user: User): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this user?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.users = this.users.filter(u => u !== user);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User deleted successfully' });
      }
    });
  }
}
