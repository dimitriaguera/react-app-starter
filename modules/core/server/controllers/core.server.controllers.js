/**
 * Created by Dimitri Aguera on 30/08/2017.
 */

exports.index = function(req, res) {
    res.render('./modules/core/server/views/index');
};

exports.renderNotFound = function(req, res) {
    res.status(404).json({
        success: false,
        msg: 'File not found'
    });
};
