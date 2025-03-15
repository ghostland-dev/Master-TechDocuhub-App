
import html2pdf from 'html2pdf.js';
import { Document } from './documentTypes';

interface ExportOptions {
  filename?: string;
  margin?: number;
  pageSize?: string;
  includeHeader?: boolean;
  includeFooter?: boolean;
}

export const exportToPdf = async (
  document: Document,
  options: ExportOptions = {}
): Promise<void> => {
  const {
    filename = `${document.title.replace(/\s+/g, '_')}_v${document.version}.pdf`,
    margin = 10,
    pageSize = 'a4',
    includeHeader = true,
    includeFooter = true
  } = options;

  // Create a temporary container for the document content
  const container = document.createElement('div');
  container.className = 'document-container';
  container.style.padding = '20px';
  container.style.fontFamily = 'Inter, sans-serif';

  // Add header if required
  if (includeHeader) {
    const header = document.createElement('div');
    header.className = 'document-header';
    header.style.borderBottom = '1px solid #eaeaea';
    header.style.marginBottom = '20px';
    header.style.paddingBottom = '10px';

    const title = document.createElement('h1');
    title.textContent = document.title;
    title.style.fontSize = '24px';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '5px';

    const meta = document.createElement('div');
    meta.style.fontSize = '12px';
    meta.style.color = '#666';
    meta.innerHTML = `
      <span>Version: ${document.version}</span> | 
      <span>Dernière mise à jour: ${document.updatedAt.toLocaleDateString()}</span> | 
      <span>Auteur: ${document.author}</span>
    `;

    header.appendChild(title);
    header.appendChild(meta);
    container.appendChild(header);
  }

  // Add document content
  const content = document.createElement('div');
  content.className = 'document-content';
  content.innerHTML = document.content;
  container.appendChild(content);

  // Add footer if required
  if (includeFooter) {
    const footer = document.createElement('div');
    footer.className = 'document-footer';
    footer.style.borderTop = '1px solid #eaeaea';
    footer.style.marginTop = '20px';
    footer.style.paddingTop = '10px';
    footer.style.fontSize = '10px';
    footer.style.color = '#666';
    footer.style.textAlign = 'center';
    footer.innerHTML = `Document généré le ${new Date().toLocaleDateString()} à ${new Date().toLocaleTimeString()}`;
    
    container.appendChild(footer);
  }

  // Configure html2pdf options
  const opt = {
    margin: margin,
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: pageSize, orientation: 'portrait' }
  };

  try {
    // Add container to document temporarily
    document.body.appendChild(container);
    
    // Generate PDF
    await html2pdf().set(opt).from(container).save();
    
    // Remove temporary container
    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Ensure container is removed even if there's an error
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
    
    throw new Error('Failed to generate PDF document');
  }
};
