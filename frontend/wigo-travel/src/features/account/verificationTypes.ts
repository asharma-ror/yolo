export interface VerificationState {
  isLoading: boolean
  error: boolean | undefined
  result: string | undefined
}

export interface UserVerificationInputTypes {
  token: string
  uidb64: string
}
