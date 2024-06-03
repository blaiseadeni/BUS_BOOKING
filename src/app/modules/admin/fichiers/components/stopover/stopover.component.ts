import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Stopover {
  routeId: number;
  location: string;
  arrivalTime: Date;
  departureTime: Date;
}

interface DropdownOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-stopover',
  templateUrl: './stopover.component.html',
  styleUrls: ['./stopover.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class StopoverComponent implements OnInit {
  stopovers: Stopover[] = [];
  stopoverForm: FormGroup;
  formDialog: boolean = false;
  selectedStopover: Stopover;
  isEdit: boolean = false;

  routes: DropdownOption[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.stopoverForm = this.fb.group({
      routeId: [null, Validators.required],
      location: ['', Validators.required],
      arrivalTime: ['', Validators.required],
      departureTime: ['', Validators.required]
    });

    // Example data
    this.stopovers = [
      { routeId: 1, location: 'Location A', arrivalTime: new Date(), departureTime: new Date() },
      { routeId: 2, location: 'Location B', arrivalTime: new Date(), departureTime: new Date() }
    ];

    this.routes = [
      { label: 'Route 1', value: 1 },
      { label: 'Route 2', value: 2 }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.stopoverForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveStopover(): void {
    if (this.stopoverForm.valid) {
      const stopover: Stopover = this.stopoverForm.value;
      if (this.isEdit) {
        const index = this.stopovers.findIndex(s => s === this.selectedStopover);
        this.stopovers[index] = stopover;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Stopover updated successfully' });
      } else {
        this.stopovers.push(stopover);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Stopover added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editStopover(stopover: Stopover): void {
    this.isEdit = true;
    this.selectedStopover = stopover;
    this.stopoverForm.patchValue(stopover);
    this.formDialog = true;
  }

  deleteStopover(stopover: Stopover): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this stopover?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.stopovers = this.stopovers.filter(s => s !== stopover);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Stopover deleted successfully' });
      }
    });
  }
}
