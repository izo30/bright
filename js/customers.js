document.addEventListener("DOMContentLoaded", function () {
    getCustomers();
});

function getCustomers() {
    fetch('api/get_user_customers.php', {
        method: 'POST',
        credentials: "same-origin"
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