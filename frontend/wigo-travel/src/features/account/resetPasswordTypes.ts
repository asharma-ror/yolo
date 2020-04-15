export interface ResetPasswordState {
  isLoading: boolean
  error: boolean | null
  passwordResetSuccess: boolean
}

export interface ResetPasswordMutationInputTypes {
  newPassword: string
  token: string
  uidb64: string
}
