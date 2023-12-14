import React from 'react'
import AgroProducts from './AgroProducts'
import SendedOffersTable from './SendedOffersTable'

const BuyProducts = (props) => {
  const [tabType, setTabType] = React.useState(<AgroProducts info={props.info}/>)
  const BuyProjectTabButtonAction =(e)=>{
    const allTabs = document.querySelectorAll('#buy_product_tabs .fpd-tab-link');

    allTabs.forEach(element => {
      if(element.classList.contains("t-active")){
        element.classList.remove("t-active");
      }
    });
    e.target.classList.add("t-active");
  }
  return (
    <div className='buy-products' style={{backgroundColor: '#244441be', padding: '10px 20px', marginTop: '10px'}}>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <div class="w-layout-hflex frmr-tab-link-container" id='buy_product_tabs'>
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link t-active" style={{padding: '6px 20px'}}
                onClick={(e)=>{
                  BuyProjectTabButtonAction(e)
                  setTabType(<AgroProducts info={props.info}/>)
                }}
                >Products</a>
                </div>
                <div class="frmr-tab-link-wrapper" >
                <a class="fpd-tab-link" style={{padding: '6px 20px'}} 
                onClick={(e)=>{
                  BuyProjectTabButtonAction(e)
                  setTabType(<SendedOffersTable info={props.info}/>)
                }}
                >Sended Offers</a>
                </div>
            </div>
        </div>
        {tabType}
    </div>
  )
}

export default BuyProducts