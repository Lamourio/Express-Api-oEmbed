const micromatch = require('micromatch');

const fetch = require('node-fetch');
let vimeoFlickr =  require('../utils/data.json');
let allProviderOembed =  require('../utils/allProviderOembed.json');
require('dotenv').config();


// ===========================================================================

const CODEERROR = {
    JSONCANTBELOADED : 1,
    PPROVIDERNOTFOUND : 2,
    OEMBEDAPINOTFOUND : 3,
    SUCCESS : 0 
}

// ===========================================================================

// if we have a cdn we can make a call 

const PROVIDERS_URL = "https://oembed.com/providers.json";
async function fetchJson(url) {
    const resp = await fetch(url);
    if (resp.status !== 200) {
        throw new Error("Non 200 response");
    }   

    return await resp.json();
}


// ===========================================================================

async function handleOembedRequest(url) {
    let providers = null;
    // try {
    //     providers = await fetchJson(PROVIDERS_URL);
    // } catch (e) {
    //     return error(CODEERROR.JSONCANTBELOADED,`Providers JSON ${PROVIDERS_URL} could not be loaded`);
    // }

    if(process.env.PROVIDERS === "videoFlickr") providers = vimeoFlickr ;
    else if(process.env.PROVIDERS === "all") providers = allProviderOembed ;
    else providers = vimeoFlickr ;
    
    let apiUrl = null;

    for (const prov of providers) {
        for (const endpoint of prov["endpoints"]) {
            if (endpoint.schemes && micromatch.isMatch(url, endpoint.schemes)) {
                apiUrl = endpoint.url.replace("{format}", "json");
                break;
            } else if (!endpoint.schemes && prov.provider_url && url.startsWith(prov.provider_url)) {
                apiUrl = endpoint.provider_url;
                break;
            }
        }
    }

    if (!apiUrl) {
        return error(CODEERROR.PPROVIDERNOTFOUND,`No Oembed Provider found for: ${url} This URL may not be publicly embeddable.`);
    }

    const params = new URLSearchParams();
    params.set("url", url);
    params.set("format", "json");
    params.set("maxwidth", 640);
    params.set("maxheight", 480);

    apiUrl += "?" + params.toString();

    console.log(apiUrl);

    let oembed = null;

    try {
        oembed = await fetchJson(apiUrl);
    } catch (e) {
        console.log(e);
        return error(CODEERROR.OEMBEDAPINOTFOUND,"Oembed API Json could not be loaded: " + apiUrl);
    }
    return success(CODEERROR.SUCCESS,oembed);
}

// ===========================================================================

function error(codeError,msg) {
    const successRequest = false ;
    return [successRequest,codeError,msg]
}


// ===========================================================================

function success(codeError,oembed) {
    const successRequest = true ;
    return [successRequest,codeError,oembed]
}

module.exports = handleOembedRequest ;