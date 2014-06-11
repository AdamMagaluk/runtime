var expected = { protocol: 'ws:',
		 slashes: true,
		 auth: 'user:pass',
		 host: 'somedomain.com:1234',
		 port: '1234',
		 hostname: 'somedomain.com',
		 hash: '#hash1',
		 search: '?q=123',
		 query: 'q=123',
		 pathname: '/events',
		 path: '/events?q=123',
		 href: 'ws://user:pass@somedomain.com:1234/events?q=123#hash1' };


/* test rig */ var t = 1, tmax = Object.keys(expected).length + 2;
function ok (a, d) { console.log(a ? 'ok ' + (t++) + ' -' : 'not ok ' + (t++) + ' -', d); }
function equal (a, b, d) { console.log((a === b) ? 'ok ' + (t++) + ' -' : 'not ok ' + (t++) + ' -', d); }

console.log(t + '..' + tmax);
ok(process.versions.colony, 'running in colony')

var url = require('url');

// test that url returns an object
ok(url.parse('http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6'), 'url parses');


// test parsing path url
var expectedPathUrl = { protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: null,
  query: null,
  pathname: '/one/two/three',
  path: '/one/two/three',
  href: '/one/two/three' };

var actualPathUrl = url.parse('/one/two/three');
Object.keys(expectedPathUrl).forEach(function(k){
  equal(actualPathUrl[k], expectedPathUrl[k], k + ' should match expected path url')
});



// parse url
var actual = url.parse('ws://user:pass@somedomain.com:1234/events?q=123#hash1');

// test all properties on expected url obj vs pared object
Object.keys(expected).forEach(function(k){
  equal(actual[k], expected[k], k + ' should matched expected ')
});


// test url.parse for .hostname
ok(url.parse('http://api.openweathermap.org/data/2.5/weather?id=5327684&units=imperial').hostname == 'api.openweathermap.org', 'hostname match');


// test url.format
equal(url.format(expected), 'ws://user:pass@somedomain.com:1234/events?q=123#hash1', 'url.format check');

// Test url.resolve
equal(url.resolve('/one/two/three', 'four'), '/one/two/four', 'url.resolve 1');
equal(url.resolve('http://example.com/', '/one'), 'http://example.com/one', 'url.resolve 2');
equal(url.resolve('http://example.com/one', '/two'), 'http://example.com/two', 'url.resolve 3');

