import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  
  private translations: { [key: string]: string } = {
    'wizard': 'bruxo',
    'magic': 'magia',
    'magical': 'mágico',
    'school': 'escola',
    'adventure': 'aventura',
    'young': 'jovem',
    'boy': 'menino',
    'discovers': 'descobre',
    'world': 'mundo',
    'friends': 'amigos',
    'evil': 'mal',
    'dark': 'sombrio',
    'mystery': 'mistério',
    'chamber': 'câmara',
    'prisoner': 'prisioneiro',
    'goblet': 'cálice',
    'fire': 'fogo',
    'order': 'ordem',
    'phoenix': 'fênix',
    'prince': 'príncipe',
    'hallows': 'relíquias',
    'death': 'morte',
    'stone': 'pedra',
    'philosopher': 'filosofal',
    'sorcerer': 'feiticeiro'
  };

  private compiledRegexes: Map<string, RegExp> = new Map();

  constructor() {
    this.compileRegexes();
  }

  private compileRegexes(): void {
    Object.keys(this.translations).forEach(english => {
      this.compiledRegexes.set(english, new RegExp(`\\b${this.escapeRegex(english)}\\b`, 'gi'));
    });
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private sanitizeInput(input: string): string {
    return input.replace(/[<>"'&]/g, '');
  }

  translateDescription(description: string): string {
    if (!description || typeof description !== 'string') return '';
    
    const sanitized = this.sanitizeInput(description);
    let translated = sanitized;
    
    this.compiledRegexes.forEach((regex, english) => {
      const portuguese = this.translations[english];
      translated = translated.replace(regex, portuguese);
    });
    
    return translated;
  }
}