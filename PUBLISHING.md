# Publishing Instructions for Pincast SDK

This document provides step-by-step instructions for publishing the Pincast SDK to npm.

## Prerequisites

Before you begin, ensure you have the following:

1. **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
2. **npm Account**: You need to have an npm account. If you don’t have one, you can create it at [npmjs.com/signup](https://www.npmjs.com/signup).

## Steps to Publish

1. **Clone the Repository**:
   If you haven't already cloned the repository, do so using the following command:
```bash
   git clone https://github.com/your-username/pincast-sdk.git
   cd pincast-sdk
```

2. **Install Dependencies**: Make sure all dependencies are installed:

```bash
npm install
```

3. **Build the SDK**: Build the SDK to generate the dist/ directory:

```bash
npm run build
```

4. **Login to npm**: If you haven't logged in to npm from your command line, run:

```bash
npm login
```

5. **Update Version Number**: Make sure to update the version number in package.json according to Semantic Versioning. Increment the version number for your changes. For example:

```json
{
  "version": "1.0.1" // Update this line
}
```

6. Publish to npm: Now, publish your SDK to npm:

```bash
npm publish
```

7. Verify the Publication: After publishing, you can verify that your package is live on npm by visiting:

```perl
https://www.npmjs.com/package/pincast-sdk
```

## Additional Notes

If you encounter issues during the publish process, check the npm documentation for troubleshooting tips.
Always ensure that your package is in good shape and thoroughly tested before publishing.