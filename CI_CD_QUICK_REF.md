# CI/CD Workflow Quick Reference

Quick reference for working with GitHub Actions workflows in this project.

---

## 📊 Workflow Overview

| Workflow | Trigger | Purpose | Duration |
|----------|---------|---------|----------|
| **CI - Build and Test** | Push/PR | Verify code quality | ~3-5 min |
| **CD - Deploy** | Push to main | Deploy to Expo | ~5-7 min |
| **E2E Tests** | Push/Schedule | End-to-end testing | ~5-10 min |
| **Notifications** | Workflow completion | Send alerts | ~30 sec |

---

## 🚀 Common Commands

### Run Tests Locally

```bash
# Unit tests
npm test

# Unit tests with coverage
npm run test:coverage

# Watch mode for development
npm run test:watch

# E2E smoke test
npm run test:e2e
```

### Build Locally

```bash
# Build web version
npm run build:web

# Serve locally
npm run serve:web

# Start Expo
npm start
```

### Check CI Status

```bash
# Using GitHub CLI
gh run list
gh run view [run-id]
gh run watch

# Download artifacts
gh run download [run-id]
```

---

## 🔧 Workflow Files

```
.github/workflows/
├── ci.yml              # Build + Test on every push/PR
├── deploy.yml          # Deploy to Expo on main
├── e2e.yml            # E2E tests (web platform)
└── notifications.yml   # Notify on workflow completion
```

---

## ✅ Pre-Commit Checklist

Before pushing code, ensure:

- [ ] `npm test` passes locally
- [ ] Code follows project style
- [ ] No sensitive data in code
- [ ] `.env` not committed (in `.gitignore`)
- [ ] Dependencies updated if needed
- [ ] Documentation updated if needed

---

## 📝 Workflow Lifecycle

### For Pull Requests

```
1. Create branch → 2. Make changes → 3. Push
                                        ↓
                                    4. CI runs
                                        ↓
                              (Tests + Build + Lint)
                                        ↓
                           5. Review results in PR
                                        ↓
                              6. Merge when green ✅
                                        ↓
                              7. Deploy runs (main)
```

### For Main Branch

```
Push to main → CI runs → Tests pass → Deploy to staging → E2E tests
                  ↓           ↓             ↓                ↓
              ❌ Fail    ❌ Fail       ❌ Fail          ❌ Fail
                  ↓           ↓             ↓                ↓
              Fix code   Fix tests    Check deploy     Fix E2E
```

---

## 🐛 Debug Failed Workflow

### Step 1: Check Logs

1. Go to **Actions** tab
2. Click on failed workflow
3. Click on failed job
4. Expand failed step
5. Read error message

### Step 2: Reproduce Locally

```bash
# Try to reproduce the error
npm ci          # Install exact versions
npm test        # Run tests
npm run build:web  # Build

# Check specific test
npm test -- __tests__/[test-file].test.js
```

### Step 3: Common Fixes

**Tests fail in CI but pass locally?**
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm test
```

**Build fails?**
```bash
# Check Node version
node --version  # Should be 18.x

# Clean install
npm ci
```

**Deploy fails?**
```bash
# Check secrets are set:
# Repository → Settings → Secrets → Actions
# - EXPO_TOKEN
# - EXPO_USERNAME
```

---

## 📦 Artifacts

Workflows generate artifacts you can download:

| Artifact | Content | Retention | Size |
|----------|---------|-----------|------|
| `test-results` | Coverage, reports | 30 days | ~1 MB |
| `build-artifacts` | Expo build | 7 days | ~10 MB |
| `e2e-test-results` | E2E reports | 30 days | ~5 MB |
| `e2e-screenshots` | Failure screenshots | 7 days | ~2 MB |

**Download artifacts**:
1. Actions → [Run] → Artifacts
2. Click artifact name to download

---

## 🔔 Notifications

You'll receive notifications when:

- ✅ Workflow succeeds
- ❌ Workflow fails
- ⚠️ Workflow has warnings

**Where**:
- GitHub UI (bell icon)
- Email (if configured)
- PR comments (on failure)

**Configure**:
- GitHub → Settings → Notifications
- Choose notification preferences

---

## 🎯 Best Practices

### For Contributors

1. **Always run tests locally** before pushing
2. **Keep PRs small** for faster CI
3. **Check CI status** before requesting review
4. **Fix CI failures** immediately
5. **Don't skip tests** in CI

### For Maintainers

1. **Require CI checks** for merging
2. **Review failed runs** promptly
3. **Keep workflows updated**
4. **Monitor usage** (GitHub Actions minutes)
5. **Archive old artifacts** if needed

---

## 📚 Learn More

- **GitHub Actions**: https://docs.github.com/actions
- **Expo CI**: https://docs.expo.dev/build/building-on-ci/
- **Jest**: https://jestjs.io/
- **Project CI/CD Guide**: [CI_CD_GUIDE.md](CI_CD_GUIDE.md)

---

## 🆘 Need Help?

1. Read [CI_CD_GUIDE.md](CI_CD_GUIDE.md)
2. Check workflow logs
3. Ask in PR comments
4. Open an issue

---

**Quick Links**:
- [View all workflows](../../actions)
- [Repository settings](../../settings)
- [CI/CD Guide](CI_CD_GUIDE.md)
