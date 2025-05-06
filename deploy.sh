#!/bin/bash

# Exit script on any error
set -e
# Remove any existing build directory
rm -rf /home/ubuntu/tpl/toleram-f/build


# Define variables
PROJECT_DIR="/home/ubuntu/tpl/toleram-f"
BUILD_DIR="$PROJECT_DIR/build"
DEPLOY_DIR="/var/www/tplmania.org/html"

# Step 1: Navigate to the project directory
echo "Navigating to project directory..."
cd "$PROJECT_DIR"

#step 2: Pull the latest changes from the repository
echo "Pulling the latest changes from the repository..."
git pull

# Step 3: Build the React application
echo "Building the React application..."
yarn install
yarn run build

# Step 4: Copy the build files to the deployment directory
echo "Deploying the build to $DEPLOY_DIR ..."
sudo cp -r "$BUILD_DIR"/* "$DEPLOY_DIR"

echo "✅ Deployment completed successfully."

# Step 5: Restart the web server (if necessary)
echo "Restarting the web server..."
sudo systemctl restart nginx
echo "✅ Web server restarted successfully."