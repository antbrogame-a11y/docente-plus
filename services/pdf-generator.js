import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 * Generate HTML template for PDP/BES report
 * @param {Object} reportData - Report data
 * @param {Object} studentData - Student data
 * @returns {string} HTML string
 */
const generateReportHTML = (reportData, studentData) => {
  const reportTypeLabel = reportData.report_type === 'PDP' ? 
    'Piano Didattico Personalizzato (PDP)' : 
    'Piano Educativo Individualizzato (BES)';

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.6;
          color: #000;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #000;
          padding-bottom: 20px;
        }
        .header h1 {
          font-size: 18pt;
          margin-bottom: 10px;
          text-transform: uppercase;
        }
        .header p {
          font-size: 11pt;
          color: #333;
        }
        .section {
          margin-bottom: 25px;
          page-break-inside: avoid;
        }
        .section-title {
          font-size: 14pt;
          font-weight: bold;
          color: #000;
          border-bottom: 1px solid #666;
          margin-bottom: 10px;
          padding-bottom: 5px;
        }
        .field {
          margin-bottom: 15px;
        }
        .field-label {
          font-weight: bold;
          margin-bottom: 5px;
          color: #000;
        }
        .field-value {
          padding: 10px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          border-radius: 4px;
          white-space: pre-wrap;
          min-height: 50px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        .info-item {
          padding: 8px;
          border: 1px solid #ccc;
        }
        .info-item strong {
          display: block;
          margin-bottom: 5px;
        }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #666;
          font-size: 10pt;
          text-align: center;
          color: #666;
        }
        .signature-section {
          margin-top: 50px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .signature-box {
          text-align: center;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 60px;
          padding-top: 5px;
        }
        @media print {
          body {
            padding: 20px;
          }
          .section {
            page-break-inside: avoid;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${reportTypeLabel}</h1>
        <p>Anno Scolastico ${reportData.school_year || '_________'}</p>
      </div>

      <div class="section">
        <div class="section-title">Dati Studente</div>
        <div class="info-grid">
          <div class="info-item">
            <strong>Nome e Cognome:</strong>
            ${studentData.name || 'N/D'}
          </div>
          <div class="info-item">
            <strong>Classe:</strong>
            ${studentData.class_name || 'N/D'}
          </div>
        </div>
      </div>

      ${reportData.diagnosis ? `
      <div class="section">
        <div class="section-title">Diagnosi/Certificazione</div>
        <div class="field">
          <div class="field-value">${reportData.diagnosis}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.strengths ? `
      <div class="section">
        <div class="section-title">Punti di Forza</div>
        <div class="field">
          <div class="field-value">${reportData.strengths}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.difficulties ? `
      <div class="section">
        <div class="section-title">Difficoltà Riscontrate</div>
        <div class="field">
          <div class="field-value">${reportData.difficulties}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.teaching_strategies ? `
      <div class="section">
        <div class="section-title">Strategie Didattiche</div>
        <div class="field">
          <div class="field-value">${reportData.teaching_strategies}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.evaluation_tools ? `
      <div class="section">
        <div class="section-title">Strumenti di Valutazione</div>
        <div class="field">
          <div class="field-value">${reportData.evaluation_tools}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.objectives ? `
      <div class="section">
        <div class="section-title">Obiettivi Didattici</div>
        <div class="field">
          <div class="field-value">${reportData.objectives}</div>
        </div>
      </div>
      ` : ''}

      ${reportData.notes ? `
      <div class="section">
        <div class="section-title">Note Aggiuntive</div>
        <div class="field">
          <div class="field-value">${reportData.notes}</div>
        </div>
      </div>
      ` : ''}

      <div class="signature-section">
        <div class="signature-box">
          <div class="signature-line">
            Firma del Docente
          </div>
        </div>
        <div class="signature-box">
          <div class="signature-line">
            Firma del Genitore/Tutore
          </div>
        </div>
      </div>

      <div class="footer">
        <p>Documento generato da Docente Plus - ${new Date().toLocaleDateString('it-IT')}</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Generate PDF from report data
 * @param {Object} reportData - Report data
 * @param {Object} studentData - Student data with class info
 * @returns {Promise<string>} Path to the generated PDF
 */
export const generateReportPDF = async (reportData, studentData) => {
  try {
    const html = generateReportHTML(reportData, studentData);
    
    // Create PDF
    const { uri } = await Print.printToFileAsync({ html });
    
    // Create a permanent location for the PDF
    const timestamp = new Date().getTime();
    const studentName = studentData.name.replace(/\s+/g, '_');
    const filename = `${reportData.report_type}_${studentName}_${reportData.school_year}_${timestamp}.pdf`;
    const permanentPath = `${FileSystem.documentDirectory}reports/${filename}`;
    
    // Ensure reports directory exists
    const reportsDir = `${FileSystem.documentDirectory}reports/`;
    const dirInfo = await FileSystem.getInfoAsync(reportsDir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(reportsDir, { intermediates: true });
    }
    
    // Move PDF to permanent location
    await FileSystem.moveAsync({
      from: uri,
      to: permanentPath
    });
    
    return permanentPath;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Share/export a PDF report
 * @param {string} pdfPath - Path to the PDF file
 * @returns {Promise<void>}
 */
export const shareReportPDF = async (pdfPath) => {
  try {
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(pdfPath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Esporta Report PDP/BES'
      });
    } else {
      throw new Error('Sharing non disponibile su questo dispositivo');
    }
  } catch (error) {
    console.error('Error sharing PDF:', error);
    throw error;
  }
};

/**
 * Preview PDF (open in system viewer)
 * @param {string} pdfPath - Path to the PDF file
 * @returns {Promise<void>}
 */
export const previewReportPDF = async (pdfPath) => {
  try {
    const { uri } = await Print.printAsync({
      uri: pdfPath
    });
    return uri;
  } catch (error) {
    console.error('Error previewing PDF:', error);
    throw error;
  }
};
