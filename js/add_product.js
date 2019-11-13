document.getElementById('addProduct').addEventListener('click', addProduct);

// submit new product details
function addProduct(event) {
    event.preventDefault();

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
        formData.append('product_name', productName);
        formData.append('product_code', code);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('unit', unit);
        formData.append('price', price);
        formData.append('brand', brand);

        fetch('api/add_product.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                // emptyFields();

                if (data == 'New product created successfully') {
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
    document.getElementById('productName').value = "";
    document.getElementById('code').value = "";
    document.getElementById('description').value = "";
    document.getElementById('category').value = "";
    document.getElementById('unit').value = "";
    document.getElementById('price').value = "";
    document.getElementById('brand').value = "";
}