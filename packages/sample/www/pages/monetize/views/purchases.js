document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener('backbutton', handleBackButton, false);

async function onDeviceReady() {
  await fetchPurchases();
}

async function fetchPurchases() {
  const purchasesDataContainer = document.getElementById('purchasesData');

  try {
    const purchases = await NotificareMonetize.getPurchases();

    console.log('=== Got purchases successfully ===');
    enqueueToast('Got purchases successfully.', 'success');

    for (const purchase of purchases) {
      const purchasesData = {};

      purchasesData.ID = purchase.id;
      purchasesData['Product Identifier'] = purchase.productIdentifier;
      purchasesData.Time = purchase.time;

      const purchaseCard = document.createElement('div');
      purchaseCard.classList.add('card');
      purchaseCard.classList.add('margin-top');

      const keys = Object.keys(currentDeviceData);
      const lastKey = keys[keys.length - 1];

      for (const key of keys) {
        const value = purchasesData[key];

        const dataView = `
              <div class="data-row">
                <span class="data-label">${key}</span>
                <span class="data-text">${value}</span>
              </div>`;

        purchaseCard.innerHTML += dataView;

        if (key !== lastKey) {
          const divider = '<div class="divider-horizontal"></div>';
          purchaseCard.innerHTML += divider;
        }
      }

      purchasesDataContainer.appendChild(purchaseCard);
    }
  } catch (e) {
    console.log('=== Error getting purchases ===');
    console.log(e);

    enqueueToast('Error getting purchases.', 'error');
  }
}

function handleBackButton() {
  window.location.replace('../monetize-view.html');
}
