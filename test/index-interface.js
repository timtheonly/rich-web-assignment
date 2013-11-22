var chai = require('chai');
var  expect = chai.expect;
var Browser = require('zombie');
var browser;

before(function(){
	browser = new  Browser({site:"http://localhost:3000"});
});


after(function(){
	browser.close();
});

beforeEach(function(done){
	browser.visit('/',done);
});

describe("check index",function(){
	this.timeout(20000);
	it("should contain 2 text fields and a submit button",function(){
		expect(browser.success).to.equal.ok;
		expect(browser.query('#username')).to.not.be.undefined;
		expect(browser.query('#password')).to.not.be.undefined;
		expect(browser.query('#submit')).to.not.be.undefined;			
	});
	
	it("should have disabled submit button initially",function(){
		expect(browser.success).to.be.ok;
		expect(browser.query('button:disabled')).to.not.be.undefined;
	});

	it("should have enabled button when all inputs filled", function(){
		expect(browser.success).to.be.ok;
		browser.fill('#username', 'hello').fill('#password', 'hello');
		expect(browser.query('button.btn.enabled')).to.not.be.null;
	});
});
