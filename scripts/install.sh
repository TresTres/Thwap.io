#!/usr/bin/env bash
set -e

#update instance
yum -y update

#add node js
curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -

#install pm2
npm install -g pm2
pm2 update
