export interface iLicensePayment {

    licensepaymentid : number,
    licenseid  : number ,
    planid : number,
    months : number,
    amount   :  number,
    currency : string,
    payreference : string,
    paymethod : string ,
    paymendate : Date,
    startdate : Date,
    expirationdate : Date,
    paid : boolean,
    userid : number,
    orderid : number,
    expirationmethod : number,
    activated : boolean,

}