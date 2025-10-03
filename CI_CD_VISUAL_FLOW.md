# CI/CD Pipeline Visualization - Docente Plus

Visual representation of the automated CI/CD pipeline.

---

## 🔄 Complete Pipeline Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEVELOPER WORKFLOW                            │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                         ┌─────────────────┐
                         │  Code Changes   │
                         │   git push      │
                         └────────┬────────┘
                                  │
                 ┌────────────────┼────────────────┐
                 │                │                │
                 ▼                ▼                ▼
        ┌────────────┐   ┌────────────┐  ┌────────────┐
        │ Feature    │   │  Develop   │  │    Main    │
        │  Branch    │   │   Branch   │  │   Branch   │
        └─────┬──────┘   └─────┬──────┘  └─────┬──────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────┐
│                         GITHUB ACTIONS                       │
└──────────────────────────────┼──────────────────────────────┘
                               │
                               ▼
                    ┌──────────────────┐
                    │   CI Workflow    │
                    │  (Build & Test)  │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
       ┌──────────┐   ┌──────────┐  ┌──────────┐
       │  Setup   │   │   Lint   │  │   Test   │
       │ Node.js  │   │  (opt.)  │  │ (116 t.) │
       │ npm ci   │   │          │  │ Coverage │
       └────┬─────┘   └────┬─────┘  └────┬─────┘
            │              │              │
            └──────────────┼──────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │  Build Expo  │
                    │    (web)     │
                    └──────┬───────┘
                           │
                  ┌────────┴────────┐
                  │                 │
                  ▼                 ▼
           ┌────────────┐    ┌────────────┐
           │  Archive   │    │   Upload   │
           │ Artifacts  │    │  Coverage  │
           └────────────┘    └────────────┘
                           │
                  ┌────────┴────────┐
                  │                 │
               ❌ FAIL           ✅ PASS
                  │                 │
                  │                 ▼
                  │         ┌───────────────┐
                  │         │  Main Branch? │
                  │         └───────┬───────┘
                  │                 │
                  │            ┌────┴────┐
                  │           NO         YES
                  │            │          │
                  │            ▼          ▼
                  │     ┌──────────┐  ┌──────────────┐
                  │     │   E2E    │  │ CD Workflow  │
                  │     │  Tests   │  │   (Deploy)   │
                  │     └──────────┘  └──────┬───────┘
                  │                           │
                  │                           ▼
                  │                  ┌────────────────┐
                  │                  │  Pre-deploy    │
                  │                  │  Test Check    │
                  │                  └────────┬───────┘
                  │                           │
                  │                    ┌──────┴──────┐
                  │                 ❌ FAIL       ✅ PASS
                  │                    │             │
                  │                    │             ▼
                  │                    │    ┌─────────────────┐
                  │                    │    │  Publish Expo   │
                  │                    │    │    (staging)    │
                  │                    │    └────────┬────────┘
                  │                    │             │
                  │                    │             ▼
                  │                    │    ┌─────────────────┐
                  │                    │    │  Create Deploy  │
                  │                    │    │    Summary      │
                  │                    │    └────────┬────────┘
                  │                    │             │
                  └────────────────────┴─────────────┘
                                       │
                                       ▼
                            ┌──────────────────┐
                            │   Notifications  │
                            │    Workflow      │
                            └────────┬─────────┘
                                     │
                         ┌───────────┴───────────┐
                         │                       │
                         ▼                       ▼
                  ┌──────────────┐      ┌──────────────┐
                  │ PR Comment   │      │   Summary    │
                  │ (on failure) │      │   Report     │
                  └──────────────┘      └──────────────┘
```

---

## 📊 Workflow Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      TRIGGER EVENTS                          │
└──────┬──────────────────┬─────────────────┬────────────────┘
       │                  │                 │
   Push/PR           Push main        Daily 2AM / Manual
       │                  │                 │
       ▼                  ▼                 ▼
┌─────────────┐    ┌─────────────┐   ┌─────────────┐
│   CI.yml    │    │ Deploy.yml  │   │  E2E.yml    │
│             │    │             │   │             │
│ • Checkout  │    │ • Checkout  │   │ • Checkout  │
│ • Install   │    │ • Install   │   │ • Install   │
│ • Lint      │    │ • Test ✓    │   │ • Build Web │
│ • Test      │    │ • Publish   │   │ • Start Srv │
│ • Build     │    │ • Notify    │   │ • E2E Tests │
│ • Upload    │    │             │   │ • Screenshots│
└──────┬──────┘    └──────┬──────┘   └──────┬──────┘
       │                  │                 │
       └──────────────────┴─────────────────┘
                          │
                          ▼
                ┌────────────────────┐
                │ Notifications.yml   │
                │                     │
                │ • Detect Status     │
                │ • Comment on PR     │
                │ • Create Summary    │
                └─────────────────────┘
```

---

## 🎯 Branch Strategy Integration

```
┌─────────────────────────────────────────────────────────────┐
│                      GIT BRANCHES                            │
└─────────────────────────────────────────────────────────────┘

feature/*          ──┐
copilot/*          ──┤
                     │  [PR Created]
                     │       │
                     │       ▼
                     │  ┌──────────┐
                     │  │    CI    │ ← Runs on PR
                     │  │  (Tests) │
                     └─→└────┬─────┘
                            │
                         ✅ Pass
                            │
                            ▼
                     ┌──────────────┐
develop  ────────────│    Merge     │
                     └──────┬───────┘
                            │
                            │  [CI + E2E]
                            │
                            ▼
                     ┌──────────────┐
                     │  Review OK?  │
                     └──────┬───────┘
                            │
                         ✅ Yes
                            │
                            ▼
main     ────────────┌──────────────┐
                     │    Merge     │
                     └──────┬───────┘
                            │
                ┌───────────┴───────────┐
                │                       │
                ▼                       ▼
         ┌──────────┐           ┌──────────┐
         │    CI    │           │  Deploy  │
         │  (Full)  │           │ Staging  │
         └──────────┘           └────┬─────┘
                                     │
                                     ▼
                              ┌─────────────┐
                              │ Expo Update │
                              │  Published  │
                              └─────────────┘
```

---

## 📦 Artifact Flow

```
┌─────────────┐
│  CI Build   │
└──────┬──────┘
       │
       ├─→ test-results (30 days)
       │   └─→ Coverage reports
       │       Code coverage JSON
       │
       └─→ build-artifacts (7 days)
           └─→ Expo web build
               Distribution files

┌─────────────┐
│  E2E Tests  │
└──────┬──────┘
       │
       ├─→ e2e-test-results (30 days)
       │   └─→ Test reports
       │       Playwright reports
       │
       └─→ e2e-screenshots (7 days)
           └─→ Failure screenshots
               Debug images
```

---

## ⏱️ Timeline View

```
Developer Action          GitHub Actions Response         Time
─────────────────────────────────────────────────────────────

git push
    │                              │
    ├─────────────────────────────→│
    │                              │ CI starts           t+0s
    │                              │
    │                              │ Setup Node.js       t+10s
    │                              │ Install deps        t+30s
    │                              │ Run tests           t+90s
    │                              │ Build app           t+120s
    │                              │ Upload artifacts    t+180s
    │                              │
    │←─────────────────────────────│
    │        ✅ CI Success             t+200s
    │                              │
    │                              │ (If main branch)
    │                              │ Deploy starts       t+210s
    │                              │ Run pre-deploy      t+240s
    │                              │ Publish to Expo     t+300s
    │                              │
    │←─────────────────────────────│
    │     🚀 Deploy Success            t+350s
    │                              │
    │                              │ E2E Tests start     t+360s
    │                              │ Build web           t+390s
    │                              │ Run tests           t+450s
    │                              │
    │←─────────────────────────────│
    │      ✅ E2E Success              t+500s
    │                              │
    │                              │ Notify workflow     t+510s
    │                              │
    │←─────────────────────────────│
Receives notification               t+520s
```

---

## 🔐 Security & Secrets Flow

```
┌─────────────────────────────────────────────────────┐
│           GitHub Repository Settings                 │
│                                                      │
│  Secrets & Variables → Actions                      │
│                                                      │
│  ┌────────────────┐        ┌──────────────┐        │
│  │  EXPO_TOKEN    │        │ EXPO_USERNAME│        │
│  │  (encrypted)   │        │  (encrypted) │        │
│  └────────┬───────┘        └──────┬───────┘        │
└───────────┼────────────────────────┼────────────────┘
            │                        │
            │    Access only in      │
            │   GitHub Actions       │
            │    workflows           │
            │                        │
            ▼                        ▼
┌──────────────────────────────────────────┐
│         deploy.yml Workflow              │
│                                          │
│  - uses: expo/expo-github-action@v8     │
│    with:                                 │
│      token: ${{ secrets.EXPO_TOKEN }}   │
│                                          │
│  - run: npx expo publish                │
│    env:                                  │
│      EXPO_TOKEN: ${{ secrets... }}      │
└──────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────┐
│          Expo Platform                    │
│                                           │
│  Authenticated publish to:                │
│  - Staging channel                        │
│  - Production channel                     │
└───────────────────────────────────────────┘
```

---

## 📈 Coverage & Quality Metrics

```
┌────────────────┐
│  Test Suite    │
│   116 tests    │
└───────┬────────┘
        │
        ├─→ Unit Tests (110 passing)
        │   ├─→ Database CRUD (18)
        │   ├─→ Backup/Restore (18)
        │   ├─→ Dashboard (18)
        │   ├─→ Materials (18)
        │   ├─→ Reports (18)
        │   └─→ Accessibility (18)
        │
        └─→ E2E Tests (Smoke)
            └─→ Web accessibility

        ↓ Coverage Report
        
┌────────────────────────────┐
│  Codecov Integration       │
│                            │
│  Upload: coverage-final.json│
│  Analyze: Code coverage    │
│  Report: PR comments       │
│  Track: Coverage trends    │
└────────────────────────────┘
```

---

## 🎨 User Experience Flow

```
Developer View:

1. Write Code
   └─→ 💻 Local development

2. Git Push
   └─→ 📤 Push to GitHub

3. Check Status
   └─→ 👀 View Actions tab
       └─→ See: ✅ All checks passed
       
4. Review PR
   └─→ 📋 Code review
       └─→ CI status visible
       └─→ Coverage report
       
5. Merge
   └─→ ✅ Merge PR

6. Auto-deploy
   └─→ 🚀 Staging updated
       └─→ 📱 Test on Expo

7. Monitor
   └─→ 📊 View metrics
       └─→ Check E2E results
```

---

## 🔄 Continuous Improvement Loop

```
┌──────────────────────────────────────────────────────┐
│                  Development Cycle                    │
└───────────────────────┬──────────────────────────────┘
                        │
                        ▼
                ┌───────────────┐
                │  Code Change  │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │   CI Build    │
                └───────┬───────┘
                        │
                   ┌────┴────┐
                   │         │
                ❌ Fail   ✅ Pass
                   │         │
                   │         ▼
                   │    ┌─────────┐
                   │    │  Tests  │
                   │    └────┬────┘
                   │         │
                   │    ┌────┴────┐
                   │    │         │
                   │ ❌ Fail   ✅ Pass
                   │    │         │
                   │    │         ▼
                   │    │    ┌─────────┐
                   │    │    │ Deploy  │
                   │    │    └────┬────┘
                   │    │         │
                   │    │         ▼
                   │    │    ┌─────────┐
                   │    │    │   E2E   │
                   │    │    └────┬────┘
                   │    │         │
                   │    │    ┌────┴────┐
                   │    │    │         │
                   │    │ ❌ Fail   ✅ Pass
                   │    │    │         │
                   └────┴────┴─────────┘
                        │
                        ▼
                ┌───────────────┐
                │  Analyze &    │
                │  Improve      │
                └───────┬───────┘
                        │
                        ▼
                ┌───────────────┐
                │  Next Change  │
                └───────────────┘
```

---

**Visual Guide Version**: 1.0  
**Created**: October 2025  
**For**: Docente Plus CI/CD Pipeline
