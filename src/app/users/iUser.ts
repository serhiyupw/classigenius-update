

export interface iUser {
  
    userid: number,
    username: string,
   
    email : string,
    password : string,
    usertype : number,
    userrole : number,
    integratorid: number,
    projectid: number,
    accountid: number,
    fullname: string,
    phone: string,
    mobilephone: string,
    activationcode: number,
    activationcodeexpiration : number,
    userapproved : boolean,
    token : string,
    tokenexpiration : number,
    language : number,
    failedloginattempts: number,
    lastloginattempt : number,
    userblocked :boolean,
    newemail: string,
  
}

