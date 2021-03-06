import { AddressResponse } from '../model/address.response';
import { AddressData } from '../model/address.data';
import { Address } from '../model/address';

export class AddressService {

   private getAddress(address: Address) {

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

        return `${address.buildingNumber} ${address.street} ${address.suburb} ${address.state} ${address.postcode}`;
    } 

    public getResponseList (addressDataList: AddressData[]): AddressResponse {

        let workflowCompletedList = addressDataList.filter(e => e.workflow === 'completed');

        let addressList: Address[] = workflowCompletedList.map(d => {

            let address: Address = new Address();

            address.concataddress = this.getAddress(d.address);
            address.type = d.type;
            address.workflow = d.workflow;

            return address;
        });

        let result: AddressResponse = new AddressResponse();
        result.response = addressList;

        return result;
    }

}