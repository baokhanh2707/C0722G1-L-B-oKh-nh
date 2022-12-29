import {AttachFacility} from "./attachFacility";
import {Contract} from "./contract";

export interface ContractDetail {
  id:number;
  contract:Contract;
  attachFacility:AttachFacility;
  quantity:number;
}
