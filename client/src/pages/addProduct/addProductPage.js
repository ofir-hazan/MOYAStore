import React, { useState } from "react";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productUrl, setProductImg] = useState("");

  function onAddProduct() {
    alert("product saved!");
    console.log("product saved");
  }
  return (
    <form action={onAddProduct}>
      <div class="mb-3">
        <label for="productName" class="form-label">
          שם מוצר
        </label>
        <input
          class="form-control"
          id="productName"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label">
          תיאור מוצר
        </label>
        <textarea id="productDescription" class="form-control"></textarea>
        {/* <input class="form-control" id="productDescription" /> */}
      </div>
      <div class="mb-3">
        <label for="productPrice" class="form-label">
          מחיר מוצר
        </label>
        <input type="number" class="form-control" id="productPrice" />
      </div>
      <div className="mb-3">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            בחר ספק
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <div class="dropdown">
          <button
            class="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            בחר קטגוריה
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              Action
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <label for="productImgUrl" class="form-label">
          קישור לתמונת מוצר
        </label>
        <input type="url" class="form-control" id="productImgUrl" />
      </div>
      <button type="submit" class="btn btn-primary" onSubmit={onAddProduct}>
        הוסף פריט
      </button>
    </form>
  );
};

export default AddProductPage;
