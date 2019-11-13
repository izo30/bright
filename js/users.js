document.addEventListener("DOMContentLoaded", function () {
    getUsers();
});

function getUsers() {
    fetch('api/get_all_users.php', {
        method: 'POST',
        credentials: "same-origin"
    })
        .then((res) => { return res.json() })
        .then((data) => {
            data.forEach((user) => {
                const { ID, code, full_name, ID_number, phone, status, date } = user;

                $('#tableUsers').dataTable().fnAddData( [
                    `${code}`, 
                    `${full_name}`, 
                    `${phone}`, 
                    `${ID_number}`, 
                    `${status}`, 
                    `${date}`, 
                    `<div class="row btn-actions">
                        <button class="btn btn-xs" onclick="openUser('${ID}')">View</button>
                        <button class="btn btn-xs btn-xs-delete" onclick="deleteUser('${ID}')">Delete</button>
                    </div>`]);
                
            });
        })
        .catch((err) => console.log(err))
}

function openUser(userID) {
    sessionStorage.setItem('userID', userID);
    window.open("user.html", "_self");
}

function deleteUser(userID) {
    event.preventDefault();

    if (!userID) {

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
        formData.append('ID', userID);

        fetch('api/delete_user.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'Record deleted successfully') {
                    window.open("users.html", "_self");
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