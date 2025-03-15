
import { Document } from '@/utils/documentTypes';
import html2pdf from 'html2pdf.js';

/**
 * Exports a document to PDF
 * @param document The document to export
 * @returns Promise that resolves when the PDF is generated
 */
export const exportToPdf = async (document: Document): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary DOM structure for the PDF content
      const container = window.document.createElement('div');
      container.className = 'pdf-document';
      container.style.padding = '40px';
      container.style.maxWidth = '800px';
      container.style.margin = '0 auto';
      container.style.fontFamily = 'system-ui, -apple-system, sans-serif';
      
      // Header
      const header = window.document.createElement('div');
      header.style.marginBottom = '30px';
      
      const title = window.document.createElement('h1');
      title.textContent = document.title;
      title.style.fontSize = '28px';
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '10px';
      header.appendChild(title);
      
      const meta = window.document.createElement('div');
      meta.style.fontSize = '14px';
      meta.style.color = '#666';
      meta.style.display = 'flex';
      meta.style.flexWrap = 'wrap';
      meta.style.gap = '15px';
      
      const type = window.document.createElement('span');
      type.textContent = `Type: ${
        document.type === 'cdc' ? 'Cahier des charges' : 
        document.type === 'dst' ? 'Dossier de spécifications' : 
        document.type === 'test-case' ? 'Cahier de recettes' : 
        'Rapport de sprint'
      }`;
      meta.appendChild(type);
      
      const version = window.document.createElement('span');
      version.textContent = `Version: ${document.version}`;
      meta.appendChild(version);
      
      const author = window.document.createElement('span');
      author.textContent = `Auteur: ${document.author}`;
      meta.appendChild(author);
      
      const date = window.document.createElement('span');
      date.textContent = `Dernière modification: ${document.updatedAt.toLocaleDateString()}`;
      meta.appendChild(date);
      
      header.appendChild(meta);
      container.appendChild(header);
      
      // Content
      const content = window.document.createElement('div');
      content.innerHTML = document.content.replace(/\n/g, '<br>');
      container.appendChild(content);
      
      // Add to document body temporarily
      window.document.body.appendChild(container);
      
      // Generate PDF
      const pdfOptions = {
        margin: [15, 15, 15, 15],
        filename: `${document.title.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf()
        .set(pdfOptions)
        .from(container)
        .save()
        .then(() => {
          window.document.body.removeChild(container);
          resolve();
        })
        .catch((error) => {
          window.document.body.removeChild(container);
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};
