import React, { FC } from 'react'

type PayPopUpProps = {
  active: boolean
  setActive: (bool: boolean) => void
}

const PayPopUp: FC<PayPopUpProps> = ({ active, setActive }) => {
  return (
    <div className="pay-popup">
      {/* <div className="popup" id="payPopup">
                <div className="popup-wrapper">
                    <div className="wrapp">
                        <div onClick={() => setActive(false)} className="close-popup">
                            <img src={process.env.REACT_APP_MEDIA + '/icon/close.svg'} alt="" />
                        </div>
                        <div className="wrapper">
                            <iframe src={'https://churishop.co.il/iframe?val=' + calculateFinalPrice()} framborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div> */}
    </div>
  )
}

export default PayPopUp
