# Come Contribuire a Docente Plus

Grazie per il tuo interesse nel contribuire a **Docente Plus**! 🎉

Questo documento fornisce linee guida per contribuire al progetto in modo efficace.

---

## 📋 Indice

- [Codice di Condotta](#codice-di-condotta)
- [Come Posso Contribuire?](#come-posso-contribuire)
- [Setup Ambiente di Sviluppo](#setup-ambiente-di-sviluppo)
- [Processo di Sviluppo](#processo-di-sviluppo)
- [Standard di Codice](#standard-di-codice)
- [Convenzioni](#convenzioni)
- [Testing](#testing)
- [Documentazione](#documentazione)
- [Pull Request](#pull-request)

---

## 📜 Codice di Condotta

Questo progetto adotta un codice di condotta basato sul rispetto reciproco:

- ✅ Sii rispettoso e inclusivo
- ✅ Accetta feedback costruttivo
- ✅ Concentrati su ciò che è meglio per la comunità
- ❌ Non tollerare molestie o linguaggio offensivo

---

## 🤝 Come Posso Contribuire?

Ci sono molti modi per contribuire:

### 🐛 Segnalare Bug
1. Verifica che il bug non sia già stato segnalato nelle [Issues](https://github.com/antbrogame-a11y/docente-plus/issues)
2. Crea una nuova issue con:
   - Titolo chiaro e descrittivo
   - Passi per riprodurre il problema
   - Comportamento atteso vs. attuale
   - Screenshot se applicabile
   - Versione del sistema operativo e Expo

### 💡 Proporre Nuove Funzionalità
1. Crea una issue con label `enhancement`
2. Descrivi chiaramente:
   - Problema che la feature risolve
   - Soluzione proposta
   - Alternative considerate
   - Mockup o diagrammi se utili

### 📝 Migliorare Documentazione
- Correggere errori di battitura
- Chiarire sezioni confuse
- Aggiungere esempi
- Tradurre contenuti

### 💻 Contribuire Codice
Vedi [Processo di Sviluppo](#processo-di-sviluppo) sotto

---

## 🛠️ Setup Ambiente di Sviluppo

### Prerequisiti
- Node.js 18+ e npm/yarn
- Git
- Editor di testo (VS Code consigliato)
- Expo CLI (installato automaticamente)

### Installazione

1. **Fork e clone del repository**
   ```bash
   git clone https://github.com/TUO-USERNAME/docente-plus.git
   cd docente-plus
   ```

2. **Installa dipendenze**
   ```bash
   npm install
   # oppure
   yarn install
   ```

3. **Configura variabili ambiente (opzionale)**
   ```bash
   cp .env.example .env
   # Modifica .env con le tue API key se necessario
   ```

4. **Avvia app in modalità sviluppo**
   ```bash
   npm start
   ```

5. **Esegui test**
   ```bash
   npm test
   ```

✅ **Sei pronto per iniziare!**

---

## 🔄 Processo di Sviluppo

### 1. Crea un Branch
```bash
git checkout -b feature/nome-funzionalità
# oppure
git checkout -b fix/nome-bug
```

**Convenzioni nomi branch:**
- `feature/` - Nuove funzionalità
- `fix/` - Bug fix
- `docs/` - Modifiche documentazione
- `refactor/` - Refactoring codice
- `test/` - Aggiunta/modifica test

### 2. Sviluppa la Tua Modifica
- Scrivi codice seguendo gli [Standard di Codice](#standard-di-codice)
- Aggiungi/aggiorna test
- Testa localmente
- Committa frequentemente con messaggi chiari

### 3. Testa le Modifiche
```bash
# Esegui tutti i test
npm test

# Esegui test con coverage
npm run test:coverage

# Verifica che l'app si avvii
npm start
```

### 4. Crea Pull Request
Vedi sezione [Pull Request](#pull-request) per dettagli

---

## 📐 Standard di Codice

### Naming Conventions

#### File e Directory
- **Componenti:** PascalCase → `ClassCard.js`
- **Screen:** kebab-case → `class-list-screen.js`
- **Context:** kebab-case + `-context` → `auth-context.js`
- **Utilities:** kebab-case → `date-utils.js`

#### Variabili e Funzioni
```javascript
// Variabili: camelCase
const studentName = 'Mario';
const isActive = true;

// Costanti: UPPER_SNAKE_CASE
const MAX_STUDENTS = 30;
const API_BASE_URL = 'https://api.example.com';

// Funzioni: camelCase, verbi
function fetchStudentData() { }
function handleSubmit() { }
async function saveToDatabase() { }
```

#### Componenti React
```javascript
// Functional components con PascalCase
export default function StudentCard({ student, onPress }) {
  // State hooks prima
  const [isSelected, setIsSelected] = useState(false);
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Event handlers
  const handlePress = () => {
    // ...
  };
  
  // Render
  return (
    <View>
      {/* JSX */}
    </View>
  );
}
```

### Struttura File
```javascript
// 1. Imports
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// 2. Constants (se necessario)
const MAX_LENGTH = 100;

// 3. Component
export default function MyComponent() {
  // ...
}

// 4. Styles (sempre alla fine)
const styles = StyleSheet.create({
  container: {
    // ...
  }
});
```

---

## ♿ Accessibilità (OBBLIGATORIO)

**TUTTI i componenti interattivi DEVONO:**

```javascript
<TouchableOpacity
  accessibilityLabel="Descrizione chiara"
  accessibilityHint="Cosa succede quando premuto"
  accessibilityRole="button"
  style={styles.button} // min 44x44 touch target
>
  <Text>Azione</Text>
</TouchableOpacity>
```

**Requisiti:**
- ✅ Touch target minimi: 44x44 punti
- ✅ Contrasto colori: WCAG AA (4.5:1 per testo normale)
- ✅ Label descrittive per screen reader
- ✅ Hint per azioni non ovvie

Vedi [ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md) per dettagli completi.

---

## 🧪 Testing

### Test Richiesti

**Per ogni nuova funzionalità o bug fix:**
1. Aggiungi test unitari in `__tests__/`
2. Nomina file: `feature-name.test.js`
3. Coverage minimo: 80% per nuove funzioni

### Struttura Test
```javascript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup
  });

  afterEach(() => {
    // Cleanup
  });

  test('should do something specific', async () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = await myFunction(input);
    
    // Assert
    expect(result).toBe(expected);
  });
});
```

### Eseguire Test
```bash
# Tutti i test
npm test

# Watch mode (durante sviluppo)
npm run test:watch

# Con coverage
npm run test:coverage
```

---

## 📚 Documentazione

### Quando Documentare

**Aggiorna documentazione se modifichi:**
- API pubbliche
- Comportamento UI
- Configurazione
- Dipendenze
- Processo di setup

### Dove Documentare
- `README.md` - Overview e quick start
- `CHANGELOG.md` - Tutte le modifiche
- `/docs/*` - Documentazione dettagliata
- Commenti inline - Solo per logica complessa

### Stile Documentazione
- ✅ Usa italiano per contenuti utente
- ✅ Usa esempi pratici
- ✅ Mantieni aggiornato
- ❌ Non commentare codice ovvio

---

## 🔀 Pull Request

### Checklist Pre-PR

Prima di aprire una PR, verifica:

- [ ] ✅ Codice funziona localmente
- [ ] ✅ Tutti i test passano (`npm test`)
- [ ] ✅ Nuove feature hanno test
- [ ] ✅ Accessibilità implementata
- [ ] ✅ Documentazione aggiornata
- [ ] ✅ Nessun console.log dimenticato
- [ ] ✅ Commit messages chiari

### Aprire Pull Request

1. **Push del branch**
   ```bash
   git push origin feature/nome-funzionalità
   ```

2. **Apri PR su GitHub**
   - Vai al repository
   - Click "New Pull Request"
   - Scegli il tuo branch
   - Compila template

3. **Descrivi la PR**
   ```markdown
   ## Descrizione
   Breve descrizione delle modifiche
   
   ## Tipo di modifica
   - [ ] Bug fix
   - [ ] Nuova funzionalità
   - [ ] Breaking change
   - [ ] Documentazione
   
   ## Testing
   - [ ] Test locali passati
   - [ ] Nuovi test aggiunti
   
   ## Checklist
   - [ ] Accessibilità verificata
   - [ ] Documentazione aggiornata
   ```

### Convenzioni Commit

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: Add student export feature
fix: Resolve database connection error
docs: Update accessibility guide
test: Add tests for material upload
refactor: Simplify database query logic
style: Fix code formatting
chore: Update dependencies
```

### Review Process

1. **Automated checks** eseguiranno test
2. **Reviewer** esamineranno il codice
3. **Feedback** potrebbe richiedere modifiche
4. **Merge** dopo approvazione

---

## 🆘 Hai Bisogno di Aiuto?

### Documentazione
- [README.md](README.md) - Overview progetto
- [QUICKSTART.md](QUICKSTART.md) - Guida rapida
- [GIT_WORKFLOW_GUIDE.md](GIT_WORKFLOW_GUIDE.md) - Workflow Git dettagliato
- [ACCESSIBILITY_GUIDE.md](ACCESSIBILITY_GUIDE.md) - Guida accessibilità

### Contatti
- **Issues:** Crea una issue con label `question`
- **Discussions:** Usa GitHub Discussions per domande generali

---

## 🎯 Priorità Contributi

### Alta Priorità
- 🐛 Bug critici
- ♿ Miglioramenti accessibilità
- 📱 Ottimizzazioni performance
- 🧪 Aumento coverage test

### Media Priorità
- ✨ Nuove funzionalità
- 📚 Miglioramenti documentazione
- 🎨 Miglioramenti UI/UX

### Bassa Priorità
- 🔧 Refactoring non urgente
- 💄 Modifiche estetiche minori

---

## 📄 Licenza

Contribuendo a questo progetto, accetti che i tuoi contributi saranno licenziati sotto la stessa licenza del progetto.

---

## 🙏 Grazie!

Ogni contributo, grande o piccolo, è apprezzato! Grazie per aiutare a migliorare **Docente Plus**! 🚀

---

**Ultima revisione:** Ottobre 2025  
**Versione:** 1.0
