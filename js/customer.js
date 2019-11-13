$(document).ready(function () {
    getCustomer();
    getCustomerOrders();
    getCustomerOrdersSum();
});

document.getElementById('editButton').addEventListener('click', enableInputFields);
document.getElementById('updateCustomer').addEventListener('click', updateCustomer);

function getCustomer() {

    let formData = new FormData();
    formData.append('ID', sessionStorage.getItem('customerID'));

    fetch('api/get_single_customer.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            console.log(data);
            $('#fullName').val(data.full_name);
            $('#shopName').val(data.shop_name);
            $('#phone').val(data.phone);
            $('#location').val(data.location);
            $('.natures select').val(data.nature);
            $('.natures').selectpicker('refresh');
        })
        .catch((err) => console.log(err))
}

// enable input fields for editing
function enableInputFields(event) {
    event.preventDefault();

    $("#fullName").prop('disabled', false);
    $("#shopName").prop('disabled', false);
    $("#phone").prop('disabled', false);
    $("#location").prop('disabled', false);
    $("#nature").prop('disabled', false);
}

// submit updated customer details
function updateCustomer(event) {
    event.preventDefault();

    let ID = sessionStorage.getItem('customerID');
    let fullName = document.getElementById('fullName').value;
    let shopName = document.getElementById('shopName').value;
    let phone = document.getElementById('phone').value;
    let location = document.getElementById('location').value;
    let nature = document.getElementById('nature').value;

    if (!fullName ||
        !phone ||
        !location ||
        !nature) {
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

        if ((nature == "BUSINESS") && !shopName) {
            let message = `
            <div class="alert alert-danger alert-dismissible" role="alert">
                <strong>Shop name field is required</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            `;
            $('#error').html(message);
        } else {

            let formData = new FormData();
            formData.append('ID', ID);
            formData.append('full_name', fullName);
            formData.append('shop_name', shopName);
            formData.append('phone', phone);
            formData.append('location', location);
            formData.append('nature', nature);

            fetch('api/edit_customer.php', {
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
}

// retrieve order for a customer
function getCustomerOrders() {

    $(".totals").html("");
    $('#error').html("");

    let formData = new FormData();
    formData.append('customer_id', sessionStorage.getItem('customerID'));

    fetch('api/get_all_customer_orders.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((order) => {
                const { ID, customer_ID, product_ID, sales_rep, full_name, shop_name, product_name, quantity, cost, status, date } = order;

                $('#tableOrders').dataTable().fnAddData([
                    `${sales_rep}`,
                    `${full_name}`,
                    `${shop_name}`,
                    `${product_name}`,
                    `${quantity}`,
                    `${cost}`,
                    `${status}`,
                    `${date}`,
                    `<div class="row btn-actions">
                        <button class="btn btn-xs" onclick="openOrder('${ID}', '${status}')">View</button>
                        <button class="btn btn-xs btn-xs-delete" onclick="deleteOrder('${ID}')">Delete</button>
                    </div>`]);

            });
        })
        .catch((err) => console.log(err))
}

function openOrder(orderID, orderStatus) {
    sessionStorage.setItem('orderID', orderID);
    sessionStorage.setItem('orderStatus', orderStatus);
    window.open("order.html", "_self");
}

function deleteOrder(orderID) {
    event.preventDefault();

    if (!orderID) {

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
        formData.append('ID', orderID);

        fetch('api/delete_order.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'Record deleted successfully') {
                    window.open("orders.html", "_self");
                } else {
                    let message = `
                    <div class="alert alert-warning alert-dismissible fade in" role="alert">
                        <strong>Error!</strong> ${data}.
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

function getCustomerOrdersSum() {
    let formData = new FormData();
    formData.append('customer_id', sessionStorage.getItem('customerID'));

    fetch('api/get_all_customer_orders_sum.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            $(".totals").html("<h2>Total orders: Kshs. " +data+ "</h2>");
        })
        .catch((err) => console.log(err))
}