from .user_helper import create_user_token, encode_user_pk


def create_email_activation_url(user, base_url_address: str) -> str:
    return f"{base_url_address}?u={encode_user_pk(user)}&t={create_user_token(user)}"


def create_password_reset_url(user, base_url_address) -> str:
    return f"{base_url_address}?u={encode_user_pk(user)}&t={create_user_token(user)}"
