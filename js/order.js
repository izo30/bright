$(document).ready(function () {
    getOrder();
});

document.getElementById('editButton').addEventListener('click', enableInputFields);
document.getElementById('updateOrder').addEventListener('click', updateOrder);

function getOrder() {

    let formData = new FormData();
    formData.append('ID', sessionStorage.getItem('orderID'));

    fetch('api/get_single_order.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            $('#customerName').append(`<option selected="selected" value="${data.customer_ID}">${data.full_name}</option>`);
            $('#product').append(`<option selected="selected" value="${data.product_ID}" price="${data.price}">${data.product_name}</option>`);
            $('#quantity').val(data.quantity);
            $('#cost').val(data.cost);
            $('.statuses').select2('data', {id: data.status, text: data.status});
        })
        .catch((err) => console.log(err))
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

// enable input fields for editing
function enableInputFields(event) {
    event.preventDefault();

    $("#customerName").prop('disabled', false);
    $("#product").prop('disabled', false);
    $("#quantity").prop('disabled', false);
    $("#cost").prop('disabled', false);
}

// submit updated order details
function updateOrder(event) {
    event.preventDefault();

    let ID = sessionStorage.getItem('orderID');
    let customerId = document.getElementById('customerName').value;
    let productId = document.getElementById('product').value;
    let quantity = document.getElementById('quantity').value;
    let cost = document.getElementById('cost').value;
    let status;
    if($("#status").length == 0) {
        status = sessionStorage.getItem('orderStatus');
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
        formData.append('ID', ID);
        formData.append('customer_id', customerId);
        formData.append('product_id', productId);
        formData.append('quantity', quantity);
        formData.append('cost', cost);
        formData.append('status', status);

        fetch('api/edit_order.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'Record updated successfully') {
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

// adjust total cost
function calculateCost() {
    let price = $('option:selected', document.getElementById('product')).attr('price');
    let quantity = document.getElementById('quantity').value;

    if (price) {
        document.getElementById('cost').value = price * quantity;
    }

}



