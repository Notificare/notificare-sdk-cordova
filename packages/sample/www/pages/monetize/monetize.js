document.addEventListener('backbutton', handleBackButton, false);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openProducts() {
  try {
    console.log(`---> Open Products Clicked <---`);
    window.location.replace('../monetize/views/products-view.html');
  } catch (e) {
    console.log(e);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function openPurchases() {
  try {
    console.log(`---> Open Purchases Clicked <---`);
    window.location.replace('../monetize/views/purchases-view.html');
  } catch (e) {
    console.log(e);
  }
}

function handleBackButton() {
  window.location.replace('../home/home.html');
}
