FROM node

WORKDIR /code
COPY . .

RUN yarn install

EXPOSE 4000

ENTRYPOINT [ "yarn", "start" ]