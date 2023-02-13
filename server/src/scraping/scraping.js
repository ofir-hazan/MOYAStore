
const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const Category = require("../../models/category");
const Supplier = require("../../models/supplier");
const Product = require("../../models/product");

/**
 * @returns {Promise<String[]>}
 */
async function getAllCategoriesNamesFromApi() {
    let categories = [];
    await axios.get(`${process.env.SCRAPING_API_URL}/products/categories`).then(res => {
        categories = res.data;
    }).catch(err => {
        console.log(err);
    })

    return categories;
}

/**
 * 
 * @returns {Promise<{"_id": String, "name": String}[]>}
 */
async function getAllCategoriesFromDB() {
    let categories = [];
    await mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        categories = await Category.find({});
    })

    return categories;
}

/**
 * 
 * @returns {Promise<{"_id": String, "name": String}[]>}
 */
async function getAllCategories() {
    let categories = [];
    try {
        let dbCategories = [];
        let fetchedCategories = [];
        const readFromDBPromise = getAllCategoriesFromDB().then(data => dbCategories = dbCategories.concat(data));
        const fetchPromise = getAllCategoriesNamesFromApi().then(data => fetchedCategories = fetchedCategories.concat(data));
        await Promise.all([readFromDBPromise, fetchPromise]);

        // Check which category names should be inserted into DB
        let categoriesToInsert = fetchedCategories.filter(category => !(dbCategories.find(dbCategory => dbCategory.name == category)));
        categoriesToInsert = categoriesToInsert.map(category => {
            return {
                _id: uuidv4(),
                name: category
            }
        })

        if (categoriesToInsert.length) {
            await mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
                await Category.insertMany(categoriesToInsert);
                console.log(`Successfully inserted ${categoriesToInsert.length} categories into DB`);

                categories = dbCategories.concat(categoriesToInsert);
            });
        } else {
            categories = dbCategories;
        }
    } catch (exception) {
        console.log(exception);
    }

    return categories;
}

/**
 * @returns {Promise<{title: String, description: String, price: Number, brand: String, category: String, images: String[]}[]>}
 */
async function getProductsFromApi() {
    let products = [];
    await axios.get(`${process.env.SCRAPING_API_URL}/products?limit=100000`).then(res => {
        products = res.data.products;
    }).catch(err => {
        console.log(err);
    })

    return products;
}

/**
 * 
 * @returns {Promise<{_id: String, name: String, location: String}[]>}
 */
async function getAllSuppliers() {
    let suppliers = [];
    await mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        suppliers = await Supplier.find({});
    });

    return suppliers;
}

/**
 * 
 * @returns {Promise<{_id: String, name: String, categoryId: String, supplierId: String}[]>}
 */
async function getAllProducts() {
    let products = [];
    await mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
        products = await Product.find({});
    });

    return products;
}

/**
 * Randomize location and id for new supplier name
 * @param {String} supplierName 
 * 
 * @returns {{_id: String, name: String, location: String}}
 */
function generateSupplierData(supplierName) {
    const POSSIBLE_LOCATIONS = ['north', 'center', 'south'];
    const randomIndex = Math.floor(Math.random() * POSSIBLE_LOCATIONS.length);

    return {
        _id: uuidv4(),
        name: supplierName,
        location: POSSIBLE_LOCATIONS[randomIndex]
    }
}



async function runScraping() {
    let categories = [];
    let productsToHandle = [];
    let suppliers = [];
    let existingProducts = [];

    const getCategoriesPromise = getAllCategories().then(data => categories = data);
    const getProductsPromise = getProductsFromApi().then(data => productsToHandle = data);
    const getSuppliersPromise = getAllSuppliers().then(data => suppliers = data);
    const getExistingProductsPromise = getAllProducts().then(data => existingProducts = data);

    const suppliersToInsert = [];
    const productsToInsert = [];

    await Promise.all([getCategoriesPromise, getProductsPromise, getSuppliersPromise, getExistingProductsPromise]);

    productsToHandle.forEach(product => {
        let supplierId;

        function handleNonExistsProduct() {
            const category = categories.find(c => c.name == product.category);
            if (category) {
                productsToInsert.push({
                    _id: uuidv4(),
                    name: product.title,
                    description: product.description,
                    image: product.images[0],
                    price: product.price,
                    categoryId: category._id,
                    supplierId: supplierId
                })
            }
        }

        // Check if supplier exists in DB
        const supplier = suppliers.find(s => s.name == product.brand);
        if (supplier) {
            supplierId = supplier._id;
            // Check if the product exists in db
            if (!existingProducts.find(p => p.name == product.title && p.supplierId == supplierId)) {
                handleNonExistsProduct(product);
            }
        } else {
            const newSupplier = generateSupplierData(product.brand);
            suppliersToInsert.push(newSupplier);
            supplierId = newSupplier._id;
            suppliers.push(newSupplier);
            handleNonExistsProduct(product);
        }
    })

    if(productsToInsert.length || suppliersToInsert.length) {
        await mongoose.connect(process.env.DB_CONNECTION_STRING).then(async () => {
            if(suppliersToInsert.length) {
                await Supplier.insertMany(suppliersToInsert);
                console.log(`Successfully inserted ${suppliersToInsert.length} suppliers into DB`);
            }

            if(productsToInsert.length) {
                await Product.insertMany(productsToInsert);
                console.log(`Successfully inserted ${productsToInsert.length} products into DB`);
            }
        });
    } else {
        console.log('No products and suplliers to insert')
    }

    console.log('finished running scraping')
}

module.exports = {
    runScraping
}