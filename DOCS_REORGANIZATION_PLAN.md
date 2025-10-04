# Piano di Riorganizzazione Documentazione

**Data:** Ottobre 2025  
**Stato:** Proposta  
**Obiettivo:** Consolidare e riorganizzare 35 file markdown per migliorare manutenibilità

---

## 📊 Situazione Attuale

### File nella Root (35 totali)
Attualmente tutti i file markdown si trovano nella root del progetto, rendendo difficile la navigazione.

### Problemi Identificati
1. **Sovraccarico visivo** - Root troppo affollata
2. **Duplicazioni** - Contenuti simili in file diversi
3. **Nomi lunghi** - Es. `ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md`
4. **Difficile navigazione** - Nuovi contributori faticano a trovare info

---

## 🎯 Struttura Proposta

### Root (Solo 5 file essenziali)
```
/
├── README.md                   # Panoramica progetto e quick links
├── CHANGELOG.md                # Storico modifiche
├── CONTRIBUTING.md             # (nuovo) Come contribuire
├── LICENSE                     # Licenza progetto
└── QUICKSTART.md               # Guida rapida per iniziare
```

### Directory /docs (Documentazione tecnica)
```
/docs
├── INDEX.md                    # Indice master di tutta la documentazione
│
├── /guides                     # Guide per utenti e sviluppatori
│   ├── git-workflow.md        # Da GIT_WORKFLOW_GUIDE.md
│   ├── git-quick-ref.md       # Da GIT_QUICK_REF.md
│   ├── accessibility.md       # Da ACCESSIBILITY_GUIDE.md
│   ├── backup.md              # Da BACKUP_GUIDE.md
│   └── emergency.md           # Da EMERGENCY_QUICK_REF.md
│
├── /implementation            # Dettagli implementazione features
│   ├── database.md            # Da SQLITE_IMPLEMENTATION.md
│   ├── materials.md           # Da MATERIALS_IMPLEMENTATION.md + MATERIALS_SUMMARY.md
│   ├── reports.md             # Da REPORTS_IMPLEMENTATION_SUMMARY.md
│   ├── dashboard.md           # Da DASHBOARD_IMPLEMENTATION_SUMMARY.md
│   ├── accessibility.md       # Da ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md
│   ├── navigation.md          # Da NAVIGATION_VERIFICATION.md
│   └── complete.md            # Da IMPLEMENTATION_COMPLETE.md + IMPLEMENTATION_SUMMARY.md
│
├── /ui-design                 # Design e flussi UI
│   ├── main-flow.md           # Da UI_FLOW.md + VISUAL_FLOW.md
│   ├── materials-flow.md      # Da MATERIALS_UI_FLOW.md
│   ├── reports-flow.md        # Da REPORTS_UI_FLOW.md
│   ├── dashboard-flow.md      # Da DASHBOARD_UI_FLOW.md
│   └── accessibility-visual.md # Da ACCESSIBILITY_VISUAL_GUIDE.md
│
├── /features                  # Documentazione features
│   ├── reports.md             # Da REPORTS_DOCUMENTATION.md
│   ├── dashboard.md           # Da DASHBOARD_DOCUMENTATION.md
│   └── materials.md           # Nuovo - descrizione feature materiali
│
├── /setup                     # Guide setup e configurazione
│   ├── assets.md              # Da ASSETS_SETUP.md
│   ├── copilot.md             # Da COPILOT_SETUP.md
│   └── test-api.md            # Da TEST_LOGIN_API.md
│
├── /reference                 # Riferimenti rapidi
│   ├── quick-reference.md     # Da QUICK_REFERENCE.md
│   └── docs-structure.md      # Da DOCS_STRUCTURE.md (deprecato)
│
└── /archive                   # File storici/legacy
    ├── restoration.md         # Da RESTORATION_VERIFICATION.md
    ├── ripristino.md          # Da RIPRISTINO_COMPLETO.md
    ├── project-review.md      # Da PROJECT_REVIEW.md
    ├── issue-response.md      # Da ISSUE_RESPONSE.md
    ├── solution-summary.md    # Da SOLUTION_SUMMARY.md
    └── implementation-visual.md # Da IMPLEMENTATION_VISUAL_SUMMARY.md
```

---

## 📋 Mapping File (Vecchio → Nuovo)

### Da Mantenere in Root
1. ✅ `README.md` → `README.md`
2. ✅ `QUICKSTART.md` → `QUICKSTART.md`
3. ✅ `CHANGELOG.md` → `CHANGELOG.md` (nuovo)
4. ➕ `CONTRIBUTING.md` → Nuovo file da creare
5. ➕ `LICENSE` → Da aggiungere se mancante

### Da Spostare in /docs/guides
6. `GIT_WORKFLOW_GUIDE.md` → `/docs/guides/git-workflow.md`
7. `GIT_QUICK_REF.md` → `/docs/guides/git-quick-ref.md`
8. `ACCESSIBILITY_GUIDE.md` → `/docs/guides/accessibility.md`
9. `BACKUP_GUIDE.md` → `/docs/guides/backup.md`
10. `EMERGENCY_QUICK_REF.md` → `/docs/guides/emergency.md`

### Da Consolidare in /docs/implementation
11. `SQLITE_IMPLEMENTATION.md` → `/docs/implementation/database.md`
12. `MATERIALS_IMPLEMENTATION.md` + `MATERIALS_SUMMARY.md` → `/docs/implementation/materials.md`
13. `REPORTS_IMPLEMENTATION_SUMMARY.md` → `/docs/implementation/reports.md`
14. `DASHBOARD_IMPLEMENTATION_SUMMARY.md` → `/docs/implementation/dashboard.md`
15. `ACCESSIBILITY_IMPLEMENTATION_SUMMARY.md` → `/docs/implementation/accessibility.md`
16. `NAVIGATION_VERIFICATION.md` → `/docs/implementation/navigation.md`
17. `IMPLEMENTATION_COMPLETE.md` + `IMPLEMENTATION_SUMMARY.md` + `IMPLEMENTATION_VISUAL_SUMMARY.md` → `/docs/implementation/complete.md`

### Da Spostare in /docs/ui-design
18. `UI_FLOW.md` + `VISUAL_FLOW.md` → `/docs/ui-design/main-flow.md`
19. `MATERIALS_UI_FLOW.md` → `/docs/ui-design/materials-flow.md`
20. `REPORTS_UI_FLOW.md` → `/docs/ui-design/reports-flow.md`
21. `DASHBOARD_UI_FLOW.md` → `/docs/ui-design/dashboard-flow.md`
22. `ACCESSIBILITY_VISUAL_GUIDE.md` → `/docs/ui-design/accessibility-visual.md`

### Da Spostare in /docs/features
23. `REPORTS_DOCUMENTATION.md` → `/docs/features/reports.md`
24. `DASHBOARD_DOCUMENTATION.md` → `/docs/features/dashboard.md`

### Da Spostare in /docs/setup
25. `ASSETS_SETUP.md` → `/docs/setup/assets.md`
26. `COPILOT_SETUP.md` → `/docs/setup/copilot.md`
27. `TEST_LOGIN_API.md` → `/docs/setup/test-api.md`

### Da Spostare in /docs/reference
28. `QUICK_REFERENCE.md` → `/docs/reference/quick-reference.md`
29. `DOCS_STRUCTURE.md` → `/docs/reference/docs-structure.md` (deprecato)

### Da Archiviare in /docs/archive
30. `RESTORATION_VERIFICATION.md` → `/docs/archive/restoration.md`
31. `RIPRISTINO_COMPLETO.md` → `/docs/archive/ripristino.md`
32. `PROJECT_REVIEW.md` → `/docs/archive/project-review.md`
33. `ISSUE_RESPONSE.md` → `/docs/archive/issue-response.md`
34. `SOLUTION_SUMMARY.md` → `/docs/archive/solution-summary.md`
35. `DOCS_INDEX.md` → Sostituito da `/docs/INDEX.md`

---

## 🚀 Piano di Implementazione

### Fase 1: Preparazione (1 ora)
1. ✅ Creare struttura directory `/docs`
2. ✅ Creare `/docs/INDEX.md` con indice completo
3. ✅ Creare `CONTRIBUTING.md` nella root

### Fase 2: Spostamento File (2 ore)
1. Spostare file nelle nuove directory
2. Aggiornare link interni nei file
3. Verificare che nessun link si rompa

### Fase 3: Consolidamento (2 ore)
1. Unire file duplicati/simili
2. Rimuovere contenuti obsoleti
3. Aggiornare cross-references

### Fase 4: Aggiornamento README (30 min)
1. Aggiornare link in README.md
2. Semplificare struttura sezione documentazione
3. Puntare a `/docs/INDEX.md` per dettagli

### Fase 5: Verifica (30 min)
1. Controllare tutti i link
2. Testare navigazione documentazione
3. Verificare che CI/CD non sia impattato

---

## ✅ Benefici Attesi

1. **Root pulita** - Solo file essenziali visibili
2. **Navigazione facile** - Struttura logica e gerarchica
3. **Manutenzione semplice** - File correlati raggruppati
4. **Onboarding veloce** - Nuovi contributori trovano info facilmente
5. **Meno duplicazioni** - Contenuti consolidati

---

## ⚠️ Rischi e Mitigazioni

### Rischio 1: Link rotti
**Mitigazione:** Mantenere redirect o creare script di verifica link

### Rischio 2: Confusione temporanea
**Mitigazione:** Aggiornare README con chiare istruzioni sulla nuova struttura

### Rischio 3: Reference esterni
**Mitigazione:** Verificare se esistono link esterni ai file (Issues, PR, docs esterne)

---

## 📝 Note Implementative

- Usare `git mv` per spostare file (mantiene storia Git)
- Aggiornare `.gitignore` se necessario
- Non eliminare file vecchi immediatamente - archiviarli
- Creare commit separati per ogni fase
- Testare dopo ogni fase

---

## 🎯 Prossimi Passi

1. **Review di questa proposta** con il team
2. **Approvazione** della nuova struttura
3. **Implementazione graduale** seguendo il piano
4. **Comunicazione** del cambiamento agli stakeholder

---

**Status:** 📋 Proposta in attesa di approvazione  
**Effort stimato:** 6 ore totali  
**Priorità:** Media (non bloccante per funzionalità)

