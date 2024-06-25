const items = [
    { id: 1, name: 'dress', price: 10.00 },
    { id: 2, name: 'trousers', price: 20.00 },
    { id: 3, name: 'skirt', price: 15.00 }
  ];
  function renderItems() {
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = '';
    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      const itemInfo = document.createElement('div');
      itemInfo.classList.add('item-info');
      itemInfo.innerHTML = `<p>${item.name} - $${item.price.toFixed(2)}</p>`;
      itemElement.appendChild(itemInfo);
      const itemActions = document.createElement('div');
      itemActions.classList.add('item-actions');
      const quantity = document.createElement('span');
      quantity.classList.add('quantity');
      quantity.innerHTML = `<button onclick="decreaseQuantity(${item.id})">-</button> <span id="quantity-${item.id}">1</span> <button onclick="increaseQuantity(${item.id})">+</button>`;
      itemActions.appendChild(quantity);
      const deleteBtn = document.createElement('span');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.innerHTML = `<button onclick="deleteItem(${item.id})">Delete</button>`;
      itemActions.appendChild(deleteBtn);
      const likeBtn = document.createElement('span');
      likeBtn.classList.add('like-btn');
      likeBtn.innerHTML = `<button onclick="toggleLike(${item.id})">Like</button>`;
      itemActions.appendChild(likeBtn);
      itemElement.appendChild(itemActions);
      itemsList.appendChild(itemElement);
    });
    updateTotal();
  }
  function updateTotal() {
    let totalPrice = 0;
    items.forEach(item => {
      const quantity = parseInt(document.getElementById(`quantity-${item.id}`).textContent);
      totalPrice += item.price * quantity;
    });
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
  }
  function increaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    updateTotal();
  }
  function decreaseQuantity(itemId) {
    const quantityElement = document.getElementById(`quantity-${itemId}`);
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantity--;
      quantityElement.textContent = quantity;
      updateTotal();
    }
  }
  function deleteItem(itemId) {
    items.splice(items.findIndex(item => item.id === itemId), 1);
    renderItems();
  }
  function toggleLike(itemId) {
    const likeBtn = document.querySelector(`#items-list .item:nth-child(${itemId}) .like-btn`);
    likeBtn.classList.toggle('active');
  }
  
  renderItems();  