let cart = {};
    let totalPrice = 0;

    function pedirConta() {
      const button = document.querySelector('.pedido-conta');
      button.classList.add('pedido-conta-verde'); // Adiciona a classe verde
      button.disabled = true; // Desabilita o botão para evitar múltiplas solicitações
      alert("Conta pedida!"); // Exemplo de ação ao clicar no botão
    }

    function addToCart(product, price) {
      if (cart[product]) {
        cart[product].quantity += 1;
      } else {
        cart[product] = { quantity: 1, price: price };
      }
      updateCart();
      saveCartToLocalStorage(); // Salva o carrinho no localStorage
    }

    function saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    function updateCart() {
      const cartList = document.getElementById('cart-list');
      cartList.innerHTML = '';
      totalPrice = 0;

      for (const product in cart) {
        const item = cart[product];

        const listItem = document.createElement('li');
        listItem.textContent = `${product} (${item.quantity}) - R$ ${item.price.toFixed(2)}`;
        
        // Adiciona um ícone para remover uma unidade do item
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash'; // Ícone de lixeira
        removeIcon.onclick = () => removeFromCart(product); // Chama a função para remover 1 unidade
        removeIcon.style.cursor = 'pointer'; // Muda o cursor para indicar que é clicável
        removeIcon.style.marginLeft = '10px'; // Espaçamento entre o texto e o ícone
        
        listItem.appendChild(removeIcon); // Adiciona o ícone ao item da lista
        cartList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
      }

      const totalItem = document.createElement('li');
      totalItem.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
      totalItem.style.fontWeight = 'bold';
      cartList.appendChild(totalItem);
    }

    function removeFromCart(product) {
      if (cart[product]) {
        cart[product].quantity -= 1; // Decrementa a quantidade

        if (cart[product].quantity <= 0) {
          delete cart[product]; // Remove o produto se a quantidade for zero ou negativa
        }

        saveCartToLocalStorage(); // Atualiza o localStorage
        updateCart(); // Atualiza a exibição do carrinho
      }
    }

    function toggleCart() {
      const cartDiv = document.getElementById('cart');
      cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
    }

    function requestOrder() {
      const orderDetails = JSON.stringify(cart); // Converte o carrinho em uma string JSON
      localStorage.setItem('order', orderDetails); // Armazena no localStorage
      alert("Pedido solicitado com sucesso!");
    }

    function loadProducts() {
      fetch('info.json')
        .then(response => response.json())
        .then(products => {
          const cardContainer = document.querySelector('.card-container');
          products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                            <img src="${product.imagem}" alt="${product.nome}">
                            <div>
                                <h2>${product.nome}</h2>
                                <p>${product.descricao}</p>
                                <p>R$ ${product.preco.toFixed(2)}</p>
                                <button class="button" onclick="addToCart('${product.nome}', ${product.preco})">Adicionar</button>
                            </div>
                        `;
            cardContainer.appendChild(card);
          });
        })
        .catch(error => console.error('Erro ao carregar os produtos:', error));
    }

    window.onload = loadProducts;