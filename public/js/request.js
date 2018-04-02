function reloadd() {
        $.get('/ajax', function(res) {
            $('#val').html(res);
        });
}