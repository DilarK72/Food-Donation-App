class DonationDBManager {
  constructor(dbName, storeNames) {
    this.dbName = dbName;
    this.storeNames = storeNames;
    this.db = null;
  }

  async init() {
    if (this.db) {
      return;
    }

    this.db = await new Promise((resolve, reject) => {
      const openRequest = indexedDB.open(this.dbName, 1);

      openRequest.onupgradeneeded = (event) => {
        const db = event.target.result;
        for (const storeName of this.storeNames) {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, {
              keyPath: "id",
              autoIncrement: true,
            });
          }
        }
      };

      openRequest.onsuccess = () => resolve(openRequest.result);
      openRequest.onerror = () => reject(openRequest.error);
    });
  }

  async add(storeName, item) {
    const tx = this.db.transaction([storeName], "readwrite");
    const store = tx.objectStore(storeName);

    return await this._transactionPromise(tx, store.add(item));
  }

  async getById(storeName, id) {
    const tx = this.db.transaction([storeName], "readonly");
    const store = tx.objectStore(storeName);

    return await this._transactionPromise(tx, store.get(id));
  }

  async getAll(storeName) {
    const tx = this.db.transaction([storeName], "readonly");
    const store = tx.objectStore(storeName);

    return await this._transactionPromise(tx, store.getAll());
  }

  // async update(storeName, id, updatedData) {
  //   const tx = this.db.transaction([storeName], "readwrite");
  //   const store = tx.objectStore(storeName);

  //   let data = await this._transactionPromise(tx, store.get(id));
  //   if (!data) {
  //     throw new Error("Item not found");
  //   }

  //   data = { ...data, ...updatedData };
  //   return await this._transactionPromise(tx, store.put(data));
  // }

  async delete(storeName, id) {
    const tx = this.db.transaction([storeName], "readwrite");
    const store = tx.objectStore(storeName);

    await this._transactionPromise(tx, store.delete(id));
  }

  async addStore(storeName) {
    const tx = this.db.transaction([storeName], "readwrite");
    const store = tx.objectStore(storeName);
    return await this._transactionPromise(tx, store.add({}));
  }

  // Utility function to handle transactions and promisify request responses
  _transactionPromise(tx, request) {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => resolve(request.result); // Transaction success
      tx.onerror = () => reject(tx.error); // Transaction failed
    });
  }
}
