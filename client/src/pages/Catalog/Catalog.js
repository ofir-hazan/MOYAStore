import React, { useContext, useState, useEffect } from "react";
import "./Catalog.css";
import { styled } from "@mui/material/styles";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Product from "../../Components/Product/Product";
import StatisticsDialog from "../../Components/StatisticsDialog/StatisticsDialog";
import BarChartIcon from "@mui/icons-material/BarChart";
import { CartContext } from "../../Contexts/cartContext";
import { GlobalContext } from "../../Contexts/GlobalContext";
import Button from "@mui/material/Button";
import { ROLES } from "../../resources/constants";
import ExpandedProduct from "../../Components/ExpandedProduct/ExpandedProduct";

function Catalog(props) {
  const { onAdd } = useContext(CartContext);
  const { connectedUser, catalogProducts } = useContext(GlobalContext);
  const [statsDialogOpen, setStatsDialogOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [displayProducts, setDisplayProducts] = useState(catalogProducts);
  const [categories, setCategories] = useState([]);
  const [catFilterValue, setCatFilterValue] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supFilterValue, setSupFilterValue] = useState("");
  const [maxRangeValue, setMaxRangeValue] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [expandedProduct, setExpandedProduct] = useState();

  function renderProducts() {
    return displayProducts.map((product) => (
      <Product
        key={product.id}
        product={product}
        onAdd={() => onAdd(product)}
        expand={() => setExpandedProduct(product)}
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

  const handleSliderChange = (event, newValue) => {
    setMaxRangeValue(newValue);
  };

  const getMaxPrice = () => {
    let maxPrice = catalogProducts[0].price;
    for (let index = 1; index < catalogProducts.length; index++) {
      if (catalogProducts[index].price > maxPrice) {
        maxPrice = catalogProducts[index].price;
      }
    }
    return maxPrice;
  }

  useEffect(() => {
    fetch("http://localhost:3001/suppliers/all")
      .then((res) => res.json())
      .then((data) => {
        setSuppliers(data);
      })
      .catch((err) => console.log(err));
    fetch("http://localhost:3001/categories/all")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filteredProducts = [...catalogProducts];

    if (filterValue) {
      filteredProducts = filteredProducts.filter((product) => product.name.toLowerCase().includes(filterValue.toLowerCase()));
    }

    if (catFilterValue) {
      const category = categories.find((cat) => cat.name.toLowerCase().includes(catFilterValue.toLowerCase()));
      filteredProducts = filteredProducts.filter((product) => product.categoryId === category?._id);
    }

    if (supFilterValue) {
      const supplier = suppliers.find((sup) => sup.name.toLowerCase().includes(supFilterValue.toLowerCase()));
      filteredProducts = filteredProducts.filter((product) => product.supplierId === supplier?._id);
    }

    if (maxRangeValue !== 0) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxRangeValue);
    }

    setDisplayProducts(filteredProducts);
  }, [filterValue, catFilterValue, supFilterValue, maxRangeValue, catalogProducts]);

  return (
    <div className="products">
      {expandedProduct && <ExpandedProduct product={expandedProduct} close={() => setExpandedProduct()} />}
      <div className="productsHeader">
        {connectedUser?.role === ROLES.ADMIN && (
          <ColorButton
            onClick={() => setStatsDialogOpen(true)}
            startIcon={<BarChartIcon />}
          >
            Watch statictics
          </ColorButton>
        )}
        <div className="productsTitle">Products</div>
      </div>
      <div className="searchFilterContainer">
        <div>
          <Autocomplete
            freeSolo
            value={filterValue}
            onChange={(e, newValue) => setFilterValue(newValue)}
            options={catalogProducts.map((product) => product.name)}
            renderInput={(params) => <TextField {...params} label="Search for an item..." />}
          />
        </div>
        <div className="filterContainer">
          <Autocomplete
            freeSolo
            value={supFilterValue}
            onChange={(e, newValue) => setSupFilterValue(newValue)}
            options={suppliers.map((supplier) => supplier.name)}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Filter by supplier" />}
          />
          <div>
            <Box sx={{ width: 300 }}>
              <Typography id="input-slider" gutterBottom>
                Filter by price range
              </Typography>
              <Slider
                valueLabelDisplay="auto"
                max={getMaxPrice()}
                value={maxRangeValue}
                onChange={handleSliderChange}
                aria-labelledby="input-slider"
              />
            </Box>
          </div>
          <Autocomplete
            freeSolo
            value={catFilterValue}
            onChange={(e, newValue) => setCatFilterValue(newValue)}
            options={categories.map((category) => category.name)}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Filter by category" />}
          />
        </div>
      </div>
      <div className="productsList">
        {displayProducts?.length ? (
          <> {renderProducts()}</>
        ) : (
          <div className="catalogNoProducts">No products available!</div>
        )}
      </div>
      <StatisticsDialog
        open={statsDialogOpen}
        onClose={() => setStatsDialogOpen(false)}
        catalogProducts
      />
    </div>
  );
}

export default Catalog;
