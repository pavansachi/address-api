"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_response_1 = require("../model/address.response");
var address_1 = require("../model/address");
var AddressService = (function () {
    function AddressService() {
    }
    AddressService.prototype.getAddress = function (address) {
        if (!!!address.buildingNumber) {
            address.buildingNumber = '';
        }
        if (!!!address.street) {
            address.street = '';
        }
        if (!!!address.suburb) {
            address.suburb = '';
        }
        if (!!!address.state) {
            address.state = '';
        }
        if (!!!address.postcode) {
            address.postcode = '';
        }
        return address.buildingNumber + " " + address.street + " " + address.suburb + " " + address.state + " " + address.postcode;
    };
    AddressService.prototype.getResponseList = function (addressDataList) {
        var _this = this;
        var workflowCompletedList = addressDataList.filter(function (e) { return e.workflow === 'completed'; });
        var addressList = workflowCompletedList.map(function (d) {
            var address = new address_1.Address();
            address.concataddress = _this.getAddress(d.address);
            address.type = d.type;
            address.workflow = d.workflow;
            return address;
        });
        var result = new address_response_1.AddressResponse();
        result.response = addressList;
        return result;
    };
    return AddressService;
}());
exports.AddressService = AddressService;
