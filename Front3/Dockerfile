### STAGE 1: Build ###
FROM node:12.7-alpine AS builder
WORKDIR /usr/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
ENV GENERATE_SOURCEMAP=false
RUN node --max_old_space_size=1024 node_modules/@angular/cli/bin/ng build --prod

### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/dist/daw2021-frontend /usr/share/nginx/html