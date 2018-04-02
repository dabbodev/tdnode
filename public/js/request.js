function reloadd() {
        $.get('/ajax', function(res) {
            $('#val').text(res);
        });
}