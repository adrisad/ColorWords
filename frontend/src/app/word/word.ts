import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-word',
  imports: [],
  templateUrl: './word.html',
  styleUrl: './word.css'
})
export class Word {
  @Input() palabra!: string;
}
