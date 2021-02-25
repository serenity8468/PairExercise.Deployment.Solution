const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name;
const dbUrl =
	process.env.DATABASE_URL ||
	`postgres://pfixynywvzcejx:b247113d37243497dcd0e88ce3a100425691b7f3e8f0f6c64394c7ff39c950fa@ec2-54-211-77-238.compute-1.amazonaws.com:5432/d188lu8835ii9r/${dbName}`;

let config;

if (process.env.DATABASE_URL) {
	config = {
		logging: false,
		operatorsAliases: false,
		dialect: 'postgres',
		protocol: 'postgres',
		ssl: true,
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	};
} else {
	config = {
		logging: false,
		operatorsAliases: false,
	};
}

const client = new Sequelize(dbUrl, config);

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
	after('close database connection', () => client.close());
}

module.exports = client;
