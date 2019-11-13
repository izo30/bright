document.getElementById('login').addEventListener('click', login);

function login(event) {
    event.preventDefault();

    let code = document.getElementById('code').value;

    if (!code) {
        let message = `
        <div class="alert alert-danger alert-dismissible" role="alert">
            <strong>Please enter your code</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        `;
        $('#error').html(message);
    } else {
        let formData = new FormData();
        formData.append('code', code);

        fetch('api/user_login.php', {
            method: 'POST',
            credentials: "same-origin",
            body: formData
        })
            .then((res) => res.json())
            .then((data) => {

                if (data == 'login successful') {
                    window.open("index.html", "_self");
                } else {
                    let message = `
                <div class="alert alert-warning alert-dismissible" role="alert">
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