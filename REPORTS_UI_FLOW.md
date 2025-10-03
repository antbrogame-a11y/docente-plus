# Report PDP/BES - UI Flow

Flusso interfaccia utente completo per il modulo di gestione Report PDP/BES.

---

## 📱 Schermata Report - Vista Lista

```
╔════════════════════════════════════════════════════════╗
║  Report PDP/BES                                  [←]  ║
╠════════════════════════════════════════════════════════╣
║  [← Indietro]                    [+ Nuovo Report]     ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  PDP                            2024/2025        │ ║
║  │  Mario Rossi                                     │ ║
║  │  Creato: 15/10/2024                              │ ║
║  │                                                  │ ║
║  │  [✏️ Modifica] [📄 Genera PDF] [📤 Esporta] [🗑️] │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  BES                            2024/2025        │ ║
║  │  Lucia Verdi                                     │ ║
║  │  Creato: 10/10/2024                              │ ║
║  │                                                  │ ║
║  │  [✏️ Modifica] [📄 Genera PDF] [🗑️]              │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  PDP                            2023/2024        │ ║
║  │  Giovanni Bianchi                                │ ║
║  │  Creato: 20/09/2023                              │ ║
║  │                                                  │ ║
║  │  [✏️ Modifica] [📄 Genera PDF] [📤 Esporta] [🗑️] │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 📝 Schermata Report - Form Nuovo/Modifica

```
╔════════════════════════════════════════════════════════╗
║  Nuovo Report                                    [✕]  ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Studente *                                            ║
║  ┌─────┐ ┌──────┐ ┌──────────┐ ┌───────┐ ...        ║
║  │Mario│ │Lucia │ │Giovanni  │ │Sarah  │             ║
║  └─────┘ └──────┘ └──────────┘ └───────┘             ║
║    (selected)                                         ║
║                                                        ║
║  Tipo Report *                                         ║
║  ┌─────────┐ ┌─────────┐                             ║
║  │   PDP   │ │   BES   │                             ║
║  └─────────┘ └─────────┘                             ║
║  (selected)                                           ║
║                                                        ║
║  Anno Scolastico *                                     ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ 2024/2025                                        │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Diagnosi/Certificazione                               ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ DSA - Dislessia certificata con diagnosi         │ ║
║  │ n. 123/2024                                      │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Punti di Forza                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Ottime capacità logico-matematiche, creatività,  │ ║
║  │ pensiero laterale                                │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Difficoltà Riscontrate                                ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Difficoltà nella decodifica, lentezza nella      │ ║
║  │ lettura, errori ortografici                      │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Strategie Didattiche                                  ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Uso di mappe concettuali, sintesi vocale,        │ ║
║  │ tempi aggiuntivi (30%)                           │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Strumenti di Valutazione                              ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Prove orali privilegiate, interrogazioni         │ ║
║  │ programmate, uso PC                              │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Obiettivi Didattici                                   ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Migliorare velocità lettura, ridurre errori      │ ║
║  │ ortografici del 50%                              │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  Note Aggiuntive                                       ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │ Studente molto motivato, collaborazione attiva   │ ║
║  │ con famiglia                                     │ ║
║  │                                                  │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────┐  ┌──────────────────┐          ║
║  │    Annulla       │  │      Salva       │          ║
║  └──────────────────┘  └──────────────────┘          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 📄 Anteprima PDF Generato

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│              PIANO DIDATTICO PERSONALIZZATO            │
│                   Anno Scolastico 2024/2025            │
│                                                        │
├────────────────────────────────────────────────────────┤
│                                                        │
│  DATI STUDENTE                                         │
│  ┌──────────────────────┐  ┌──────────────────────┐  │
│  │ Nome e Cognome:      │  │ Classe:              │  │
│  │ Mario Rossi          │  │ 3A                   │  │
│  └──────────────────────┘  └──────────────────────┘  │
│                                                        │
│  DIAGNOSI/CERTIFICAZIONE                               │
│  ┌──────────────────────────────────────────────────┐ │
│  │ DSA - Dislessia certificata con diagnosi         │ │
│  │ n. 123/2024                                      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  PUNTI DI FORZA                                        │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Ottime capacità logico-matematiche, creatività,  │ │
│  │ pensiero laterale                                │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  DIFFICOLTÀ RISCONTRATE                                │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Difficoltà nella decodifica, lentezza nella      │ │
│  │ lettura, errori ortografici                      │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  STRATEGIE DIDATTICHE                                  │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Uso di mappe concettuali, sintesi vocale,        │ │
│  │ tempi aggiuntivi (30%)                           │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  STRUMENTI DI VALUTAZIONE                              │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Prove orali privilegiate, interrogazioni         │ │
│  │ programmate, uso PC                              │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  OBIETTIVI DIDATTICI                                   │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Migliorare velocità lettura, ridurre errori      │ │
│  │ ortografici del 50%                              │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  NOTE AGGIUNTIVE                                       │
│  ┌──────────────────────────────────────────────────┐ │
│  │ Studente molto motivato, collaborazione attiva   │ │
│  │ con famiglia                                     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│                                                        │
│  ___________________          ___________________      │
│  Firma del Docente            Firma del Genitore      │
│                                                        │
├────────────────────────────────────────────────────────┤
│ Documento generato da Docente Plus - 15/10/2024       │
└────────────────────────────────────────────────────────┘
```

---

## 🏠 Schermata Welcome - Aggiornata

```
╔════════════════════════════════════════════════════════╗
║  Benvenuto!                                            ║
╠════════════════════════════════════════════════════════╣
║  docente@esempio.it                                    ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │  ✓ Login completato con successo                │ ║
║  │                                                  │ ║
║  │  Hai effettuato l'accesso alla piattaforma      │ ║
║  │  Docente Plus.                                   │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │               Vai al profilo                     │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │               Le Mie Classi                      │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │            Materiali Didattici                   │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │             Report PDP/BES  ⭐NEW⭐               │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
║  ┌──────────────────────────────────────────────────┐ ║
║  │                  Logout                          │ ║
║  └──────────────────────────────────────────────────┘ ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 🔔 Dialog Genera PDF

```
╔════════════════════════════════════════════════════════╗
║                                                        ║
║                  ⏳ Generazione PDF                    ║
║                                                        ║
║                 Generazione PDF in corso...            ║
║                                                        ║
║                    [  Loading...  ]                    ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 🔔 Dialog PDF Generato

```
╔════════════════════════════════════════════════════════╗
║  PDF Generato                                          ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Il report PDF è stato generato con successo.          ║
║  Vuoi esportarlo?                                      ║
║                                                        ║
║  ┌──────────────────┐  ┌──────────────────┐          ║
║  │    Annulla       │  │     Esporta      │          ║
║  └──────────────────┘  └──────────────────┘          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 🔔 Alert Conferma Eliminazione

```
╔════════════════════════════════════════════════════════╗
║  Conferma Eliminazione                                 ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Sei sicuro di voler eliminare questo report?          ║
║                                                        ║
║  Questa azione eliminerà anche il PDF associato        ║
║  e non può essere annullata.                           ║
║                                                        ║
║  ┌──────────────────┐  ┌──────────────────┐          ║
║  │    Annulla       │  │     Elimina      │          ║
║  └──────────────────┘  └──────────────────┘          ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 📊 Schermata Report - Empty State

```
╔════════════════════════════════════════════════════════╗
║  Report PDP/BES                                  [←]  ║
╠════════════════════════════════════════════════════════╣
║  [← Indietro]                    [+ Nuovo Report]     ║
║                                                        ║
║                                                        ║
║                         📋                             ║
║                                                        ║
║               Nessun report PDP/BES                    ║
║                                                        ║
║           Crea il primo report per uno studente        ║
║                                                        ║
║                                                        ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 📊 Flusso Interazione Utente

### Scenario 1: Creazione Nuovo Report

1. Welcome Screen → Click "Report PDP/BES"
2. Reports Screen (lista) → Click "+ Nuovo Report"
3. Modal Form appare
4. Seleziona studente dalla lista orizzontale
5. Seleziona tipo report (PDP/BES)
6. Inserisci anno scolastico
7. Compila campi opzionali (diagnosi, punti di forza, ecc.)
8. Click "Salva"
9. ✅ Modal si chiude, report aggiunto alla lista

### Scenario 2: Generazione PDF

1. Reports Screen → Visualizza card report
2. Click "📄 Genera PDF"
3. Overlay "Generazione PDF in corso..."
4. Sistema genera PDF da template HTML
5. PDF salvato in directory reports/
6. Alert "PDF Generato" con opzione "Esporta"
7. Click "Esporta" → Share dialog nativo OS
8. Utente sceglie app destinazione (Email, Drive, ecc.)
9. ✅ PDF esportato

### Scenario 3: Modifica Report Esistente

1. Reports Screen → Click "✏️ Modifica" su card
2. Modal Form appare con dati precompilati
3. Modifica campi desiderati
4. Click "Aggiorna"
5. Sistema aggiorna report e updated_at
6. ✅ Modal si chiude, lista aggiornata

### Scenario 4: Eliminazione Report

1. Reports Screen → Click "🗑️" su card
2. Alert conferma eliminazione
3. Click "Elimina"
4. Sistema elimina report da DB
5. Sistema elimina PDF associato (se esiste)
6. ✅ Card rimossa dalla lista

---

## 🎨 Elementi UI

### Colori

- **Primario**: `#007AFF` (blu iOS standard)
- **Successo**: `#34C759` (verde)
- **Warning**: `#FF9500` (arancione)
- **Errore**: `#FF3B30` (rosso)
- **Background**: `#f5f5f5` (grigio chiaro)
- **Card**: `#fff` (bianco)
- **Testo primario**: `#333`
- **Testo secondario**: `#666`
- **Bordi**: `#ddd`

### Tipografia

- **Titoli**: 18-20pt, bold
- **Sottotitoli**: 16pt, semi-bold
- **Body**: 14-16pt, regular
- **Caption**: 12pt, regular
- **Label form**: 16pt, semi-bold

### Spaziatura

- **Padding card**: 16px
- **Margin tra card**: 12px
- **Padding schermata**: 15px
- **Gap elementi form**: 20px
- **Border radius**: 8-12px

### Iconografia

- ✏️ Modifica
- 📄 Genera PDF
- 📤 Esporta
- 🗑️ Elimina
- ← Indietro
- + Nuovo
- ✕ Chiudi
- ✓ Successo
- ⏳ Loading

---

## 📱 Responsive Design

### Mobile (< 768px)

- Stack verticale per tutte le card
- Form a tutta larghezza
- Pulsanti stack verticalmente se troppo lunghi
- Font leggermente ridotti se necessario

### Tablet (≥ 768px)

- Due colonne per card quando possibile
- Form width massima 600px centrato
- Maggiore spaziatura tra elementi

### Desktop (≥ 1024px)

- Tre colonne per card
- Form width 800px centrato
- Navigation aggiuntiva (sidebar possibile)

---

## ♿ Accessibilità

### ARIA Labels

- Ogni elemento interattivo ha `accessibilityLabel`
- Form fields hanno `accessibilityHint`
- Stati dinamici hanno `accessibilityState`

### Ruoli

- Pulsanti: `accessibilityRole="button"`
- Form: `accessibilityRole="form"`
- Header: `accessibilityRole="header"`

### Navigazione Keyboard

- Tab order logico
- Focus visibile su elementi
- Enter per submit form
- Esc per chiudere modal

### Screen Reader

- Messaggi di stato annunciati
- Errori validazione verbalizzati
- Conferme operazioni comunicate

---

## 🔄 Stati e Transizioni

### Loading States

- **Lista report**: Spinner centrale
- **Generazione PDF**: Overlay con spinner e testo
- **Salvataggio form**: Pulsante disabled + spinner

### Success States

- **Report salvato**: Alert + aggiornamento lista
- **PDF generato**: Alert con opzione esporta
- **Report eliminato**: Animazione rimozione card

### Error States

- **Validazione form**: Messaggio sotto campo
- **Errore API**: Alert rosso con dettagli
- **PDF fallito**: Alert con retry option

---

**Documento UI Flow per Docente Plus - Modulo Report PDP/BES**  
**Data: Ottobre 2024**
