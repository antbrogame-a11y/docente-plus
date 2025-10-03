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

## ✅ Verification & Daily Workflow

### After Setup
- [ ] CI workflow ran successfully
- [ ] All tests passed
- [ ] Build completed
- [ ] Badges show "passing" status

### Regular Development
```bash
# 1. Create branch, make changes
git checkout -b feature/my-feature

# 2. Test locally first!
npm test

# 3. Commit and push
git add .
git commit -m "Add my feature"
git push -u origin feature/my-feature

# 4. Create PR - CI runs automatically
# 5. Wait for ✅, fix issues if needed
# 6. Merge - deploys automatically
```

---

## 🐛 Troubleshooting

### CI Not Running?
```bash
# Enable Actions
Repository → Settings → Actions → Allow all actions
```

### Tests Failing?
```bash
# Clean install and test
rm -rf node_modules package-lock.json
npm install
npm test
```

### Deploy Not Working?
Check secrets: `Repository → Settings → Secrets → Actions`

**For detailed troubleshooting, see [CI_CD_GUIDE.md](CI_CD_GUIDE.md)**

---

## 📚 Learn More

- **Quick Reference**: [CI_CD_QUICK_REF.md](CI_CD_QUICK_REF.md)
- **Complete Guide**: [CI_CD_GUIDE.md](CI_CD_GUIDE.md)
- **Visual Diagrams**: [CI_CD_VISUAL_FLOW.md](CI_CD_VISUAL_FLOW.md)

---

## 🎉 You're All Set!

Your CI/CD pipeline is now:
- ✅ Running on every push
- ✅ Testing automatically
- ✅ Deploying on merge

**Next time you push code, CI will run automatically!** 🚀
