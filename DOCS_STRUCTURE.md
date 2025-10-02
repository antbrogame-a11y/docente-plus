# Documentazione Git - Struttura

Questa guida mostra come trovare la risposta a "che devo fare" quando si lavora con Git.

## 📖 Struttura della Documentazione

```
docente-plus/
│
├── README.md                    # Panoramica del progetto
│   └── Link a → GIT_WORKFLOW_GUIDE.md
│
├── QUICKSTART.md               # Guida rapida (5 minuti)
│   └── Link a → GIT_QUICK_REF.md e GIT_WORKFLOW_GUIDE.md
│
├── GIT_QUICK_REF.md           # ⚡ RIFERIMENTO RAPIDO
│   │   Comandi essenziali Git in formato conciso
│   │   Perfetto per chi ha fretta
│   └── Risposta rapida: "Che devo fare?"
│       → git status / git add / git commit / git push
│
└── GIT_WORKFLOW_GUIDE.md      # 📚 GUIDA COMPLETA
    │   Spiegazioni dettagliate del workflow Git
    │   Scenari pratici e best practices
    │   Troubleshooting e soluzioni comuni
    └── Riepilogo finale: "Che Devo Fare?"
```

## 🎯 Quando Usare Quale Documento

### Ho Fretta - Cosa Faccio Subito?
➡️ **GIT_QUICK_REF.md**
- Comandi base in 2 minuti
- Workflow tipico step-by-step
- Checklist pre-push

### Voglio Capire Come Funziona Git
➡️ **GIT_WORKFLOW_GUIDE.md**
- Spiegazione dettagliata del processo
- Convenzioni per i commit
- File importanti (.gitignore, package-lock.json)
- Risorse per approfondire

### Devo Iniziare il Progetto
➡️ **README.md** o **QUICKSTART.md**
- Setup del progetto
- Installazione dipendenze
- Primo avvio

## 💡 Risposte Dirette alle Domande Comuni

### "Che devo fare?" (Ho modificato dei file)
```bash
git status           # 1. Vedi cosa è cambiato
git add .            # 2. Aggiungi i file
git commit -m "..."  # 3. Crea il commit
git push             # 4. Invia al repository
```

### "Cosa c'è?" (Cosa sono questi file?)
- **.gitignore** → Dice a Git quali file ignorare
- **package-lock.json** → Versioni esatte delle dipendenze
- **.git/COMMIT_EDITMSG** → File temporaneo per messaggi di commit

### "Come contribuisco al progetto?"
1. Leggi **README.md** → sezione "Sviluppo & Contributi"
2. Segui **GIT_WORKFLOW_GUIDE.md** → sezione "Workflow Completo"
3. Usa **GIT_QUICK_REF.md** per i comandi quotidiani

## 🔗 Collegamenti Rapidi

| Domanda | Documento | Sezione |
|---------|-----------|---------|
| Ho modificato file, e ora? | GIT_QUICK_REF.md | "Che Devo Fare?" |
| Come si fa un commit? | GIT_WORKFLOW_GUIDE.md | "Il Processo di Commit in 3 Passi" |
| Come contribuisco? | README.md | "Sviluppo & Contributi" |
| Cos'è .gitignore? | GIT_WORKFLOW_GUIDE.md | "File Importanti da Conoscere" |
| Errore durante push | GIT_WORKFLOW_GUIDE.md | "Problemi Comuni e Soluzioni" |
| Comandi Git base | GIT_QUICK_REF.md | "Comandi Base" |

## ✅ Checklist: Prima di Committare

Basata su **GIT_WORKFLOW_GUIDE.md** → "Checklist Prima di Fare Push":

- [ ] Ho testato le modifiche localmente?
- [ ] Tutti i file necessari sono stati aggiunti?
- [ ] Il messaggio di commit è chiaro?
- [ ] Non sto committando file sensibili?
- [ ] Ho fatto pull delle ultime modifiche?

## 🚀 Quick Start per Nuovi Contributori

### Step 1: Setup (5 minuti)
```bash
git clone https://github.com/antbrogame-a11y/docente-plus.git
cd docente-plus
npm install
npm start
```

### Step 2: Leggi la Documentazione
1. **README.md** → Panoramica generale
2. **GIT_QUICK_REF.md** → Comandi essenziali
3. **GIT_WORKFLOW_GUIDE.md** → Quando serve aiuto dettagliato

### Step 3: Inizia a Contribuire
```bash
git checkout -b feature/mia-funzione
# ... lavora sui file ...
git add .
git commit -m "feat: Descrizione"
git push origin feature/mia-funzione
# Crea Pull Request su GitHub
```

## 📝 Note per i Maintainer

Questa struttura documentale risponde alle domande più comuni:

1. **"Che devo fare?"** → GIT_QUICK_REF.md (risposta immediata)
2. **"Come funziona?"** → GIT_WORKFLOW_GUIDE.md (spiegazione completa)
3. **"Da dove inizio?"** → README.md + QUICKSTART.md (setup progetto)

Ogni documento ha uno scopo specifico e rimanda agli altri quando appropriato, creando un sistema di documentazione interconnesso e facile da navigare.

## 🎓 Filosofia della Documentazione

- **Progressiva**: Da concisa (Quick Ref) a dettagliata (Workflow Guide)
- **Pratica**: Esempi concreti e comandi copy-paste pronti
- **Accessibile**: In italiano, con emoji per facilitare la scansione
- **Interconnessa**: Link incrociati tra i documenti
- **Risolutiva**: Focus su "come fare" e "cosa fare quando..."

---

**Per qualsiasi domanda**, la risposta è sempre in uno di questi documenti! 🎉
