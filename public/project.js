const projectName = window.location.pathname.slice(1);
const url = '/api/issues/' + projectName;

$('#project-title').text(projectName + ' project');


$('#createForm').submit((event) => {
    $.ajax({
        url: url,
        type: 'POST',
        data: $('#createForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    loadListIssue();
    event.preventDefault();
})

$('#updateForm').submit((event) => {
    $.ajax({
        url: url,
        type: 'PUT',
        data: $('#updateForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    loadListIssue();
    event.preventDefault();
})

$('#deleteForm').submit((event) => {
    $.ajax({
        url: url,
        type: 'DELETE',
        data: $('#deleteForm').serialize(),
        success: data => $('#output').text(JSON.stringify(data))
    })
    loadListIssue();
    event.preventDefault();
})

loadListIssue = () => {
    $.ajax({
        url: url,
        type: 'GET',
        success: data => {
            let listIssue = [];
            data.forEach(i => {
                let issue = [];
                listIssue.push
            })
        }
    })

}