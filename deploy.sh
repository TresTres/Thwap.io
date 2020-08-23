#! /bin/bash

#if this is not a pull request and it's to master
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
    if [ "$TRAVIS_BRANCH" == "master" ]; then


        #build docker image and push
        echo "Starting Docker image push..."
        docker --version
        pip install --user awscli   
        export PATH=$PATH:$HOME/.local/bin     
        aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login -u AWS --password-stdin "$AWS_ACCT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com"
        docker-compose build
        docker tag "trestres/thwap.io:latest" "$AWS_ACCT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/thwap-image:latest"
        docker push "$AWS_ACCT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/thwap-image:latest"
        echo "Push successful."
        #deploy
        echo "Starting deploy..."
        curl "https://raw.githubusercontent.com/silinternational/ecs-deploy/master/ecs-deploy" | \
            sudo tee -a /usr/bin/ecs-deploy
        sudo chmod +x /usr/bin/ecs-deploy
        ecs-deploy -c $AWS_CLUSTER_NAME -n $AWS_SERVICE_NAME \
            -i "$AWS_ACCT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/thwap-image:latest" -r $AWS_DEFAULT_REGION -t 240
        echo "Deploy successful"
    fi
fi
