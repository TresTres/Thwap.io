#!/usr/bin/env bash
set -e

#update instance
yum -y update

#add node js
sudo yum install -y nodejs

#install pm2
npm install -g pm2
pm2 update
