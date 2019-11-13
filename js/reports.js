document.getElementById('getOrderReports').addEventListener('click', getOrderReports);
document.getElementById('printOrdersReports').addEventListener('click', printOrdersReport);

function getOrderReports(event) {
    event.preventDefault();

    $(".totals").html("");
    $('#error').html("");

    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let status = document.getElementById('status').value;

    from = parseInt((new Date(from).getTime() / 1000).toFixed(0));
    to = parseInt((new Date(to).getTime() / 1000).toFixed(0));

    let formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('status', status);

    fetch('api/get_orders_reports.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {

            if (data == "0 results") {
                $('#tableOrders').dataTable().fnClearTable();
                let message = `
                    <div class="alert alert-warning alert-dismissible fade in" role="alert">
                        ${data}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    `;
                $('#error').html(message);
            } else {
                getOrdersReportsSum(from, to, status);
                $('#tableOrders').dataTable().fnClearTable();
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
                        `<button class="btn btn-xs" onclick="openOrder('${ID}')">View</button>`]);

                });
            }
        })
        .catch((err) => console.log(err))
}

function getOrdersReportsSum(from, to, status) {
    let formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('status', status);

    fetch('api/get_orders_reports_sum.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            $(".totals").html("<h2>Total for " +status+ " orders: Kshs. " +data+ "</h2>");
        })
        .catch((err) => console.log(err))
}

function printOrdersReport(event) {
    event.preventDefault();

    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let status = document.getElementById('status').value;

    from = parseInt((new Date(from).getTime() / 1000).toFixed(0));
    to = parseInt((new Date(to).getTime() / 1000).toFixed(0));

    let formData = new FormData();
    formData.append('from', from);
    formData.append('to', to);
    formData.append('status', status);

    fetch('api/generate_orders_report.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            console.log(data);
            if (data == "0 results") {
                let message = `
                <div class="alert alert-warning alert-dismissible fade in" role="alert">
                    ${data}
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

function openOrder(orderID) {
    sessionStorage.setItem('orderID', orderID);
    window.open("order.html", "_self");
}