const request = require('request');
describe('Tests', function () {
    it("Testing JSON Response", function (done) {
        request.get('http://localhost:9999/json', function (err, res, body) {
            if(res.statusCode === 200){
                done();
            }
        });
    });
    it("Testing created Response", function (done) {
        request.get('http://localhost:9999/created', function (err, res, body) {
            if(res.statusCode === 201){
                done();
            }
        });
    });
    it("Testing accepted Response", function (done) {
        request.get('http://localhost:9999/accepted', function (err, res, body) {
            if(res.statusCode === 202){
                done();
            }
        });
    });
    it("Testing Error Response", function (done) {
        request.get('http://localhost:9999/error', function (err, res, body) {
            if(res.statusCode === 500){
                done();
            }
        });
    });
    it("Testing Unauthorized Response", function (done) {
        request.get('http://localhost:9999/unauthorized', function (err, res, body) {
            if(res.statusCode === 401){
                done();
            }
        });
    });
    it("Testing Bad Request Response", function (done) {
        request.get('http://localhost:9999/badrequest', function (err, res, body) {
            if(res.statusCode === 400){
                done();
            }
        });
    });
});