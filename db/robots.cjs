const client = require('./client.cjs');

const createRobot = async(name, model, image, safeKids, company, expireDate, releaseDate) => {
    try {
        await client.query(`
            INSERT INTO robots (name, model, image, safeKids, company, expireDate, releaseDate)
            VALUES ('${name}', '${model}', '${image}', ${safeKids}, '${company}', '${expireDate}', 
            '${releaseDate}');
        `)
    } catch (error) {
        console.log(error);
    }
}

const getAllRobots = async() => {
    try {
        const {rows} = await client.query(`
            SELECT * FROM robots;
        `);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createRobot,getAllRobots,}
