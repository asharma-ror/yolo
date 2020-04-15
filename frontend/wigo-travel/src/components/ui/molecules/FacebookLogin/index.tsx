import React from "react"
import FacebookLogin from "react-facebook-login"

const facebookAppId = process.env.FACEBOOK_APP_ID || ""

interface Props {
  socialLoginResponse: (provider: string, response: any) => void
}

const FacebookLoginComponent = ({ socialLoginResponse }: Props) => (
  <FacebookLogin
    appId={facebookAppId}
    autoLoad={false}
    callback={(response) => socialLoginResponse("facebook", response)}
  />
)

export default FacebookLoginComponent
