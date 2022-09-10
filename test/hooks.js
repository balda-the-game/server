let app = require("../../server");
let supertest = require("supertest");
let chai = require("chai");

let should = chai.should;
let expect = chai.expect;
let request = supertest(app);

global.app = app;
global.should = should;
global.expect = expect;
global.request = request;
