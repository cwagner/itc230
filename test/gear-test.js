const expect = require("chai").expect;
const gear = require("../lib/gear_list.js");

describe("Gear module", () => {
	it("returns requested gear", function() {
	const result = gear.get(1);
	expect(result).to.deep.equal({id: 1, category: 'Bass', make: 'Squier', model: 'Jazz Bass', serialnumber: 'E982200'});
	});

	it("fails w/ invalid gear id", () => {
		const result = gear.get("fake");
	expect(result).to.be.undefined;
	});
	it("adds a new gear item", () => {
		const result = gear.add({id:6, category: 'Guitar', make: 'Rickenbacker', model: '330', serialnumber: 'Y14716'});
		expect(result).to.equal(true);
		expect(gear.get(6)).to.deep.equal({id:6, category: 'Guitar', make: 'Rickenbacker', model: '330', serialnumber: 'Y14716'});
	});
	it("fails to add an existing gear item", () => {
		const result = gear.add({id: 1, category: 'Bass', make: 'Squier', model: 'Jazz Bass', serialnumber: 'E982200'});
		expect(result).to.equal(false);
	});
	it("deletes an existing gear item", () => {
		const result = gear.delete(1);
		expect(result).to.deep.equal({id: 1, category: 'Bass', make: 'Squier', model: 'Jazz Bass', serialnumber: 'E982200'});
		expect(gear.get(1)).to.be.undefined;
	}) ;
	it("fails to delete an invalid gear id", () => {
		const result = gear.delete("fake");
		expect(result).to.be.undefined;
	});
});