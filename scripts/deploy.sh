#!/bin/bash

# TeamHub Dashboard Deployment Script
echo "🚀 Deploying TeamHub Dashboard to Vercel..."

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Error: Not in a git repository. Please run 'git init' first."
    exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo "⚠️  Warning: You have uncommitted changes."
    read -p "Do you want to commit them? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        read -p "Enter commit message: " commit_message
        git commit -m "$commit_message"
    fi
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run type checking
echo "🔍 Running type check..."
npm run type-check

# Run linting
echo "🧹 Running linter..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your Vercel domain" 