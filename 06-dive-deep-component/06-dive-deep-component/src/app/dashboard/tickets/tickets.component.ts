import {Component} from '@angular/core';
import {NewTicketComponent} from "./new-ticket/new-ticket.component";
import {Ticket} from "./ticket/ticket.model";
import {TicketComponent} from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    NewTicketComponent,
    TicketComponent
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = []

  onAdd(data: { title: string, request: string }) {
    this.tickets.push({
      id: Math.random().toString(),
      title: data.title,
      request: data.request,
      status: 'open'
    })
  }

  onCloseTicket(id: string) {
    this.tickets = this.tickets.map(ticket => {
      if (ticket.id === id) {
        return {...ticket, status: 'closed'}
      }
      return ticket
    })
  }
}
