/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: MD Arif Islam
 * Date: Jan 15, 2023
 *
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);

    callback(200, {
        message: 'This is a sample url',
    });
};

module.exports = handler;
