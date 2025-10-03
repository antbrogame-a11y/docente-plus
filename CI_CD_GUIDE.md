# Documentazione CI/CD - Docente Plus

Guida completa all'automazione CI/CD implementata per il progetto Docente Plus.

---

## 📋 Indice

1. [Panoramica](#panoramica)
2. [Workflow Configurati](#workflow-configurati)
3. [Setup e Configurazione](#setup-e-configurazione)
4. [Esecuzione Workflow](#esecuzione-workflow)
5. [Monitoraggio e Debug](#monitoraggio-e-debug)
6. [Best Practices](#best-practices)
7. [Troubleshooting](#troubleshooting)

---

## Panoramica

Il sistema CI/CD è implementato con **GitHub Actions** e include:

- ✅ **Build automatica** su ogni push/PR
- 🧪 **Test automatici** (unit test, E2E)
- 🚀 **Deploy automatico** su staging
- 📊 **Coverage report** e metriche
- 🔔 **Notifiche** automatiche
- 📦 **Artifacts** per build e test

### Obiettivi

1. **Qualità del codice**: Verificare ogni modifica prima del merge
2. **Deploy sicuro**: Testare prima di pubblicare
3. **Feedback rapido**: Notifiche immediate su problemi
4. **Tracciabilità**: Log e artifacts per debug

---

## Workflow Configurati

### 1. CI - Build and Test

**File**: `.github/workflows/ci.yml`

**Scopo**: Verificare che il codice compili e tutti i test passino.

**Trigger**:
- Push su branch: `main`, `develop`, `copilot/**`
- Pull Request verso: `main`, `develop`

**Step**:
1. Checkout del codice
2. Setup Node.js 18.x
3. Installazione dipendenze (`npm ci`)
4. Linting (opzionale)
5. Esecuzione test con coverage
6. Upload coverage a Codecov
7. Build Expo web
8. Archiviazione artifacts

**Artifacts generati**:
- `test-results`: Coverage e risultati test (30 giorni)
- `build-artifacts`: Build Expo (7 giorni)

**Esempio output**:
```
✓ 110 test passed
✓ Coverage: 85%
✓ Build successful
```

---

### 2. CD - Deploy to Staging

**File**: `.github/workflows/deploy.yml`

**Scopo**: Pubblicare l'app su Expo dopo ogni merge su main.

**Trigger**:
- Push su `main`
- Esecuzione manuale (workflow_dispatch)

**Environment**:
- **Staging** (default): Canale `staging` su Expo
- **Production** (manuale): Canale `production` su Expo

**Step**:
1. Checkout del codice
2. Setup Node.js e Expo
3. Installazione dipendenze
4. **Test pre-deploy** (obbligatori)
5. Pubblicazione su Expo
6. Creazione summary
7. Notifica su commit

**Secrets richiesti**:
```
EXPO_TOKEN=<token-from-expo>
EXPO_USERNAME=<your-expo-username>
```

**Come ottenere EXPO_TOKEN**:
1. Vai su https://expo.dev/accounts/[username]/settings/access-tokens
2. Crea un nuovo token
3. Aggiungi come secret nel repository GitHub

---

### 3. E2E Tests

**File**: `.github/workflows/e2e.yml`

**Scopo**: Testare l'applicazione in un ambiente reale (web).

**Trigger**:
- Push su `main`, `develop`
- Pull Request verso `main`
- Schedule: ogni giorno alle 2:00 UTC
- Esecuzione manuale

**Step**:
1. Build versione web (`expo export:web`)
2. Avvio server locale (porta 3000)
3. Installazione Playwright
4. Esecuzione test E2E
5. Screenshot in caso di failure
6. Upload artifacts

**Test inclusi**:
- Smoke test: verifica che l'app si carichi
- (Estendibile con test Playwright completi)

**Artifacts**:
- `e2e-test-results`: Report completi (30 giorni)
- `e2e-screenshots`: Screenshot di failure (7 giorni)

---

### 4. Notifications

**File**: `.github/workflows/notifications.yml`

**Scopo**: Inviare notifiche automatiche sui risultati dei workflow.

**Trigger**:
- Completamento di qualsiasi workflow CI/CD/E2E

**Funzionalità**:
- ✅ Emoji status (✅/❌/⚠️)
- 💬 Commento su PR in caso di failure
- 📊 Summary dettagliato
- 🔗 Link a workflow run

**Esempio notifica**:
```
❌ Workflow Failed: CI - Build and Test

Branch: feature/new-feature
Commit: abc123def
Run: #42

Please check the workflow logs for details.
```

---

## Setup e Configurazione

### 1. Configurazione Iniziale

I workflow sono già configurati in `.github/workflows/`. Non serve setup aggiuntivo per CI/E2E.

### 2. Abilitare Deploy su Expo

**Passo 1**: Crea account Expo
```bash
npm install -g expo-cli
expo login
```

**Passo 2**: Genera token
1. Vai su https://expo.dev/
2. Settings → Access Tokens
3. Crea nuovo token
4. Copia il token

**Passo 3**: Configura secrets GitHub
1. Vai su repository → Settings → Secrets and variables → Actions
2. Aggiungi:
   - `EXPO_TOKEN`: il token generato
   - `EXPO_USERNAME`: il tuo username Expo

**Passo 4**: Verifica
Push su `main` e controlla che il deploy parta automaticamente.

### 3. Configurazione Environment

Opzionale: crea environment su GitHub per staging/production.

1. Repository → Settings → Environments
2. Crea "staging" e "production"
3. Aggiungi protection rules (es: require reviews)

---

## Esecuzione Workflow

### Automatica

I workflow partono automaticamente secondo i trigger configurati:

- **Push su main**: CI + Deploy
- **Push su develop**: CI + E2E
- **Pull Request**: CI
- **Schedule**: E2E (giornaliero)

### Manuale

#### Deploy manuale

**Via GitHub UI**:
1. Vai su Actions
2. Seleziona "CD - Deploy to Staging"
3. Click "Run workflow"
4. Scegli environment
5. Click "Run workflow"

**Via GitHub CLI**:
```bash
gh workflow run deploy.yml -f environment=staging
```

#### E2E manuale

```bash
gh workflow run e2e.yml
```

### Locale

Per testare i workflow localmente:

```bash
# Installa act
brew install act  # macOS
# oppure
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Esegui workflow CI
act push

# Esegui workflow specifico
act -W .github/workflows/ci.yml
```

---

## Monitoraggio e Debug

### Visualizzare Status Workflow

**GitHub UI**:
1. Repository → Actions
2. Seleziona workflow
3. Click su run specifico

**Badge nel README**:
```markdown
![CI Status](https://github.com/user/repo/workflows/CI/badge.svg)
```

### Logs

**Accedere ai log**:
1. Actions → [Workflow] → [Run]
2. Click su job
3. Espandi step per vedere output

**Scaricare log**:
1. Run → ... → Download log archive

### Artifacts

**Scaricare artifacts**:
1. Run → Artifacts
2. Click su artifact name
3. Download ZIP

**Artifacts disponibili**:
- `test-results`: Coverage JSON, report
- `build-artifacts`: Build Expo
- `e2e-test-results`: Report E2E
- `e2e-screenshots`: Screenshot failure

### Debug Workflow

**Abilitare debug mode**:
1. Repository → Settings → Secrets
2. Aggiungi `ACTIONS_STEP_DEBUG` = `true`
3. Ri-esegui workflow

**Vedere variabili workflow**:
```yaml
- name: Debug
  run: |
    echo "Event: ${{ github.event_name }}"
    echo "Ref: ${{ github.ref }}"
    echo "SHA: ${{ github.sha }}"
```

---

## Best Practices

### 1. Branch Protection Rules

Configura protezioni per `main`:

1. Repository → Settings → Branches
2. Add rule per `main`
3. Abilita:
   - ✅ Require status checks (CI)
   - ✅ Require branches to be up to date
   - ✅ Require pull request reviews

### 2. Workflow Optimization

**Cache dipendenze**:
```yaml
- uses: actions/setup-node@v4
  with:
    cache: 'npm'  # Già configurato
```

**Parallel jobs**:
```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x]
```

**Conditional steps**:
```yaml
- name: Deploy
  if: github.ref == 'refs/heads/main'
```

### 3. Security

**Non committare secrets**:
- Usa GitHub Secrets
- File `.env` in `.gitignore`
- Secrets non visibili nei log

**Limita permissions**:
```yaml
permissions:
  contents: read
  pull-requests: write
```

### 4. Costi e Limiti

**GitHub Actions limits** (free tier):
- 2000 minuti/mese
- Concurrent jobs: 20
- Artifacts retention: 90 giorni max

**Ottimizzazioni**:
- Cache dipendenze
- `continue-on-error: true` per step opzionali
- Retention breve per artifacts grandi

---

## Troubleshooting

### Problema: Test falliscono in CI ma passano localmente

**Cause**:
- Differenze ambiente (Node version, OS)
- Cache npm corrotto
- Test non deterministici

**Soluzione**:
```bash
# In CI, aggiungi:
- run: npm ci --prefer-offline --no-audit
```

### Problema: Deploy fallisce con "Invalid token"

**Soluzione**:
1. Verifica `EXPO_TOKEN` nei secrets
2. Rigenera token su Expo
3. Aggiorna secret

### Problema: E2E timeout

**Cause**:
- Server web non si avvia
- Test troppo lenti

**Soluzione**:
```yaml
# Aumenta timeout
- run: npm run test:e2e
  timeout-minutes: 15
```

### Problema: Artifacts non trovati

**Causa**: Path errato o file non generati

**Soluzione**:
```yaml
# Debug: lista file
- run: ls -la coverage/
- uses: actions/upload-artifact@v4
  with:
    path: coverage/
    if-no-files-found: warn  # Invece di error
```

### Problema: Workflow non si avvia

**Causa**: YAML syntax error

**Soluzione**:
```bash
# Valida YAML localmente
yamllint .github/workflows/*.yml

# Oppure usa GitHub CLI
gh workflow view ci.yml
```

### Debug Generale

**Template step di debug**:
```yaml
- name: Debug Info
  run: |
    echo "=== Environment ==="
    env | sort
    echo "=== Files ==="
    ls -la
    echo "=== Node version ==="
    node --version
    npm --version
```

---

## 📚 Risorse

- [GitHub Actions Docs](https://docs.github.com/actions)
- [Expo Publish Guide](https://docs.expo.dev/workflow/publishing/)
- [Playwright Testing](https://playwright.dev/)
- [Jest Coverage](https://jestjs.io/docs/configuration#coveragethreshold-object)

---

## 🆘 Supporto

Per problemi o domande:

1. Controlla i log del workflow
2. Consulta questa documentazione
3. Apri una issue su GitHub
4. Contatta il team di sviluppo

---

**Ultima modifica**: Ottobre 2025  
**Versione**: 1.0  
**Autore**: GitHub Copilot Agent
