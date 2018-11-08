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
      this.morpher.set(this.morpherWeights, 1000)
    }
  }
}
