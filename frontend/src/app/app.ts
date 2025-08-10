import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Reader } from './Pages/reader/reader';

@Component({
  selector: 'app-root',
  imports: [Reader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
