const client = require('./client.cjs');
const createCustomer = require('./customers.cjs');
const {createRobot, getAllRobots} = require('./robots.cjs');
const createTask = require('./tasks.cjs');


const dropTables = async() => {
    try {
        await client.query(`
            DROP TABLE IF EXISTS customers_robots;
            DROP TABLE IF EXISTS robots_tasks;
            DROP TABLE IF EXISTS robots;
            DROP TABLE IF EXISTS tasks;
            DROP TABLE IF EXISTS customers;
        `)
    } catch (error) {
        console.log(error);
    }
}
const createTables = async() => {
    try {
        await client.query(`
            CREATE TABLE robots (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50),
                model VARCHAR(50),
                image VARCHAR(200),
                safeKids BOOLEAN,
                company VARCHAR(70),
                expireDate DATE,
                releaseDate DATE
            );

            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY,
                name VARCHAR(150)
            );

            CREATE TABLE customers (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                email VARCHAR(150)
            );

            CREATE TABLE customers_robots (
                customer_id INTEGER REFERENCES customers(id),
                robot_id INTEGER REFERENCES robots(id)
            );

            CREATE TABLE robots_tasks (
                robot_id INTEGER REFERENCES robots(id),
                task_id INTEGER REFERENCES tasks(id)
            );
        `)
    } catch (error) {
        console.log(error);
    }
}

const syncAndSeed = async() => {
    await client.connect();
    console.log('CONNECTED TO DATABASE');
    await dropTables();
    console.log('DROPPED TABLES');
    await createTables();
    console.log('CREATED TABLES');
    await createRobot('Rosie', 'Technomatic 451', 'https://robohash.org/rosie.png', true, 'Megatron Inc', '2102-11-11', '2023-02-12');
    await createRobot('Hankhelper', 'Exclestor 2337', 'https://robohash.org/hank.png', false, 'Elite Bots', '2086-05-23', '2012-09-13');
    await createRobot('Gambitbot', 'Technomatic 322', 'https://robohash.org/megatron.png', true, 'Megatron Inc', '2111-09-09', '2018-09-22');
    await createRobot('Boxotron', 'Helpmaster 888', 'https://robohash.org/boxter.png', true, 'Waytogo Machines Inc', '2045-04-12', '2022-12-07');
    await createRobot('Dusty', 'Gainfulation 9085', 'https://robohash.org/dusty.png', false, 'Good Quality Bots', '2097-08-25', '2019-09-30');
    await createRobot('Zoombator', 'Exclestor 7767', 'https://robohash.org/zoomba.png', true, 'Elite Bots', '2200-12-25', '2023-09-21');
    console.log('CREATED ROBOTS');
    await createCustomer('George Jetson', 'gjetson@galaxy.com');
    await createCustomer('Keanu Reeves', 'jwick@ustudios.com');
    await createCustomer('Hal Halibut', 'greatbigfish@galaxy.com');
    await createCustomer('Willy Nilli', 'musicman@gmail.com');
    await createCustomer('Hanna Montana', 'whatever@galaxy.com');
    await createCustomer('Nancy Drew', 'hidenseek@books.com');
    await createCustomer('Gladyse Knight', 'missingpips@columbia.com');
    await createCustomer('Tony Stark', 'myemail@myserver.com');
    console.log('CREATED CUSTOMERS');
    await createTask('Wash dishes');
    await createTask('Change oil');
    await createTask('Play violin');
    await createTask('Karate Sparring Partner');
    await createTask('Fold laundry');
    await createTask('Sweep and mop floors');
    await createTask('Grocery shopping');
    await createTask('Mow lawn');
    await createTask('Baby monitor');
    await createTask('Perform complex math calculations');
    await createTask('Read book');
    console.log('CREATED TASKS');
    await getAllRobots();
    client.end;
}
syncAndSeed();