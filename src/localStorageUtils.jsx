export function getItemFromLocalStorage(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }
  
  export function updateItemInLocalStorage(key, updatedValue) {
    localStorage.setItem(key, JSON.stringify(updatedValue));
    console.log('Item updated and stored in local storage.');
  }
  