export interface RegisterationState {
  isLoading: boolean
  error:
    | {
        hasError: boolean
        message: string | undefined
      }
    | undefined
  user:
    | {
        username: string
        firstName: string
        lastName: string
        email: string
      }
    | undefined
}

export interface UserInterface {
  username: string
  firstName: string
  lastName: string
  email: string
}

export interface UserRegisterationMutationInputType {
  password: string
  firstName: string
  lastName: string
  email: string
  birthday: string
}
