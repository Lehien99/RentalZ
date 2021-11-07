import { openDB } from 'idb'
import { Product } from './models';

const DATABASE_NAME = 'RentalZ DB';

initDB().then(() => {
    console.log("Init database done!", DATABASE_NAME)
})

export async function updateProduct(product:Product) {
    //find in the database with the id
    const db = await openDB(DATABASE_NAME, 1);
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    var updateProduct = await store.get(product.id!) as Product
    //update the found record with new values
    updateProduct.propertyType  = product.propertyType
    updateProduct.bedroom = product.bedroom
    updateProduct.price = product.price
    updateProduct.Furniture = product.Furniture
    updateProduct.note = product.note
    updateProduct.reporter  = product.reporter
    updateProduct.dateandtime  = product.dateandtime
    //really do the update: from memory ->database
    db.put("products",updateProduct);
    await tx.done;
}

export async function deleteProduct(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    await db.delete("products",id);
}

export async function getProduct(id:number) {
    const db = await openDB(DATABASE_NAME, 1);
    const product = await db.get('products',id)
    console.log("i am getting the product "+ product)
    return product ;
}

export async function getAllProducts() {
    const db = await openDB(DATABASE_NAME, 1);
    var cursor = await db.transaction("products").objectStore("products").openCursor();
    var products = []; //init an empty array
    //while there are products left
    while (cursor) {
        products.push(cursor.value); //add the new products to the result
        cursor = await cursor.continue(); //move to the next product
    }
    return products;
}

export async function insertProduct(product: Product) {
    const db = await openDB(DATABASE_NAME, 1)
    const tx = db.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    await store.put(product);
    console.log("insertion done!")
}

async function initDB() {
    const db = await openDB(DATABASE_NAME, 1, {
        upgrade(db) {
            //Create a store of object
            const store = db.createObjectStore('products', {
                //The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true,
            })
        }
    })
}