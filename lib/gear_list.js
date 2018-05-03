let gear_list = [
	{id: 1, category: 'Bass', make: 'Squier', model: 'Jazz Bass', serialnumber: 'E982200'},
	{id: 2, category: 'Guitar', make: 'Fender', model: 'Strat', serialnumber: 'MZ0198282'},
	{id: 3, category: 'Guitar', make: 'Ibanez', model: 'GAX70', serialnumber: '010106832'}, 
	{id: 4, category: 'Bass Amp', make: 'Orange', model: 'CR50BXT', serialnumber: '00139-0112'}, 
	{id: 5, category: 'Guitar Amp', make: 'Fender', model: 'Frontman 15G', serialnumber: 'IA07A04218'}
];

exports.getAll = () => {
	return gear_list;
};

exports.get = (id) => {
	return gear_list.find((gear) => {
		return gear.id == id;
	});
};

exports.delete = (id) => {
	index = gear_list.findIndex((gear) => {
		return gear.id == id;
	});
	if (index != -1) {
		return gear_list.splice(index, 1)[0];
	}
	else {
		return undefined;
	}
	
};

exports.add = (gear_object) => {
	if (this.get(gear_object.id)) {
		return false;
	}
	else {
		gear_list.push(gear_object);
		return true;
	}
}