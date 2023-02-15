import React, { useContext, useState } from "react";
import "./Catalog.css";
import { styled } from "@mui/material/styles";
import Product from "../../Components/Product/Product";
import StatisticsDialog from "../../Components/StatisticsDialog/StatisticsDialog";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CartContext } from "../../Contexts/cartContext";
import { GlobalContext } from "../../Contexts/GlobalContext";
import Button from "@mui/material/Button";
import { ROLES } from "../../resources/constants";

function Catalog(props) {
  const { onAdd } = useContext(CartContext);
  const { connectedUser } = useContext(GlobalContext);
  const { products } = props;
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);

  function renderProducts() {
    return products.map((product) => (
      <Product
        key={product.id}
        product={product}
        onAdd={() => onAdd(product)}
      />
    ));
  }

  const ColorButton = styled(Button)({
    position: "absolute",
    color: "white",
    backgroundColor: "#6cbaa9",
    "&:hover": {
      backgroundColor: "#6cbaa9",
    },
  });

  return (
    <div className="products">
      <div className="productsHeader">
        {connectedUser?.role === ROLES.ADMIN && (
          <ColorButton
            onClick={() => setStatsDialogOpen(true)}
            startIcon={<BarChartIcon />}
          >
            Watch statictics
          </ColorButton>
        )}
        <div className="productsTitle">רשימת מוצרים</div>
      </div>
      <div className="productsList">
        {products?.length ? (
          <> {renderProducts()}</>
        ) : (
          <div className="catalogNoProducts">אין מוצרים בקטלוג!</div>
        )}
      </div>
      <StatisticsDialog
        open={statsDialogOpen}
        onClose={() => setStatsDialogOpen(false)}
        products
      />
    </div>
  );
}

export default Catalog;
