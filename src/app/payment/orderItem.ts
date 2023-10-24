export class OrderItem {

    orderitemid: number; // primary key
    orderid: number; // foreign key related to the "orders" table
    planid: number; // foreign key related to the "plans" table
    quantity: number;
    years: number;
    amount: number;
    currency: string;
}