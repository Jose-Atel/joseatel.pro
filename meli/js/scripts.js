const publicKey = 'APP_USR-3fa91575-503e-476a-b21d-4f49cae39fa6'; // Reemplaza con tu Public Key
const integratorId = 'dev_24c65fb163bf11ea96500242ac130004'; // Reemplaza con tu Integrator ID

// Inicializa el SDK de Mercado Pago
const mp = new MercadoPago(publicKey, {
    locale: 'es-UY'
});

document.getElementById('checkout-button').addEventListener('click', function () {
    // Crear la preferencia de pago
    const preference = {
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
            success: 'https://joseatel.pro/meli/success.html',
            failure: 'https://joseatel.pro/meli/failure.html',
            pending: 'https://joseatel.pro/meli/pending.html'
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
        notification_url: 'https://joseatel.pro/meli/webhook',
        integrator_id: integratorId
    };

    fetch('https://api.mercadopago.com/checkout/preferences', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer APP_USR-2815099995655791-092911-c238fdac299eadc66456257445c5457d-1160950667` // Reemplaza con tu Access Token
        },
        body: JSON.stringify(preference)
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.id) {
            // Abre el checkout modal de Mercado Pago
            mp.checkout({
                preference: {
                    id: data.id
                },
                render: {
                    container: '.container', // Indica el contenedor donde se abrirá el modal
                    label: 'Pagar la compra'
                }
            });
        } else {
            console.error('Error: La preferencia no se creó correctamente');
        }
    })
    .catch(error => {
        console.error('Error al crear la preferencia:', error);
    });
});
