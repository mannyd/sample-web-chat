import brands from '../../config/BeautyBrands';

const { NODE_ENV } = process.env;

function sendUtagLinkData(utagData) {
  console.log("sending Utag Link Data...", utagData);
  return new Promise((resolve) => {
    if (window && window.utag)
      window.utag.link(utagData, resolve);
  });
};

export function setAATagsEventName(flex, event_name) {
  if (flex?.session) {
    const AATags = flex.session.AATags || { event_name: [] };
    if (!Array.isArray(AATags.event_name)) {
      AATags.event_name = [event_name];
    } else { //else if (!AATags.event_name.includes(event_name)) {
      AATags.event_name.push(event_name);
    }
    flex.session.AATags = AATags;
    console.log("AATags = ", AATags);
  }  
}

export function setUtagData(updatedata) {

  let windowUtagData = {};

  if (window && window.utag_data_dt) {
    windowUtagData = window.utag_data_dt;
  }
  //console.log("windowUtagData...", windowUtagData);

  const utag_data_dt = {
    account_registration: windowUtagData.account_registration ? windowUtagData.account_registration : "false",
    cart_total_items: windowUtagData.cart_total_items ? windowUtagData.cart_total_items : 0,
    country_code: windowUtagData.country_code ? windowUtagData.country_code : 'US',
    customer_country: windowUtagData.customer_country ? windowUtagData.customer_country : 'United States',
    customer_email: windowUtagData.customer_email ? windowUtagData.customer_email : "undefined",
    customer_registered: windowUtagData.customer_registered ? windowUtagData.customer_registered : 'false',
    customer_segment: windowUtagData.customer_segment ? windowUtagData.customer_segment : '0',
    customer_status: windowUtagData.customer_status ? windowUtagData.customer_status : 'Not recognized',
    event_name: updatedata.event_name ? updatedata.event_name : "undefined",
    logged_in_status: windowUtagData.logged_in_status ? windowUtagData.logged_in_status : 'false',
    order_currency_code: windowUtagData.order_currency_code ? windowUtagData.order_currency_code : 'USD',
    profile_type: windowUtagData.profile_type ? windowUtagData.profile_type : 'customer',
    chat_type: updatedata.chat_type ? updatedata.chat_type : "undefined",
    fab_option: updatedata.fab_option ? updatedata.fab_option : "undefined",
    page_definition_id: "nm chat",
    page_name: "Twilio Chat",
    page_template: "nm chat",
    page_type: "chat application",
    post_chat_selection: updatedata.post_chat_selection ? updatedata.post_chat_selection : "undefined",
    server_date_time: windowUtagData.server_date_time ? windowUtagData.server_date_time : " ",
    site_abbreviation: windowUtagData.site_abbreviation ? windowUtagData.site_abbreviation : "nm",
    site_environment: windowUtagData.site_environment ? windowUtagData.site_environment : " ",
    unsupported_browser: windowUtagData.unsupported_browser ? windowUtagData.unsupported_browser : "[]",
    web_id: windowUtagData.web_id ? windowUtagData.web_id : ""
  };
  sendUtagLinkData(utag_data_dt);
};

export function getUtagData() {
  let windowUtagData = {};
  if (NODE_ENV === 'development') {
    windowUtagData = {
      account_registration: "false",
      cart_total_items: 7,
      country_code: "US",
      bread_crumb: {
        0: "Women",
        1: "Designers",
        2: "Natura Biss&eacute;",
        3: "Women's"
      },
      customer_country: "United States",
      customer_email: "OANH_NGUYEN@Sample.COM",
      available_sku_count: 1,
      customer_registered: "true",
      customer_segment: "0",
      customer_status: "Logged in",
      logged_in_status: "true",
      order_currency_code: "USD",
      //product_brand: "Byredo",
      //product_hierarchy: ['Beauty', 'Fragrances'],
      page_template: "P3", //On the Fab Menu to display Style Advisor assign value "P3" or to display Brand Advisor assign value "P3Beauty"
      profile_type: "customer",
      server_date_time: "1646428028",
      site_abbreviation: "nm",
      site_environment: "prod",
      unsupported_browser: "[]",
      web_id: "19471873860"
    };
  }
  else {
    if (window && window.utag_data_dt) {
      windowUtagData = window.utag_data_dt;
    }
  }
  //console.log("windowUtagData....", JSON.stringify(windowUtagData));
  return windowUtagData;
} 

export function getBrandInfoFromNMO() {
  const windowUtagData = getUtagData();
  const brandsList = Object.keys(brands.Brands);

  //Logic for PLP pages. utag_data_dt.bread_crumb is only available on PLP pages.
  let beautyBrand = windowUtagData.bread_crumb && windowUtagData.bread_crumb[2] ?
      brandsList.find(brand => brand.toLowerCase() === windowUtagData.bread_crumb[2].toLowerCase()) : undefined;

  //Logic for PDP pages. utag_data_dt.product_brand is only available on PDP pages.
  if (beautyBrand == undefined && windowUtagData.product_brand) {
    if(windowUtagData.product_hierarchy && Array.isArray(windowUtagData.product_hierarchy) && windowUtagData.product_hierarchy.length > 0) {
      if(windowUtagData.product_hierarchy[0] === 'Beauty') {
        if (Array.isArray(windowUtagData.product_brand)) {
          beautyBrand = brandsList.find(brand =>
            windowUtagData.product_brand.map(product_brand => product_brand.toLowerCase()).includes(brand.toLowerCase()));
        } else {
          beautyBrand = brandsList.find(brand => windowUtagData.product_brand.toLowerCase() === brand.toLowerCase());
        }
      }
    }
  }

  let eventType = beautyBrand ? brands.Brands[beautyBrand].eventType : undefined;
  let engagementType = beautyBrand ? 'beauty' : 'style';
  beautyBrand = brands.Brands[beautyBrand] ? brands.Brands[beautyBrand].brandNameToBeDisplayed : beautyBrand;
  
  //Overriding variables beautyBrand, engagementType, eventType, to avoid displaying Brand Advisor on the Fab Menu on Non Beauty PLP pages.
  //Logic for PLP pages. if utag_data_dt.page_template on PLP pages is not 'P3Beauty' 
  //then show Style Advisor option on the Fab Menu
  if(windowUtagData.bread_crumb && windowUtagData.page_template && windowUtagData.page_template !== "P3Beauty") {
    beautyBrand = undefined;
    engagementType = 'style';
    eventType = undefined;
  }

  console.log(`beautyBrand: ${beautyBrand}, engagementType: ${engagementType}, eventType: ${eventType}`);
  return { engagementType, beautyBrand, eventType };
}