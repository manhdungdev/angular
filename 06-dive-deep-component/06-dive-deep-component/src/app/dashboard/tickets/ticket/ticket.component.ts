import {Component, input, output, signal} from '@angular/core';
import {Ticket} from "./ticket.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data = input.required<Ticket>()
  isVisible = signal(false)
  close = output()

  onToggleVisible = () => {
    // this.isVisible.set(!this.isVisible())
    this.isVisible.update(old => !old)
  }

  onMarkAsComplete() {
    this.close.emit()
  }
}
