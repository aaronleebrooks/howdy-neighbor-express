exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://demo:demo@ds161164.mlab.com:61164/howdyneighbor';

exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
                      		'mongodb://demo:demo@ds161584.mlab.com:61584/howdyneighbortest';

exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
