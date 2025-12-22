# Copy the build directory contents to the remote server
yarn build
# Copy the build directory contents to the remote server
scp -r dist/* ec2-user@ec2-3-76-123-74.eu-central-1.compute.amazonaws.com:/home/projects/survey-frontend/

echo "Deployment completed!"