# ===== build (Angular) =====
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# build prod (gera dist/<app>/browser)
RUN npm run build -- --configuration production

# ===== runtime (Nginx) =====
FROM nginx:stable-alpine
# limpa a conf padrão
RUN rm /etc/nginx/conf.d/default.conf
# copia o build do Angular
COPY --from=build /app/dist/*/browser /usr/share/nginx/html
# coloca sua config do Nginx (arquivo precisa existir na pasta do front)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
