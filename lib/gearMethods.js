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
	return Gear.remove({'_id': id}, (err, result) => {
		if (err) {
			return err;
		}
		return result;
	}).then((result) => {
		return {deleted: result.n};
	}).catch((err) => {
		return next(err);
	});
};

exports.add = (item) => { //item  must be in json format
	let newgear = new Gear(item);
	return newgear.save().then((result) => {
		console.log(result);
		return {"updated": 0, "_id": newGearItem._id};
	}).catch((err) => {
		return err;
	});	
};

exports.update = (id, newitem) => {
	return Gear.updateOne({_id: id}, newitem, (err, result) => {
		if(err) {
			return err;
		}
		console.log(result);
		return {updated: result.nModified, _id: id};
	})
}

