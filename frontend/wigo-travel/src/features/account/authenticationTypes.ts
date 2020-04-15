export interface AuthenticationState {
  isLoading: boolean
  error: boolean | undefined
  isLoggedIn: boolean
}

export interface UserLoginMutationInputType {
  username: string
  password: string
}

export interface UserSocialLoginMutationType {
  accessToken: string
  provider: string
}
