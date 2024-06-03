import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Route {
  agencyId: number;
  originTerminalId: number;
  destinationTerminalId: number;
  amount: number;
}

interface DropdownOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class RouteComponent implements OnInit {
  routes: Route[] = [];
  routeForm: FormGroup;
  formDialog: boolean = false;
  selectedRoute: Route;
  isEdit: boolean = false;

  agencies: DropdownOption[] = [];
  terminals: DropdownOption[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.routeForm = this.fb.group({
      agencyId: [null, Validators.required],
      originTerminalId: [null, Validators.required],
      destinationTerminalId: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]]
    });

    // Example data
    this.routes = [
      { agencyId: 1, originTerminalId: 1, destinationTerminalId: 2, amount: 10.0 },
      { agencyId: 2, originTerminalId: 2, destinationTerminalId: 3, amount: 15.0 }
    ];

    this.agencies = [
      { label: 'Agency 1', value: 1 },
      { label: 'Agency 2', value: 2 }
    ];

    this.terminals = [
      { label: 'Terminal 1', value: 1 },
      { label: 'Terminal 2', value: 2 },
      { label: 'Terminal 3', value: 3 }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.routeForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveRoute(): void {
    if (this.routeForm.valid) {
      const route: Route = this.routeForm.value;
      if (this.isEdit) {
        const index = this.routes.findIndex(r => r === this.selectedRoute);
        this.routes[index] = route;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Route updated successfully' });
      } else {
        this.routes.push(route);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Route added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editRoute(route: Route): void {
    this.isEdit = true;
    this.selectedRoute = route;
    this.routeForm.patchValue(route);
    this.formDialog = true;
  }

  deleteRoute(route: Route): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this route?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.routes = this.routes.filter(r => r !== route);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Route deleted successfully' });
      }
    });
  }
}
