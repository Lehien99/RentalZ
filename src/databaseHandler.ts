import { openDB } from 'idb'
import { Product } from './models';

const DATABASE_NAME = 'RentalZ DB';

initDB().then(() => {
    console.log("Init database done!", DATABASE_NAME)
})

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