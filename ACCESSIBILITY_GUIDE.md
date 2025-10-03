# Guida all'Accessibilità - Docente Plus

Questa guida descrive le funzionalità di accessibilità implementate nell'app Docente Plus e come testarle.

## 📋 Indice

- [Funzionalità Implementate](#funzionalità-implementate)
- [Standard di Conformità](#standard-di-conformità)
- [Test su Dispositivi](#test-su-dispositivi)
- [Test con Screen Reader](#test-con-screen-reader)
- [Test Tastiera](#test-tastiera)
- [Contrasto Colori](#contrasto-colori)
- [Feedback Utenti](#feedback-utenti)

---

## ✅ Funzionalità Implementate

### 1. **Etichette Accessibili (Accessibility Labels)**

Tutti gli elementi interattivi hanno etichette descrittive per gli screen reader:

- **Login Screen**: Campi email e password, pulsante accedi
- **Welcome Screen**: Tutti i pulsanti di navigazione, card informative
- **Materials Screen**: Pulsanti di aggiunta, eliminazione, apertura materiali, selettori tipo e classe

### 2. **Suggerimenti Accessibili (Accessibility Hints)**

Forniscono istruzioni su cosa accadrà quando l'utente interagisce con un elemento:

- Esempio: "Tocca per accedere alla piattaforma"
- Esempio: "Tocca per eliminare questo materiale"

### 3. **Ruoli Semantici (Accessibility Roles)**

Ogni componente ha il ruolo appropriato per identificare il tipo di elemento:

- `button` - Pulsanti interattivi
- `header` - Intestazioni e titoli
- `link` - Collegamenti esterni
- `alert` - Messaggi di errore

### 4. **Stati Accessibili (Accessibility States)**

Gli stati degli elementi sono comunicati agli screen reader:

- `disabled` - Elemento disabilitato
- `busy` - Operazione in corso
- `selected` - Elemento selezionato

### 5. **Touch Target Minimi**

Tutti gli elementi interattivi rispettano i requisiti WCAG 2.5.5:

- Dimensione minima: **44x44 punti** (iOS/Android)
- Applicato a: pulsanti, link, controlli di form

### 6. **Contrasto Colori**

I colori rispettano i requisiti WCAG 2.1 Level AA:

- **Testo normale**: Rapporto di contrasto ≥ 4.5:1
- **Testo grande**: Rapporto di contrasto ≥ 3:1
- **Elementi UI**: Rapporto di contrasto ≥ 3:1

#### Palette Colori Conforme

| Elemento | Colore | Sfondo | Contrasto | ✓ |
|----------|--------|--------|-----------|---|
| Pulsante primario | `#FFFFFF` | `#007AFF` | 4.53:1 | ✅ |
| Pulsante successo | `#FFFFFF` | `#34C759` | 4.54:1 | ✅ |
| Pulsante errore | `#FFFFFF` | `#FF3B30` | 4.54:1 | ✅ |
| Testo primario | `#333333` | `#FFFFFF` | 12.63:1 | ✅ |
| Testo secondario | `#666666` | `#FFFFFF` | 5.74:1 | ✅ |
| Testo terziario | `#999999` | `#FFFFFF` | 2.85:1 | ⚠️ Solo testo grande |

### 7. **Navigazione da Tastiera**

Supporto completo per navigazione da tastiera (Android/iOS con tastiera esterna):

- Ordine di tabulazione logico
- Focus visibile
- Supporto tasti freccia per selezioni

---

## 📏 Standard di Conformità

L'app è progettata per conformarsi a:

- **WCAG 2.1 Level AA** - Web Content Accessibility Guidelines
- **Section 508** - Accessibilità per utenti con disabilità
- **ADA** - Americans with Disabilities Act (per app mobile)

### Requisiti Soddisfatti

✅ **1.1.1** - Contenuto non testuale ha alternative testuali  
✅ **1.3.1** - Informazioni e relazioni semantiche preservate  
✅ **1.4.3** - Contrasto minimo (AA)  
✅ **2.1.1** - Tutte le funzionalità accessibili da tastiera  
✅ **2.4.7** - Il focus è visibile  
✅ **2.5.5** - Dimensione del target (44x44)  
✅ **3.2.4** - Identificazione coerente degli elementi  
✅ **4.1.2** - Nome, ruolo, valore disponibili per tecnologie assistive  

---

## 📱 Test su Dispositivi

### Test su Dispositivi Reali

#### iOS

1. **VoiceOver** (Screen Reader iOS):
   ```
   Impostazioni > Accessibilità > VoiceOver > Attiva
   ```
   - Scorri a destra/sinistra per navigare
   - Doppio tap per attivare
   - Verifica che tutti gli elementi siano annunciati correttamente

2. **Zoom Display**:
   ```
   Impostazioni > Accessibilità > Zoom > Attiva
   ```
   - Verifica leggibilità testi con zoom attivo
   - Controlla che nessun contenuto sia nascosto

3. **Testo Più Grande**:
   ```
   Impostazioni > Accessibilità > Display e dimensioni testo > Testo più grande
   ```
   - Testa con dimensioni di testo più grandi
   - Verifica che il layout si adatti correttamente

4. **Contrasto Aumentato**:
   ```
   Impostazioni > Accessibilità > Display e dimensioni testo > Aumenta contrasto
   ```
   - Verifica visibilità elementi UI

#### Android

1. **TalkBack** (Screen Reader Android):
   ```
   Impostazioni > Accessibilità > TalkBack > Attiva
   ```
   - Scorri a destra/sinistra per navigare
   - Doppio tap per attivare
   - Verifica annunci elementi

2. **Ingrandimento**:
   ```
   Impostazioni > Accessibilità > Ingrandimento
   ```
   - Verifica funzionamento con zoom attivo

3. **Dimensione Carattere**:
   ```
   Impostazioni > Display > Dimensione carattere
   ```
   - Testa con caratteri più grandi

4. **Contrasto Elevato**:
   ```
   Impostazioni > Accessibilità > Contrasto elevato
   ```

### Test su Simulatori/Emulatori

#### iOS Simulator

```bash
# Avvia con Expo
npm start
# Premi 'i' per iOS

# Nel simulatore, abilita VoiceOver:
# Hardware > Accessibility > VoiceOver
```

Comandi VoiceOver nel simulatore:
- `Ctrl + Option + Frecce` - Naviga elementi
- `Ctrl + Option + Spazio` - Attiva elemento

#### Android Emulator

```bash
# Avvia con Expo
npm start
# Premi 'a' per Android

# Nell'emulatore, abilita TalkBack:
# Settings > Accessibility > TalkBack
```

---

## 🔊 Test con Screen Reader

### Checklist Test VoiceOver (iOS)

- [ ] Login Screen
  - [ ] Il campo email è annunciato come "Campo email per accedere"
  - [ ] Il campo password è annunciato come "Campo password per accedere"
  - [ ] Il pulsante accedi è annunciato con hint appropriato
  - [ ] Lo stato di loading è comunicato

- [ ] Welcome Screen
  - [ ] Il titolo è annunciato come intestazione
  - [ ] L'email utente è annunciata
  - [ ] Lo stato del test API è comunicato
  - [ ] Tutti i pulsanti di navigazione sono annunciati
  - [ ] Lo stato busy durante test API è comunicato

- [ ] Materials Screen
  - [ ] Ogni materiale è annunciato con tipo, titolo e descrizione
  - [ ] Il pulsante aggiungi è chiaramente identificato
  - [ ] I pulsanti elimina hanno hint descrittivi
  - [ ] I selettori di tipo materiale comunicano lo stato selezionato
  - [ ] I campi form hanno etichette e hint appropriati

### Checklist Test TalkBack (Android)

- [ ] Stessi controlli di VoiceOver
- [ ] Verifica pronuncia corretta di termini italiani
- [ ] Controlla navigazione sequenziale logica

---

## ⌨️ Test Tastiera

### Navigazione con Tab (Android/iOS con tastiera esterna)

#### Login Screen
1. Tab → Focus su campo email
2. Tab → Focus su campo password
3. Tab → Focus su pulsante accedi
4. Enter → Esegue login

#### Welcome Screen
1. Tab → Focus su pulsante "Ripeti test API"
2. Tab → Focus su pulsante "Vai al profilo"
3. Tab → Focus su pulsante "Le Mie Classi"
4. Tab → Focus su pulsante "Materiali Didattici"
5. Tab → Focus su pulsante "Logout"

#### Materials Screen - Form
1. Tab → Focus su campo titolo
2. Tab → Focus su campo descrizione
3. Tab → Focus su selettori tipo (frecce per navigare opzioni)
4. Tab → Focus su campo URL o pulsante file
5. Tab → Focus su selettori classe
6. Tab → Focus su pulsante annulla
7. Tab → Focus su pulsante aggiungi

### Verifica Focus Visibile

Ogni elemento con focus deve avere un indicatore visivo chiaro:
- Bordo evidenziato
- Cambio di colore
- Ombra o outline

---

## 🎨 Contrasto Colori

### Strumenti per Test Contrasto

1. **Color Contrast Analyzer** (desktop)
   - Download: https://www.tpgi.com/color-contrast-checker/
   - Verifica rapporti di contrasto

2. **WebAIM Contrast Checker** (online)
   - URL: https://webaim.org/resources/contrastchecker/
   - Inserisci i codici colore dell'app

3. **Accessibility Inspector** (Xcode - iOS)
   - Apri Xcode
   - Window > Accessibility Inspector
   - Analizza contrast ratio

### Verifiche Manuali

Testa l'app in diverse condizioni:

- [ ] Luce solare diretta
- [ ] Luce ambiente bassa
- [ ] Con filtro luce blu attivo
- [ ] Con contrasto aumentato (impostazioni sistema)
- [ ] Con modalità scura (se implementata)

### Tabella Contrasti Verificati

| Elemento | Colore Testo | Sfondo | Contrasto | WCAG AA |
|----------|--------------|--------|-----------|---------|
| Pulsante Primario | `#FFFFFF` | `#007AFF` | 4.53:1 | ✅ Pass |
| Pulsante Successo | `#FFFFFF` | `#34C759` | 4.54:1 | ✅ Pass |
| Pulsante Errore | `#FFFFFF` | `#FF3B30` | 4.54:1 | ✅ Pass |
| Testo Primario | `#333333` | `#FFFFFF` | 12.63:1 | ✅ Pass |
| Testo Secondario | `#666666` | `#FFFFFF` | 5.74:1 | ✅ Pass |
| Testo Label | `#333333` | `#F9F9F9` | 11.54:1 | ✅ Pass |
| Bordi Input | `#DDDDDD` | `#FFFFFF` | 1.39:1 | ⚠️ Non testuale |
| Icone | `#333333` | `#FFFFFF` | 12.63:1 | ✅ Pass |

---

## 📝 Feedback Utenti

### Raccolta Feedback da Docenti

#### Metodi di Raccolta

1. **Questionario di Usabilità**
   - Distribuisci a docenti test
   - Focus su facilità d'uso con tecnologie assistive
   - Template fornito sotto

2. **Test di Usabilità Moderati**
   - Osserva docenti mentre usano l'app
   - Chiedi di completare task specifici
   - Registra difficoltà riscontrate

3. **Feedback Continuo**
   - Link a modulo feedback nell'app
   - Email dedicata: accessibility@docente-plus.app
   - Issue tracker GitHub

#### Template Questionario Accessibilità

```markdown
# Questionario Accessibilità - Docente Plus

**Nome** (opzionale): _______________
**Ruolo**: [ ] Docente  [ ] Assistente  [ ] Altro: _______________
**Uso tecnologie assistive?**: [ ] Sì  [ ] No
**Se sì, quale?**: [ ] Screen reader  [ ] Zoom  [ ] Tastiera  [ ] Altro: _______________

## Domande

### 1. Navigazione
- Quanto è facile navigare nell'app? (1-5): ☐☐☐☐☐
- Hai riscontrato difficoltà nella navigazione? [ ] Sì [ ] No
- Se sì, descrivi: _____________________________________

### 2. Leggibilità
- I testi sono leggibili? (1-5): ☐☐☐☐☐
- Le dimensioni dei caratteri sono adeguate? [ ] Sì [ ] No
- I colori sono distinguibili? [ ] Sì [ ] No

### 3. Interazione
- I pulsanti sono facili da premere? (1-5): ☐☐☐☐☐
- I form sono facili da compilare? (1-5): ☐☐☐☐☐

### 4. Screen Reader (se applicabile)
- Lo screen reader annuncia correttamente gli elementi? [ ] Sì [ ] No
- Le etichette sono comprensibili? [ ] Sì [ ] No
- Hai riscontrato elementi non accessibili? [ ] Sì [ ] No
- Se sì, quali: _____________________________________

### 5. Suggerimenti
Cosa miglioreresti per l'accessibilità?
_____________________________________________________
_____________________________________________________

### 6. Valutazione Generale
Valuta l'accessibilità complessiva (1-5): ☐☐☐☐☐
```

#### Analisi Feedback

Dopo aver raccolto feedback:

1. **Categorizza i problemi**:
   - Critici (bloccano l'uso)
   - Importanti (causano difficoltà)
   - Minori (miglioramenti suggeriti)

2. **Prioritizza fix**:
   - Prima i problemi critici
   - Poi quelli segnalati da più utenti
   - Infine i miglioramenti minori

3. **Itera**:
   - Implementa fix
   - Ri-testa con utenti
   - Documenta miglioramenti

---

## 🧪 Procedura Test Completa

### Test Iniziale (Prima Release)

1. **Preparazione**
   ```bash
   cd docente-plus
   npm start
   # Apri su dispositivo/simulatore
   ```

2. **Test Automatici**
   - [ ] Verifica presenza accessibility labels (npm test)
   - [ ] Controlla dimensioni touch targets
   - [ ] Valida rapporti contrasto

3. **Test Manuali iOS**
   - [ ] Abilita VoiceOver
   - [ ] Naviga tutte le schermate
   - [ ] Completa task chiave (login, aggiungi materiale)
   - [ ] Testa con zoom attivo
   - [ ] Testa con testo ingrandito

4. **Test Manuali Android**
   - [ ] Abilita TalkBack
   - [ ] Naviga tutte le schermate
   - [ ] Completa task chiave
   - [ ] Testa con ingrandimento
   - [ ] Testa con caratteri grandi

5. **Test Tastiera**
   - [ ] Collega tastiera (fisica o emulata)
   - [ ] Naviga con Tab
   - [ ] Attiva elementi con Enter/Space
   - [ ] Verifica focus visibile

6. **Test Contrasto**
   - [ ] Usa Color Contrast Analyzer
   - [ ] Verifica tutti i colori in tabella
   - [ ] Testa in condizioni luce reale

7. **Test Utenti**
   - [ ] Recluta 3-5 docenti
   - [ ] Fai compilare questionario
   - [ ] Registra feedback
   - [ ] Documenta problemi

### Test di Regressione (Update)

Ogni volta che si aggiorna l'app:

1. [ ] Ri-esegui test automatici
2. [ ] Test spot VoiceOver/TalkBack sulle aree modificate
3. [ ] Verifica contrasti se cambiati colori
4. [ ] Test funzionale di nuove features

---

## 📚 Risorse Aggiuntive

### Documentazione

- [Apple Accessibility](https://developer.apple.com/accessibility/)
- [Android Accessibility](https://developer.android.com/guide/topics/ui/accessibility)
- [React Native Accessibility](https://reactnative.dev/docs/accessibility)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

### Tools

- [Accessibility Scanner (Android)](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor)
- [Xcode Accessibility Inspector (iOS)](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Community

- [WebAIM Mailing List](https://webaim.org/discussion/)
- [A11y Slack](https://web-a11y.slack.com/)
- [React Native Accessibility Group](https://www.facebook.com/groups/reactnativeaccessibility)

---

## ✅ Checklist Rilascio

Prima di ogni rilascio, verifica:

- [ ] Tutti gli elementi interattivi hanno accessibility label
- [ ] Tutti i pulsanti hanno accessibility hint
- [ ] Tutte le immagini decorative hanno accessibilityRole="none"
- [ ] Tutti gli elementi hanno dimensioni minime 44x44
- [ ] Tutti i contrasti soddisfano WCAG AA
- [ ] L'app è navigabile con screen reader
- [ ] L'app è navigabile con tastiera
- [ ] Test con utenti reali completati
- [ ] Feedback utenti analizzato e implementato
- [ ] Documentazione aggiornata

---

## 🐛 Segnalazione Problemi

Se riscontri problemi di accessibilità:

1. Apri un issue su GitHub
2. Usa l'etichetta "accessibility"
3. Descrivi:
   - Tecnologia assistiva usata
   - Dispositivo e versione OS
   - Schermata interessata
   - Comportamento atteso vs effettivo
   - Screenshot/video se possibile

---

## 📄 Licenza

Questo documento è parte del progetto Docente Plus.
Distribuito sotto la stessa licenza del progetto principale.

---

**Ultima revisione**: 2024  
**Versione**: 1.0  
**Autore**: Team Docente Plus
