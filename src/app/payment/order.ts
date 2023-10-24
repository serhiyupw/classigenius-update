export interface iOrder {

    orderid: number ,
    accountid: number,
    userid: number,
    licenseid : number,
    totalamount: number,
    currency : string,
    paid: boolean,
    paymentdate: Date,
    reference: string,
    paymethod: string,

}