var pool = require('./bd');

async function getTickets() {
    var query = 'select * from tickets order by id desc';
    var rows = await pool.query(query);
    return rows;

}

async function deleteTicketsById(id) {
    var query = 'delete from tickets where id = ?';
    var rows = await pool.query(query, [id]);
    return rows;

}

async function insertTickets(obj) {
    try {
        var query = "insert into tickets set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getTicketsById(id) {
    var query = "select * from tickets where id=? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

async function modificarTicketsById(obj, id){
    try {
        var query ="update tickets set ? where id=? ";
        var rows = await pool.query(query, [obj, id]);
        return rows;
    } catch (error){
        throw error;
    }
}

module.exports = { getTickets, deleteTicketsById, insertTickets, getTicketsById, modificarTicketsById }
