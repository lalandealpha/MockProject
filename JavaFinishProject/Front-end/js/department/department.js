function viewDepartmentPage() {
    $(".main").load("./department/departmentPage.html", function() {
        setupSearchDepartmentEvent();
        refreshDepartmentTable();
        setupDepartmentPageFilter();

        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function buildDepartmentTable() {
    $('#department-table tbody').empty();
    getListDepartment();
}

var departments = [];

// paging
var currentDepartmentPage = 1;
var departmentPageSize = 10;

// sorting
var departmentSortField = "id";
var department_isAsc = false;

// get List
function getListDepartment() {
    var url = "http://localhost:8080/api/v1/departments";

    // paging
    url += '?page=' + currentDepartmentPage + '&size=' + departmentPageSize;

    // sorting
    url += "&sort=" + departmentSortField + "," + (department_isAsc ? "asc" : "desc");

    // search
    var search = document.getElementById("search-department-input").value;
    if (search) {
        url += "&search=" + search;
    }

    // filter
    var minDate = document.getElementById("filter-min-date-select").value;
    if (minDate) {
        url += "&minCreateDate=" + minDate;
    }
    var maxDate = document.getElementById("filter-max-date-select").value;
    if (maxDate) {
        url += "&maxCreateDate=" + maxDate;
    }
    var type = document.getElementById("filter-type-select").value;
    if (type && type != "All Types") {
        url += "&type=" + type;
    }

    // call API from server
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            departments = data.content;
            fillDepartmentToTable();
            fillDepartmentPaging(data.numberOfElements, data.totalPages);
            fillDepartmentSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("You are not authorized to view this page");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

function fillDepartmentToTable() {
    departments.forEach(function(item, index) {
        $('#department-table tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="department-checkbox"> ' +
            '<input id="department-checkbox-' + index + '" type="checkbox" onClick="onChangeDepartmentCheckboxItem()"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.totalMember + '</td>' +
            '<td>' + item.type + '</td>' +
            '<td>' + item.createDate + '</td>' +
            '<td class="td-actions"> ' +
            '<a href="#" data-toggle="tooltip" title="Add accounts" onclick="openAddAccountsToDepartmentModal(' + item.id + ', \'' + item.name + '\', \'' + item.type + '\')"><i class="fa-solid fa-plus"></i></a>' +
            '<a href="#" data-toggle="tooltip" title="Edit" onclick="openUpdateDepartmentModal(' + item.id + ')"><i class="fa-solid fa-pencil"></i></a>' +
            '<a href="#" data-toggle="tooltip" title="Delete" onclick="showDeleteSingleDepartmentModal(' + item.id + ', \'' + item.name + '\')"><i class="fa-regular fa-trash-can"></i></a>' +
            '</td>' +
            '</tr>'
        )
    });

    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
}

// paging
function fillDepartmentPaging(currentSize, totalPages) {
    // prev button
    if (currentDepartmentPage > 1) {
        document.getElementById("department-previousPage-btn").disabled = false;
    } else {
        document.getElementById("department-previousPage-btn").disabled = true;

    }

    // next button
    if (currentDepartmentPage < totalPages) {
        document.getElementById("department-nextPage-btn").disabled = false;
    } else {
        document.getElementById("department-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("department-page-info").innerHTML = currentSize + (currentSize > 1 ? " records, " : " record, ") + currentDepartmentPage + " of " + totalPages;
}

function prevDepartmentPage() {
    // reset checkbox all
    document.getElementById("department-checkbox-all").checked = false;
    changeDepartmentPage(currentDepartmentPage - 1);
}

function nextDepartmentPage() {
    // reset checkbox all
    document.getElementById("department-checkbox-all").checked = false;
    changeDepartmentPage(currentDepartmentPage + 1);
}

function changeDepartmentPage(page) {
    currentDepartmentPage = page;
    buildDepartmentTable();
}

// sorting
function fillDepartmentSorting() {
    var sortTypeClazz = department_isAsc ? "fa-sort-up" : "fa-sort-down";
    var defaultSortType = "fa-sort";

    switch (departmentSortField) {
        case 'name':
            // show sort type
            changeIconSortAccount("name-sort", sortTypeClazz);
            changeIconSortAccount("totalMember-sort", defaultSortType);
            changeIconSortAccount("createDate-sort", defaultSortType);

            // custom css
            $('#th-name a, #th-name i').css('color', '#fe6100');
            $('#th-totalMember a, #th-totalMember i').css('color', '#000');
            $('#th-createDate a, #th-createDate i').css('color', '#000');
            break;
        case 'totalMember':
            // show sort type
            changeIconSortAccount("name-sort", defaultSortType);
            changeIconSortAccount("totalMember-sort", sortTypeClazz);
            changeIconSortAccount("createDate-sort", defaultSortType);

            // custom css
            $('#th-name a, #th-name i').css('color', '#000');
            $('#th-totalMember a, #th-totalMember i').css('color', '#fe6100');
            $('#th-createDate a, #th-createDate i').css('color', '#000');
            break;
        case 'createDate':
            // show sort type
            changeIconSortAccount("name-sort", defaultSortType);
            changeIconSortAccount("totalMember-sort", defaultSortType);
            changeIconSortAccount("createDate-sort", sortTypeClazz);

            // custom css
            $('#th-name a, #th-name i').css('color', '#000');
            $('#th-totalMember a, #th-totalMember i').css('color', '#000');
            $('#th-createDate a, #th-createDate i').css('color', '#fe6100');
            break;

            // sort by id
        default:
            changeIconSortAccount("name-sort", defaultSortType);
            changeIconSortAccount("totalMember-sort", defaultSortType);
            changeIconSortAccount("createDate-sort", defaultSortType);

            // custom css
            $('#th-name a, #th-name i').css('color', '#000');
            $('#th-totalMember a, #th-totalMember i').css('color', '#000');
            $('#th-createDate a, #th-createDate i').css('color', '#000');
            break;
    }
}

function changeIconSortDepartment(id, sortTypeClazz) {
    document.getElementById(id).classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");
    document.getElementById(id).classList.add(sortTypeClazz);
}

function changeDepartmentSort(field) {
    if (field == departmentSortField) {
        department_isAsc = !department_isAsc;
    } else {
        departmentSortField = field;
        department_isAsc = true;
    }

    buildDepartmentTable();
}

// search
function setupSearchDepartmentEvent() {
    $("#search-department-input").on("keyup", function(event) {
        // enter key code = 13
        if (event.keyCode === 13) {
            buildDepartmentTable();
        }
    });
}

// filter
function filterDepartment() {
    buildDepartmentTable();
}

function setupDepartmentPageFilter() {
    console.log("123");
    setupMinDate();
    setupMaxDate();
    setupType();
}

function setupMinDate() {
    document.getElementById('filter-min-date-select').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

function setupMaxDate() {
    document.getElementById('filter-max-date-select').max = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    document.getElementById('filter-max-date-select').value = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
}

function setupType() {
    $("#filter-type-select").select2({
        placeholder: "Select a type"
    });
}

// refesh talbe
function refreshDepartmentTable() {
    // paging
    currentDepartmentPage = 1;
    departmentPageSize = 10;

    // sorting
    departmentSortField = "id";
    department_isAsc = false;

    // refresh search
    document.getElementById("search-department-input").value = "";

    // refresh filter
    document.getElementById('filter-min-date-select').value = "";
    document.getElementById('filter-max-date-select').value = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
    $('#filter-type-select').val('').trigger('change');

    // reset checkbox all
    document.getElementById("department-checkbox-all").checked = false;

    // Get API
    buildDepartmentTable();
}

function openDepartmentModal() {
    $('#addAndUpdateDepartmentModal').modal('show');
}

function hideDepartmentModal() {
    $('#addAndUpdateDepartmentModal').modal('hide');
}

// open create modal
function openAddDepartmentModal() {
    openDepartmentModal();
    resetAddDepartmentForm();
}

function resetAddDepartmentForm() {
    // reset accountIs
    checkedAccountIds = [];

    // set tilte 
    document.getElementById("addAndUpdateDepartment-modal-title").innerHTML = "Create New Department";

    // enable department name input
    document.getElementById('modal-department-name').disabled = false;

    // show add account button
    document.getElementById('add-account-btn').style.display = "inline-block";

    // set up type input
    setupModalType();

    // reset all input value
    document.getElementById('modal-department-name').value = "";
    $('#modal-type-select').val('').trigger('change');

    // reset all error message and css
    resetDepartmentModalErrMessage();
}

function setupModalType() {
    $("#modal-type-select").select2({
        placeholder: "Select a type"
    });
}

function resetDepartmentModalErrMessage() {
    hideFieldErrMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name");
    hideFieldErrMessageDepartmentModal("modal-input-errMess-type", "modal-type-select");
}

function showFieldErrorMessageDepartmentModal(messageId, inputId, message) {
    document.getElementById(messageId).innerHTML = message;
    document.getElementById(messageId).style.display = "block";
    document.getElementById(inputId).style.border = "1px solid red";
}

function hideFieldErrMessageDepartmentModal(messageId, inputId) {
    document.getElementById(messageId).style.display = "none";
    document.getElementById(inputId).style.border = "1px solid #ccc";
}

var error_message_departmentName = "Department name must be from 6 to 50 characters, and contain no special characters!"
var error_message_departmentName_exists = "Department name exists!";
var error_message_type = "You must choose a type!";

function isValidDepartmentName(name) {
    if (!name) {
        //show error message 
        showFieldErrorMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name", error_message_departmentName);
        return false;
    }

    // validate format
    var regex = new RegExp('^(?=.*[a-z])[a-zA-Z0-9\\s]{6,50}$');
    if (!regex.test(name)) {
        showFieldErrorMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name", error_message_departmentName);
        return false;
    };

    hideFieldErrMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name");
    return true;
}

function isValidType(type) {
    if (!type) {
        // show error message
        showFieldErrorMessageDepartmentModal("modal-input-errMess-type", "modal-type-select", error_message_type);
        $('#input-item-type .select2-selection.select2-selection--single').css('border', '1px solid red');
        return false;
    }

    hideFieldErrMessageDepartmentModal("modal-input-errMess-type", "modal-type-select");
    $('#input-item-type .select2-selection.select2-selection--single').css('border', '1px solid #aaa');
    return true
}

// save
function saveDepartment() {
    var id = document.getElementById("department-id").value;
    if (!id) {
        addDepartment();
    } else {
        updateDepartment();
    }
}

function addDepartment() {
    // get input values
    var name = document.getElementById("modal-department-name").value;
    var type = document.getElementById("modal-type-select").value;

    // validate
    var validName = isValidDepartmentName(name);
    var validType = isValidType(type);

    // format
    if (!validName || !validType) {
        return;
    }

    // check name unique
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/name/" + name + "/exists",
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            if (data) {
                // show error message
                showFieldErrorMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name", error_message_departmentName_exists);
                return;
            } else {
                createDepartmentViaAPI(name, type);

            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

var checkedAccountIds = [];

function openAddAccountsToNewDepartmentModal() {
    // get input values
    var name = document.getElementById("modal-department-name").value;
    var type = document.getElementById("modal-type-select").value;

    // validate
    var validName = isValidDepartmentName(name);
    var validType = isValidType(type);

    // format
    if (!validName || !validType) {
        return;
    }

    // check department name unique
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/name/" + name + "/exists",
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success

            if (data) {
                // show error message
                showFieldErrorMessageDepartmentModal("modal-input-errMess-departmentName", "modal-department-name", error_message_departmentName_exists);
                return;
            } else {
                // set modal title
                document.getElementById("addAccountToDepartment-modal-title").innerHTML = "Add accounts to " + (name.length < 15 ? name : name.slice(0, 14) + '...');

                // set department id
                document.getElementById("addAccountToDepartmentModal-department-id").value = "";

                // reset modal 
                refreshModalAccountTable();

                hideDepartmentModal();
                showAddAccountsToDepartmentModal();
                buildAccountsToDepartmentTable();

                document.getElementById('accounts-to-department-save-btn').onclick = function() { saveAccountToDepartment(name, type) };
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}

function showAddAccountsToDepartmentModal() {
    $('#addAccountsToDepartmentModal').modal('show');
}

function hideAddAccountsToDepartmentModal() {
    $('#addAccountsToDepartmentModal').modal('hide');
}

function buildAccountsToDepartmentTable() {
    $('#modal-accounts-table tbody').empty();
    getListModalAccounts();
}

function refreshModalAccountTable() {
    nullDepartmentAccounts = []

    // paging
    currentModalAccountPage = 1;
    currentModalAccountPageSize = 5;

    // sorting
    modalAccountSortField = "id";
    modalAccount_isAsc = false;

    // reset checkbox all
    document.getElementById("modal-accounts-checkbox-all").checked = false;
}

var nullDepartmentAccounts = [];

// paging
var currentModalAccountPage = 1;
var currentModalAccountPageSize = 10;

// sorting
var modalAccountSortField = "id";
var modalAccount_isAsc = false;

// get list
function getListModalAccounts() {
    var url = "http://localhost:8080/api/v1/accounts/department/null";

    // paging
    url += '?page=' + currentModalAccountPage + '&size=' + currentModalAccountPageSize;

    // sorting
    url += "&sort=" + modalAccountSortField + "," + (modalAccount_isAsc ? "asc" : "desc");

    // call API from server
    $.ajax({
        url: url,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            nullDepartmentAccounts = data.content;
            fillAccountsToDepartmentTable();
            fillModalAccountPaging(data.numberOfElements, data.totalPages);
            fillModalAccountSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillAccountsToDepartmentTable() {
    nullDepartmentAccounts.forEach(function(item, index) {
        $('#modal-accounts-table tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="modal-accounts-checkbox"> ' +
            '<input id="modal-accounts-checkbox-' + index + '" type="checkbox" onClick="onChangeModalAccountCheckboxItem()"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.username + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '</tr>'
        );
    });

    // get checked box if account is checked
    checkedAccountIds.forEach(id => {
        for (let index = 0; index < nullDepartmentAccounts.length; index++) {
            const element = nullDepartmentAccounts[index];
            if (id == element.id) {
                var checkboxItem = document.getElementById("modal-accounts-checkbox-" + index);
                checkboxItem.checked = true;
            }
        }
    })
}

// paging
function fillModalAccountPaging(currentSize, totalPages) {
    // prev
    if (currentModalAccountPage > 1) {
        document.getElementById("modal-account-prevPage-btn").disabled = false;
    } else {
        document.getElementById("modal-account-prevPage-btn").disabled = true;
    }

    // next
    if (currentModalAccountPage < totalPages) {
        document.getElementById("modal-account-nextPage-btn").disabled = false;
    } else {
        document.getElementById("modal-account-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("modal-accounts-page-info").innerHTML = currentSize + (currentSize > 1 ? " records, " : " record, ") + currentModalAccountPage + " of " + totalPages;
}

function prevModalAccountPage() {
    // reset checkbox all
    document.getElementById("modal-accounts-checkbox-all").checked = false;

    // get checked account ids
    getCheckedAccountIds();

    console.log(checkedAccountIds);
    changeModalAccountPage(currentModalAccountPage - 1);
}

function nextModalAccountPage() {
    // reset checkbox all
    document.getElementById("modal-accounts-checkbox-all").checked = false;

    // get checked account ids
    getCheckedAccountIds();

    console.log(checkedAccountIds);
    changeModalAccountPage(currentModalAccountPage + 1);
}

function changeModalAccountPage(page) {
    currentModalAccountPage = page;
    buildAccountsToDepartmentTable();
}

// get checked account ids
function getCheckedAccountIds() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("modal-accounts-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                checkedAccountIds.push(nullDepartmentAccounts[i].id);
            } else {
                checkedAccountIds = checkedAccountIds.filter(function(item) {
                    return item !== nullDepartmentAccounts[i].id
                })
            }
            i++;
        } else {
            break;
        }
    }
    checkedAccountIds = checkedAccountIds.filter((item, i, ar) => ar.indexOf(item) === i);
}

// sorting modal account
function fillModalAccountSorting() {
    var sortTypeClazz = account_isAsc ? "fa-sort-up" : "fa-sort-down";
    var defaultSortType = "fa-sort";

    switch (modalAccountSortField) {
        case 'username':
            // show sort type
            changeIconSortModalAccount("modal-username-sort", sortTypeClazz);
            changeIconSortModalAccount("modal-fullname-sort", defaultSortType);

            // custom css
            $('#modal-accounts-th-username a, #modal-accounts-th-username i').css('color', '#fe6100');
            $('#modal-accounts-th-full-name a, #modal-accounts-th-full-name i').css('color', '#000');
            break;
        case 'fullName':
            // show sort type
            changeIconSortModalAccount("modal-username-sort", defaultSortType);
            changeIconSortModalAccount("modal-fullname-sort", sortTypeClazz);

            // custom css
            $('#modal-accounts-th-username a, #modal-accounts-th-username i').css('color', '#000');
            $('#modal-accounts-th-full-name a, #modal-accounts-th-full-name i').css('color', '#fe6100');
            break;

            // sort by id
        default:
            changeIconSortModalAccount("modal-username-sort", defaultSortType);
            changeIconSortModalAccount("modal-fullname-sort", defaultSortType);

            // custom css
            $('#modal-accounts-th-username a, #modal-accounts-th-username i').css('color', '#000');
            $('#modal-accounts-th-full-name a, #modal-accounts-th-full-name i').css('color', '#000');
            break;
    }
}

function changeIconSortModalAccount(id, sortTypeClazz) {
    document.getElementById(id).classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");
    document.getElementById(id).classList.add(sortTypeClazz);
}

function changeModalAccountSorting(field) {
    if (field == modalAccountSortField) {
        modalAccount_isAsc = !modalAccount_isAsc;
    } else {
        modalAccountSortField = field;
        modalAccount_isAsc = true;
    }
    buildAccountsToDepartmentTable();
}

// checking box
function onChangeModalAccountCheckboxAll() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("modal-accounts-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            checkboxItem.checked = document.getElementById("modal-accounts-checkbox-all").checked
            i++;
        } else {
            break;
        }
    }
}

function onChangeModalAccountCheckboxItem() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("modal-accounts-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (!checkboxItem.checked) {
                document.getElementById("modal-accounts-checkbox-all").checked = false;
                return;
            }
            i++;
        } else {
            break;
        }
    }
    document.getElementById("modal-accounts-checkbox-all").checked = true;
}

// create department and accounts to department
function saveAccountToDepartment(name, type) {
    getCheckedAccountIds();
    console.log(checkedAccountIds);

    // get department id
    var id = document.getElementById("addAccountToDepartmentModal-department-id").value
    if (!id) {
        createDepartmentViaAPI(name, type);
    } else {
        updateDepartmentAccounts(id, checkedAccountIds);
    }
}

function createDepartmentViaAPI(name, type) {
    // call api create department
    var newDepartment = {
        "name": name,
        "type": type,
        "accountIds": checkedAccountIds
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments',
        type: 'POST',
        data: JSON.stringify(newDepartment), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            hideAddAccountsToDepartmentModal();
            hideDepartmentModal();
            showSuccessSnackBar("Success! New department created!");
            buildDepartmentTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// add accounts to deparment
function openAddAccountsToDepartmentModal(id, name, type) {

    // reset checked account
    checkedAccountIds = [];

    // set modal title
    document.getElementById("addAccountToDepartment-modal-title").innerHTML = "Add accounts to " + (name.length < 15 ? name : name.slice(0, 14) + '...');

    // set department id
    document.getElementById("addAccountToDepartmentModal-department-id").value = id;

    // reset modal 
    refreshModalAccountTable();

    showAddAccountsToDepartmentModal();
    buildAccountsToDepartmentTable();

    document.getElementById('accounts-to-department-save-btn').onclick = function() { saveAccountToDepartment(name, type) };
}

function updateDepartmentAccounts(departmentId, accountIds) {
    // get department from server
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/" + departmentId,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            var deparment = {
                "type": data.type,
                "accountIds": accountIds
            }

            console.log(accountIds);

            if (accountIds == null || accountIds.length == 0) {
                hideAddAccountsToDepartmentModal();
                showSuccessSnackBar("No account added to the department!");
                buildDepartmentTable();
                return;
            }

            $.ajax({
                url: 'http://localhost:8080/api/v1/departments/' + departmentId,
                type: 'PUT',
                data: JSON.stringify(deparment), // body
                contentType: "application/json", // type of body (json, xml, text)
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
                },
                success: function(data, textStatus, xhr) {
                    // success
                    hideAddAccountsToDepartmentModal();
                    showSuccessSnackBar("Success! Added " + (accountIds.length > 1 ? "accounts " : "account ") + "into department!");
                    buildDepartmentTable();
                },
                error(jqXHR, textStatus, errorThrown) {
                    alert("Error when loading data");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
};

// delete single department
function showDeleteSingleDepartmentModal(id, name) {
    $('#deleteSingleDepartmentModal').modal('show');
    document.getElementById('delete-single-department-confirm-mess').innerHTML = 'This action can not be undone. Delete <span style="color:red;">' + name + '</span>?';
    document.getElementById('delete-single-department-btn').onclick = function() { deleteSingleDepartment(id) };
}

function deleteSingleDepartment(id) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(result) {
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }

            $('#deleteSingleDepartmentModal').modal('hide');
            showSuccessSnackBar("Success! Department deleted.");
            refreshDepartmentTable();
        }
    });


}

// delete multiple departments
function onChangeDepartmentCheckboxAll() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("department-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            checkboxItem.checked = document.getElementById("department-checkbox-all").checked
            i++;
        } else {
            break;
        }
    }
}

function onChangeDepartmentCheckboxItem() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("department-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (!checkboxItem.checked) {
                document.getElementById("department-checkbox-all").checked = false;
                return;
            }
            i++;
        } else {
            break;
        }
    }
    document.getElementById("department-checkbox-all").checked = true;
}

function showDeleteMultipleDepartmentsModal() {
    $('#deleteMultipleDepartmentsModal').modal('show');

    // get checked
    var ids = [];
    var names = [];
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("department-checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(departments[i].id);
                names.push(departments[i].name);
            }
            i++;
        } else {
            break;
        }
    }

    if (!ids || ids.length == 0) {
        document.getElementById('delete-departments-confirm-mess').innerHTML = 'Choose at least one account to delete!';
        document.getElementById('delete-multiple-departments-btn').style.display = 'none';
    } else {
        document.getElementById('delete-departments-confirm-mess').innerHTML = 'This action can not be undone. Delete <span id="department-name-delete-message"></span>?';
        document.getElementById('department-name-delete-message').innerHTML += '<span style="color: red;">' + names.join(", ") + '</span> (<span style="color: red;">' + names.length + '</span> ' + (names.length == 1 ? 'department' : 'departments') + ')';
        document.getElementById('delete-multiple-departments-btn').style.display = 'inline-block';
        document.getElementById('delete-multiple-departments-btn').onclick = function() { deleteMultipleDepartments(ids) };
    }
}

function deleteMultipleDepartments(ids) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/departments?ids=' + ids.toString(),
        type: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(result) {
            // error
            if (result == undefined || result == null) {
                alert("Error when loading data");
                return;
            }

            // success
            showSuccessSnackBar("Success! " + (ids.length > 1 ? "Departments " : "Department ") + " deleted.");
            $('#deleteMultipleDepartmentsModal').modal('hide');
            document.getElementById("department-checkbox-all").checked = false;
            buildDepartmentTable();
        }
    });
}

// update department
function openUpdateDepartmentModal(id) {
    openDepartmentModal();

    // call API from server
    $.ajax({
        url: "http://localhost:8080/api/v1/departments/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            setupUpdateDepartmentForm(id, data.name, data.type);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function setupUpdateDepartmentForm(id, name, type) {
    // set tilte 
    document.getElementById("addAndUpdateDepartment-modal-title").innerHTML = "Update Department";

    // set department id 
    document.getElementById('department-id').value = id;

    // set department name input value
    document.getElementById('modal-department-name').value = name;

    // enable department name input
    document.getElementById('modal-department-name').disabled = true;

    // set up type
    setupModalType();

    // set up type value
    $('#modal-type-select').val(type).trigger('change');

    // hide add account button
    document.getElementById('add-account-btn').style.display = "none";

    // reset all error message and css
    resetDepartmentModalErrMessage();
}

function updateDepartment() {
    var id = document.getElementById('department-id').value;
    var type = document.getElementById('modal-type-select').value;

    departments.forEach(department => {
        if (id == department.id && type == department.type) {
            hideDepartmentModal();
            showSuccessSnackBar("Success! Department updated!");
            buildDepartmentTable();
            return;
        }
    })
    var department = {
        "type": type,
        "accountIds": []
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/departments/' + id,
        type: 'PUT',
        data: JSON.stringify(department), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            hideDepartmentModal();
            showSuccessSnackBar("Success! Department updated!");
            buildDepartmentTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });

}