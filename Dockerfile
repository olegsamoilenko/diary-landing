FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build && npm run export

FROM nginx:alpine
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
