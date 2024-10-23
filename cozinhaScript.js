function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const cardContainer = document.querySelector(".card-container");
  cardContainer.innerHTML = ""; // Limpa o container antes de adicionar novos cards

  for (const product in cart) {
    const item = cart[product];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
                        <div>
                            <h2>${product}</h2>
                            <p>Quantidade: ${item.quantity}</p>
                            <p>Preço unitário: R$ ${item.price.toFixed(2)}</p>
                            <p>Total: R$ ${(item.price * item.quantity).toFixed(
                              2
                            )}</p>
                            <span class="delete" onclick="decreaseQuantity('${product}')">&minus;</span>
                        </div>
                    `;
    cardContainer.appendChild(card);
  }
}

function decreaseQuantity(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (cart[product]) {
    cart[product].quantity -= 1; // Decrementa a quantidade

    if (cart[product].quantity <= 0) {
      delete cart[product]; // Remove o produto se a quantidade for zero ou negativa
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Atualiza o localStorage
    loadCart(); // Atualiza a exibição dos produtos
  }
}

function deleteAll() {
  localStorage.removeItem("cart"); // Remove todos os itens do carrinho
  loadCart(); // Recarrega os cards
}

window.onload = function () {
  loadCart();

  // Escuta o evento de armazenamento
  window.addEventListener("storage", function (event) {
    if (event.key === "cart") {
      loadCart(); // Recarrega o carrinho se houver alterações
    }
  });
};
