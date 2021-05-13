import React from 'react'
import PropTypes from 'prop-types'
export const UserContext = React.createContext()
const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState({
    userid: 0,
    user_secret: '',
    full_name: '',
    email: '',
    country: '',
    address: '',
    profile_image: '',
    mobile: '',
    dob: new Date(),
    walletid: '',
    wallet_language: '',
    wallet_currency: '',
    idproof_type: 	'',
    idproof_front: 	'',
    idproof_back: 	'',
    addproof_type: 	'',
    addproof_front: '',
    sms_noti: 		'',
    email_noti: 	'',
    act_code: '',
  })
  const storeUser = user => {
    setUser(user)
  }
  return <UserContext.Provider value={{ user, storeUser }}>{children}</UserContext.Provider>
}
UserContextProvider.propTypes = {
  children: PropTypes.object,
}
export default UserContextProvider
export const useUser = () => React.useContext(UserContext)
