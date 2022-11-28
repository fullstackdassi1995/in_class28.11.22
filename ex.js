console.log("hey");

//const os = require('os');
//console.log(`Free memory: ${os.freemem()}`);
// open onodejs os module - search for this command
// print how much memory total i have

const fs = require('fs')
const files = fs.readdirSync('./')
console.log(`[sync ${files}`);

const sqlite3 = require('sqlite3').verbose();
const db_file_loc = 'db1.db'
const db = new sqlite3.Database(db_file_loc, (err) => {
    if (err){
        console.log(`failed to connected to ${db_file_loc}`);
    }
})

db.serialize(() => {
    db.each(`SELECT * from COMPANY
    WHERE SALARY > 30000
    ` , (err , row) =>{
        if (err){
            console.log('EROR' + err);
        }
        else{ 
            console.table(row)
        }
    })
})

function update_salary_by_id(db, id , new_salary){
    db.run(`UPDATE company
            SET SALARY = ${new_salary}
            WHERE id = ${id};`
    )

}
function delete_company_by_id(db, id){
    db.each( `DELETE FROM company
    WHERE id;`
    )
}
function close_db(db) {
    db.close(err => {
        if (err) {
            console.log(err.message);
        }
        else {
            console.log('Database connection closed!');
        }
    })
}

setTimeout(() => {
    update_salary_by_id(db , 4 , 13300)
}, 500);

setTimeout(() => {
    delete_company_by_id(db , 2)
}, 500); 

setTimeout(() => {
    close_db(db)
}, 1000);