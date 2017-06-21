FROM nginx

RUN apt-get update && apt-get install -y gnupg

##RUN apt-get clean; rm -f /var/lib/apt/lists/*

RUN mkdir -p /usr/share/client && \
  apt-get update && apt-get install -y curl apt-transport-https && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get install -y yarn nodejs nodejs-legacy bzip2

COPY . /usr/share/client

WORKDIR /usr/share/client

RUN rm -rf /usr/share/nginx/html && \
  ln -s /usr/share/client/dist /usr/share/nginx/html

RUN yarn && yarn run build


EXPOSE 80
