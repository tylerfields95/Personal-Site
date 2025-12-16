# Client Deployment Guide
**AWS S3 + CloudFront Deployment**

This guide covers deploying new Angular client code to the production AWS infrastructure.

---

## Prerequisites

### Required Tools
- [ ] AWS CLI installed and configured
- [ ] pnpm package manager installed
- [ ] Git repository access
- [ ] AWS CLI user credentials (`cli-user`)

### Required AWS Permissions
The `cli-user` IAM user needs:
- **S3**: Full access to `ng-personal-site-s3` bucket
- **CloudFront**: `CreateInvalidation` permission for distribution `E11RNU6WXD7TXR`

### Verify AWS Configuration
```bash
# Check you're signed in as cli-user
aws sts get-caller-identity

# Expected output:
# {
#     "UserId": "AIDAYNL33UW22VZC42HXS",
#     "Account": "578469733813",
#     "Arn": "arn:aws:iam::578469733813:user/cli-user"
# }
```

---

## Deployment Process

### Step 1: Build the Application

Navigate to the project root and run the production build:

```bash
pnpm build
```

**What this does:**
- Compiles TypeScript to JavaScript
- Bundles and minifies all code
- Optimizes assets and images
- Generates content-hashed file names
- Creates production build in `apps/ng-personal-site/dist/ng-personal-site/`

**Expected output structure:**
```
apps/ng-personal-site/dist/ng-personal-site/
├── browser/                    # Main build artifacts
│   ├── index.html
│   ├── main-[hash].js
│   ├── styles-[hash].css
│   ├── polyfills-[hash].js
│   ├── assets/
│   ├── media/
│   └── favicon.ico
├── 3rdpartylicenses.txt
└── prerendered-routes.json
```

**Build time:** Typically 30-60 seconds

---

### Step 2: Sync to S3 Bucket

Navigate to the build output directory and sync files to S3:

```bash
cd apps/ng-personal-site/dist/ng-personal-site
```

**Sync browser contents and root files:**
```bash
aws s3 sync browser/ s3://ng-personal-site-s3/ --delete && \
aws s3 cp 3rdpartylicenses.txt s3://ng-personal-site-s3/ && \
aws s3 cp prerendered-routes.json s3://ng-personal-site-s3/
```

**What this does:**
- `sync browser/`: Uploads all files from browser folder to S3 root
- `--delete`: Removes files from S3 that no longer exist locally (important for cache busting)
- `cp 3rdpartylicenses.txt`: Copies license file to S3 root
- `cp prerendered-routes.json`: Copies route configuration to S3 root

**Upload time:** Typically 30-90 seconds depending on file changes

**Expected output:**
```
upload: browser/main-[hash].js to s3://ng-personal-site-s3/main-[hash].js
upload: browser/index.html to s3://ng-personal-site-s3/index.html
upload: browser/styles-[hash].css to s3://ng-personal-site-s3/styles-[hash].css
delete: s3://ng-personal-site-s3/main-[old-hash].js
...
```

---

### Step 3: Invalidate CloudFront Cache

After uploading to S3, invalidate the CloudFront cache to make changes live immediately:

```bash
# Navigate back to project root (if needed)
cd ../../..

# Create cache invalidation
aws cloudfront create-invalidation --distribution-id E11RNU6WXD7TXR --paths "/*"
```

**What this does:**
- Tells CloudFront to clear all cached files (`/*` = wildcard for all paths)
- Forces CloudFront to fetch fresh content from S3
- Without this, CloudFront serves old cached versions for up to 24 hours

**Expected output:**
```json
{
    "Location": "https://cloudfront.amazonaws.com/2020-05-31/distribution/E11RNU6WXD7TXR/invalidation/[ID]",
    "Invalidation": {
        "Id": "I[UNIQUE_ID]",
        "Status": "InProgress",
        "CreateTime": "[TIMESTAMP]",
        "InvalidationBatch": {
            "Paths": {
                "Quantity": 1,
                "Items": ["/*"]
            },
            "CallerReference": "cli-[timestamp]"
        }
    }
}
```

**Invalidation time:** Typically completes in 1-5 minutes

---

### Step 4: Verify Deployment

#### Check Invalidation Status
```bash
aws cloudfront get-invalidation \
  --distribution-id E11RNU6WXD7TXR \
  --id [INVALIDATION_ID]
```

Wait until `"Status": "Completed"`

#### Test the Live Site
1. Visit https://tylerfields.me in a **private/incognito browser window**
2. Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Check browser DevTools → Network tab for new file hashes
4. Verify your changes are visible

---

## Complete Deployment Script

For convenience, here's a single script to run all steps:

```bash
# From project root
pnpm build && \
cd apps/ng-personal-site/dist/ng-personal-site && \
aws s3 sync browser/ s3://ng-personal-site-s3/ --delete && \
aws s3 cp 3rdpartylicenses.txt s3://ng-personal-site-s3/ && \
aws s3 cp prerendered-routes.json s3://ng-personal-site-s3/ && \
cd ../../../.. && \
aws cloudfront create-invalidation --distribution-id E11RNU6WXD7TXR --paths "/*"
```

---

## Troubleshooting

### Build Fails
**Symptom:** `pnpm build` exits with errors

**Solutions:**
1. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules
   pnpm install
   ```
2. Check for TypeScript errors:
   ```bash
   pnpm run lint
   ```
3. Verify all dependencies are installed

### S3 Sync Permission Denied
**Symptom:** `AccessDenied` error during S3 sync

**Solutions:**
1. Verify you're signed in as cli-user:
   ```bash
   aws sts get-caller-identity
   ```
2. Check IAM permissions in AWS Console
3. Ensure bucket policy allows your IAM user

### CloudFront Invalidation Permission Denied
**Symptom:** `AccessDenied` when creating invalidation

**Solutions:**
1. Verify cli-user has `cloudfront:CreateInvalidation` permission
2. Add CloudFront permissions in IAM Console
3. Wait a few minutes for IAM policy changes to propagate

### Changes Not Visible on Site
**Symptom:** Old version still showing after deployment

**Solutions:**
1. Check invalidation status (should be "Completed")
2. Hard refresh browser: `Ctrl+F5` or `Cmd+Shift+R`
3. Clear browser cache completely
4. Try incognito/private browsing window
5. Wait 5-10 minutes for full CloudFront propagation
6. Verify correct files uploaded to S3:
   ```bash
   aws s3 ls s3://ng-personal-site-s3/
   ```

### Wrong Files in S3
**Symptom:** Missing files or incorrect directory structure

**Solution:**
Files should be at S3 root level:
```
s3://ng-personal-site-s3/
├── index.html              ← At root, not in browser/ subfolder
├── main-[hash].js
├── styles-[hash].css
├── assets/
└── ...
```

If files are nested, delete and re-sync:
```bash
aws s3 rm s3://ng-personal-site-s3/ --recursive
# Then run sync again
```

---

## AWS Resource Reference

### S3 Bucket
- **Name:** `ng-personal-site-s3`
- **Region:** us-east-1
- **Purpose:** Static website hosting
- **Public Access:** Enabled (for CloudFront)

### CloudFront Distribution
- **ID:** `E11RNU6WXD7TXR`
- **Domain:** `d1r31viq8pw82m.cloudfront.net`
- **Custom Domain:** `tylerfields.me` (via Route 53)
- **SSL Certificate:** ACM cert in us-east-1

### Route 53
- **Hosted Zone:** `tylerfields.me`
- **Record:** A record (alias) → CloudFront distribution

---

## Best Practices

### Before Deployment
- [ ] Test locally with `pnpm start`
- [ ] Run linter: `pnpm run lint`
- [ ] Commit all changes to git
- [ ] Update version in release notes (if major release)

### During Deployment
- [ ] Build with production configuration
- [ ] Verify build output before uploading
- [ ] Use `--delete` flag to remove old files
- [ ] Always invalidate CloudFront after S3 sync

### After Deployment
- [ ] Wait for invalidation to complete
- [ ] Test in incognito/private browser
- [ ] Verify all routes work
- [ ] Check browser console for errors
- [ ] Test theme toggle functionality
- [ ] Verify images load correctly

### Version Control
- [ ] Tag release in git: `git tag v1.x.x`
- [ ] Push tags: `git push --tags`
- [ ] Update release notes
- [ ] Document deployment in commit message

---

## Deployment Checklist

Use this checklist for each deployment:

```markdown
## Deployment Checklist - [Date]

### Pre-Deployment
- [ ] All changes committed to git
- [ ] Tests passing (if applicable)
- [ ] Local build successful
- [ ] Release notes updated

### Build
- [ ] `pnpm build` completed successfully
- [ ] Build output verified in dist/ folder
- [ ] No build warnings/errors

### Upload
- [ ] S3 sync completed without errors
- [ ] Old files removed (--delete flag used)
- [ ] License and route files copied

### Cache Invalidation
- [ ] CloudFront invalidation created
- [ ] Invalidation ID recorded: [ID]
- [ ] Invalidation status: Completed

### Verification
- [ ] Site loads at https://tylerfields.me
- [ ] New changes visible
- [ ] No console errors
- [ ] All routes functional
- [ ] Images loading correctly
- [ ] Theme toggle working

### Post-Deployment
- [ ] Git tag created (if version release)
- [ ] Changes documented
- [ ] Team notified (if applicable)
```

---

## Quick Reference

### Common Commands

```bash
# Build
pnpm build

# S3 Sync (from project root)
cd apps/ng-personal-site/dist/ng-personal-site && \
aws s3 sync browser/ s3://ng-personal-site-s3/ --delete && \
aws s3 cp 3rdpartylicenses.txt s3://ng-personal-site-s3/ && \
aws s3 cp prerendered-routes.json s3://ng-personal-site-s3/ && \
cd ../../../..

# CloudFront Invalidation
aws cloudfront create-invalidation --distribution-id E11RNU6WXD7TXR --paths "/*"

# Check Invalidation Status
aws cloudfront get-invalidation --distribution-id E11RNU6WXD7TXR --id [ID]

# List S3 Contents
aws s3 ls s3://ng-personal-site-s3/

# Check AWS Identity
aws sts get-caller-identity
```

---

## Support & Resources

### AWS Documentation
- [S3 Static Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)
- [CloudFront Invalidation](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html)
- [AWS CLI S3 Commands](https://docs.aws.amazon.com/cli/latest/reference/s3/)

### Project Documentation
- Release Notes: `apps/ng-personal-site/release-notes/`
- Architecture Review: (in conversation with Claude)
---

**Last Updated:** December 16, 2025
**Version:** 1.0.0
