import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Character } from '../character';
import { calcMorpherWeights } from '../lib';
import { morpherConfig } from '../morpher-config';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.styl']
})
export class ResultComponent implements OnInit, AfterViewInit,
    OnChanges
{
  @Input() characters: Character[]

  @ViewChild('canvas') canvas: ElementRef

  constructor() { }

  // Morpher instance
  morpher
  morpherWeights = []

  ngOnInit() {
    morpherConfig.images.forEach(i => {
      i.src = `assets/images/${i.src}`
    })
    this.morpher = new window['Morpher'](morpherConfig)
  }

  ngAfterViewInit() {
    this.morpher.setCanvas(this.canvas.nativeElement)
    this.morpher.set(this.morpherWeights, 1000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.characters.currentValue) {
      this.morpherWeights = calcMorpherWeights(
        changes.characters.currentValue,
        morpherConfig.images)
      let mw1 = this.calcWeightsForAnimation(this.morpherWeights, 0)
      let mw2 = this.calcWeightsForAnimation(this.morpherWeights, 1)
      let morphArray = [mw1, mw2, mw1, mw2, this.morpherWeights]

      this.morpher.set(mw1)

      setTimeout(() => {
        this.morpher.animate(mw2, 300)
        let interval
        let setNext = () => {
          this.morpher.animate(morphArray.shift(), 300)
          if (morphArray.length === 0) {
            clearInterval(interval)
          }
        }
        interval = setInterval(setNext, 300)
        }, 1000)
    }
  }

  calcWeightsForAnimation(weights: number[], index: number) {
    let rv = weights.slice()
    return rv.map(v => {
      if (v > 0) {
        if (index === 0) {
          index--
          return 1
        }
        index--
      }
      return 0
    })
  }
}
