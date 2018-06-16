const Gear = require("../models/gear");

exports.getAll = () => {
	return Gear.find({}, (err, result) => {
		if (err) {
			return err;
		}
		return result;
	});
};

exports.get = (id) => {
	return Gear.findOne({'id': id}, (err, result) => {
		if (err) {
			return err;
		}
		return result
	});
};

exports.delete = (id) => {
	return Gear.remove({'id': id}, (err, result) => {
		if (err) return next(err);
		return {deleted: result.result.n};
	});
};

exports.add = (item) => { //item  must be in json format
	let newgear = new Gear(item);
	newgear.save()
	return newgear;
};

