"use strict";

var assert = require('assert'),
test = require('selenium-webdriver/testing'),
webdriver = require('selenium-webdriver'),
PageObjcet = require('./CalculatorPage.js');

var browser;
var calculatorPage;

describe('Calculator Test Suite', function () {

    this.timeout(10000);

    before(function () {
        browser = new webdriver.Builder().usingServer().withCapabilities({ 'browserName': 'chrome' }).build();
    });

    beforeEach(function () {
        browser.get('https://web2.0calc.ru/');
        calculatorPage = new PageObjcet(browser);
    });

    after(function (done) {
        browser.quit().then(done);
    });

    test.it('Plus operation', function () {
        calculatorPage.DoPlus(15, 10).then(calculatorPage.AssertResult(25));
    });

    test.it('Minus operation', function() {            
        calculatorPage.DoMinus(15, 10).then(calculatorPage.AssertResult(5));
    });

    test.it('Minus operation fractional', function () {
        calculatorPage.DoMinus(1.5, 1.2).then(calculatorPage.AssertResult(0.3));
    });
      
    test.it('Division operation', function () {
        calculatorPage.DoDiv(100, 5).then(calculatorPage.AssertResult(20));
    });

    test.it('Division by zero operation', function () {
        calculatorPage.DoDiv(100, 0).then(calculatorPage.AssertResult('Error: DivByZero'));
    });

    test.it('Multiplication operation', function () {
        calculatorPage.DoMult(133, 12).then(calculatorPage.AssertResult(1596));
    });       
})



    
    

