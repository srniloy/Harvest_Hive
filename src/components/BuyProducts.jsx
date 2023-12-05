import React from 'react'
import AgroProducts from './AgroProducts'

const BuyProducts = (props) => {
  return (
    <div className='buy-products' style={{backgroundColor: '#244441be', padding: '10px 20px', marginTop: '10px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div class="w-layout-hflex frmr-tab-link-container">
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link t-active" style={{padding: '6px 20px'}}>Products</a>
                </div>
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link" style={{padding: '6px 20px'}}>Followed</a>
                </div>
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link" style={{padding: '6px 20px'}} >Sended Offers</a>
                </div>
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link" style={{padding: '6px 20px'}} >Accepted Offers</a>
                </div>
            </div>
        </div>
        <AgroProducts info={props.info}/>
    </div>
  )
}

export default BuyProducts