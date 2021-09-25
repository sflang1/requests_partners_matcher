FROM ruby:3.0.2

SHELL ["/bin/bash", "-c"]

RUN apt-get update -qq && apt-get install -y npm

ENV USER="user"
ENV PORT=3000
ENV RAILS_ENV="production"
ENV HOME_PATH="/home/$USER"

WORKDIR /home/$USER

RUN npm i -g yarn

RUN gem install bundler

COPY Gemfile Gemfile.lock ./

RUN bundle install

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN rake assets:precompile

EXPOSE $PORT

CMD ["rails", "server", "-b", "'0.0.0.0'"]