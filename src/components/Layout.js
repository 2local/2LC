import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import IndividualValues from './IndividualValues/IndividualValues'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Data from '../assets/SideBarItems'
import TransactionHistory from './TransactionHistory/TransactionHistory'
import YieldFarming from './YieldFarming'
import LaunchPool from './LaunchPool/LaunchPoolContainer'
import AddressBook from './AddressBook'
import SettingsContainer from './Settings'
import IndividualLaunchPool from './LaunchPool/IndividualLaunchPool'
import Help from './Help/Help'
import Airdrops from './Airdrops/Airdrops'
import './Layout.css'
import SidebarMobile from './Sidebar/SidebarMobile'
import { useUser } from '../hook/Context/UserContext'
import { useAlert } from '../hook/Context/AlertContext'
import { useHistory } from 'react-router-dom'

// call api
import userAPI from '../apis/user'

import AssetModal from './Modal/AssetModal'
import ConnectModal from './Modal/ConnectModal'
import EditModal from './Modal/EditModal'
import AddressModal from './Modal/AddressModal'
import DeleteModal from './Modal/DeleteModal'

function Layout({ name = 'dashboard' }) {
  const history = useHistory()
  const { user, storeUser } = useUser()
  const { alert, storeAlert } = useAlert()

  const data = Data
  const [isOpen, setisOpen] = useState(true)
  const [subOpen, setsubOpen] = useState(false)
  const [open, setopen] = useState(false)
  const [modal, setModal] = useState(0)

  let Component =
    name === 'dashboard' ? (
      <Dashboard isOpen={isOpen} />
    ) : name === 'yield-farming' ? (
      <YieldFarming />
    ) : name === 'launch-pool' ? (
      <LaunchPool subOpen={subOpen} isOpen={isOpen} />
    ) : name === 'address-book' ? (
      <AddressBook modal={modal} setModal={setModal} />
    ) : name === 'settings' ? (
      <SettingsContainer />
    ) : name === 'launch-pool-individual' ? (
      <IndividualLaunchPool />
    ) : name === 'help' ? (
      <Help />
    ) : name === 'airdrops' ? (
      <Airdrops />
    ) : (
      ''
    )

  useEffect(() => {
    if (!isOpen) {
      setsubOpen(false)
    }
  }, [isOpen])

  useEffect(() => {
    let userid = localStorage.getItem('userid')
    if (!userid) {
      // history.push('/login')
      return
    }
    userAPI.getProfile(userid).then(
      (response) => {
        if (response.code === 200) {
          if (response.data.dob === '0000-00-00') {
            response.data.dob = '1900-01-01'
          }

          storeUser({
            ...user,
            userid: response.data.mst_userid,
            user_secret: response.data.user_secret,
            full_name: response.data.full_name,
            email: response.data.email,
            country: response.data.country
              ? JSON.parse(response.data.country)
              : '',
            address: response.data.address,
            profile_image: response.data.profile_image,
            mobile: response.data.mobile,
            dob: new Date(response.data.dob),
            walletid: response.data.walletid,
            wallet_language: response.data.wallet_language,
            wallet_currency: response.data.wallet_currency,
            idproof_type: response.data.idproof_type,
            idproof_front: response.data.idproof_front,
            idproof_back: response.data.idproof_back,
            addproof_type: response.data.addproof_type,
            addproof_front: response.data.addproof_front,
            sms_noti: response.data.sms_noti,
            email_noti: response.data.email_noti,
          })
        } else {
          storeAlert({
            ...alert,
            errorSnackbarOpen: true,
            errorSnackbarMessage: response.message,
          })
        }
      },
      (error) => {
        console.log('error=', error)
        storeAlert({
          ...alert,
          errorSnackbarOpen: true,
          errorSnackbarMessage: error,
        })
      }
    )
  }, [])

  return (
    <div className="layout-container">
      <Navbar
        setisOpen={setisOpen}
        isOpen={isOpen}
        open={open}
        setopen={setopen}
        modal={modal}
        setModal={setModal}
      />

      <div className="body" onClick={() => setopen(false)}>
        <div className="sidebar-mobile">
          {isOpen && <div className="modal-back"></div>}
          <SidebarMobile
            data={data}
            isOpen={isOpen}
            subOpen={subOpen}
            setsubOpen={setsubOpen}
            setisOpen={setisOpen}
            modal={modal}
            setModal={setModal}
          />
        </div>
        <div
          className={`d-flex ${
            name === 'dashboard'
              ? 'body-left-notdashboard'
              : 'body-left-notdashboard'
          } `}
        >
          <div className="sidebar-desktop">
            <Sidebar
              data={data}
              isOpen={isOpen}
              subOpen={subOpen}
              setsubOpen={setsubOpen}
              modal={modal}
              setModal={setModal}
            />
          </div>

          <IndividualValues
            data={data}
            subOpen={subOpen}
            setsubOpen={setsubOpen}
          />
          {Component}
        </div>

        {/* {name === "dashboard" && <TransactionHistory />} */}
        {modal != 0 && <div className="modal-back"></div>}
        {modal == 1 && <AssetModal modal={modal} setModal={setModal} />}
        {modal == 2 && <EditModal modal={modal} setModal={setModal} />}
        {modal == 3 && <DeleteModal modal={modal} setModal={setModal} />}
        {modal == 4 && <AddressModal modal={modal} setModal={setModal} />}
        {modal == 5 && <ConnectModal modal={modal} setModal={setModal} />}
      </div>
    </div>
  )
}

export default Layout
