source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'
gem 'rails', '~> 6.1'
gem 'pg', '~> 1.3'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'jbuilder', '~> 2.5'
gem 'net-smtp', require: false
gem 'net-imap', require: false
gem 'net-pop', require: false
gem 'puma', '~> 5'
gem 'sass-rails'
gem 'rexml'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 5.0'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'pry-rails'
  gem 'pry-remote'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem 'geokit-rails'
gem 'i18n-js'
gem 'stripe', git: 'https://github.com/stripe/stripe-ruby'
