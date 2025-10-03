# Branch Protection Configuration

This document explains how to configure branch protection rules to require CI/CD checks before merging.

---

## 🔒 Recommended Branch Protection for `main`

Configure these settings in: **Repository → Settings → Branches → Add rule**

### Branch name pattern
```
main
```

### Protection Rules

#### ✅ Required (Recommended)

- [x] **Require a pull request before merging**
  - [x] Require approvals: **1**
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners (if applicable)

- [x] **Require status checks to pass before merging**
  - [x] Require branches to be up to date before merging
  - **Required status checks:**
    - `build-and-test` (from CI workflow)
    - `e2e-web` (from E2E workflow) - optional but recommended

- [x] **Require conversation resolution before merging**
  - All review comments must be resolved

- [x] **Do not allow bypassing the above settings**
  - Applies to administrators too (recommended for production)

#### ⚠️ Optional (Based on team needs)

- [ ] **Require signed commits**
  - If your team uses commit signing

- [ ] **Require linear history**
  - Forces squash or rebase merges

- [ ] **Require deployments to succeed before merging**
  - If you want staging deploy to succeed first

- [ ] **Lock branch**
  - Only for final production releases

---

## 🔧 Branch Protection for `develop`

Less strict rules for development branch:

### Branch name pattern
```
develop
```

### Protection Rules

- [x] **Require a pull request before merging**
  - [x] Require approvals: **1**

- [x] **Require status checks to pass before merging**
  - **Required status checks:**
    - `build-and-test`

---

## 📋 Status Check Names

These are the job names from your workflows that will appear as status checks:

### From `ci.yml`:
- `build-and-test` - Main CI build and test job

### From `e2e.yml`:
- `e2e-web` - E2E tests on web platform
- `e2e-summary` - E2E test summary (informational)

### From `deploy.yml`:
- `deploy` - Deployment job (only runs on main)

**Note**: Status checks only appear after the workflow runs at least once. Push this PR to populate the list.

---

## 🚀 Quick Setup Guide

### Step 1: Navigate to Settings
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Branches** in left sidebar

### Step 2: Add Branch Protection Rule
1. Click **Add rule** button
2. Enter branch name: `main`
3. Check the boxes as shown above
4. Scroll down and click **Create**

### Step 3: Add Status Checks
1. After first workflow run, edit the rule
2. In "Require status checks", search for:
   - `build-and-test`
   - `e2e-web` (optional)
3. Click the checks to add them
4. Save changes

### Step 4: Test Protection
1. Create a test PR
2. Try to merge without approvals → Should be blocked
3. Try to merge with failing tests → Should be blocked
4. Approve and pass tests → Should allow merge

---

## 💡 Best Practices

### For Small Teams (1-3 developers)
```yaml
Require PR: Yes
Required approvals: 1
Require status checks: Yes
  - build-and-test
Allow bypass: Yes (for emergencies)
```

### For Medium Teams (4-10 developers)
```yaml
Require PR: Yes
Required approvals: 1-2
Require status checks: Yes
  - build-and-test
  - e2e-web
Require up-to-date branches: Yes
Allow bypass: No
```

### For Large Teams (10+ developers)
```yaml
Require PR: Yes
Required approvals: 2
Require status checks: Yes
  - build-and-test
  - e2e-web
Require code owner reviews: Yes
Require up-to-date branches: Yes
Require conversation resolution: Yes
Allow bypass: No (even for admins)
```

---

## 🔓 Emergency Procedures

If you need to bypass protection rules in an emergency:

### Option 1: Use admin override (if enabled)
1. Admin merges PR directly
2. Document why in commit message

### Option 2: Temporarily disable protection
1. Settings → Branches → Edit rule
2. Uncheck "Do not allow bypassing"
3. Merge urgent fix
4. **Re-enable protection immediately**

### Option 3: Use hotfix workflow
```bash
# Create hotfix branch from main
git checkout main
git checkout -b hotfix/critical-fix

# Make fix
# ...

# Push and create PR
git push -u origin hotfix/critical-fix

# Request emergency review
# Merge after single approval
```

---

## 📊 Monitoring Protection Rules

### Check who can bypass
Settings → Branches → View rule → "People who can bypass"

### View merge history
Insights → Network → Filter by branch

### Audit protection changes
Settings → Branches → Rule history

---

## 🎯 Workflow-Specific Configurations

### For CI Workflow
```yaml
Status check: build-and-test
Required: ✅ Yes
Description: Ensures all tests pass and code builds
Timeout: 5 minutes typical
```

### For E2E Workflow
```yaml
Status check: e2e-web
Required: ⚠️ Optional (can be slow)
Description: End-to-end tests on web platform
Timeout: 10 minutes typical
```

### For Deploy Workflow
```yaml
Status check: deploy
Required: ❌ No (runs after merge)
Description: Deployment to staging
Runs: On main branch only
```

---

## 🔍 Troubleshooting

### Status checks not appearing?
1. Ensure workflows have run at least once
2. Check workflow names match job names
3. Refresh the branch protection page

### Can't merge even with passing checks?
1. Verify branch is up to date
2. Check all conversations resolved
3. Ensure required approvals received

### Status check stuck "pending"?
1. Check Actions tab for running workflows
2. Look for workflow errors
3. Re-run workflow if needed

---

## 📚 Additional Resources

- [GitHub Branch Protection Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)
- [Required Status Checks](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches#require-status-checks-before-merging)
- [GitHub Actions Status](https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge)

---

**Configuration Guide Version**: 1.0  
**Last Updated**: October 2025  
**For**: Docente Plus Repository
