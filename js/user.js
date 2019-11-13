$(document).ready(function () {
    getUser();
    getUserOrders();
    getUserCustomers();
});

document.getElementById('editButton').addEventListener('click', enableInputFields);
document.getElementById('updateUser').addEventListener('click', updateUser);

function getUser() {

    let formData = new FormData();
    formData.append('ID', sessionStorage.getItem('userID'));

    fetch('api/get_single_user.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            console.log(data);
            $('#fullName').val(data.full_name);
            $('#phone').val(data.phone);
            $('#id').val(data.ID_number);
            $('.statuses').select2('data', {id: "INACTIVE", text: "INACTIVE"});
        })
        .catch((err) => console.log(err))
}

// enable input fields for editing
function enableInputFields(event) {
    event.preventDefault();

    $("#fullName").prop('disabled', false);
    $("#phone").prop('disabled', false);
    $("#id").prop('disabled', false);
    $("#image").prop('disabled', false);
}

// submit updated user details
function updateUser(event) {
    event.preventDefault();

    let ID = sessionStorage.getItem('userID');
    let fullName = document.getElementById('fullName').value;
    let phone = document.getElementById('phone').value;
    let id = document.getElementById('id').value;
    let status = document.getElementById('status').value;
    let image = document.querySelector('input[type="file"]');

    if (!fullName ||
        !phone ||
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
        formData.append('full_name', fullName);
        formData.append('phone', phone);
        formData.append('ID_number', id);
        formData.append('status', status);
        formData.append('image', image.files[0]);

        fetch('api/edit_user.php', {
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

function getUserOrders() {

    let formData = new FormData();
    formData.append('user_id', sessionStorage.getItem('userID'));

    fetch('api/get_all_user_orders.php', {
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

function getUserCustomers() {

    let formData = new FormData();
    formData.append('user_id', sessionStorage.getItem('userID'));

    fetch('api/get_all_user_customers.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((customer) => {
                const { ID, sales_rep, full_name, shop_name, phone, location, nature, date } = customer;

                $('#tableCustomers').dataTable().fnAddData([
                    `${sales_rep}`,
                    `${full_name}`,
                    `${shop_name}`,
                    `${phone}`,
                    `${location}`,
                    `${nature}`,
                    `${date}`,
                    `<div class="row btn-actions">
                        <button class="btn btn-xs" onclick="openCustomer('${ID}')">View</button>
                        <button class="btn btn-xs btn-xs-delete" onclick="deleteCustomer('${ID}')">Delete</button>
                    </div>`]);

            });
        })
        .catch((err) => console.log(err))
}

function openCustomer(customerID) {
    sessionStorage.setItem('customerID', customerID);
    window.open("customer.html", "_self");
}

function deleteCustomer(customerID) {
    event.preventDefault();

    if (!customerID) {

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
        formData.append('ID', customerID);

        fetch('api/delete_customer.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'Record deleted successfully') {
                    window.open("customers.html", "_self");
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