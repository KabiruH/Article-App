class NotificationsController < ApplicationController
        # before_action :authenticate_user!

        def index
            @notifications = current_user.notifications.order(created_at: :desc)
            # Mark all unread notifications as read
            current_user.notifications.unread.update_all(read_at: Time.zone.now)
          end
end
