document.getElementById('addProductRequest').addEventListener('click', addProductRequest);

// submit new product details
function addProductRequest(event) {
    event.preventDefault();

    let productName = document.getElementById('productName').value;
    let category = document.getElementById('category').value;

    if (!productName ||
        !category) {
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
        formData.append('category', category)

        fetch('api/add_product_request.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                // emptyFields();

                if (data == 'New product request created successfully') {
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
    category = document.getElementById('category').value = "";
}