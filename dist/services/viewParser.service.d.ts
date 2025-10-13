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
declare class ViewParserService {
    private viewsDir;
    private partialsDir;
    constructor();
    /**
     * Parse une vue Handlebars et retourne les données structurées en JSON
     */
    parseView(viewPath: string, pageData: any): Promise<PageData>;
    /**
     * Extrait les assets CSS et JS du layout
     */
    private extractAssets;
    /**
     * Parse les sections d'une vue Handlebars
     */
    private parseSections;
    /**
     * Parse le contenu d'une section
     */
    private parseSectionContent;
    /**
     * Nettoie le contenu HTML pour ne garder que le texte
     */
    private cleanHtmlContent;
    /**
     * Parse un partial Handlebars
     */
    private parsePartial;
    /**
     * Détermine le type de section basé sur la classe CSS
     */
    private getSectionType;
    /**
     * Extrait les items d'une liste
     */
    private extractItems;
    /**
     * Extrait les images d'une section
     */
    private extractImages;
}
declare const _default: ViewParserService;
export default _default;
