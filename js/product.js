$(document).ready(function () {
    getProduct();
});

document.getElementById('editButton').addEventListener('click', enableInputFields);
document.getElementById('updateProduct').addEventListener('click', updateProduct);

function getProduct() {

    let formData = new FormData();
    formData.append('ID', sessionStorage.getItem('productID'));

    fetch('api/get_single_product.php', {
        method: 'POST',
        credentials: "same-origin",
        body: formData
    })
        .then((res) => { return res.json() })
        .then((data) => {
            console.log(data);
            $('#productName').val(data.product_name);
            $('#code').val(data.product_code);
            $('#description').val(data.description);
            $('.products select').val(data.category);
            $('.products').selectpicker('refresh');
            $('.units select').val(data.unit);
            $('.units').selectpicker('refresh');
            $('#price').val(data.price);
            $('#brand').val(data.brand);
        })
        .catch((err) => console.log(err))
}

// enable input fields for editing
function enableInputFields(event) {
    event.preventDefault();

    $("#productName").prop('disabled', false);
    $("#code").prop('disabled', false);
    $("#description").prop('disabled', false);
    $("#product").prop('disabled', false);
    $("#price").prop('disabled', false);
    $("#brand").prop('disabled', false);
}

// submit updated product details
function updateProduct(event) {
    event.preventDefault();

    let ID = sessionStorage.getItem('productID');
    let productName = document.getElementById('productName').value;
    let code = document.getElementById('code').value;
    let description = document.getElementById('description').value;
    let category = document.getElementById('category').value;
    let unit = document.getElementById('unit').value;
    let price = document.getElementById('price').value;
    let brand = document.getElementById('brand').value;

    if (!productName ||
        !category ||
        !unit ||
        !price ||
        !brand) {
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
        formData.append('product_name', productName);
        formData.append('product_code', code);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('unit', unit);
        formData.append('price', price);
        formData.append('brand', brand);

        fetch('api/edit_product.php', {
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