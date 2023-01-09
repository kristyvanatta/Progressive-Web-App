import { openDB } from 'idb';

const initdb = async () =>
//creates a new database named 'jate' using version 1 of the database
  openDB('jate', 1, {
    //add our database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      //create a new object store for the data and give it a key name of 'id' that increments automatically. 
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//export function to post to the database
export const postDb = async (content) => {
  console.log('Post to the database');

  //create connection to the database and version we want to use
  const jateDB = await openDB('jate', 1);

  //create new transaction and specify the database and privileges
  const tx = jateDb.transaction('jate', 'readwrite');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //use the .add() method on the sore to pass in the content
  const request = store.add({ id: 1, value: content });

  //get confirmation of the request
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};
//export function we will use to GET to the database
export const getDb = async () => {
  console.log('GET from the database');

  //create a connection to the datbase and version we want to use
  const jateDb = await openDB('jate', 1);

  //create new transaction and specify the database and data privileges
  const tx = jateDb.transaction('jate', 'readonly');

  //open up the desired object store
  const store = tx.objectStore('jate');

  //use the .getAll() method to get all data in the database
  const request = store.getAll();

  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
};

// start the database
initdb();
