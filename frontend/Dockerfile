# ===== build (Angular) =====
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# build prod (gera dist/eventos-esii/browser)
RUN npm run build -- --configuration production

# ===== runtime (Nginx) =====
FROM nginx:stable-alpine
RUN rm -f /etc/nginx/conf.d/default.conf
# RUN rm -f /usr/share/nginx/html/*
COPY --from=build /app/dist/eventos-esii/browser/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
