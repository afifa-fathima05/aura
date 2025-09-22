#!/bin/bash

echo "🔧 AURA CSS Fix Script"
echo "====================="

# Navigate to project directory
cd /Users/mohamedarshad/Desktop/AURA

echo "1. Stopping any running processes..."
pkill -f "next dev" 2>/dev/null || true

echo "2. Clearing Next.js cache..."
rm -rf .next

echo "3. Clearing node_modules (if needed)..."
read -p "Clear node_modules? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -rf node_modules
    rm -f package-lock.json
    echo "4. Reinstalling dependencies..."
    npm install
fi

echo "5. Starting development server..."
npm run dev

echo ""
echo "✅ Done! Server should be running."
echo "🌐 Visit: http://localhost:3000 (or check terminal for actual port)"
echo "🔄 Try hard refresh: Cmd+Shift+R (Mac) or Ctrl+F5 (Windows)"
echo "🔍 Check browser console for any errors"