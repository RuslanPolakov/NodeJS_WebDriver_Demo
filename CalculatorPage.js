"use strict";
var webdriver = require('selenium-webdriver');
var assert = require('assert')


function CalculatorPage(browser) {
    this.browser = browser;
}

CalculatorPage.prototype.ButtonNum = function (number) { return this.browser.findElement(webdriver.By.id('Btn' + number)); };
CalculatorPage.prototype.ButtonDot = function (number) { return this.browser.findElement(webdriver.By.id('BtnDot')); };
CalculatorPage.prototype.ButtonPlus = function (number) { return this.browser.findElement(webdriver.By.id('BtnPlus')); };
CalculatorPage.prototype.ButtonMinus = function (number) { return this.browser.findElement(webdriver.By.id('BtnMinus')); };
CalculatorPage.prototype.ButtonMult = function (number) { return this.browser.findElement(webdriver.By.id('BtnMult')); };
CalculatorPage.prototype.ButtonDiv = function (number) { return this.browser.findElement(webdriver.By.id('BtnDiv')); };
CalculatorPage.prototype.ButtonCalc = function (number) { return this.browser.findElement(webdriver.By.id('BtnCalc')); };
CalculatorPage.prototype.FieldInput = function (number) { return this.browser.findElement(webdriver.By.id('input')); };

CalculatorPage.prototype.AssertResult = function (Expected) {
    //Explicit Wait for be sure that result field refreshed after click '=' button
    var element = this.FieldInput();
    this.browser.wait(function () {
        return element.getAttribute("value").then(function (text) {
            return text === '' + Expected;
        });
    }, 1000).then(function () {
        console.log('Expected result displayed : ' + Expected);
    }, function () {
        element.getAttribute("value").then(function (text) {
            assert.equal(text, '' + Expected);
        });
    });
}

CalculatorPage.prototype.DoPlus = function (Number1, Number2)
{
    this.TypeNumber(Number1);
    this.ButtonPlus().click();    
    this.TypeNumber(Number2);
    return this.ButtonCalc().click();
}

CalculatorPage.prototype.DoMinus = function (Number1, Number2) {
    this.TypeNumber(Number1);
    this.ButtonMinus().click();
    this.TypeNumber(Number2);
    return this.ButtonCalc().click();
}

CalculatorPage.prototype.DoDiv = function (Number1, Number2) {
    this.TypeNumber(Number1);
    this.ButtonDiv().click();
    this.TypeNumber(Number2);
    return this.ButtonCalc().click();
}

CalculatorPage.prototype.DoMult = function (Number1, Number2) {
    this.TypeNumber(Number1);
    this.ButtonMult().click();
    this.TypeNumber(Number2);
    return this.ButtonCalc().click();
}

CalculatorPage.prototype.TypeNumber = function (Number)
{    
    var number = ("" + Number).split("");
    for (var i in number) {
        if (number[i] != '.' & number[i] != ',')
            this.ButtonNum(number[i]).click();
        else
            this.ButtonDot().click();
    }
}

module.exports = CalculatorPage;
