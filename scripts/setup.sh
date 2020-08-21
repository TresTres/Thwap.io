#!/usr/bin/env bash

cd /home/ec2-user/node
npm install
npm run build
pm2 reload ecosystem.config.js --env production