#!/usr/bin/env bash

cd /home/ec2-user/node
pm2 reload ecosystem.config.js --env production