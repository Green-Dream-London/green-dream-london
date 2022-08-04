const statusCodes = require('../common/status-codes')

exports.get404 = async (req, res) => {
    res.status(statusCodes.NotFound).render('404', { pageTitle: 'Page Not Found', path: '/404' });
}