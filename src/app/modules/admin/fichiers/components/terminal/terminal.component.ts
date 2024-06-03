import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Terminal {
  name: string;
  location: string;
}

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class TerminalComponent implements OnInit {
  terminals: Terminal[] = [];
  terminalForm: FormGroup;
  formDialog: boolean = false;
  selectedTerminal: Terminal;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.terminalForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });

    // Example data
    this.terminals = [
      { name: 'Terminal A', location: 'Location A' },
      { name: 'Terminal B', location: 'Location B' }
    ];
  }

  openFormDialog(): void {
    this.isEdit = false;
    this.terminalForm.reset();
    this.formDialog = true;
  }

  hideFormDialog(): void {
    this.formDialog = false;
  }

  saveTerminal(): void {
    if (this.terminalForm.valid) {
      const terminal: Terminal = this.terminalForm.value;
      if (this.isEdit) {
        const index = this.terminals.findIndex(t => t === this.selectedTerminal);
        this.terminals[index] = terminal;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Terminal updated successfully' });
      } else {
        this.terminals.push(terminal);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Terminal added successfully' });
      }
      this.hideFormDialog();
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  editTerminal(terminal: Terminal): void {
    this.isEdit = true;
    this.selectedTerminal = terminal;
    this.terminalForm.patchValue(terminal);
    this.formDialog = true;
  }

  deleteTerminal(terminal: Terminal): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this terminal?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.terminals = this.terminals.filter(t => t !== terminal);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Terminal deleted successfully' });
      }
    });
  }
}
