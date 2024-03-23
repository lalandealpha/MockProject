function viewAccountPage() {
    $(".main").load("./account/accountPage.html", function() {
        setupSearchAccountEvent();
        setupAccountFilter();
        refreshAccountTable();

        // Activate tooltip
        $('[data-toggle="tooltip"]').tooltip();
    });
}

function buildAccountTable() {
    $('#account-table tbody').empty();
    getListAccounts();
}

var accounts = [];

// paging
var currentAccountPage = 1;
var accountPageSize = 10;

// sorting
var accountSortField = "id";
var account_isAsc = false;

// get List
function getListAccounts() {
    var url = "http://localhost:8080/api/v1/accounts";

    // paging
    url += '?page=' + currentAccountPage + '&size=' + accountPageSize;

    // sorting
    url += "&sort=" + accountSortField + "," + (account_isAsc ? "asc" : "desc");

    // search
    var search = document.getElementById("search-account-input").value;
    if (search) {
        url += "&search=" + search;
    }

    // filter
    var role = document.getElementById("filter-role-select").value;
    if (role && role != "All Roles") {
        url += "&role=" + role;
    }

    var departmentName = $("#filter-department-select option:selected").text();
    if (departmentName && departmentName != "All Departments") {
        url += "&departmentName=" + departmentName;
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
            accounts = data.content;
            fillAccountToTable();
            fillAccountPaging(data.numberOfElements, data.totalPages);
            fillAccountSorting();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("You are not authorized to view this page");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function fillAccountToTable() {
    accounts.forEach(function(item, index) {
        $('#account-table tbody').append(
            '<tr>' +
            '<td> ' +
            '<span class="account-checkbox"> ' +
            '<input id="checkbox-' + index + '" type="checkbox" onClick="onChangeAccountCheckboxItem()"/>' +
            '<label></label>' +
            '</span>' +
            '</td>' +
            '<td>' + item.username + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '<td>' + item.departmentName + '</td>' +

            '<td class="td-actions"> ' +
            '<a href="#" data-toggle="tooltip" title="Edit" onclick="openUpdateAccountModal(' + item.id + ')"><i class="fa-solid fa-pencil"></i></a>' +
            '<a href="#" data-toggle="tooltip" title="Delete" onclick="showDeleteSingleAccountModal(' + item.id + ', \'' + item.fullName + '\')"><i class="fa-regular fa-trash-can"></i></a>' +
            '</td>' +
            '</tr>'
        );
    });

    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();
}

// paging
function fillAccountPaging(currentSize, totalPages) {
    // prev
    if (currentAccountPage > 1) {
        document.getElementById("account-previousPage-btn").disabled = false;
    } else {
        document.getElementById("account-previousPage-btn").disabled = true;
    }

    // next
    if (currentAccountPage < totalPages) {
        document.getElementById("account-nextPage-btn").disabled = false;
    } else {
        document.getElementById("account-nextPage-btn").disabled = true;
    }

    // text
    document.getElementById("account-page-info").innerHTML = currentSize + (currentSize > 1 ? " records " : " record ") + currentAccountPage + " of " + totalPages;
}

function prevAccountPage() {
    // reset checkbox all
    document.getElementById("account-checkbox-all").checked = false;
    changeAccountPage(currentAccountPage - 1);
}

function nextAccountPage() {
    // reset checkbox all
    document.getElementById("account-checkbox-all").checked = false;
    changeAccountPage(currentAccountPage + 1);
}

function changeAccountPage(page) {
    currentAccountPage = page;
    buildAccountTable();
}

// Sorting
function fillAccountSorting() {
    var sortTypeClazz = account_isAsc ? "fa-sort-up" : "fa-sort-down";
    var defaultSortType = "fa-sort";

    switch (accountSortField) {
        case 'username':
            // show sort type
            changeIconSortAccount("username-sort", sortTypeClazz);
            changeIconSortAccount("fullname-sort", defaultSortType);
            changeIconSortAccount("departmentName-sort", defaultSortType);

            // custom css
            $('#th-username a, #th-username i').css('color', '#fe6100');
            $('#th-full-name a, #th-full-name i').css('color', '#000');
            $('#th-department a, #th-department i').css('color', '#000');
            break;
        case 'fullName':
            // show sort type
            changeIconSortAccount("username-sort", defaultSortType);
            changeIconSortAccount("fullname-sort", sortTypeClazz);
            changeIconSortAccount("departmentName-sort", defaultSortType);

            // custom css
            $('#th-username a, #th-username i').css('color', '#000');
            $('#th-full-name a, #th-full-name i').css('color', '#fe6100');
            $('#th-department a, #th-department i').css('color', '#000');
            break;
        case 'departmentName':
            // show sort type
            changeIconSortAccount("username-sort", defaultSortType);
            changeIconSortAccount("fullname-sort", defaultSortType);
            changeIconSortAccount("departmentName-sort", sortTypeClazz);

            // custom css
            $('#th-username a, #th-username i').css('color', '#000');
            $('#th-full-name a, #th-full-name i').css('color', '#000');
            $('#th-department a, #th-department i').css('color', '#fe6100');
            break;

            // sort by id
        default:
            changeIconSortAccount("username-sort", defaultSortType);
            changeIconSortAccount("fullname-sort", defaultSortType);
            changeIconSortAccount("departmentName-sort", defaultSortType);

            // custom css
            $('#th-username a, #th-username i').css('color', '#000');
            $('#th-full-name a, #th-full-name i').css('color', '#000');
            $('#th-department a, #th-department i').css('color', '#000');
            break;
    }
}

function changeIconSortAccount(id, sortTypeClazz) {
    document.getElementById(id).classList.remove("fa-sort", "fa-sort-up", "fa-sort-down");
    document.getElementById(id).classList.add(sortTypeClazz);
}

function changeAccountSort(field) {
    if (field == accountSortField) {
        account_isAsc = !account_isAsc;
    } else {
        accountSortField = field;
        account_isAsc = true;
    }
    buildAccountTable();
}

// search

function setupSearchAccountEvent() {
    $("#search-account-input").on("keyup", function(event) {
        // enter key code = 13
        if (event.keyCode === 13) {
            buildAccountTable();
        }
    });
}

// filter
function filterAccount() {
    buildAccountTable();
}

function setupAccountFilter() {
    setupRole();
    setupDepartmentFilter();
}

function setupRole() {
    $("#filter-role-select").select2({
        placeholder: "Select a role"
    });
}

function setupDepartmentFilter() {
    // change selectboxes to selectize mode to be searchable
    // setup call API
    $("#filter-department-select").select2({
        placeholder: "Select a department",
        ajax: {
            url: "http://localhost:8080/api/v1/departments",
            dataType: 'json',
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
            },
            data: function(params) {
                var query = {
                    // paging
                    page: 1,
                    size: 5,
                    // sorting
                    sort: "id,asc",
                    // search
                    search: params.term
                }

                // Query parameters will be ?page=1&size=5&sort=id,asc&search=[term]
                return query;
            },
            processResults: function(data) {
                var defaultValue = {
                    "id": 0,
                    "name": "All Departments"
                };

                var departments = data.content;
                departments.splice(0, 0, defaultValue);

                return {
                    results: $.map(departments, function(item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
}

// Refresh Table
function refreshAccountTable() {
    // refresh paging
    currentAccountPage = 1;
    accountPageSize = 10;

    // refresh sorting
    accountSortField = "id";
    account_isAsc = false;

    // refresh search
    document.getElementById("search-account-input").value = "";

    // refresh filter
    $("#filter-department-select").empty();
    $('#filter-role-select').val('').trigger('change');

    // reset checkbox all
    document.getElementById("account-checkbox-all").checked = false;

    // Get API
    buildAccountTable();
}

function openAccountModal() {
    $('#addAndUpdateAcccountModal').modal('show');
}

function hideAccountModal() {
    $('#addAndUpdateAcccountModal').modal('hide');
}

// open create modal 
function openAddAccountModal() {
    openAccountModal();
    resetAddAccountForm();
}

function resetAddAccountForm() {
    // set title
    document.getElementById("addAndUpdateAccount-modal-title").innerHTML = "Create New Account";

    // enable username, firstname and lastname input
    document.getElementById("modal-username").disabled = false;
    document.getElementById("modal-first-name").disabled = false;
    document.getElementById("modal-last-name").disabled = false;

    // Reset all input value
    document.getElementById("account-id").value = "";
    document.getElementById("modal-username").value = "";
    document.getElementById("modal-first-name").value = "";
    document.getElementById("modal-last-name").value = "";
    document.getElementById("modal-role-select").value = "PickARole";
    document.getElementById("modal-department-select").value = "PickADepartment";

    // role
    setupRoleSelectionInForm();

    // department
    setupDepartmentSelectionInForm();

    // Reset all error message and css
    resetAccountModalErrMessage();
}

function setupRoleSelectionInForm() {
    $("#modal-role-select").select2({
        placeholder: "Select a role"
    });
}

function setupDepartmentSelectionInForm() {
    // change selectboxes to selectize mode to be searchable
    // setup call API
    $("#modal-department-select").select2({
        placeholder: "Select a department",
        ajax: {
            url: "http://localhost:8080/api/v1/departments",
            dataType: 'json',
            type: "GET",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
            },
            data: function(params) {
                var query = {
                    // paging
                    page: 1,
                    size: 5,
                    // sorting
                    sort: "id,asc",
                    // search
                    search: params.term
                }

                // Query parameters will be ?page=1&size=5&sort=id,asc&search=[term]
                return query;
            },
            processResults: function(data) {
                return {
                    results: $.map(data.content, function(item) {
                        return {
                            text: item.name,
                            id: item.id
                        }
                    })
                };
            }
        }
    });
}

function resetAccountModalErrMessage() {
    hideFieldErrMessageAccountModal("modal-input-errMess-username", "modal-username");
    hideFieldErrMessageAccountModal("modal-input-errMess-name", "modal-first-name");
    hideFieldErrMessageAccountModal("modal-input-errMess-name", "modal-last-name");
    hideFieldErrMessageAccountModal("modal-input-errMess-role", "modal-role-select");
    hideFieldErrMessageAccountModal("modal-input-errMess-department", "modal-department-select");
}

function showFieldErrorMessageAccountModal(messageId, inputId, message) {
    document.getElementById(messageId).innerHTML = message;
    document.getElementById(messageId).style.display = "block";
    document.getElementById(inputId).style.border = "1px solid red";
}

function hideFieldErrMessageAccountModal(messageId, inputId) {
    document.getElementById(messageId).style.display = "none";
    document.getElementById(inputId).style.border = "1px solid #ccc";
}

var error_message_username = "Username must be from 6 to 18 characters, and contain no spaces and only allow special characters _-.";
var error_message_username_exists = "Username exists!";
var error_message_name = "First name and last name must be from 6 to 50 characters, and contain no numbers or special characters!";
var error_message_role = "You must choose a role!";
var error_message_department = "You must choose a department!";

function isValidUsername(username) {

    if (!username) {
        // show error message
        showFieldErrorMessageAccountModal("modal-input-errMess-username", "modal-username", error_message_username);
        return false;
    }

    // validate format
    var regex = new RegExp('^(?=.*[a-z])[a-zA-Z0-9_.-]{6,18}$');
    if (!regex.test(username)) {
        showFieldErrorMessageAccountModal("modal-input-errMess-username", "modal-username", error_message_username);
        return false;
    };

    hideFieldErrMessageAccountModal("modal-input-errMess-username", "modal-username");
    return true;
}

function isValidfirstname(name) {

    if (!name) {
        // show error message
        showFieldErrorMessageAccountModal("modal-input-errMess-name", "modal-first-name", error_message_name);
        return false;
    }

    // validate format
    var regex = new RegExp('^[a-zA-Z\\s]+$');
    if (!regex.test(name)) {
        showFieldErrorMessageAccountModal("modal-input-errMess-name", "modal-first-name", error_message_name);
        return false;
    };

    hideFieldErrMessageAccountModal("modal-input-errMess-name", "modal-first-name");
    return true;
}

function isValidlastname(name) {

    if (!name) {
        // show error message
        showFieldErrorMessageAccountModal("modal-input-errMess-name", "modal-last-name", error_message_name);
        return false;
    }

    // validate format
    var regex = new RegExp('^[a-zA-Z\\s]+$');
    if (!regex.test(name)) {
        showFieldErrorMessageAccountModal("modal-input-errMess-name", "modal-last-name", error_message_name);
        return false;
    };

    hideFieldErrMessageAccountModal("modal-input-errMess-name", "modal-last-name");
    return true;
}

function isValidRole(role) {
    if (!role) {
        // show error message
        showFieldErrorMessageAccountModal("modal-input-errMess-role", "modal-role-select", error_message_role);
        $('#input-item-role .select2-selection.select2-selection--single').css('border', '1px solid red');
        return false;
    }

    hideFieldErrMessageAccountModal("modal-input-errMess-role", "modal-role-select");
    $('#input-item-role .select2-selection.select2-selection--single').css('border', '1px solid #aaa');
    return true;
}

function isValidDepartment(department) {
    if (!department) {
        console.log("show message");
        // show error message
        showFieldErrorMessageAccountModal("modal-input-errMess-department", "modal-department-select", error_message_department);
        $('#input-item-departmentName .select2-selection.select2-selection--single').css('border', '1px solid red');
        return false;
    }

    hideFieldErrMessageAccountModal("modal-input-errMess-department", "modal-department-select");
    $('#input-item-departmentName .select2-selection.select2-selection--single').css('border', '1px solid #aaa');
    return true;
}

// save
function saveAccount() {
    var id = document.getElementById("account-id").value;
    if (!id) {
        addAccount();
    } else {
        updateAccount();
    }
}


function addAccount() {
    // get input values
    var username = document.getElementById("modal-username").value;
    var firstName = document.getElementById("modal-first-name").value;
    var lastName = document.getElementById("modal-last-name").value;
    var role = document.getElementById("modal-role-select").value;
    var departmentId = $('#modal-department-select option:selected').val();

    // validate
    var validUsername = isValidUsername(username);
    var validfirstname = isValidfirstname(firstName);
    var validlastname = isValidlastname(lastName);
    var validRole = isValidRole(role);
    var validDepartment = isValidDepartment(departmentId);

    // format
    if (!validUsername || !validfirstname || !validlastname || !validRole || !validDepartment) {
        return;
    }

    // check username unique
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/username/" + username + "/exists",
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
                showFieldErrorMessageAccountModal("modal-input-errMess-username", "modal-username", error_message_username_exists);
                return;
            } else {
                createAccountViaAPI(username, firstName, lastName, role, departmentId);
            }
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function createAccountViaAPI(username, firstName, lastName, role, departmentId) {
    // call api create account
    var newAccount = {
        "username": username,
        "firstName": firstName,
        "lastName": lastName,
        "role": role,
        "departmentId": departmentId
    }

    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts',
        type: 'POST',
        data: JSON.stringify(newAccount), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            hideAccountModal();
            showSuccessSnackBar("Success! New account created!");
            buildAccountTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

// delete single account
function showDeleteSingleAccountModal(accountId, fullName) {
    $('#deleteSingleAccountModal').modal('show');
    document.getElementById('delete-single-account-confirm-mess').innerHTML = 'This action can not be undone. Delete <span style="color:red;">' + fullName + '</span>?';
    document.getElementById('delete-single-account-btn').onclick = function() { deleteSingleAccount(accountId) };
}

function deleteSingleAccount(accountId) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + accountId,
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
            showSuccessSnackBar("Success! Account deleted.");
            $('#deleteSingleAccountModal').modal('hide');
            buildAccountTable();
        }
    });
}

// delete multiple accounts
function onChangeAccountCheckboxAll() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            checkboxItem.checked = document.getElementById("account-checkbox-all").checked
            i++;
        } else {
            break;
        }
    }
}

function onChangeAccountCheckboxItem() {
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (!checkboxItem.checked) {
                document.getElementById("account-checkbox-all").checked = false;
                return;
            }
            i++;
        } else {
            break;
        }
    }
    document.getElementById("account-checkbox-all").checked = true;
}

function showDeleteMultipleAccountsModal() {
    $('#deleteMultipleAccountsModal').modal('show');

    // get checked
    var ids = [];
    var fullnames = [];
    var i = 0;
    while (true) {
        var checkboxItem = document.getElementById("checkbox-" + i);
        if (checkboxItem !== undefined && checkboxItem !== null) {
            if (checkboxItem.checked) {
                ids.push(accounts[i].id);
                fullnames.push(accounts[i].fullName);
            }
            i++;
        } else {
            break;
        }
    }

    if (!ids || ids.length == 0) {
        document.getElementById('delete-accounts-confirm-mess').innerHTML = 'Choose at least one account to delete!';
        document.getElementById('delete-multiple-accounts-btn').style.display = 'none';
    } else {
        document.getElementById('delete-accounts-confirm-mess').innerHTML = 'This action can not be undone. Delete <span id="user-fullName-delete-message"></span>?';
        document.getElementById('user-fullName-delete-message').innerHTML += '<span style="color: red;">' + fullnames.join(", ") + '</span> (<span style="color: red;">' + fullnames.length + '</span> ' + (fullnames.length == 1 ? 'account' : 'accounts') + ')';
        document.getElementById('delete-multiple-accounts-btn').style.display = 'inline-block';
        document.getElementById('delete-multiple-accounts-btn').onclick = function() { deleteMultipleAccounts(ids) };
    }
}

function deleteMultipleAccounts(accountIds) {
    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts?ids=' + accountIds.toString(),
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
            showSuccessSnackBar("Success! Account deleted.");
            $('#deleteMultipleAccountsModal').modal('hide');
            buildAccountTable();
        }
    });

}

// update account
function openUpdateAccountModal(id) {
    openAccountModal();
    $.ajax({
        url: "http://localhost:8080/api/v1/accounts/" + id,
        type: 'GET',
        contentType: "application/json",
        dataType: 'json', // datatype return
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            setupUpdateAccountForm(id, data.username, data.firstName, data.lastName, data.role, data.departmentId);
        },
        error(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function setupUpdateAccountForm(id, username, firstName, lastName, role, departmentId) {
    // set title
    document.getElementById("addAndUpdateAccount-modal-title").innerHTML = "Update Account";

    // role
    setupRoleSelectionInForm();

    // reset all error message
    resetAccountModalErrMessage();

    // disable username, firstname and lastname input
    document.getElementById("modal-username").disabled = true;
    document.getElementById("modal-first-name").disabled = true;
    document.getElementById("modal-last-name").disabled = true;

    // set all account properties
    document.getElementById("account-id").value = id;
    document.getElementById("modal-username").value = username;
    document.getElementById("modal-first-name").value = firstName;
    document.getElementById("modal-last-name").value = lastName;
    $('#modal-role-select').val(role.toUpperCase()).trigger('change');

    // set up placeholder for department select
    setupDeparmentPlaceholderInUpdateForm(departmentId);

    // set up search department
    setupDepartmentSelectionInForm();

}

// set up placeholder for department select
function setupDeparmentPlaceholderInUpdateForm(departmentId) {
    $('#modal-department-select').select2({
        ajax: {
            url: 'http://localhost:8080/api/v1/departments/',
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
            }
        }
    });

    // Fetch the preselected item, and add to the control
    var departmentSelect = $('#modal-department-select');

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8080/api/v1/departments/' + departmentId,
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
    }).then(function(data) {
        // create the option and append to Select2
        var option = new Option(data.name, data.id, true, true);
        departmentSelect.append(option).trigger('change');

        // manually trigger the `select2:select` event
        departmentSelect.trigger({
            type: 'select2:select',
            params: {
                data: data
            }
        });
    });
}

function updateAccount() {
    var id = document.getElementById("account-id").value;
    var role = document.getElementById("modal-role-select").value;
    var departmentId = $('#modal-department-select option:selected').val();

    // validate

    var account = {
        "role": role,
        "departmentId": departmentId
    }
    $.ajax({
        url: 'http://localhost:8080/api/v1/accounts/' + id,
        type: 'PUT',
        data: JSON.stringify(account), // body
        contentType: "application/json", // type of body (json, xml, text)
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Basic " + btoa(storage.getItem("USERNAME") + ":" + storage.getItem("PASSWORD")));
        },
        success: function(data, textStatus, xhr) {
            // success
            hideAccountModal();
            showSuccessSnackBar("Success! Account updated!");
            buildAccountTable();
        },
        error(jqXHR, textStatus, errorThrown) {
            alert("Error when loading data");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}