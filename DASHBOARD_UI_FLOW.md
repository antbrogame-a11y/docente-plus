# Dashboard UI Flow - Guida Visuale

## 📱 Flusso Navigazione Dashboard

```
┌─────────────────────────────────────┐
│      Login Screen                   │
│  ┌───────────────────────────┐     │
│  │  Email: [____________]    │     │
│  │  Password: [_________]    │     │
│  │  [      Login       ]     │     │
│  └───────────────────────────┘     │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Welcome Screen                 │
│  ┌───────────────────────────┐     │
│  │  Benvenuto!               │     │
│  │  user@example.com         │     │
│  ├───────────────────────────┤     │
│  │ [  Vai al profilo   ]     │     │
│  │ [📊 Dashboard Analytics ] │ ← NEW!
│  │ [  Le Mie Classi    ]     │     │
│  │ [  Materiali        ]     │     │
│  │ [  Report PDP/BES   ]     │     │
│  │ [  Logout           ]     │     │
│  └───────────────────────────┘     │
└─────────────────────────────────────┘
                  ↓
┌─────────────────────────────────────┐
│      Dashboard Analytics            │
│  (Scroll per vedere tutto)          │
└─────────────────────────────────────┘
```

---

## 🎨 Layout Dashboard (Scrollable)

### 1. Header
```
┌─────────────────────────────────────┐
│ Dashboard Docente Plus              │
│ Analytics e Statistiche             │
└─────────────────────────────────────┘
```

### 2. Statistiche Cards (Grid 2x3)
```
┌──────────────────┬──────────────────┐
│ 🎓 Classi        │ 👨‍🎓 Studenti      │
│                  │                  │
│      5           │      120         │
│ CLASSI           │ STUDENTI         │
│ [Blu #007AFF]    │ [Verde #34C759]  │
├──────────────────┼──────────────────┤
│ 📋 BES/DSA       │ 📚 Materiali     │
│                  │                  │
│      15          │      45          │
│ BES/DSA          │ MATERIALI        │
│ [Arancio #FF9500]│ [Viola #5856D6]  │
├──────────────────┼──────────────────┤
│ 📄 Report PDP    │ 📋 Report BES    │
│                  │                  │
│      10          │      8           │
│ REPORT PDP       │ REPORT BES       │
│ [Rosa #FF2D55]   │ [Viola #AF52DE]  │
└──────────────────┴──────────────────┘
```

### 3. Suggerimenti Automatici
```
┌─────────────────────────────────────┐
│ Suggerimenti Automatici             │
├─────────────────────────────────────┤
│ ⚠️ 2 classi senza studenti       → │
│ [Arancio]                           │
├─────────────────────────────────────┤
│ 📋 3 studenti BES/DSA senza rep. → │
│ [Rosso]                             │
├─────────────────────────────────────┤
│ 💡 1 classe con alta % BES/DSA   → │
│ [Blu]                               │
└─────────────────────────────────────┘
```

### 4. Statistiche per Classe (Tabella)
```
┌─────────────────────────────────────┐
│ Statistiche per Classe              │
├────────┬──────┬──────┬──────┬──────┤
│ Classe │ Stud.│ BES  │ Mat. │ Rep. │
├────────┼──────┼──────┼──────┼──────┤
│   1A   │  24  │  3   │  10  │  3   │
│   2B   │  22  │  5   │  8   │  4   │
│   3C   │  20  │  2   │  12  │  2   │
│   4D   │  25  │  0   │  6   │  0   │
│   5E   │  29  │  5   │  9   │  4   │
└────────┴──────┴──────┴──────┴──────┘

* BES in arancione se > 0
```

### 5. Distribuzione BES/DSA (Grafico a Barre)
```
┌─────────────────────────────────────┐
│ Distribuzione BES/DSA per Classe    │
├─────────────────────────────────────┤
│ 1A                                  │
│ ████████████████████░░░░░░   5/24  │
│                                     │
│ 2B                                  │
│ ███████████████░░░░░░░░░░░   3/22  │
│                                     │
│ 3C                                  │
│ █████████░░░░░░░░░░░░░░░░░   2/20  │
└─────────────────────────────────────┘

Legenda:
█ = Studenti totali (Blu)
█ = Studenti BES/DSA (Arancione, su blu)
```

### 6. Distribuzione Materiali (Grafico a Barre)
```
┌─────────────────────────────────────┐
│ Distribuzione Materiali per Tipo    │
├─────────────────────────────────────┤
│ 📄 PDF                              │
│ ████████████████████░░  20 (44%)   │
│                                     │
│ 🔗 Link                             │
│ ███████████████░░░░░░░  15 (33%)   │
│                                     │
│ 🖼️ Immagini                         │
│ ███████░░░░░░░░░░░░░░░   7 (16%)   │
│                                     │
│ 📝 Documenti                        │
│ ████░░░░░░░░░░░░░░░░░░   3 (7%)    │
└─────────────────────────────────────┘
```

### 7. Attività Recenti
```
┌─────────────────────────────────────┐
│ Attività Recenti                    │
├─────────────────────────────────────┤
│ 📚 Geometria - Lezione 5            │
│    Classe 1A         15/01/2024     │
├─────────────────────────────────────┤
│ 📄 PDP - Mario Rossi                │
│    Mario Rossi       14/01/2024     │
├─────────────────────────────────────┤
│ 📚 Storia - Slide WWI               │
│    Classe 2B         13/01/2024     │
├─────────────────────────────────────┤
│ 📄 BES - Anna Bianchi               │
│    Anna Bianchi      12/01/2024     │
├─────────────────────────────────────┤
│ 📚 Link YouTube - Matematica        │
│    Classe 3C         11/01/2024     │
└─────────────────────────────────────┘
```

### 8. Azioni Rapide (Grid 2x2)
```
┌──────────────────┬──────────────────┐
│   🎓 Classi      │   📚 Materiali   │
│                  │                  │
│  [Touch Area]    │  [Touch Area]    │
├──────────────────┼──────────────────┤
│   📄 Report      │   📤 Esporta     │
│                  │                  │
│  [Touch Area]    │  [Touch Area]    │
└──────────────────┴──────────────────┘
```

### 9. Footer
```
┌─────────────────────────────────────┐
│ Dashboard aggiornata:               │
│ 15/01/2024, 10:30:45                │
└─────────────────────────────────────┘
```

---

## 🔄 Interazioni Utente

### Pull-to-Refresh
```
┌─────────────────────────────────────┐
│           ↓ Trascina giù            │
│         [Spinner animato]           │
│      Aggiornamento dati...          │
└─────────────────────────────────────┘
```

### Esportazione Dati
```
Tap su "📤 Esporta"
         ↓
┌─────────────────────────────────────┐
│     [Spinner] Esportazione...       │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  Condividi dashboard_export_...json │
│  ┌───────────────────────────┐     │
│  │ Email                     │     │
│  │ WhatsApp                  │     │
│  │ Drive                     │     │
│  │ File Manager              │     │
│  └───────────────────────────┘     │
└─────────────────────────────────────┘
```

### Navigazione da Suggerimenti
```
Tap su "📋 3 studenti BES/DSA..."
         ↓
┌─────────────────────────────────────┐
│      Report PDP/BES Screen          │
│  (Apre schermata Report)            │
└─────────────────────────────────────┘
```

---

## 📊 Stati della Dashboard

### 1. Loading State (Prima visualizzazione)
```
┌─────────────────────────────────────┐
│                                     │
│         [Spinner Animato]           │
│     Caricamento dashboard...        │
│                                     │
└─────────────────────────────────────┘
```

### 2. Empty State (Nessun Dato)
```
┌─────────────────────────────────────┐
│ Dashboard Docente Plus              │
├─────────────────────────────────────┤
│ 🎓 0  👨‍🎓 0  📋 0                    │
│ 📚 0  📄 0  📋 0                     │
├─────────────────────────────────────┤
│ ✅ Tutto in ordine!                 │
│ Nessun suggerimento al momento.     │
├─────────────────────────────────────┤
│ Nessuna classe disponibile          │
├─────────────────────────────────────┤
│ Nessun dato BES/DSA disponibile     │
├─────────────────────────────────────┤
│ Nessun materiale disponibile        │
├─────────────────────────────────────┤
│ Nessuna attività recente            │
└─────────────────────────────────────┘
```

### 3. Error State
```
┌─────────────────────────────────────┐
│                                     │
│     ❌ Errore: Database error       │
│                                     │
│     [    Riprova    ]               │
│                                     │
└─────────────────────────────────────┘
```

### 4. Normal State (Con Dati)
```
[Vedi layout completo sopra]
```

---

## 🎨 Design System

### Colori
```
Primario:    #007AFF  ████ Blu (Classi)
Successo:    #34C759  ████ Verde (Studenti)  
Warning:     #FF9500  ████ Arancione (BES/DSA)
Secondario:  #5856D6  ████ Viola (Materiali)
Accento:     #FF2D55  ████ Rosa (PDP)
Accento2:    #AF52DE  ████ Viola chiaro (BES Reports)

Background:  #F5F5F5  ████ Grigio chiaro
Card BG:     #FFFFFF  ████ Bianco
Testo:       #333333  ████ Grigio scuro
Testo Sec.:  #666666  ████ Grigio medio
Testo Dis.:  #999999  ████ Grigio chiaro
```

### Tipografia
```
Header Title:    24px, Bold
Header Subtitle: 14px, Regular
Section Title:   18px, Bold
Card Value:      28px, Bold
Card Title:      12px, Uppercase
Body Text:       14px, Regular
Caption:         12px, Regular
```

### Spacing
```
Card Padding:     16px
Grid Gap:         12px
Section Margin:   20px
Border Radius:    12px
Shadow:           Elevation 2-3
```

### Touch Targets
```
Minimum Size:     44x44 punti (WCAG)
Button Height:    Minimo 44px
Icon Size:        24-32px
```

---

## ♿ Accessibilità

### Screen Reader Flow
```
1. "Dashboard Docente Plus, header"
2. "Analytics e Statistiche"
3. "Panoramica, heading"
4. "Totale classi: 5, summary"
5. "Totale studenti: 120, summary"
6. "Studenti con BES/DSA: 15, summary"
7. [continua...]
8. "Suggerimenti Automatici, heading"
9. "Alert: 2 classi senza studenti, button, Vai a Gestione Classi"
10. [continua...]
11. "Tabella statistiche classi"
12. "Classe 1A: 24 studenti, 3 con BES/DSA (12%), 10 materiali, 3 report"
13. [continua...]
```

### Navigazione Tastiera
```
Tab Order:
1. Pull-to-Refresh trigger
2. Card Classi (non interattivo)
3. Card Studenti (non interattivo)
4. Card BES/DSA (non interattivo)
5. Card Materiali (non interattivo)
6. Card Report PDP (non interattivo)
7. Card Report BES (non interattivo)
8. Suggerimento 1 (button)
9. Suggerimento 2 (button)
10. Suggerimento 3 (button)
11. [scroll tabella]
12. [scroll grafici]
13. [scroll attività]
14. Button Classi
15. Button Materiali
16. Button Report
17. Button Esporta
```

---

## 📱 Responsive Behavior

### Small Screen (< 375px)
```
- Card grid mantiene 2 colonne
- Font size leggermente ridotto
- Padding ridotto a 12px
- Grafici a larghezza piena
```

### Medium Screen (375-768px)
```
- Layout standard
- Card grid 2 colonne
- Padding 16px
- Grafici ottimizzati
```

### Large Screen (> 768px)
```
- Card grid può espandersi a 3 colonne
- Padding aumentato a 20px
- Grafici più larghi
- Tabelle più leggibili
```

---

## 🔄 Aggiornamento Dati

### Scenario 1: Nuovo Materiale Aggiunto
```
User: Aggiunge materiale in Materials Screen
      ↓
User: Torna alla Dashboard
      ↓
User: Pull-to-refresh
      ↓
Dashboard: Mostra "45 → 46" materiali
```

### Scenario 2: Nuovo Report Creato
```
User: Crea report PDP in Reports Screen
      ↓
User: Torna alla Dashboard
      ↓
User: Pull-to-refresh
      ↓
Dashboard: 
  - "10 → 11" Report PDP
  - Suggerimento "studenti BES senza report" aggiornato
  - Attività recenti mostra nuovo report
```

---

## 💡 Tips per l'Utente

### Interpretare i Suggerimenti
```
⚠️ Arancione = Azione consigliata
📋 Rosso     = Azione necessaria
💡 Blu       = Informazione utile
📚 Verde     = Suggerimento miglioramento
```

### Leggere i Grafici BES/DSA
```
Barra più lunga      = Più studenti BES/DSA
Percentuale alta     = Maggior supporto necessario
Ordinamento          = Da più a meno studenti BES
```

### Usare l'Esportazione
```
Quando esportare:
- Prima di collegi docenti
- Per backup periodici
- Per analisi esterne
- Per condivisione con dirigenza

Formato: JSON (apribile con editor testo o Excel)
```

---

**Dashboard Analytics UI Flow**  
**Versione:** 1.0  
**Data:** 2024  
**Status:** ✅ DOCUMENTAZIONE COMPLETA
