FROM node:16.14 AS build
WORKDIR /src
COPY package*.json ./
RUN npm ci
COPY . .
ARG CI=true
ARG NODE_ENV=production
ARG REACT_APP_API_HOST
RUN npm run test && npm run build

FROM nginx:1.21-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/build /usr/share/nginx/html
