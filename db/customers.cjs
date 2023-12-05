const client = require('./client.cjs');

const createCustomer = async(name, email) => {
    try {
        await client.query(`
            INSERT INTO customers ( name, email)
            VALUES ('${name}', '${email}');
        `)
    } catch (error) {
        console.log(error);
    }

}
module.exports = createCustomer;