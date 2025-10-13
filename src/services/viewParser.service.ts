// src/services/viewParser.service.ts
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PageData {
  title: string;
  description: string;
  css: string[];
  js: string[];
  sections: Section[];
}

interface Section {
  type: string;
  heading?: string;
  text?: string;
  items?: string[];
  content?: any;
  className?: string;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}

class ViewParserService {
  private viewsDir: string;
  private partialsDir: string;

  constructor() {
    this.viewsDir = path.join(__dirname, '..', 'views', 'pages');
    this.partialsDir = path.join(__dirname, '..', 'views', 'partials');
  }

  /**
   * Parse une vue Handlebars et retourne les données structurées en JSON
   */
  async parseView(viewPath: string, pageData: any): Promise<PageData> {
    try {
      const fullPath = path.join(this.viewsDir, viewPath);
      const content = fs.readFileSync(fullPath, 'utf-8');
      
      // Extraire les CSS et JS du layout
      const { css, js } = this.extractAssets();
      
      // Parser le contenu de la vue
      const sections = this.parseSections(content);
      
      return {
        title: pageData.title || '',
        description: pageData.description || '',
        css,
        js,
        sections
      };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Erreur lors du parsing de la vue ${viewPath}:`, error instanceof Error ? error.message : 'Erreur inconnue');
      }
      throw error;
    }
  }

  /**
   * Extrait les assets CSS et JS du layout
   */
  private extractAssets(): { css: string[], js: string[] } {
    const headPath = path.join(this.partialsDir, 'head.hbs');
    const scriptsPath = path.join(this.partialsDir, 'scripts.hbs');
    
    const css: string[] = [];
    const js: string[] = [];
    
    try {
      // Parser head.hbs pour les CSS
      if (fs.existsSync(headPath)) {
        const headContent = fs.readFileSync(headPath, 'utf-8');
        const cssMatches = headContent.match(/href="([^"]*\.css[^"]*)"/g);
        if (cssMatches) {
          cssMatches.forEach(match => {
            const href = match.match(/href="([^"]*)"/)?.[1];
            if (href) {
              css.push(href);
            }
          });
        }
      }
      
      // Parser scripts.hbs pour les JS
      if (fs.existsSync(scriptsPath)) {
        const scriptsContent = fs.readFileSync(scriptsPath, 'utf-8');
        const jsMatches = scriptsContent.match(/src="([^"]*\.js[^"]*)"/g);
        if (jsMatches) {
          jsMatches.forEach(match => {
            const src = match.match(/src="([^"]*)"/)?.[1];
            if (src) {
              js.push(src);
            }
          });
        }
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur lors de l\'extraction des assets:', error instanceof Error ? error.message : 'Erreur inconnue');
      }
    }
    
    return { css, js };
  }

  /**
   * Parse les sections d'une vue Handlebars
   */
  private parseSections(content: string): Section[] {
    const sections: Section[] = [];
    
    // Parser les sections principales
    const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/g;
    let match;
    
    while ((match = sectionRegex.exec(content)) !== null) {
      const className = match[1];
      const sectionContent = match[2];
      
      const section = this.parseSectionContent(className, sectionContent);
      if (section) {
        sections.push(section);
      }
    }
    
    // Parser les partials inclus
    const partialRegex = /\{\{>\s*([^}]+)\s*\}\}/g;
    let partialMatch;
    
    while ((partialMatch = partialRegex.exec(content)) !== null) {
      const partialName = partialMatch[1].trim();
      const partialSection = this.parsePartial(partialName);
      if (partialSection) {
        sections.push(partialSection);
      }
    }
    
    return sections;
  }

  /**
   * Parse le contenu d'une section
   */
  private parseSectionContent(className: string, content: string): Section | null {
    const section: Section = {
      type: this.getSectionType(className),
      className
    };
    
    // Extraire le titre principal (nettoyer le HTML)
    const titleMatch = content.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/);
    if (titleMatch) {
      section.heading = this.cleanHtmlContent(titleMatch[1].trim());
    }
    
    // Extraire le texte/paragraphe principal (nettoyer le HTML)
    const textMatch = content.match(/<p[^>]*>([^<]+)<\/p>/);
    if (textMatch) {
      section.text = this.cleanHtmlContent(textMatch[1].trim());
    }
    
    // Extraire les listes d'items
    const items = this.extractItems(content);
    if (items.length > 0) {
      section.items = items;
    }
    
    // Extraire les images
    const images = this.extractImages(content);
    if (images.length > 0) {
      section.content = { images };
    }
    
    return section;
  }

  /**
   * Nettoie le contenu HTML pour ne garder que le texte
   */
  private cleanHtmlContent(html: string): string {
    return html
      .replace(/<[^>]*>/g, '') // Supprime toutes les balises HTML
      .replace(/&nbsp;/g, ' ') // Remplace &nbsp; par un espace
      .replace(/&amp;/g, '&') // Remplace &amp; par &
      .replace(/&lt;/g, '<') // Remplace &lt; par <
      .replace(/&gt;/g, '>') // Remplace &gt; par >
      .replace(/&quot;/g, '"') // Remplace &quot; par "
      .replace(/&#39;/g, "'") // Remplace &#39; par '
      .trim();
  }

  /**
   * Parse un partial Handlebars
   */
  private parsePartial(partialName: string): Section | null {
    try {
      const partialPath = path.join(this.partialsDir, `${partialName}.hbs`);
      if (!fs.existsSync(partialPath)) {
        return null;
      }
      
      const content = fs.readFileSync(partialPath, 'utf-8');
      const sectionRegex = /<section[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/section>/;
      const match = content.match(sectionRegex);
      
      if (match) {
        const className = match[1];
        const sectionContent = match[2];
        return this.parseSectionContent(className, sectionContent);
      }
      
      return null;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`Erreur lors du parsing du partial ${partialName}:`, error instanceof Error ? error.message : 'Erreur inconnue');
      }
      return null;
    }
  }

  /**
   * Détermine le type de section basé sur la classe CSS
   */
  private getSectionType(className: string): string {
    if (className.includes('hero')) return 'hero';
    if (className.includes('features')) return 'features';
    if (className.includes('security')) return 'security';
    if (className.includes('about')) return 'about';
    if (className.includes('team')) return 'team';
    if (className.includes('stats')) return 'stats';
    if (className.includes('impact')) return 'impact';
    if (className.includes('contact')) return 'contact';
    if (className.includes('page-header')) return 'page-header';
    if (className.includes('mission-vision')) return 'mission-vision';
    if (className.includes('values')) return 'values';
    return 'content';
  }

  /**
   * Extrait les items d'une liste
   */
  private extractItems(content: string): string[] {
    const items: string[] = [];
    
    // Parser les listes <ul>
    const ulMatches = content.match(/<ul[^>]*>([\s\S]*?)<\/ul>/g);
    if (ulMatches) {
      ulMatches.forEach(ul => {
        const liMatches = ul.match(/<li[^>]*>([\s\S]*?)<\/li>/g);
        if (liMatches) {
          liMatches.forEach(li => {
            const text = this.cleanHtmlContent(li);
            if (text) items.push(text);
          });
        }
      });
    }
    
    // Parser les divs avec des items (comme les features)
    const itemMatches = content.match(/<div[^>]*class="[^"]*item[^"]*"[^>]*>([\s\S]*?)<\/div>/g);
    if (itemMatches) {
      itemMatches.forEach(item => {
        const textMatch = item.match(/<h[3-6][^>]*>([\s\S]*?)<\/h[3-6]>/);
        if (textMatch) {
          const cleanText = this.cleanHtmlContent(textMatch[1]);
          if (cleanText) items.push(cleanText);
        }
      });
    }
    
    return items;
  }

  /**
   * Extrait les images d'une section
   */
  private extractImages(content: string): any[] {
    const images: any[] = [];
    const imgRegex = /<img[^>]*src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*(?:width="([^"]*)")?[^>]*(?:height="([^"]*)")?[^>]*>/g;
    let match;
    
    while ((match = imgRegex.exec(content)) !== null) {
      images.push({
        src: match[1],
        alt: match[2] || '',
        width: match[3] || '',
        height: match[4] || ''
      });
    }
    
    return images;
  }
}

export default new ViewParserService();

