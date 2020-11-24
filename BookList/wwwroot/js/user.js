Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore

@par-ericsson
Learn Git and GitHub without any code!
Using the Hello World guide, you’ll start a branch, write comments, and open a pull request.


    bhrugen
    /
    BulkyBook
4
🔖 Custom notification settings
Looking for a little more control ? Now you can choose which types of activity you’d like to be notified about per repository.

2734
Code
Issues
1
Pull requests
1
Actions
Projects
Wiki
Security
Insights
BulkyBook / BulkyBook / wwwroot / js / user.js /
@bhrugen
bhrugen Section 12 - Final Lock Unlock API Call
Latest commit 47d351b on 4 Jan
History
1 contributor
70 lines(63 sloc)  2.35 KB

var dataTable;

$(document).ready(function () {
    loadDataTable();
});


function loadDataTable() {
    dataTable = $('#tblData').DataTable({
        "ajax": {
            "url": "/Admin/User/GetAll"
        },
        "columns": [
            { "data": "name", "width": "15%" },
            { "data": "email", "width": "15%" },
            { "data": "company.name", "width": "15%" },
            { "data": "role", "width": "15%" },
            {
                "data": {
                    id: "id", lockoutEnd: "lockoutEnd"
                },
                "render": function (data) {
                    var today = new Date().getTime();
                    var lockout = new Date(data.lockoutEnd).getTime();
                    if (lockout > today) {
                        //user is currently locked
                        return `
                            <div class="text-center">
                                <a onclick=LockUnlock('${data.id}') class="btn btn-danger text-white" style="cursor:pointer; width:100px;">
                                    <i class="fas fa-lock-open"></i>  Unlock
                                </a>
                            </div>
                           `;
                    }
                    else {
                        return `
                            <div class="text-center">
                                <a onclick=LockUnlock('${data.id}') class="btn btn-success text-white" style="cursor:pointer; width:100px;">
                                    <i class="fas fa-lock"></i>  Lock
                                </a>
                            </div>
                           `;
                    }

                }, "width": "25%"
            }
        ]
    });
}

function LockUnlock(id) {

    $.ajax({
        type: "POST",
        url: '/Admin/User/LockUnlock',
        data: JSON.stringify(id),
        contentType: "application/json",
        success: function (data) {
            if (data.success) {
                toastr.success(data.message);
                dataTable.ajax.reload();
            }
            else {
                toastr.error(data.message);
            }
        }
    });

}
