document.addEventListener("DOMContentLoaded", function () {
    getOrders();
});

function getOrders() {
    fetch('api/get_user_orders.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((order) => {
                const { ID, customer_ID, product_ID, sales_rep, full_name, shop_name, product_name, quantity, cost, status, date } = order;

                console.log(order);

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