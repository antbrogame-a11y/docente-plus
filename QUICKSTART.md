# Quick Start - Login e API DeepSeek

## 🚀 Avvio Rapido (5 minuti)

### 1. Setup
```bash
cd docente-plus
npm install
npm start
```

### 2. Test Login
- Apri l'app con Expo Go
- **Email**: qualsiasi (es: `test@example.com`)
- **Password**: qualsiasi (es: `password123`)
- Premi "Accedi"

### 3. Verifica
✅ Appare schermata "Benvenuto!"  
✅ Test API viene eseguito automaticamente  
✅ Risultato visualizzato (successo o errore)

---

## 📱 Cosa è Stato Implementato

### Nuove Schermate
1. **Login Screen** (`screens/login-screen.js`)
   - Input email e password
   - Validazione e loading state

2. **Welcome Screen** (`screens/welcome-screen.js`)
   - Messaggio di benvenuto
   - Test automatico API DeepSeek
   - Pulsanti: Ripeti test, Vai al profilo, Logout

### Nuovi Servizi
3. **Auth Context** (`context/auth-context.js`)
   - Gestione stato autenticazione globale

4. **DeepSeek API** (`services/deepseek-api.js`)
   - Chiamate API con gestione errori

### Navigation Aggiornata
5. **App Navigation** (`navigation/app-navigation.js`)
   - Flow condizionale: Login → Welcome → App

---

## 🔑 API Key (Opzionale)

### Senza API Key
- ✅ Login funziona
- ⚠️ API test fallisce (errore atteso)
- 📝 Messaggio: "Unauthorized - Invalid API key"

### Con API Key
```bash
# 1. Copia template
cp .env.example .env

# 2. Ottieni key gratuita
# Vai su: https://platform.deepseek.com/

# 3. Configura
# Apri .env e inserisci:
DEEPSEEK_API_KEY=sk-your-key-here
```

---

## 📚 Documentazione Completa

| File | Descrizione |
|------|-------------|
| `TEST_LOGIN_API.md` | Guida testing dettagliata |
| `IMPLEMENTATION_SUMMARY.md` | Riepilogo tecnico completo |
| `UI_FLOW.md` | Specifiche UI e flow diagram |
| `VISUAL_FLOW.md` | Screenshots testuali |
| `GIT_WORKFLOW_GUIDE.md` | Guida completa al workflow Git |
| `GIT_QUICK_REF.md` | Riferimento rapido comandi Git |

### Per Chi Inizia con Git
Se non sai cosa fare dopo aver modificato dei file, consulta:
- **[Git Quick Reference](GIT_QUICK_REF.md)** - Comandi essenziali
- **[Git Workflow Guide](GIT_WORKFLOW_GUIDE.md)** - Guida completa

---

## ✅ Test Checklist

- [ ] `npm install` completato
- [ ] `npm start` avviato
- [ ] App aperta su Expo Go
- [ ] Login effettuato con successo
- [ ] Welcome screen visualizzata
- [ ] Test API eseguito (successo o errore)
- [ ] Alert risultato mostrato
- [ ] Logout funzionante

---

## 🐛 Troubleshooting

### "Inserisci email e password"
→ Campi vuoti, compila entrambi

### "Unauthorized"
→ API key mancante/non valida (normale senza config)

### "Network request failed"
→ Controlla connessione internet

### App non si avvia
→ Verifica: `npm install` completato

---

## 📞 Supporto

**Issues GitHub**: https://github.com/antbrogame-a11y/docente-plus/issues

**File principali**:
- Login: `screens/login-screen.js`
- Welcome: `screens/welcome-screen.js`
- API: `services/deepseek-api.js`
- Auth: `context/auth-context.js`

---

## 🎯 Issue #XX - Obiettivi Raggiunti

✅ Schermata login funzionante  
✅ Schermata benvenuto visualizzata  
✅ Chiamata API DeepSeek testata  
✅ Gestione errori implementata  
✅ Documentazione completa

**Nessun crash o malfunzionamento!** 🎉
