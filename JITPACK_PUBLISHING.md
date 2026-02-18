# Publishing LinkIO-Android to JitPack

This guide explains how to publish the LinkIO-Android SDK to JitPack so it can be used as a dependency.

## Prerequisites

- LinkIO-Android repository on GitHub: `https://github.com/pt-nakul-sharma/LinkIO-Android`
- Repository must be public
- Must have a valid `build.gradle` with Android Library configuration

## Steps to Publish

### 1. Ensure Your build.gradle is Correct

Your `LinkIO-Android/build.gradle` should have:

```gradle
plugins {
    id 'com.android.library'
    id 'maven-publish'
}

group = 'com.github.pt-nakul-sharma'

android {
    compileSdkVersion 35
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 35
        versionCode 1
        versionName "1.0.0"
    }
}

afterEvaluate {
    publishing {
        publications {
            release(MavenPublication) {
                from components.release
                groupId = 'com.github.pt-nakul-sharma'
                artifactId = 'linkio-android'
                version = android.defaultConfig.versionName
            }
        }
    }
}
```

### 2. Create a GitHub Release

```bash
cd LinkIO-Android

# Create a tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag
git push origin v1.0.0
```

Or create a release via GitHub UI:
1. Go to https://github.com/pt-nakul-sharma/LinkIO-Android/releases
2. Click "Create a new release"
3. Tag version: `v1.0.0` (or `1.0.0`)
4. Release title: `v1.0.0`
5. Description: Release notes
6. Click "Publish release"

### 3. Trigger JitPack Build

JitPack builds your library automatically when:
- You create a Git tag/release
- Someone requests the dependency for the first time

Visit: https://jitpack.io/#pt-nakul-sharma/LinkIO-Android

Click "Get it" on your version to trigger the build.

### 4. Verify Publication

Check build status at: https://jitpack.io/#pt-nakul-sharma/LinkIO-Android

Build logs will show if there are any issues.

### 5. Use in Projects

Once published, users can use it:

```gradle
repositories {
    maven { url 'https://jitpack.io' }
}

dependencies {
    implementation 'com.github.pt-nakul-sharma:LinkIO-Android:1.0.0'
    // Or use latest version
    implementation 'com.github.pt-nakul-sharma:LinkIO-Android:+'
}
```

## Troubleshooting

### Build Failed on JitPack

1. Check build logs: https://jitpack.io/#pt-nakul-sharma/LinkIO-Android
2. Ensure `build.gradle` has `maven-publish` plugin
3. Verify repository is public
4. Check that tag exists on GitHub

### Dependency Not Found

1. Verify the group ID: `com.github.pt-nakul-sharma`
2. Check artifact name: `LinkIO-Android`
3. Ensure version/tag exists
4. Wait a few minutes for JitPack to index

### Version Updates

To release a new version:

```bash
# Update version in build.gradle
# Commit changes
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

JitPack will automatically build the new version.

## Best Practices

1. **Use Semantic Versioning**: v1.0.0, v1.1.0, v2.0.0
2. **Create Release Notes**: Document changes in each release
3. **Test Before Tagging**: Ensure build works locally first
4. **Don't Delete Tags**: JitPack caches builds by tag

## Links

- JitPack Dashboard: https://jitpack.io/#pt-nakul-sharma/LinkIO-Android
- JitPack Docs: https://jitpack.io/docs/
- Android Library Guide: https://jitpack.io/docs/ANDROID/
