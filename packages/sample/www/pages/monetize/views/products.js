document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', handleBackButton, false);

async function onDeviceReady() {
  await fetchProducts();
}

async function fetchProducts() {
  const productsDataContainer = document.getElementById('productsData');

  try {
    const products = await NotificareMonetize.getProducts();

    console.log('=== Got products successfully ===');
    enqueueToast('Got products successfully.', 'success');

    for (const product of products) {
      const productData = {};

      productData.ID = product.id;
      productData.Idemtifier = product.identifier;
      productData.Name = product.name;
      productData.Type = product.type;
      productData.Price = product.storeDetails?.price;

      const productCard = document.createElement('div');
      productCard.classList.add('card');
      productCard.classList.add('margin-top');

      for (const key of Object.keys(productData)) {
        const value = productData[key];

        const dataView = `
              <div class="data-row">
                <span class="data-label">${key}</span>
                <span class="data-text">${value}</span>
              </div>`;

        productCard.innerHTML += dataView;

        const divider = '<div class="divider-horizontal"></div>';
        productCard.innerHTML += divider;
      }

      const buyButton = document.createElement('button');
      buyButton.textContent = 'Buy';
      buyButton.addEventListener('click', () => purchaseProduct(product));
      productCard.appendChild(buyButton);

      productsDataContainer.appendChild(productCard);
    }
  } catch (e) {
    console.log('=== Error fetching products ===');
    console.log(e);

    enqueueToast('Error getting products.', 'error');
  }
}

async function purchaseProduct(product) {
  try {
    await NotificareMonetize.startPurchaseFlow(product);

    console.log('=== Product purchased successfully ===');
    enqueueToast('Product purchased successfully.', 'success');
  } catch (e) {
    console.log('=== Error purchasing product ===');
    console.log(e);

    enqueueToast('Error purchasing product.', 'error');
  }
}

function handleBackButton() {
  window.location.replace('../monetize-view.html');
}
