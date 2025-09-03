import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'temp',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {
  transform(value: string | number | null, input: 'cel' | 'fah', output?: 'cel' | 'fah'): any {
    if (!value) {
      return value
    }

    let temp: number
    if (typeof value === 'string') {
      temp = parseFloat(value)
    } else {
      temp = value
    }

    let outputTemp: number
    if (input === 'cel' && output === 'fah') {
      outputTemp = temp * (9 / 5) + 32
    } else if (input === 'fah' && output === 'cel') {
      outputTemp = (temp - 32) * (5 / 9)
    } else {
      outputTemp = temp
    }

    let symbol: string
    if (output) {
      symbol = output === 'cel' ? 'C' : 'F'
    } else {
      symbol = input === 'cel' ? 'C' : 'F'
    }
    return `${outputTemp.toFixed(2)} ${symbol}`
  }
}
