import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, viewChild, ViewChild} from '@angular/core';
import {ControlComponent} from "../../../shared/control/control.component";
import {ButtonComponent} from "../../../shared/button/button.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ControlComponent,
    ButtonComponent,
    FormsModule
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent implements OnInit, AfterViewInit {
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form')
  @Output() add = new EventEmitter<{ title: string, request: string }>()

  onSubmit(title: string, request: string) {
    this.add.emit({
      title, request
    })
    this.form?.nativeElement.reset()
  }

  ngAfterViewInit(): void {
    console.log('AFTER VIEW INIT')
    console.log('value', this.form)
  }

  ngOnInit(): void {
    console.log('ON INIT')
    console.log('value', this.form)
  }
}
