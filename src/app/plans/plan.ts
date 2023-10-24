export interface iPlan {

    planid: number,
    description  : string,
    amount: number,
    currency : string ,
    trialperioddays : number,
    recurringmonths : number,
    periodmonths : number,
    maxpages : number,
    maxfields: number,
    maxpagesforpdfcreation: number,
    maxcaptureinstances: number,
    maxocrinstances: number,
    pagecontrolpolicy : number,
    featureslist : number,
    licensetype : string,
    trial: boolean;


    lic_type : string,

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

    expirationmethod : number,

    plantypedefault : number,
 

}


export function decodeLicFeatures(plan:iPlan,  featureslist:number) : iPlan {

    const getSelections = (items, selection) =>
      items.filter((_, i) => selection & (1 << i));
 
    const bitwiseLabels =
      ['lic_online', 'lic_offline', 'lic_setup', 'lic_runtime', 'lic_classify',
        'lic_templates', 'lic_fields_anywhere', 'lic_fields_templates',
        'lic_machineprint', 'lic_handprint', 'lic_barcode', 'lic_omr'];
   
    let selected = getSelections(bitwiseLabels, featureslist);
    
    // declare new license object
    let newplan: iPlan = { ...plan };
    
    newplan.lic_online  = selected.includes('lic_online') ? true : false;
    newplan.lic_offline = selected.includes('lic_offline') ? true : false;
    newplan.lic_setup = selected.includes('lic_setup') ? true : false;
    newplan.lic_runtime = selected.includes('lic_runtime') ? true : false;
    newplan.lic_classify = selected.includes('lic_classify') ? true : false;
    newplan.lic_templates = selected.includes('lic_templates') ? true : false;
    newplan.lic_fields_anywhere = selected.includes('lic_fields_anywhere') ? true : false;
    newplan.lic_fields_templates = selected.includes('lic_fields_templates') ? true : false;
    newplan.lic_machineprint = selected.includes('lic_machineprint') ? true : false;
    newplan.lic_handprint = selected.includes('lic_handprint') ? true : false;
    newplan.lic_barcode = selected.includes('lic_barcode') ? true : false;
    newplan.lic_omr = selected.includes('lic_omr') ? true : false;

    
    if (newplan.lic_online == true) {
       newplan.lic_type = "1";
    }
    if (newplan.lic_setup == true) {
       newplan.lic_type = "2";
    }
 
    return newplan;
 
  }