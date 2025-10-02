# Test Login e API DeepSeek

Questo documento descrive come testare il funzionamento del login e dell'integrazione con l'API DeepSeek.

## Prerequisiti

1. **Installazione dipendenze**
   ```bash
   npm install
   ```

2. **Configurazione API DeepSeek (opzionale)**
   - Copia `.env.example` in `.env`
   - Inserisci la tua API key di DeepSeek:
     ```
     DEEPSEEK_API_KEY=your-actual-api-key
     ```
   - Ottieni una API key gratuita da: https://platform.deepseek.com/

## Esecuzione Test

### 1. Avviare l'applicazione

```bash
npm start
```

Questo avvierà Expo e potrai scegliere di eseguire l'app su:
- Android (tramite Expo Go)
- iOS (tramite Expo Go)
- Web browser

### 2. Test del Login

1. **Aprire l'app** - Verrà visualizzata la schermata di login
2. **Inserire credenziali**:
   - Email: qualsiasi email valida (es. `test@example.com`)
   - Password: qualsiasi password (es. `password123`)
3. **Premere "Accedi"**
4. **Verifica**: Dovrebbe apparire la schermata di benvenuto

### 3. Test API DeepSeek

Dopo il login, nella schermata di benvenuto:

1. **Test automatico**: L'API viene testata automaticamente al caricamento della schermata
2. **Visualizzazione risultati**:
   - ✓ **Successo**: Viene mostrato un messaggio di conferma con la risposta dell'API
   - ✗ **Errore**: Viene mostrato il messaggio di errore
3. **Ripeti test**: Puoi ripetere il test premendo il pulsante "Ripeti test API"

## Scenari di Test

### Scenario 1: Test con API key valida

**Prerequisiti**: API key configurata correttamente in `.env`

**Risultato atteso**:
- Login funziona correttamente
- API DeepSeek risponde con successo
- Viene visualizzato un messaggio tipo "OK" o simile dall'API

### Scenario 2: Test senza API key

**Prerequisiti**: Nessuna API key configurata (default)

**Risultato atteso**:
- Login funziona correttamente
- API DeepSeek fallisce con errore di autenticazione
- Viene mostrato un messaggio di errore tipo "Unauthorized" o "Invalid API key"

### Scenario 3: Test con credenziali vuote

**Azione**: Tentare di fare login senza inserire email/password

**Risultato atteso**:
- Viene mostrato un alert "Inserisci email e password"
- Il login non procede

## Struttura del Codice

### File principali

- `screens/login-screen.js` - Schermata di login
- `screens/welcome-screen.js` - Schermata di benvenuto con test API
- `services/deepseek-api.js` - Servizio per chiamate API DeepSeek
- `context/auth-context.js` - Gestione stato autenticazione
- `navigation/app-navigation.js` - Navigazione con auth flow

### Flusso dell'applicazione

```
[App Start]
    ↓
[Login Screen] → Inserisci credenziali → [Login]
    ↓
[Welcome Screen] → Test API automatico → [Mostra risultati]
    ↓
[Profile/altre schermate]
```

## Messaggi di Errore Comuni

### API DeepSeek

1. **"Unauthorized" / "Invalid API key"**
   - Causa: API key mancante o non valida
   - Soluzione: Configura una API key valida nel file `.env`

2. **"Network request failed"**
   - Causa: Nessuna connessione internet
   - Soluzione: Verifica la connessione di rete

3. **"HTTP error! status: 429"**
   - Causa: Rate limit raggiunto
   - Soluzione: Attendi qualche minuto prima di riprovare

### Login

1. **"Inserisci email e password"**
   - Causa: Campi vuoti
   - Soluzione: Compila entrambi i campi

## Note

- Il sistema di login è semplificato per scopi demo (non c'è validazione backend reale)
- L'API DeepSeek richiede una connessione internet attiva
- Il test API viene eseguito automaticamente al primo caricamento della schermata welcome
- Puoi testare il flusso completo anche senza una API key valida (vedrai un errore controllato)

## Supporto

Per problemi o domande, apri una issue su GitHub:
https://github.com/antbrogame-a11y/docente-plus/issues
