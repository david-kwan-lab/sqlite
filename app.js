// Initialize SQL.js
let db;

initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
}).then(SQL => {
    // Create a database
    db = new SQL.Database();
    
    // Create tables and insert sample data
    db.run(`
        CREATE TABLE employees (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            position TEXT NOT NULL,
            salary REAL
        );
        
        INSERT INTO employees (name, position, salary)
        VALUES 
        ('John Doe', 'Developer', 75000),
        ('Jane Smith', 'Manager', 85000),
        ('Bob Johnson', 'Designer', 65000);
    `);

    // Query and display data
    displayEmployees();
});

function displayEmployees() {
    const result = db.exec("SELECT * FROM employees");
    
    if (result.length === 0) {
        document.getElementById('output').innerHTML = 'No data found';
        return;
    }

    const columns = result[0].columns;
    const values = result[0].values;

    let table = '<table>';
    
    // Add header row
    table += '<tr>';
    columns.forEach(column => {
        table += `<th>${column}</th>`;
    });
    table += '</tr>';

    // Add data rows
    values.forEach(row => {
        table += '<tr>';
        row.forEach(cell => {
            table += `<td>${cell}</td>`;
        });
        table += '</tr>';
    });

    table += '</table>';
    document.getElementById('output').innerHTML = table;
}
