let cart = {};
        let totalPrice = 0;

        function addToCart(product, price) {
            if (cart[product]) {
                cart[product].quantity += 1;
            } else {
                cart[product] = { quantity: 1, price: price };
            }
            updateCart();
        }

        function updateCart() {
            const cartList = document.getElementById('cart-list');
            cartList.innerHTML = '';
            totalPrice = 0;

            for (const product in cart) {
                const item = cart[product];

                const listItem = document.createElement('li');
                listItem.textContent = `${product} (${item.quantity}) - R$ ${item.price.toFixed(2)}`;
                cartList.appendChild(listItem);
                totalPrice += item.price * item.quantity;
            }

            const totalItem = document.createElement('li');
            totalItem.textContent = `Total: R$ ${totalPrice.toFixed(2)}`;
            totalItem.style.fontWeight = 'bold';
            cartList.appendChild(totalItem);
        }

        function toggleCart() {
            const cartDiv = document.getElementById('cart');
            cartDiv.style.display = cartDiv.style.display === 'block' ? 'none' : 'block';
        }

        function requestOrder() {
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