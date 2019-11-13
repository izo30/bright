document.getElementById('addOrder').addEventListener('click', addOrder);

// submit new order details
function addOrder(event) {
    event.preventDefault();

    let customerId = document.getElementById('customerName').value;
    let productId = document.getElementById('product').value;
    let quantity = document.getElementById('quantity').value;
    let cost = document.getElementById('cost').value;
    let status;
    if ($("#status").length == 0) {
        status = "UNPAID";
    } else {
        status = document.getElementById('status').value;
    }

    if (!customerId ||
        !productId ||
        !quantity ||
        !cost ||
        !status) {

        let message = `
        <div class="alert alert-danger alert-dismissible" role="alert">
            <strong>Please enter all fields</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        $('#error').html(message);

    } else {
        let formData = new FormData();
        formData.append('customer_id', customerId);
        formData.append('product_id', productId);
        formData.append('quantity', quantity);
        formData.append('cost', cost);
        formData.append('status', status);

        fetch('api/add_order.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                // emptyFields();

                if (data == 'New order created successfully') {
                    let message = `
                    <div class="alert alert-success alert-dismissible fade in" role="alert">
                        <strong>Success!</strong> ${data}.
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `;
                    $('#error').html(message);
                } else {
                    let message = `
                    <div class="alert alert-warning alert-dismissible fade in" role="alert">
                        <strong>Error!</strong> ${data}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `;
                    $('#error').html(message);
                }
            })
            .catch((err) => console.log(err))
    }
}

function emptyFields() {
    document.getElementById('customerName').value = "";
    document.getElementById('product').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('cost').value = "";
    document.getElementById('status').value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    $('.statuses').select2();
    $('.categories').select2();
    getCustomers();
    getProducts();
});

// fetch customers and add them as options
function getCustomers() {
    fetch('api/get_all_customers.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((customer) => {
                const { ID, full_name, shop_name, phone, location, nature, date } = customer;
                $('.customers').append(`<option value="${ID}">${full_name}</option>`).trigger('change');
            });
            $('.customers').select2();
        })
        .catch((err) => console.log(err))
}

// fetch products and add them as options
function getProducts() {
    fetch('api/get_all_products.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((product) => {
                const { ID, product_name, product_code, description, category, price, quantity, date } = product;
                $('.products').append(`<option value="${ID}" price="${price}">${product_name}</option>`).trigger('change');
            });
            $('.products').select2();
        })
        .catch((err) => console.log(err))
}

// adjust total cost
function calculateCost() {
    let price = $('option:selected', document.getElementById('product')).attr('price');
    let quantity = document.getElementById('quantity').value;

    if (price) {
        document.getElementById('cost').value = price * quantity;
    }
}