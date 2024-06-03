import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Schedule {
  busId: number;
  routeId: number;
  departureTime: Date;
  arrivalTime: Date;
  driverId?: number;
  conductorId?: number;
}

interface DropdownOption {
  label: string;
  value: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule[] = [];
  scheduleForm: FormGroup;
  formDialog: boolean = false;
  selectedSchedule: Schedule;
  isEdit: boolean = false;

  buses: DropdownOption[] = [];
  routes: DropdownOption[] = [];
  drivers: DropdownOption[] = [];
  conductors: DropdownOption[] = [];

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.scheduleForm = this.fb.group({
      busId: [null, Validators.required],
      routeId: [null, Validators.required],
      departureTime: [null, Validators.required],
      arrivalTime: [null, Validators.required],
      driverId: [null],
      conductorId: [null]
    });

    // Example data
    this.schedules = [
      { busId: 1, routeId: 1, departureTime: new Date(), arrivalTime: new Date(), driverId: 1, conductorId: 1 },
      { busId: 2, routeId: 2, departureTime: new Date(), arrivalTime: new Date(), driverId: 2, conductorId: 2 }
    ];

    this.buses = [
      { label: 'Bus 1', value: 1 },
      { label: 'Bus 2', value: 2 }
    ];

    this.routes = [
      { label: 'Route 1', value: 1 },
      { label: 'Route 2', value: 2 }
    ];

    this.drivers = [
      { label: 'Driver 1', value: 1 },
      { label: 'Driver 2', value: 2 }
    ];

    this.conductors = [
      { label: 'Conductor 1', value: 1 },
      { label: 'Conductor 2', value: 2 }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.scheduleForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveSchedule(): void {
    if (this.scheduleForm.valid) {
      const schedule: Schedule = this.scheduleForm.value;
      if (this.isEdit) {
        const index = this.schedules.findIndex(s => s === this.selectedSchedule);
        this.schedules[index] = schedule;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Schedule updated successfully' });
      } else {
        this.schedules.push(schedule);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Schedule added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editSchedule(schedule: Schedule): void {
    this.isEdit = true;
    this.selectedSchedule = schedule;
    this.scheduleForm.patchValue(schedule);
    this.formDialog = true;
  }

  deleteSchedule(schedule: Schedule): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this schedule?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.schedules = this.schedules.filter(s => s !== schedule);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Schedule deleted successfully' });
      }
    });
  }
}
