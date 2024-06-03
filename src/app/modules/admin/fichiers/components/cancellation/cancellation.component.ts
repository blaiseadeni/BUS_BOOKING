import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cancellation',
  templateUrl: './cancellation.component.html',
  styleUrls: ['./cancellation.component.scss'],
  providers: [MessageService]
})
export class CancellationComponent implements OnInit {
  cancellations: any[] = [];
  bookings: any[] = [];
  cancellationForm: FormGroup;
  formDialog: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.cancellationForm = this.fb.group({
      bookingId: ['', Validators.required],
      cancellationDate: ['', Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Replace this with the actual service call to get bookings
    this.bookings = [
      { id: 1, name: 'Booking 1' },
      { id: 2, name: 'Booking 2' },
      { id: 3, name: 'Booking 3' }
    ];
  }

  openFormDialog() {
    this.formDialog = true;
  }

  hideFormDialog() {
    this.formDialog = false;
  }

  onSubmitForm() {
    if (this.cancellationForm.valid) {
      this.cancellations.push(this.cancellationForm.value);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cancellation saved successfully' });
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields' });
    }
  }

  editCancellation(cancellation: any, index: number) {
    this.cancellationForm.patchValue(cancellation);
    this.formDialog = true;
  }

  deleteCancellation(index: number) {
    this.cancellations.splice(index, 1);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cancellation deleted successfully' });
  }
}
