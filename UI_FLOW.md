# UI Flow Diagram - Login e API DeepSeek

## Schermata Login

```
╔════════════════════════════════════════╗
║                                        ║
║           Docente Plus                 ║
║      Accedi alla tua area              ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ Email                             │ ║
║  │ [_________________________]       │ ║
║  │                                   │ ║
║  │ Password                          │ ║
║  │ [_________________________]       │ ║
║  │                                   │ ║
║  │   ┌─────────────────────┐         │ ║
║  │   │      Accedi         │         │ ║
║  │   └─────────────────────┘         │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
╚════════════════════════════════════════╝
```

**Elementi:**
- Titolo app
- Sottotitolo
- Campo email (input)
- Campo password (input securo)
- Pulsante Accedi (con loading spinner se attivo)

**Validazioni:**
- Campi non possono essere vuoti
- Alert se tentativo login con campi vuoti

---

## Schermata Welcome

```
╔════════════════════════════════════════╗
║                                        ║
║           Benvenuto!                   ║
║       test@example.com                 ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ✓ Login completato con successo │ ║
║  │                                  │ ║
║  │ Hai effettuato l'accesso alla    │ ║
║  │ piattaforma Docente Plus.        │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ✓ Test API DeepSeek              │ ║
║  │                                  │ ║
║  │ Stato: Successo                  │ ║
║  │                                  │ ║
║  │ Risposta API:                    │ ║
║  │ ┌──────────────────────────────┐ │ ║
║  │ │ OK                           │ │ ║
║  │ └──────────────────────────────┘ │ ║
║  │                                  │ ║
║  │   [  Ripeti test API  ]          │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║       [  Vai al profilo  ]             ║
║                                        ║
║       [     Logout      ]              ║
║                                        ║
╚════════════════════════════════════════╝
```

**Elementi:**
- Titolo "Benvenuto!"
- Email utente
- Card conferma login
- Card test API con:
  - Icona stato (✓ successo, ✗ errore, ⏳ loading, 🔄 da testare)
  - Testo stato
  - Box risultato (successo: messaggio API, errore: messaggio errore)
  - Pulsante ripeti test
- Pulsante "Vai al profilo"
- Pulsante "Logout"

---

## Schermata Welcome - Stato di Errore API

```
╔════════════════════════════════════════╗
║                                        ║
║           Benvenuto!                   ║
║       test@example.com                 ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ✓ Login completato con successo │ ║
║  │                                  │ ║
║  │ Hai effettuato l'accesso alla    │ ║
║  │ piattaforma Docente Plus.        │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ✗ Test API DeepSeek              │ ║
║  │                                  │ ║
║  │ Stato: Fallito                   │ ║
║  │                                  │ ║
║  │ Errore:                          │ ║
║  │ ┌──────────────────────────────┐ │ ║
║  │ │ Unauthorized - Invalid API   │ │ ║
║  │ │ key                          │ │ ║
║  │ └──────────────────────────────┘ │ ║
║  │                                  │ ║
║  │   [  Ripeti test API  ]          │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║       [  Vai al profilo  ]             ║
║                                        ║
║       [     Logout      ]              ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## Schermata Welcome - Loading

```
╔════════════════════════════════════════╗
║                                        ║
║           Benvenuto!                   ║
║       test@example.com                 ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ✓ Login completato con successo │ ║
║  │                                  │ ║
║  │ Hai effettuato l'accesso alla    │ ║
║  │ piattaforma Docente Plus.        │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║  ┌──────────────────────────────────┐ ║
║  │ ⏳ Test API DeepSeek              │ ║
║  │                                  │ ║
║  │         ⚙️  (spinner)             │ ║
║  │      Test in corso...            │ ║
║  │                                  │ ║
║  │   [ Test in corso... ]           │ ║
║  │     (disabled)                   │ ║
║  └──────────────────────────────────┘ ║
║                                        ║
║       [  Vai al profilo  ]             ║
║                                        ║
║       [     Logout      ]              ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## Flusso Interazione Utente

### 1. Primo Avvio
```
App Start → Login Screen
            ↓
         [User Input]
            ↓
    Email: test@example.com
    Password: ••••••••••••
            ↓
      [Tap "Accedi"]
            ↓
        Validazione
            ↓
   ✓ Campi compilati
            ↓
      Login Success
            ↓
     Welcome Screen
            ↓
    Auto-test API
```

### 2. Test API Automatico
```
Welcome Screen Load
        ↓
   useEffect Hook
        ↓
    testAPI()
        ↓
   Loading State
   (mostra spinner)
        ↓
  Chiama DeepSeek
        ↓
   ┌──────────┴──────────┐
   ↓                     ↓
Successo              Errore
   ↓                     ↓
Mostra OK         Mostra Errore
```

### 3. Ripeti Test
```
[Tap "Ripeti test API"]
        ↓
    testAPI()
        ↓
   Loading State
        ↓
  Chiama DeepSeek
        ↓
Aggiorna Risultati
```

### 4. Navigazione
```
Welcome Screen
        ↓
[Tap "Vai al profilo"]
        ↓
  Profile Screen
```

### 5. Logout
```
Welcome Screen
        ↓
  [Tap "Logout"]
        ↓
     Alert
"Sei sicuro di voler uscire?"
        ↓
   [Tap "Esci"]
        ↓
   logout()
        ↓
  Login Screen
```

---

## Colori e Stili

### Colori Principali
- **Primary Blue**: `#007AFF` (pulsanti, accenti)
- **Success Green**: `#34C759` (messaggi successo)
- **Error Red**: `#FF3B30` (messaggi errore)
- **Background**: `#f5f5f5` (sfondo generale)
- **Card Background**: `#ffffff` (card)
- **Text Primary**: `#333` (testo principale)
- **Text Secondary**: `#666` (testo secondario)
- **Text Tertiary**: `#999` (testo terziario)
- **Border**: `#ddd` (bordi input)

### Typography
- **Title**: 32px, bold
- **Subtitle**: 16-18px
- **Card Title**: 18px, bold
- **Body**: 14-16px
- **Label**: 14px, semi-bold

### Spacing
- **Padding Card**: 20px
- **Margin between cards**: 16px
- **Border Radius**: 8-12px
- **Button Padding**: 16px

---

## Stati UI

### Login Screen
1. **Idle**: Campi vuoti, pulsante attivo
2. **Input**: Utente sta digitando
3. **Loading**: Spinner sul pulsante, campi disabilitati
4. **Error**: Alert con messaggio errore

### Welcome Screen
1. **Initial Load**: Loading spinner, test API in corso
2. **Success**: Card verde, risultato API mostrato
3. **Error**: Card rossa, messaggio errore mostrato
4. **Retry Loading**: Spinner durante nuovo test

---

## Accessibilità

- ✅ Labels per tutti gli input
- ✅ Placeholder testuali
- ✅ Focus states chiari
- ✅ Icone con significato semantico (✓, ✗, ⏳)
- ✅ Contrasto colori WCAG AA
- ✅ Testi leggibili (min 14px)
- ✅ Touch targets sufficientemente grandi (min 44x44)
