var DATA;
async function fetchData(url){
    var x=fetch(url);
    var response=await x;
    var data=await response.json();
    init(data)
}
//fetchData('js/deviceData.json');
fetchData('https://raw.githubusercontent.com/SHRP-Devices/device_data/master/deviceData.json');

function init(x){
    window.DATA=x;
    renderCard(DATA);
}

function renderCard(DATA){
    document.getElementById("epicXContainer").innerHTML="";
    var Manufacturer=DATA[0].brand;
    var start=0;
    var end=0;
    var i=0;
    for(var i=0;i<DATA.length;i++){
        if(Manufacturer!=DATA[i].brand){
            Manufacturer=DATA[i].brand;
            end=i;
            createDeviceSection(DATA,start,end);
            start=end;
            
        }
    }
}
function createDeviceSection(DATA,fpos,lpos){
    var Manufacturer="";
    var row=document.createElement("div");
    row.classList.add("row");
    document.getElementById("epicXContainer").appendChild(brandHeader(DATA[fpos].brand));
    for(var i=fpos;i<lpos;i++){//RenderLoop
        row.appendChild(createCard(DATA[i]));
    }
    document.getElementById("epicXContainer").appendChild(row);
}



function createCard(CARDDATA){
    var d1=createDivByClass(["col-lg-3", "col-md-6", "col-xs-12"]);//CardContainer
    var d2=createDivByClass(["single-team", "wow", "fadeInUp"]);
    d2.setAttribute("data-wow-delay","0.2s");
    //TOP PART
    var d3=createDivByClass(["team-thumb"]);
    var a=document.createElement("a");
    a.setAttribute("href", CARDDATA.baseURL);
    var img=document.createElement("img");
    img.setAttribute("src", CARDDATA.mockSrc);
    a.appendChild(img);
    d3.appendChild(a);

    //BoTTOM PART
    var dd3=createDivByClass(["team-details"]);
    var dd4=createDivByClass(["team-inner"]);
    var h=document.createElement("h4");
    h.classList.add("team-title");
    h.innerHTML=CARDDATA.model;
    var p1=document.createElement("p");
    p1.innerHTML="Maintainer: "+CARDDATA.maintainer;
    var p2=document.createElement("p");
    p2.innerHTML="Version: "+CARDDATA.currentVersion;
    dd4.appendChild(h);
    dd4.appendChild(p1);
    dd4.appendChild(p2);
    dd3.appendChild(dd4);

    //LAst 
    d2.appendChild(d3);
    d2.appendChild(dd3);
    d1.appendChild(d2);
    return d1;
}
function createDivByClass(classes){
    var x=document.createElement("div");
    for(var i=0;i<classes.length;i++){
        x.classList.add(classes[i]);
    }
    return x;
}

//Device Manufacturer Name Header
function brandHeader(brandName){
    var div=document.createElement("div");
    div.classList.add("section-header");
    div.appendChild(createBrandHeadP(brandName,["btn", "btn-subtitle", "wow", "fadeInDown"]));
    return div;
}
function createBrandHeadP(text,classes){
    var x=document.createElement("p");
    for(var i=0;i<classes.length;i++){
        x.classList.add(classes[i]);
    }
    x.setAttribute("data-wow-delay","0.2s");
    x.innerHTML=text;
    return x;
}
