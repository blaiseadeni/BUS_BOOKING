import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.scss"],
  providers: [MessageService],
})
export class BookingComponent implements OnInit {
  bookings: any[] = []; // Array of booking objects
  customers: any[] = []; // Array of customer objects
  schedules: any[] = []; // Array of schedule objects
  selectedSeats: any[] = []; // Array of schedule objects
  availableSeatNumbers: string[] = [
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
    "1A",
    "1B",
    "1C",
    "1D",
    "2A",
    "2B",
    "2C",
    "2D",
  ]; // Example seat numbers
  seatLayout: any[] = []; // Array of seat objects for layout
  formDialog: boolean = false;
  formConfirmDialog: boolean = false;
  bookingForm: FormGroup;
  bookingConfirmationForm: FormGroup;
  currentBookingIndex: number | null = null;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      customerId: ["", Validators.required],
      scheduleId: ["", Validators.required],
      bookingDate: ["", Validators.required],
      numberOfSeats: [{value: '', disabled: true},[Validators.required, Validators.min(1)]],
      seatNumbers: [[], Validators.required],
    });
    this.bookingConfirmationForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      reason: ["", Validators.required],
      numberOfSeats: [{value: '', disabled: true},[Validators.required, Validators.min(1)]],
    });
    this.initializeSeatLayout();
  }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  initializeSeatLayout() {
    this.seatLayout = this.availableSeatNumbers.map((number) => ({
      number,
      available: Math.random() > 0.2, // 80% chance seat is available
      occupied: Math.random() <= 0.2, // 20% chance seat is occupied
      selected: false,
    }));
  }

  toggleSeatSelection(seat: any) {
    if (seat.available && !seat.occupied) {
      seat.selected = !seat.selected;
      this.selectedSeats = this.seatLayout
        .filter((s) => s.selected)
        .map((s) => s.number);
      this.bookingForm.controls["seatNumbers"].setValue(this.selectedSeats);
      this.bookingForm.controls["numberOfSeats"].setValue(this.selectedSeats.length);
    }
  }

  openFormDialog() {
    this.formDialog = true;
    this.currentBookingIndex = null;
    this.bookingForm.reset();
    this.initializeSeatLayout();
  }

  hideFormDialog() {
    this.formDialog = false;
    this.bookingForm.reset();
    this.initializeSeatLayout();
  }

  openConfirDialog() {
    this.formDialog = false;
    this.formConfirmDialog = true;

  }
  hideConfirDialog() {
    this.formConfirmDialog = false;
  }

  onSubmitForm() {
    if (this.bookingForm.valid) {
      if (this.currentBookingIndex !== null) {
        this.updateBooking(this.currentBookingIndex);
      } else {
        this.saveBooking();
      }
      this.hideFormDialog();
    }
  }

  saveBooking() {
    const newBooking = this.bookingForm.value;
    this.bookings.push(newBooking);
    this.updateSeatAvailability(newBooking.seatNumbers, false);
  }

  updateBooking(index: number) {
    const updatedBooking = this.bookingForm.value;
    const previousBooking = this.bookings[index];

    // Free up the previously selected seats
    this.updateSeatAvailability(previousBooking.seatNumbers, true);

    this.bookings[index] = updatedBooking;

    // Mark the new selected seats as occupied
    this.updateSeatAvailability(updatedBooking.seatNumbers, false);
  }

  deleteBooking(index: number) {
    const booking = this.bookings[index];
    this.bookings.splice(index, 1);
    this.updateSeatAvailability(booking.seatNumbers, true);
  }

  editBooking(booking: any, index: number) {
    this.currentBookingIndex = index;
    this.bookingForm.patchValue(booking);
    this.initializeSeatLayout();

    booking.seatNumbers.forEach((seatNumber: string) => {
      const seat = this.seatLayout.find((s) => s.number === seatNumber);
      if (seat) seat.selected = true;
    });
  }

  updateSeatAvailability(seatNumbers: string[], available: boolean) {
    seatNumbers.forEach((seatNumber) => {
      const seat = this.seatLayout.find((s) => s.number === seatNumber);
      if (seat) seat.available = available;
    });
  }

  confirmReservation() {
    // Logic to confirm the reservation can be added here
    alert('Réservation confirmée pour les sièges : ' + this.selectedSeats.join(', '));
  }
}
