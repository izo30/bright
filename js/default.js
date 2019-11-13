// hide and display sidebar menu
$(document).ready(function () {
    $('[data-toggle=offcanvas]').click(function () {
        $('#side-menu').toggleClass('hidden-xs');
    });
});

// set bootstrap select
$(document).ready(function () {
    $('.selectpicker').selectpicker();
    $(".bootstrap-select").click(function () {
        $(this).addClass("open");
    });
});

$(document).ready(function () {
    getUserStatus();
    getCount();
});

// handle users access rights
function getUserStatus() {
    fetch('api/get_user_status.php', {
        method: 'POST',
        credentials: "same-origin"
    })
    .then((res) => { return res.json() })
    .then((data) => {

        switch (data) {
            case "offline":
                window.open("login.html", "_self");
                break;
            case "admin":
                $('.hide-admin').remove();
                break;
            default:
                $('.hide-user').remove();
                setProfilePic();
        }
    })
    .catch((err) => console.log(err))
}

document.getElementById('logout').addEventListener('click', logout);

// logout
function logout() {
    fetch('api/logout.php', {
        method: 'POST',
        credentials: "same-origin"
    })
    .then((res) => { return res.json() })
    .then((data) => {

        switch (data) {
            case "logged off":
                window.open("login.html", "_self");
                break;
            case "offline":
                window.open("login.html", "_self");
                break;
            default:
                window.open("login.html", "_self");
        }
    })
    .catch((err) => console.log(err))
}

// set counters for items in database
function getCount() {
    fetch('api/get_count.php', {
        method: 'POST',
        credentials: "same-origin"
    })
    .then((res) => { return res.json() })
    .then((data) => {
        console.log(data);
        $('.orders-count').html(data.orders);
        $('.customers-count').html(data.customers);
        $('.products-count').html(data.products);
        $('.users-count').html(data.users);
    })
    .catch((err) => console.log(err))
}

// set profile image
function setProfilePic() {
    fetch('api/get_user_profile.php', {
        method: 'POST',
        credentials: "same-origin"
    })
    .then((res) => { return res.json() })
    .then((data) => {
        $("#profile").attr("src", "api/images/" +data.image);
    })
    .catch((err) => console.log(err))
}