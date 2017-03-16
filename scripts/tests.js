var App = window.App;

QUnit.test('datastore.js', function(assert) {
    var ds = new App.DataStore();
    // add
    ds.add('m@bond.com', 'tea');
    ds.add('james@bond.com', 'eshpressho');
    var result = ds.getAll();
    assert.deepEqual(result, {'m@bond.com': 'tea', 'james@bond.com': 'eshpressho'},'add function = Passed!');

    //remove
    ds.remove('james@bond.com');
    result = ds.getAll();
    assert.deepEqual(result, {
        'm@bond.com': 'tea'
    }, 'remove function = Passed!');

    //get
    result = ds.get('m@bond.com');
    assert.equal(result, 'tea', 'get function = Passed!');

    //undefined
    result = ds.get('james@bond.com');
    assert.equal(result, undefined, 'undefined test = Passed!');
});


//Truck printOrders returns undefined.
QUnit.test('truck.js', function(assert) {
    var myTruck = new App.Truck('007', new App.DataStore());
    myTruck.createOrder({
        emailAddress: 'me@goldfinger.com',
        coffee: 'double mocha'
    });
    myTruck.createOrder({
        emailAddress: 'dr@no.com',
        coffee: 'decaf'
    });
    myTruck.createOrder({
        emailAddress: 'm@bond.com',
        coffee: 'earl grey'
    });
    assert.deepEqual(myTruck.testGetAll(), ['me@goldfinger.com', 'dr@no.com', 'm@bond.com'], 'createOrder function = Passed!');
    myTruck.deliverOrder('dr@no.com');
    myTruck.deliverOrder('m@bond.com');
    assert.deepEqual(myTruck.testGetAll(), ['me@goldfinger.com'], 'deliverOrder function = Passed!');
});
