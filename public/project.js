$(document).ready(function () {
    const projectName = window.location.pathname.slice(1);
    const url = '/api/issues/' + projectName;

    $('#project-title').text(projectName + ' project');

    const loadListIssue = () => {
        $.ajax({
            url: url,
            type: 'GET',
            success: data => {
                let listIssue = [];
                data.forEach(i => {
                    let issue = [
                        `
                        <div>
                            <table class='issue'>
                                <tr>
                                    <td>id</td>
                                    <td>${i._id}</td>
                                </tr>
                                <tr>
                                    <td>Title</td>
                                    <td>${i.issue_title}</td>
                                </tr>
                                <tr>
                                    <td>Text</td>
                                    <td>${i.issue_text}</td>
                                </tr>
                                <tr>
                                    <td>Open?</td>
                                    <td>${i.open}</td>
                                </tr>
                                <tr>
                                    <td>Status</td>
                                    <td>${i.status_text}</td>
                                </tr>
                                <tr>
                                    <td>Assigned</td>
                                    <td>${i.assigned_to}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>${i.created_by}</td>
                                </tr>
                                <tr>
                                    <td>Updated</td>
                                    <td>${i.updated_on}</td>
                                </tr>
                                <tr>
                                    <td>Created</td>
                                    <td>${i.created_on}</td>
                                </tr>
                            </table>
                        </div>
                        `
                    ]
                    listIssue.unshift(issue);
                })
                listIssue.unshift('<h1>List issue (' + data.length + ')</h1>');
                $('#list-issue').html(listIssue.join(' '));
            }
        })

    }

    loadListIssue();

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


})

