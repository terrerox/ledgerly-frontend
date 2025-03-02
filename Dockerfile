FROM node:18-alpine
ARG APP_API_URL
ARG APP_ENV

ENV VITE_API_URL=$APP_API_URL
ENV VITE_APP_ENV=$APP_ENV
WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -la /app
RUN ls -la /app/dist

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
