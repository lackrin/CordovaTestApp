var currentRow;
// Populate the database
//
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id INTEGER PRIMARY KEY AUTOINCREMENT, name,number)');
}

// Query the database
//
function queryDB(tx) {
    tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
}

function searchQueryDB(tx) {
    tx.executeSql("SELECT * FROM DEMO where name like ('%" + document.getElementById("txtName").value + "%')",
            [], querySuccess, errorCB);
}

//Delete query
function deleteRow(tx) {
    tx.executeSql('DELETE FROM DEMO WHERE id = ' + currentRow, [], queryDB, errorCB);
}

function insertDB(tx) {
    tx.executeSql('INSERT INTO DEMO (name,number) VALUES ("' + document.getElementById("txtName").value
            + '","' + document.getElementById("txtNumber").value + '")');
}

function editRow(tx) {
    tx.executeSql('UPDATE DEMO SET name ="' + document.getElementById("editNameBox").value +
            '", number= "' + document.getElementById("editNumberBox").value + '" WHERE id = '
            + currentRow, [], queryDB, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
    var tblText = '<table id="t01"><tr><th>ID</th> <th>Name</th> <th>Number</th></tr>';
    var len = results.rows.length;
    for (var i = 0; i < len; i++) {
        var tmpArgs = results.rows.item(i).id + ",'" + results.rows.item(i).name
                + "','" + results.rows.item(i).number + "'";
        tblText += '<tr onclick="goPopup(' + tmpArgs + ');"><td>' + results.rows.item(i).id + '</td><td>'
                + results.rows.item(i).name + '</td><td>' + results.rows.item(i).number + '</td></tr>';
    }
    tblText += "</table>";
    document.getElementById("tblDiv").innerHTML = tblText;
}