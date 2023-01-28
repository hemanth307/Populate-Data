let data = [];

// Populate table with data
function populateTable() {
  $('#data-table tbody').empty();
  data.forEach(item => {
    let row = `
      <tr>
        <td>${item.name}</td>
        <td>${item.contact}</td>
        <td><span class="delete-btn"  style="cursor:pointer;" >Delete</span></td>
      </tr>
    `;
    $('#data-table tbody').append(row);
  });
}

// Handle form submit
$('form').submit(function(e) {
  e.preventDefault();
  let name = $('#name').val();
  let contact = $('#contact').val();
  // Check for duplicates
  if (data.find(item => item.name === name)) {
    alert('This name already exists!');
    return;
  }
  if (data.find(item => item.contact === contact)) {
    alert('This contact already exists!');
    return;
  }
  data.push({ name, contact });
  populateTable();
  $('form')[0].reset();
});

// Handle delete button clicks
$(document).on('click', '.delete-btn', function() {
  let row = $(this).closest('tr');
  let name = row.find('td:first').text();
  let contact = row.find('td:nth-child(2)').text();
  if (confirm(`Are you sure you want to delete ${name}'s contact?`)) {
    data = data.filter(item => item.name !== name && item.contact !== contact);
    populateTable();
  }
});

// Search by name
$('#search').on('keyup', function() {
  let value = $(this).val().toLowerCase();
  $("#data-table tbody tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
  });
});

// Sort by name
$("#data-table th").click(function() {
  var table = $(this).parents("table").eq(0)
  var rows = table.find("tr:gt(0)").toArray().sort(comparer($(this).index()))
  this.asc = !this.asc
  if (!this.asc) {
    rows = rows.reverse()
  }
  for (var i = 0; i < rows.length; i++) {
    table.append(rows[i])
  }
});

function comparer(index) {
  return function(a, b) {
    var valA = getCellValue(a, index),
      valB = getCellValue(b, index)
    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
  }
}

function getCellValue(row, index) {
  return $(row).children("td").eq(index).text()
}
