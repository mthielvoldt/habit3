docker build -f front/Dockerfile front/ -t habit3-front
docker run --rm -it \
  --name habit3-front-1 \
  -p 3000:3000 \
  --mount type=bind,source=./front/public,target=/app/public \
  --mount type=bind,source=./front/src,target=/app/src \
  --mount type=bind,source=./front/package.json,target=/app/package.json \
  --mount type=bind,source=./front/package-lock.json,target=/app/package-lock.json \
  habit3-front sh