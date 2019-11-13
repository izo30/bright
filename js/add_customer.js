document.getElementById('addCustomer').addEventListener('click', addCustomer);

// submit new customer details
function addCustomer(event) {
    event.preventDefault();

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
            formData.append('full_name', fullName);
            formData.append('shop_name', shopName);
            formData.append('phone', phone);
            formData.append('location', location);
            formData.append('nature', nature);

            fetch('api/add_customer.php', {
                method: 'POST',
                credentials: "same-origin",
                body: formData
            })
                .then((res) => res.json())
                .then((data) => {

                    // emptyFields();

                    if (data == 'New customer created successfully') {
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

function emptyFields() {
    document.getElementById('fullName').value = "";
    shopName = document.getElementById('shopName').value = "";
    phone = document.getElementById('phone').value = "";
    location = document.getElementById('location').value = "";
    nature = document.getElementById('nature').value = "";
}