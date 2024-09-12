# устанавливаем официальный образ Node.js
FROM node:18-alpine AS dev

# указываем рабочую (корневую) директорию
RUN apk add --no-cache tzdata
ENV TZ Europe/Moscow
#ENV NODE_PATH /aisrou-server/node_modules
# копируем основные файлы приложения в рабочую директорию
WORKDIR /aisrou-server/
COPY . ./

# устанавливаем указанные зависимости NPM на этапе установки образа
RUN rm -rf node_modules/
RUN npm install


# запускаем основной скрипт в момент запуска контейнера
CMD npm run dev