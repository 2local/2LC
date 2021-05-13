import React, { useState } from 'react'
import './modal.css'
import metaMask from '../../assets/metamask.svg'
import trustWallet from '../../assets/trustwallet.svg'
import mathWallet from '../../assets/mathwallet.svg'
import walletConnect from '../../assets/walletconnect.svg'
import tokenPocket from '../../assets/tokenpocket.png'
import { useWeb3React } from '@web3-react/core'
import { useWallet } from 'use-wallet'

function ConnectModal({ modal, setModal }) {
  const web3 = useWeb3React()
  const wallet = useWallet()

  const [search, setSearch] = useState('')
  const assets = [
    { text: 'Metamask', image: metaMask },
    { text: 'TrustWallet', image: trustWallet },
    { text: 'MathWallet', image: mathWallet },
    { text: 'WalletConnect', image: walletConnect },
    { text: 'TokenPocket', image: tokenPocket },
  ]

  const connectWallet = (walletString) => {
    wallet.connect(walletString)
  }

  if (wallet.status == 'connected') {
    setModal(0)
  }

  console.log('pooh, wallet = ', wallet)

  return (
    <div className="connect-container">
      <div className="wallet-header">
        <div className="connect-heading">Connect Wallet</div>
        <button className="wallet-quit" onClick={() => setModal(0)}>
          <i className="fa fa-times"></i>
        </button>
      </div>
      <div className="connect-head-line"></div>

      <div className="connect-item-list col-1g-12">
        {assets.map(
          (value, index) =>
            value.text.toLowerCase().includes(search.toLowerCase()) && (
              <div onClick={connectWallet.bind(null, 'injected')}>
                <div className="connect-asset-item">
                  <img
                    className="connect-item-image"
                    src={value.image}
                    alt=""
                  />
                  <div className="connect-item-text">
                    <span>{value.text}</span>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  )
}

export default ConnectModal
