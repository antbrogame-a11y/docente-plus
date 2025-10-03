# CI/CD Quick Start Guide

Get your CI/CD pipeline running in 5 minutes!

---

## 🚀 Step-by-Step Setup

### Step 1: Merge This PR (1 minute)

```bash
# Review the PR and merge it to main
# The CI workflow will run automatically on merge!
```

**What happens:**
- ✅ CI workflow runs
- ✅ Tests execute
- ✅ Build completes
- ✅ Deploy triggers (if secrets configured)

---

### Step 2: Configure Expo Secrets (2 minutes) - OPTIONAL

Only needed if you want automatic deployment to Expo.

#### Get Expo Token

1. Go to https://expo.dev/
2. Sign in or create account
3. Go to **Settings** → **Access Tokens**
4. Click **Create Token**
5. Give it a name (e.g., "GitHub Actions")
6. Copy the token (**save it now - you can't see it again!**)

#### Add Secrets to GitHub

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add these secrets:

```
Name: EXPO_TOKEN
Value: [paste your token]
```

```
Name: EXPO_USERNAME
Value: [your expo username]
```

5. Click **Add secret** for each

**Done!** Deploy workflow is now active.

---

### Step 3: View Your First Workflow Run (1 minute)

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You'll see workflows running
4. Click on a workflow to see details

**Expected workflows:**
- ✅ CI - Build and Test
- ✅ E2E Tests (if triggered)
- ✅ CD - Deploy to Staging (if on main with secrets)

---

### Step 4: Add Status Badges (1 minute)

After first workflow run, update README with real badge URLs:

```markdown
![CI Status](https://github.com/antbrogame-a11y/docente-plus/workflows/CI%20-%20Build%20and%20Test/badge.svg)
```

The badges in README are already there - they'll activate automatically!

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] CI workflow ran successfully
- [ ] All tests passed
- [ ] Build completed
- [ ] Badges show "passing" status
- [ ] (Optional) Deploy to staging worked
- [ ] (Optional) E2E tests executed

---

## 🎯 Daily Workflow

### For Regular Development

```bash
# 1. Create feature branch
git checkout -b feature/my-feature

# 2. Make changes
# ... edit files ...

# 3. Test locally first!
npm test

# 4. Commit and push
git add .
git commit -m "Add my feature"
git push -u origin feature/my-feature

# 5. Create PR on GitHub
# CI will run automatically

# 6. Wait for green checkmark ✅
# Fix any issues if tests fail

# 7. Get review and merge
# Deploy happens automatically!
```

### Checking CI Status

**In PR:**
- Look for ✅ or ❌ next to commit
- Click "Details" to see logs
- Read error messages if failed

**In Actions tab:**
- See all workflow runs
- Download artifacts
- Re-run failed workflows

---

## 🐛 Troubleshooting

### CI Workflow Not Running?

**Check:**
- Is workflow file in `.github/workflows/`?
- Did you push to correct branch?
- Is repository permissions set to allow Actions?

**Fix:**
```bash
# Enable Actions
Repository → Settings → Actions → Allow all actions
```

### Tests Failing in CI?

**Most common causes:**
1. Tests pass locally but fail in CI
   - Different Node version
   - Missing dependencies
   - Environment differences

**Quick fix:**
```bash
# Clean install and test
rm -rf node_modules package-lock.json
npm install
npm test
```

### Deploy Not Working?

**Check:**
- Are secrets configured?
- Is EXPO_TOKEN valid?
- Is EXPO_USERNAME correct?

**Verify secrets:**
```bash
Repository → Settings → Secrets → Actions
# Should see EXPO_TOKEN and EXPO_USERNAME
```

### E2E Tests Failing?

**Common issues:**
- Server didn't start
- Port already in use
- Tests timeout

**Usually auto-fixes on retry!**

---

## 📚 Learn More

### Documentation

- **Quick Reference**: [CI_CD_QUICK_REF.md](CI_CD_QUICK_REF.md)
- **Complete Guide**: [CI_CD_GUIDE.md](CI_CD_GUIDE.md)
- **Visual Diagrams**: [CI_CD_VISUAL_FLOW.md](CI_CD_VISUAL_FLOW.md)
- **Branch Protection**: [.github/BRANCH_PROTECTION.md](.github/BRANCH_PROTECTION.md)

### Common Commands

```bash
# Run tests locally
npm test

# Run tests with coverage
npm run test:coverage

# Build web app
npm run build:web

# Run E2E smoke test
npm run test:e2e

# View workflow runs (GitHub CLI)
gh run list

# Download artifacts
gh run download [run-id]
```

---

## 🎉 You're All Set!

Your CI/CD pipeline is now:
- ✅ Running on every push
- ✅ Testing automatically
- ✅ Deploying on merge
- ✅ Notifying on issues

**Next time you push code:**
1. CI will run automatically
2. You'll get immediate feedback
3. Merge will deploy to staging
4. Everyone stays confident!

---

## 💡 Pro Tips

### Before Every Commit

```bash
# Run this checklist
npm test              # Tests pass?
npm run lint          # Code clean? (if available)
git status            # All files staged?
git diff --cached     # Changes correct?
```

### Viewing Logs

```bash
# In GitHub UI
Actions → [workflow] → [run] → [job] → [step]

# Or use CLI
gh run view [run-id]
gh run view [run-id] --log
```

### Manual Workflows

```bash
# Trigger deploy manually
Actions → CD - Deploy to Staging → Run workflow

# Trigger E2E manually
Actions → E2E Tests → Run workflow
```

### Branch Protection (Recommended)

```bash
# After CI works, add protection to main:
Settings → Branches → Add rule

Required checks:
✅ build-and-test
✅ e2e-web (optional)
```

---

## 🆘 Need Help?

1. **Check workflow logs** in Actions tab
2. **Read the docs** in this repo
3. **Open an issue** if stuck
4. **Ask in PR comments** for help

---

## 📊 What's Running?

### On Every Push/PR
- Build code ✅
- Run 116 tests ✅
- Generate coverage ✅
- Create artifacts ✅

### On Main Branch
- Everything above ✅
- Deploy to staging ✅
- E2E tests ✅
- Notify team ✅

### Daily (2 AM UTC)
- E2E regression tests ✅
- Screenshot failures ✅

---

**Quick Start Guide Version**: 1.0  
**Last Updated**: October 2025  
**Estimated Setup Time**: 5 minutes  

**Ready? Let's go! 🚀**
