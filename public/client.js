
$('#createForm').submit((event) => {
    $.ajax({
        url: '/api/issues/test',
        type: 'POST',
        data: $('#createForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    event.preventDefault();
})

$('#updateForm').submit((event) => {
    $.ajax({
        url: '/api/issues/test',
        type: 'PUT',
        data: $('#updateForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    event.preventDefault();
})

$('#deleteForm').submit((event) => {
    $.ajax({
        url: '/api/issues/test',
        type: 'DELETE',
        data: $('#deleteForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    event.preventDefault();
})