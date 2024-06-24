const publicKey = 'APP_USR-3fa91575-503e-476a-b21d-4f49cae39fa6'; // Reemplaza con tu Public Key
const integratorId = 'dev_24c65fb163bf11ea96500242ac130004'; // Reemplaza con tu Integrator ID

// Inicializa el SDK de Mercado Pago
const mp = new MercadoPago(publicKey, {
    locale: 'es-UY'
});

document.getElementById('checkout-button').addEventListener('click', function () {
    // Crea la preferencia de pago
    fetch('https://joseatel.pro/meli/create_preference', { // Asegúrate de que esta URL sea correcta y funcione
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            items: [
                {
                    id: '1234',
                    title: 'Nombre del producto',
                    description: 'Dispositivo móvil de Tienda e-commerce',
                    picture_url: 'https://www.ejemplo.com/imagen.jpg',
                    quantity: 1,
                    unit_price: 100.0
                }
            ],
            payer: {
                name: 'Lalo',
                surname: 'Landa',
                email: 'test_user_17805074@testuser.com',
                phone: {
                    area_code: '11',
                    number: '4444-4444'
                },
                address: {
                    street_name: 'calle falsa',
                    street_number: 123,
                    zip_code: '11000'
                }
            },
            back_urls: {
                success: 'https://www.tusitio.com/success',
                failure: 'https://www.tusitio.com/failure',
                pending: 'https://www.tusitio.com/pending'
            },
            auto_return: 'approved',
            payment_methods: {
                excluded_payment_methods: [
                    {
                        id: 'visa'
                    }
                ],
                installments: 6
            },
            notification_url: 'https://www.tusitio.com/webhook',
            integrator_id: integratorId
        })
    })
    .then(response => response.json())
    .then(preference => {
        // Abre el checkout modal de Mercado Pago
        mp.checkout({
            preference: {
                id: preference.id
            },
            render: {
                container: '.container', // Indica el contenedor donde se abrirá el modal
                label: 'Pagar la compra'
            }
        });
    })
    .catch(error => {
        console.error('Error al crear la preferencia:', error);
    });
});
