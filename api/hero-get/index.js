const data = require('../shared/product-data');

module.exports = async function (context, req) {

    try {
        const product = data.getProduct(req.params.id);
        context.res = {
            status: 200,
            body: product,
            headers: { 'Content-Type': 'application/json' }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: error
        };
    }
};
