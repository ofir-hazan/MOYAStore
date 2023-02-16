import React, { useContext, useState } from "react";
import "./ExpandedProduct.css";
import GenericPopup from "../../Components/popup/genericPopup";
import { GlobalContext } from "../../Contexts/GlobalContext";
import { IconButton } from "@mui/material";
import SaveTwoToneIcon from "@mui/icons-material/SaveTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

async function updateProduct(newProductData) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProductData),
    };

    await fetch("http://localhost:3001/products/update", requestOptions).then((res) => {
        if (res.ok) {
            alert("Successfully updated");
        }
    });
}

async function deleteProduct(productId) {
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: productId }),
    };

    await fetch("http://localhost:3001/products/delete", requestOptions).then((res) => {
        if (res.ok) {
            alert("Successfully deleted")
        }
    });
}

async function addProduct(product) {
    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    };

    await fetch("http://localhost:3001/products/add", requestOptions).then((res) => {
        if (res.ok) {
            alert("Successfully added")
        }
    });
}

function ExpandedProduct(props) {
    const { product, close } = props;
    const { connectedUser, setShouldReload } = useContext(GlobalContext);
    const isAdmin = connectedUser.role == 'admin';
    // const isAdmin = true;
    const previousData = { ...product };
    const [name, setName] = useState(previousData.name)
    const [description, setDescription] = useState(previousData.description);
    const [price, setPrice] = useState(previousData.price);
    const [image, setImage] = useState(previousData.image);
    const [supplierId, setSupplierId] = useState(previousData.supplierId);
    const [categoryId, setCategoryId] = useState(previousData.categoryId);
    const [isLoading, setIsLoading] = useState(false);

    function save() {
        if (!isLoading) {
            setIsLoading(true);
            if (!name || !description || !price || !supplierId || !categoryId) {
                alert("You must provide all parameters");
            } else {
                if (!previousData._id) {
                    addProduct({
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        supplierId: supplierId,
                        categoryId: categoryId
                    }).then(() => {
                        setIsLoading(false);
                        setShouldReload(true);
                        close();
                    }).catch((err) => {
                        console.log(err);
                        alert("Error saving product");
                        setIsLoading(false);
                    })
                } else {
                    updateProduct({
                        _id: previousData._id,
                        name: name,
                        description: description,
                        price: price,
                        image: image,
                        supplierId: supplierId,
                        categoryId: categoryId
                    }).then(() => {
                        setIsLoading(false);
                        setShouldReload(true);
                        close();
                    }).catch(() => {
                        alert("Error Updating product");
                        setIsLoading(false);
                    })
                }
            }
        }
    }

    async function deleteFunc() {
        if (!isLoading) {
            setIsLoading(true);
            if (previousData._id) {
                deleteProduct(previousData._id).then(() => {
                    setIsLoading(false);
                    setShouldReload(true);
                    close();
                }).catch((err) => {
                    console.log(err);
                    alert("Error deleting product");
                    setIsLoading(false);
                })
            }
        }
    }

    return (
        <div>
            <GenericPopup isOpen={true} closePopup={close}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div className="popupContainer">
                            <label className="expandedProductRow">
                                <div className="expandedProductRowTitle">Product name:</div>
                                {!isAdmin ? <div className="expandedProductRowLabel">{name}</div> :
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(value) => setName(value.target.value)}
                                    />
                                }

                            </label>
                            <label className="expandedProductRow">
                                <div className="expandedProductRowTitle">Product description:</div>
                                {!isAdmin ? <div className="expandedProductRowLabel">{description}</div> :
                                    <input
                                        type="text"
                                        value={description}
                                        onChange={(value) => setDescription(value.target.value)}
                                    />
                                }
                            </label>
                            <label className="expandedProductRow">
                                <div className="expandedProductRowTitle">Product price:</div>
                                {!isAdmin ? <div className="expandedProductRowLabel">{description}</div> :
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(value) => setPrice(value.target.value)}
                                    />
                                }
                            </label>
                            {isAdmin && <>
                                <label className="expandedProductRow">
                                    <div className="expandedProductRowTitle">Image url:</div>
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(value) => setImage(value.target.value)}
                                    />
                                </label>
                                <label className="expandedProductRow">
                                    <div className="expandedProductRowTitle">Supplier ID:</div>
                                    <input
                                        type="text"
                                        value={supplierId}
                                        onChange={(value) => setSupplierId(value.target.value)}
                                    />
                                </label>
                                <label className="expandedProductRow">
                                    <div className="expandedProductRowTitle">Category ID:</div>
                                    <input
                                        type="text"
                                        value={categoryId}
                                        onChange={(value) => setCategoryId(value.target.value)}
                                    />
                                </label>
                            </>
                            }
                        </div>
                    </div>
                    <div className="expandedProductImageContainer">
                        <img style={{ height: "100px", width: "100px" }} src={image} />
                    </div>
                </div>
                {isAdmin && <div className="buttonsContainer">
                    <IconButton onClick={save}>
                        <SaveTwoToneIcon />
                        save
                    </IconButton>
                    <IconButton onClick={close}>
                        <CancelTwoToneIcon /> Cancel
                    </IconButton>
                    {
                        previousData._id && <IconButton onClick={deleteFunc}>
                            <DeleteTwoToneIcon /> Delete
                        </IconButton>
                    }

                </div>}
            </GenericPopup>
        </div>
    );
}
export default ExpandedProduct;
