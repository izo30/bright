document.getElementById('addUser').addEventListener('click', addUser);

// submit new user details
function addUser(event) {
    event.preventDefault();

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
        formData.append('full_name', fullName);
        formData.append('phone', phone);
        formData.append('ID_number', id);
        formData.append('status', status);
        formData.append('image', image.files[0]);

        fetch('api/add_user.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                // emptyFields();

                if (data == 'New user created successfully') {
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
    document.getElementById('fullName').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('id').value = "";
    document.getElementById('status').value = "";
}