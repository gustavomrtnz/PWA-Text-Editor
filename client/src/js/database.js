import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post to the database');
  // jateDb is the database object. 
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate','readwrite');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the.add() method to add a piece of data to the database.
  const request = store.add({ content: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database', result);

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');
  // jateDb is the database object.
  const jateDb = await openDB('jate', 1);
  // Create a new transaction and specify the database and data privileges.
  const tx = jateDb.transaction('jate','readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the.getAll() method to get all the data from the database.
  const request = store.getAll();
  // Get confirmation of the request and log the results.
  const result = await request;
  console.log('result.value', result);
}

initdb();
