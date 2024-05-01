console.log("sdvxc");
document.addEventListener('DOMContentLoaded', function() {
    var boom = document.getElementById('searchi');
    boom.addEventListener('input', function() {
        var searchValue = this.value.toLowerCase();
        var usersDiv = document.querySelector('.bottle');
        var userDivs = usersDiv.querySelectorAll('div');

        userDivs.forEach(function(div) {
            var id = div.id.toLowerCase();
            if (id.includes(searchValue)) {
                div.style.display = 'flex';
            } else {
                div.style.display = 'none'; 
            }
        });
    });
});



