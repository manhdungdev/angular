import {
  AfterContentInit,
  afterNextRender,
  afterRender,
  Component,
  ContentChild,
  ElementRef,
  input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onClick()'
  }
})
export class ControlComponent implements OnInit, AfterContentInit {
  constructor() {
    // afterRender(() => {
    //   console.log('AFTER RENDER')
    // })
    //
    // afterNextRender(() => {
    //   console.log('AFTER NEXT RENDER')
    // })
  }

  label = input.required<string>()
  @ContentChild('input') private inputElement?: ElementRef<HTMLInputElement | HTMLTextAreaElement>

  // private inputElement = contentChild<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input')

  ngAfterContentInit(): void {
    console.log('AFTER CONTENT INIT')
    console.log('value', this.inputElement)
  }

  ngOnInit(): void {
    console.log('ON INIT')
    console.log('value', this.inputElement)
  }

  onClick() {
    console.log('value', this.inputElement)
  }
}
