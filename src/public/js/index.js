document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.add-to-cart');

    addButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-id');
            const cartId = '67061cbe0c36de8b8553b67c'; // ID de carrito actual

            try {
                const response = await fetch(`/carts/${cartId}/products/${productId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const result = await response.json();
                if (result.status === 'success') {
                    alert('Producto agregado al carrito');
                    location.reload(); 
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Error al agregar el producto al carrito:', error);
                alert(`Error al agregar el producto: ${error.message}`);
            }
        });
    });

    const removeButtons = document.querySelectorAll('.delete-from-cart');

    removeButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const productId = this.getAttribute('data-id');
            const cartId = '67061cbe0c36de8b8553b67c';
            try {
                const response = await fetch(`/carts/${cartId}/products/${productId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    window.location.reload(); 
                } else {
                    const errorData = await response.json();
                    console.error('Error al eliminar el producto del carrito:', errorData);
                    alert('No se pudo eliminar el producto del carrito');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        });
    });
});
