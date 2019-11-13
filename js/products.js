document.addEventListener("DOMContentLoaded", function () {
    getProducts1();
    getRequests();
});

function getProducts() {
    fetch('api/get_all_products.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((product) => {
                const { ID, product_name, product_code, description, category, unit, price, brand, date } = product;

                $('#tableProducts').dataTable().fnAddData([
                    `${product_name}`,
                    `${category}`,
                    `${unit}`,
                    `${price}`,
                    `${brand}`,
                    `${date}`,
                    `<div class="row btn-actions">
                    <button class="btn btn-xs" onclick="openProduct('${ID}')">View</button>
                    <button class="btn btn-xs btn-xs-delete" onclick="deleteProduct('${ID}')">Delete</button>
                </div>`]);

            });
        })
        .catch((err) => console.log(err))
}

function getProducts1() {
    fetch('api/get_all_products.php', {
        method: 'POST',
        credentials: "same-origin"
    })
    .then((res) => { return res.json() })
    .then((data) => {
        // returnProductsJson(data)
        $(document).ready(function() {
            $('#tableProducts').DataTable( {
                "processing": true,
                "serverSide": true,
                "ajax": "api/get_products.php"
            } );
        } );
    })
    .catch((err) => console.log(err))
}

function openProduct(productID) {
    sessionStorage.setItem('productID', productID);
    window.open("product.html", "_self");
}

function getRequests() {
    fetch('api/get_all_product_requests.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((productRequest) => {
                const { ID, sales_rep, product_name, category, date } = productRequest;

                $('#tableRequests').dataTable().fnAddData([
                    `${sales_rep}`,
                    `${product_name}`,
                    `${category}`,
                    `${date}`,
                    `<button class="btn btn-xs" onclick="openRequest('${ID}')">Add</button>`]);

            });
        })
        .catch((err) => console.log(err))
}

function openRequest(requestID) {
    sessionStorage.setItem('requestID', requestID);
    window.open("add_product_request.html", "_self");
}

function deleteProduct(productID) {
    event.preventDefault();

    if (!productID) {

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
        formData.append('ID', productID);

        fetch('api/delete_product.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'Record deleted successfully') {
                    window.open("products.html", "_self");
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