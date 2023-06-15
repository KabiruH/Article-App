Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :notifications
  resources :wishlists

  # SUBSCRIPTIONS
  resources :subscriptions ,only: [:create, :index, :destroy]
  
  #CATEGORIES
  resources :categories ,only: [:index, :create, :destroy]

  #ARTICLE CATEGORIES
  resources :article_categories ,only: [:create]

  # USERS
  resources :users, only: [:index, :update, :destroy]

  # POST /signup
  post "/signup", to: "users#create"

  # stay logged in
  get "/me", to: "users#me"

  # SESSIONS
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # PROFILE
  resources :profiles


  # ARTICLES
  resources :articles

  resources :wishlists, only: [:create, :destroy]
  post 'wishlist/add_article/:id', to: 'wishlist#add_article', as: 'wishlist_add_article'
  delete 'wishlist/remove_article/:id', to: 'wishlist#remove_article', as: 'wishlist_remove_article'

  # Likes
  patch "/articles/:id/likes", to: "articles#like"

  # Dislikes
  patch "/articles/:id/dislikes", to: "articles#dislike"

  # COMMENTS
  resources :comments

end
