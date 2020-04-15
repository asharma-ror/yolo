from django.contrib.auth import get_user_model

# it is good to have dynamic way to import active user model
# so it can be swapped without requiring code change
User = get_user_model()
