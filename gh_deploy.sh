REPOSITORY=/home/ubuntu/github_action

cd $REPOSITORY

sudo npm install

sudo npx pm2 reload all