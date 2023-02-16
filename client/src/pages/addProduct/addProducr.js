import React from "react";
import ExpandedProduct from "../../Components/ExpandedProduct/ExpandedProduct";
import { useNavigate } from  'react-router-dom';

function AddProductPage() {
  const navigate = useNavigate();

  return (
    <div className="products">
      <ExpandedProduct product = {{}} close={() => navigate('/')} />
    </div>
  );
}

export default AddProductPage;
