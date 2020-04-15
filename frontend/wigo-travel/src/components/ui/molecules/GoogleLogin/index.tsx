import React from "react"
import GoogleLogin from "react-google-login"

const googleClientId = process.env.GOOGLE_CLIENT_ID || ""

interface Props {
  socialLoginResponse: (provider: string, response: any) => void
  buttonText: string
}

const GoogleLoginComponent = ({ socialLoginResponse, buttonText }: Props) => (
  <GoogleLogin
    clientId={googleClientId || ""}
    buttonText={buttonText}
    onSuccess={(response) => socialLoginResponse("google-oauth2", response)}
    onFailure={(err) => socialLoginResponse("google-oauth2", err)}
  />
)

export default GoogleLoginComponent
