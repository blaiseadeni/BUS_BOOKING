import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-bus',
  templateUrl: './bus.component.html',
  styleUrls: ['./bus.component.scss'],
  providers: [MessageService]
})
export class BusComponent implements OnInit {
  buses: any[] = [];
  agencies: any[] = [];
  busForm: FormGroup;
  formDialog: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.busForm = this.fb.group({
      agencyId: ['', Validators.required],
      busNumber: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      make: ['', Validators.required],
      model: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Replace this with the actual service call to get agencies
    this.agencies = [
      { id: 1, name: 'Agency 1' },
      { id: 2, name: 'Agency 2' },
      { id: 3, name: 'Agency 3' }
    ];
  }

  openFormDialog() {
    this.formDialog = true;
  }

  hideFormDialog() {
    this.formDialog = false;
  }

  onSubmitForm() {
    if (this.busForm.valid) {
      this.buses.push(this.busForm.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bus saved successfully' });
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
    }
  }

  editBus(bus: any, index: number) {
    this.busForm.patchValue(bus);
    this.formDialog = true;
  }

  deleteBus(index: number) {
    this.buses.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bus deleted successfully' });
  }
}
