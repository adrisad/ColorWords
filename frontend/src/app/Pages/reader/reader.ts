import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type LevelKey = 'nueva' | 'aprendido' | 'conocida' | 'maestria';

@Component({
  selector: 'app-reader',
  imports: [CommonModule],
  templateUrl: './reader.html',
  styleUrl: './reader.css'
})
export class Reader {
  text = `I wake up at six and make coffee. Then I read an article in English to practice vocabulary.`;

  // Tokens (palabras y separadores) para mantener espacios y signos
  tokens: string[] = [];
  // Estado por índice de token (solo se asigna a tokens que son "palabras")
  levels: Record<number, LevelKey> = {};

  // Orden de ciclo al hacer click
  cycleOrder: LevelKey[] = ['nueva', 'aprendido', 'conocida', 'maestria'];

  // Regex simple para detectar "palabra". Ajusta si quieres soportar apóstrofes, acentos, etc.
  private wordRe = /^[A-Za-z]+(-[A-Za-z]+)*$/;

  constructor() {
    this.tokens = this.splitText(this.text);
  }

  splitText(t: string): string[] {
    // divide conservando separadores (espacios, puntuación)
    return t.split(/(\s+|[.,!?;:()'"“”‘’\-]+)/).filter(part => part !== '');
  }
  get wordCount(): number {
    return this.tokens.filter(t => this.isWord(t)).length;
  }
   get markedCount(): number {
    // Si levels es un objeto:
    return Object.keys(this.levels).length;
    // Si fuera Map:
    // return this.levels.size;
  }

  isWord(token: string): boolean {
    return this.wordRe.test(token);
  }

  cycleLevel(i: number) {
    if (!this.isWord(this.tokens[i])) return;

    const current = this.levels[i];
    if (!current) {
      this.levels[i] = 'nueva';
      return;
    }
    const idx = this.cycleOrder.indexOf(current);
    const next = this.cycleOrder[(idx + 1) % this.cycleOrder.length];
    this.levels[i] = next;
  }

  levelClass(i: number): string {
    const lvl = this.levels[i];
    if (!lvl) return ''; // sin estilo si aún no tiene nivel

    // Subrayado con grosor y separación
    const base = 'underline decoration-4 underline-offset-4';
    switch (lvl) {
      case 'nueva':      return `${base} decoration-blue-500`;
      case 'aprendido':  return `${base} decoration-amber-400`;
      case 'conocida':   return `${base} decoration-green-500`;
      case 'maestria':   return `${base} decoration-stone-700`;
      default:           return '';
    }
  }
}
