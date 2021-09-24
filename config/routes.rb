Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root to: 'dashboard#index'

  namespace :api do
    resources :materials, only: [:index]

    resources :requests, only: [:create]
  end

  get '/*path' => 'dashboard#index'
end
