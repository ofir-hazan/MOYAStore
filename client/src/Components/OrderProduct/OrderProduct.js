import React from 'react';
import './OrderProduct.css';

function OrderProduct(props) {
    const {name, description, picture, price, quantity=1} = props.product;
    return (
        <div className='productContainer'>
            <div className='productDescription'>
                <div className='productName'>
                    {name}
                </div>
                <div className='productDesc'>
                    {description}
                </div>
                <div className='productPrice'>
                    {`${(price*quantity).toFixed(2)} ₪`}
                </div>
            </div>
            <div className='productPictureContainer'>
                <img className='productPicture' src={picture}/>
                <div>
                    {`x${quantity}`}
                </div>
            </div>
        </div>
    )
}

export default OrderProduct;