// import { iMultiLicensePurchase } from './license';
import { CurrencyPipe } from "@angular/common";

export interface iLicense {

   // licenseid: number,
   // accountid: number,
   // integratorid: number,
   // projectid: number,
   // planid: number,
   // expirationdate: Date,
   // defaultexpirationdays: number,
   // trialperioddays  :number,
   // periodmonths: number,
   // maxpages: number,
   // maxfields: number,
   // maxpagesforpdfcreation: number,
   // maxcaptureinstances: number,
   // maxocrinstances: number,
   // licensekey: Text,
   // comments: Text,
   // environment : Text;
   // active: boolean,
   // trial: boolean,
   // featureslist: number,
   // stationcodeactivated: string;
   // activationdatetime: Date;
   // licensetype: string,
   // totalamount: number,
   // paid: boolean,

   // lic_type: string,

   // lic_online: boolean,
   // lic_offline: boolean,
   // lic_setup: boolean,
   // lic_runtime: boolean,
   // lic_classify: boolean,
   // lic_templates: boolean,
   // lic_fields_anywhere: boolean,
   // lic_fields_templates: boolean,
   // lic_machineprint: boolean,
   // lic_handprint: boolean,
   // lic_barcode: boolean,
   // lic_omr: boolean,

   licenseid: number;
   accountid: number;
   integratorid: number;
   projectid: number;
   periodmonths: number;
   expirationmethod: number;
   activationdatetime: Date;
   active: boolean;
   trialperioddays: number;
   maxpages: number;
   maxfields: number;
   maxpagesforpdfcreation: number;
   maxcaptureinstances: number;
   maxocrinstances: number;
   featureslist: number;
   licensekey: string;
   pagecontrolpolicy: number;
   comments: string;
   environment: string;
   stationcodeactivated: string;
   licensetype: string;
   trial: boolean;
   planid: number;
   orderitemid: number;
   paymentdate: Date;
   lastpaymentdate : Date;
   startdate: Date;
   expirationdate: Date;
   totalamount: number;
   paid: boolean;
   defaultexpirationdays: number;
   lic_type: string,

   lic_online: boolean,
   lic_offline: boolean,
   lic_setup: boolean,
   lic_runtime: boolean,
   lic_classify: boolean,
   lic_templates: boolean,
   lic_fields_anywhere: boolean,
   lic_fields_templates: boolean,
   lic_machineprint: boolean,
   lic_handprint: boolean,
   lic_barcode: boolean,
   lic_omr: boolean,



}

export interface iLicensePurchase {
   licenseid: number,
   licensekey: string,
   planid: number,
   periodmonths: number,
   amount: number,
   currency: string,
   projectid : number,
   licenses : number,
   currentyears : number,
   years : number,
   totalamount: number,
   
}

export interface iMultiLicensePurchase {
   setupyears : number,
   setupquantity: number,
   setupamount: number,

   basicyears : number,
   basicquantity: number,
   basicamount: number,

   architectyears : number,
   architectquantity: number,
   architectamount: number,
   

   fullyears : number,
   fullquantity: number,
   fullamount: number,
   
}
export interface iMultiLicensePurchaseResponse{
   orderid : number
}

export interface iMultiLicenseCartItem{

   plantype: number
   // licensekey: string,
   years: number,
   quantity: number,
   amount: number,

}


export function decodeLicFeatures(license:iLicense,  featureslist:number) : iLicense {

   const getSelections = (items, selection) =>
     items.filter((_, i) => selection & (1 << i));

   const bitwiseLabels =
     ['lic_online', 'lic_offline', 'lic_setup', 'lic_runtime', 'lic_classify',
       'lic_templates', 'lic_fields_anywhere', 'lic_fields_templates',
       'lic_machineprint', 'lic_handprint', 'lic_barcode', 'lic_omr'];
  
   let selected = getSelections(bitwiseLabels, featureslist);
   
   // declare new license object
   let newLicense: iLicense = { ...license };
   

   newLicense.lic_online  = selected.includes('lic_online') ? true : false;
   newLicense.lic_offline = selected.includes('lic_offline') ? true : false;
   newLicense.lic_setup = selected.includes('lic_setup') ? true : false;
   newLicense.lic_runtime = selected.includes('lic_runtime') ? true : false;
   newLicense.lic_classify = selected.includes('lic_classify') ? true : false;
   newLicense.lic_templates = selected.includes('lic_templates') ? true : false;
   newLicense.lic_fields_anywhere = selected.includes('lic_fields_anywhere') ? true : false;
   newLicense.lic_fields_templates = selected.includes('lic_fields_templates') ? true : false;
   newLicense.lic_machineprint = selected.includes('lic_machineprint') ? true : false;
   newLicense.lic_handprint = selected.includes('lic_handprint') ? true : false;
   newLicense.lic_barcode = selected.includes('lic_barcode') ? true : false;
   newLicense.lic_omr = selected.includes('lic_omr') ? true : false;
   
   console.log(newLicense);
   if (newLicense.lic_setup == true) {
      newLicense.lic_type = "1";
   }
   if (newLicense.lic_runtime == true) {
      newLicense.lic_type = "2";
   }

   return newLicense;

 }