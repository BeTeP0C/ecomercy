FROM node:20-alpine AS build

WORKDIR /my-vite-ts-project
COPY package*.json ./
RUN npm ci

# 3. Сборка проекта
COPY . .
RUN npm run build

# 4. Сервер для раздачи фронта
FROM nginx:alpine AS production

COPY --from=build /my-vite-ts-project/dist /usr/share/nginx/html

# 6. Кастомизация конфигурации NGINX (по желанию)
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
