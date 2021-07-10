const data = require('../shared/product-data');

module.exports = async function (context, req) {

    try {
        const product = data.getProduct(req.params.id);
        context.res.status(200).json(product);
    } catch (error) {
        context.res.status(500).send(error);
    }
};
