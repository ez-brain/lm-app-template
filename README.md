# Developer Guide - Next.js App Template

This is a template for creating containerized Next.js applications with a specific port and path identifier. The default identifier is `13000`, which is used for both the port number and the URL path.

## 🚀 Automated Setup (Recommended)

The easiest way to customize this template is to use the provided setup script:

```bash
./start-here-dev.sh
```

This interactive script will:

- Ask for your app identifier (port number)
- Ask for your app name, title, and description
- Automatically update all necessary files
- Provide next steps for running your app

### What the Script Does

1. Renames the route folder from `13000` to your identifier
2. Updates all path references in the code
3. Updates the Next.js configuration for production asset paths
4. Updates the Dockerfile with your port
5. Updates the app metadata (title, description)
6. Updates package.json with your app name
7. Creates a .env.local file with your configuration

## 🎯 Manual Setup - Changing the App Identifier

If you prefer to make changes manually, here's what needs to be updated:

### Files to Update

Here's a checklist of all locations where you need to change `13000` to your identifier:

#### 1. **Route Structure**

📁 `/app/lm-app/13000/` → `/app/lm-app/YOUR_ID/`

- Rename the folder from `13000` to your identifier
- This changes the URL path from `/lm-app/13000` to `/lm-app/YOUR_ID`

#### 2. **Page Component**

📄 `/app/lm-app/YOUR_ID/page.tsx`

```typescript
// Update the welcome message
Welcome to your Next.js app at /lm-app/YOUR_ID
```

#### 3. **Main Page Link**

📄 `/app/page.tsx`

```typescript
// Update the Link href
<Link href="/lm-app/YOUR_ID" ...>
```

#### 4. **Next.js Configuration**

📄 `/next.config.ts`

```typescript
// Update the assetPrefix and basePath for production
assetPrefix: process.env.NODE_ENV === 'production' ? '/lm-app/YOUR_ID' : undefined,
basePath: process.env.NODE_ENV === 'production' ? '/lm-app/YOUR_ID' : undefined,
```

#### 5. **Dockerfile**

📄 `/Dockerfile`

```dockerfile
# Update the PORT environment variable
ENV PORT=YOUR_ID

# Update the EXPOSE directive
EXPOSE YOUR_ID
```

#### 6. **Docker Run Commands**

When running the container, update the port mapping:

```bash
docker run -p YOUR_ID:YOUR_ID void-next-app
```

## 🔧 Step-by-Step Setup

### 1. Clone and Prepare the Template

```bash
# Clone or copy this template
cp -r void-next /path/to/your-new-app
cd /path/to/your-new-app

# Remove git history (if needed)
rm -rf .git
git init
```

### 2. Choose Your Identifier

Pick a unique port number for your application. Common conventions:

- Development apps: 3000-3999
- API services: 4000-4999
- Microservices: 5000-5999
- Internal tools: 8000-8999

⚠️ **Important**: Make sure your chosen port is not already in use!

### 3. Apply the Identifier

Example: Changing from `13000` to `5555`

```bash
# Rename the route folder
mv app/lm-app/13000 app/lm-app/5555

# Update files using sed (Linux/Mac)
# For page.tsx
sed -i 's/13000/5555/g' app/lm-app/5555/page.tsx

# For main page.tsx
sed -i 's/13000/5555/g' app/page.tsx

# For next.config.ts
sed -i 's/13000/5555/g' next.config.ts

# For Dockerfile
sed -i 's/13000/5555/g' Dockerfile
```

### 4. Customize Your App

Update the metadata in `/app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};
```

### 5. Build and Test Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Your app will be available at:
# http://localhost:3000/lm-app/YOUR_ID
```

### 6. Build Docker Image

```bash
# Build the Docker image
docker build -t your-app-name .

# Run the container
docker run -p YOUR_ID:YOUR_ID your-app-name

# Your app will be available at:
# http://localhost:YOUR_ID/lm-app/YOUR_ID
```

## 📋 Customization Checklist

Use this checklist when creating a new app from this template:

- [ ] Choose a unique identifier (port number)
- [ ] Rename `/app/lm-app/13000/` folder to `/app/lm-app/YOUR_ID/`
- [ ] Update the path reference in `/app/lm-app/YOUR_ID/page.tsx`
- [ ] Update the Link href in `/app/page.tsx`
- [ ] Update assetPrefix and basePath in `/next.config.ts`
- [ ] Update PORT and EXPOSE in `Dockerfile`
- [ ] Update app title and description in `/app/layout.tsx`
- [ ] Customize the Hello World content in `/app/lm-app/YOUR_ID/page.tsx`
- [ ] Update this README with your app-specific information
- [ ] Test locally with `npm run dev`
- [ ] Build and test Docker container
- [ ] Commit your changes to version control

## 🚀 Production Configuration

### Asset Prefix and Base Path

In production, the application is configured to serve assets and handle routing with the correct path prefix:

```typescript
// next.config.ts
assetPrefix: process.env.NODE_ENV === 'production' ? '/lm-app/13000' : undefined,
basePath: process.env.NODE_ENV === 'production' ? '/lm-app/13000' : undefined,
```

This ensures that:

- All static assets (CSS, JS, images) are served from `/lm-app/13000/_next/...`
- All internal routing works correctly when the app is deployed behind a reverse proxy
- The application works properly when accessed at `http://your-domain/lm-app/13000`

### Development vs Production

- **Development** (`npm run dev`): Runs on port 3000, assets served from root `/`
- **Production** (Docker): Runs on port 13000, assets served from `/lm-app/13000`

## 🚀 Production Deployment

### Container Registry

```bash
# Tag your image
docker tag your-app-name:latest your-registry/your-app-name:latest

# Push to registry
docker push your-registry/your-app-name:latest
```

### Running in Production

```bash
docker run -d \
  --name your-app-name \
  -p YOUR_ID:YOUR_ID \
  --restart unless-stopped \
  your-registry/your-app-name:latest
```

### Viewing Logs

The application includes comprehensive request logging:

```bash
# View logs
docker logs your-app-name

# Follow logs in real-time
docker logs -f your-app-name

# View last 100 lines
docker logs --tail 100 your-app-name
```

Log format (JSON in production):

```json
{
  "timestamp": "2025-07-30T10:15:30.123Z",
  "ip": "192.168.1.100",
  "method": "GET",
  "path": "/lm-app/YOUR_ID",
  "url": "http://localhost:YOUR_ID/lm-app/YOUR_ID",
  "status": 200,
  "responseTime": "45ms",
  "userAgent": "Mozilla/5.0...",
  "referer": "-"
}
```

## 🛠️ Advanced Configuration

### Environment Variables

You can override the port at runtime:

```bash
docker run -e PORT=6789 -p 6789:6789 your-app-name
```

### Multiple Apps from Same Template

To run multiple apps from this template:

1. Use different identifiers for each app
2. Build with different image names
3. Run on different ports

Example:

```bash
# App 1
docker build -t app-5555 .
docker run -p 5555:5555 app-5555

# App 2 (after changing identifier to 6666)
docker build -t app-6666 .
docker run -p 6666:6666 app-6666
```

## 📝 Notes

- The identifier serves as both the port number and the URL path segment
- The development server (npm run dev) always runs on port 3000, but the app path still uses your identifier
- In production (Docker), the app runs on the port matching your identifier
- All requests are logged in production for monitoring and debugging

## 🆘 Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :YOUR_ID  # Mac/Linux
netstat -ano | findstr :YOUR_ID  # Windows
```

### Docker Build Fails

- Ensure Node.js version in Dockerfile matches your local version
- Check that all files are saved before building
- Run `npm install` locally first to ensure package-lock.json is up to date

### App Not Accessible

- Check Docker logs: `docker logs your-app-name`
- Ensure port mapping is correct: `-p HOST_PORT:CONTAINER_PORT`
- Verify the app is running: `docker ps`

---

Happy coding! 🚀
