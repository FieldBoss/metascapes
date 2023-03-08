import React, { useState, useEffect } from 'react';
import Tokenizer from '../Tokenizer/Tokenizer';
import 'mapbox-gl/dist/mapbox-gl.css';
import './Mapper.css';
import * as XRPL from 'xrpl';
import sphereCloud from '../sphere_module.js';
import { Buffer } from 'buffer';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { DIDDataStore } from '@glazed/did-datastore';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import aliases2 from '../aliases2.js'; 
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

//INITIALIZE/CONNECT XRPL
const client = new XRPL.Client("wss://s.altnet.rippletest.net:51233");

//INITIALIZE/CONNECT CERAMIC
//set up and authorize a DID (decentralized identifier)
const privateKey = 'e89b10e72176dd6514470465c2ce3929b1ed55f40e0b3c8383098deb032dc1e7'
const mySeed = Buffer.from(privateKey, 'hex');
 
// Create and authenticate the DID specific to the privateKey 
const did = new DID({
    provider: new Ed25519Provider(mySeed), 
    resolver: getResolver(), 
})
 did.authenticate()
 
// Connect to the Ceramic node - testnet
const ceramic = new CeramicClient('https://ceramic-clay.3boxlabs.com')
ceramic.did = did
//ceramic stream that holds pod names/acct
let dataStore = new DIDDataStore({ ceramic, model: aliases2 })

const Mapper = (props) => {  
    const [sphere, setSphere] = useState([]);
    let myTokenID = ''
    mapboxgl.accessToken = 'pk.eyJ1IjoiZGNzbWFwczEiLCJhIjoiY2wzdWl2a2d1MmNoYzNjcGFzbDN4eGdsNSJ9.Dwz8RgGELznP_-aQSjV_-w'; 

    useEffect(()=>{
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center:[-78.478831,-0.161835],  //default avatar park and ride
            zoom: 16.2,
            pitch: 65,
            bearing: 45,
            antialias: true,
            attributionControl: false
        });  
        map.getCanvas().style.cursor = 'pointer';
        map.on('style.load', () => {
            //remove labels from stylesheet
            map.style.stylesheet.layers.forEach(function(layer) {
                if (layer.type === 'symbol') {
                    map.removeLayer(layer.id);
                }
            });
        });
    }, [])

    async function loadSphere(){ 
        let a = document.getElementById("childcount").value;
        if (a > 500 || a < 1){
            alert('Allowable nodes is 2 to 500');
            return;
        }

        let myCloud = sphereCloud(document.getElementById("childcount").value, document.getElementById("location").value);      
        setSphere(myCloud[0]);
            await loadCloud(myCloud[0], "loaded").then((result) => {
            let centerArray = [];
            centerArray.push(myCloud[1][0]);
            centerArray.push(myCloud[1][1])
            loadOblique('red', 'Preview Pod', result[0], result[1], result[2], result[3], centerArray);
        })
       
        //set controls
        document.getElementById("submit").disabled = false;
        document.getElementById("podname").disabled = false;
        document.getElementById("description").disabled = false;
        document.getElementById("tokenizedLoc").innerHTML = "";
        document.getElementById("tokenizedCount").innerHTML = "";
        document.getElementById("tokenizedDesc").innerHTML = "";
        document.getElementById("podname").value = "";
        document.getElementById("description").value = "";
        document.getElementById("explorer").disabled = true;
        document.getElementById("logo").style.visibility = 'hidden';

        document.getElementById("network").selectedIndex = "0";
        if (document.getElementById("menu")){document.getElementById("menu").remove()};
    };

    async function loadCloud(myCloud, select){
        let ptArray = [];
        let baseArray = [];
        let loadCoords = [];
        let idArray = [], tokenArray = [];
        let loadHeight = [];
        let loadID = [];
        let loadTokenID = []
        if (select === "loaded"){
            for (var j = 0; j < myCloud.length; j++) {
                let nodeArray = []
                let ymin = myCloud[j][1] - 0.00002194382818860281;    //8 feet
                let ymax = myCloud[j][1] + 0.00002194382818860281;
                let xmin = myCloud[j][0] + 0.00002194382818860281;
                let xmax = myCloud[j][0] - 0.00002194382818860281;
                nodeArray.push([xmin, ymin]);
                nodeArray.push([xmax, ymin]);
                nodeArray.push([xmax, ymax]);
                nodeArray.push([xmin, ymax]);
                ptArray.push(nodeArray);
                            
                tokenArray.push(j);
                idArray.push(j);
                baseArray.push(myCloud[j][2])
            } 
        } else if (select === "tokenized"){
            for (let k = 0; k < myCloud.attributes.length; k++) {
                let nodeArray = [];
                let ymin = myCloud.attributes[k].latitude - 0.00002194382818860281;    //8 feet
                let ymax = myCloud.attributes[k].latitude + 0.00002194382818860281;
                let xmin = myCloud.attributes[k].longitude + 0.00002194382818860281;
                let xmax = myCloud.attributes[k].longitude - 0.00002194382818860281;
                nodeArray.push([xmin, ymin]);
                nodeArray.push([xmax, ymin]);
                nodeArray.push([xmax, ymax]);
                nodeArray.push([xmin, ymax]);
                ptArray.push(nodeArray); 
    
                tokenArray.push(myCloud.attributes[k].tokenID);
                idArray.push(myCloud.attributes[k].shortID);
                baseArray.push(myCloud.attributes[k].elevation);    
            }
            
        }
        loadCoords.push(ptArray);
        loadHeight.push(baseArray);
        loadID.push(idArray);
        loadTokenID.push(tokenArray);
       
        return [loadCoords, loadHeight, loadID, loadTokenID]
    } 

    async function loadTokenized(){
        var a = document.getElementById("network");
        if (a.selectedIndex === 0){
            document.getElementById("explorer").disabled = true;
            document.getElementById("logo").style.visibility = 'hidden';
            document.getElementById("tokenizedLoc").innerHTML = "";
            document.getElementById("tokenizedCount").innerHTML = "";
            document.getElementById("tokenizedDesc").innerHTML = "";
            return
        } else {
            document.getElementById("explorer").disabled = false;
            document.getElementById("logo").style.visibility = 'visible';
        }

        //for the selected list name need to get acct# of master from ceramic
        let myData = await dataStore.get("PointGeometryDefinition");
        let myAcct = "", podName = "", location = "", description = "", count = 0
        for (let j = 0; j < myData.arr.length; j++) {
            if (myData.arr[j].name === document.getElementById("network").value){
                myAcct = myData.arr[j].acct;
                podName = myData.arr[j].name;
                location = myData.arr[j].location;
                description = myData.arr[j].description;
                count = myData.arr[j].count;
            }
        }

        //use that acct# to get all NFTs and loop thru and get the URI of the master NFT
        let myURI = "";
        let tokenCount = 0;
        await client.connect();
        const nfts = await client.request({
            method: "account_nfts",
            account: myAcct    
        })
        for (var i = 0; i < nfts.result.account_nfts.length; i++) {
            if (nfts.result.account_nfts[i].URI != null){   
                myURI = Buffer.from(nfts.result.account_nfts[i].URI, 'hex').toString("utf8")
            }
            if (nfts.result.account_nfts[i].nft_serial > tokenCount){
                tokenCount = nfts.result.account_nfts[i].nft_serial;
                myTokenID = nfts.result.account_nfts[i].NFTokenID;
            }
        }

        //split the uri into schema/definition and use that to get the data (tokenid/coords) for the child tokens
        const arrayURI = myURI.split('_');
        const aliases = {
            schemas: {
                PointGeometrySchema: arrayURI[0],
            },
            definitions: {
                PointGeometryDefinition: arrayURI[1],
            },
            tiles: {},
        }

        let center = setCenter(location);
        let dataStore2 = new DIDDataStore({ ceramic, model: aliases })
        let myData2 = await dataStore2.get("PointGeometryDefinition");
        await loadCloud(myData2, "tokenized").then((result) => {
             loadOblique('green', podName, result[0], result[1], result[2], result[3], center);
        })

        //load statistics
        document.getElementById("tokenizedLoc").innerHTML = location;
        document.getElementById("tokenizedCount").innerHTML = count;
        document.getElementById("tokenizedDesc").innerHTML = description;

        //clear tokenize controls
        document.getElementById("podname").value = "";
        document.getElementById("description").value = "";
        document.getElementById("submit").disabled = true;
        document.getElementById("podname").disabled = true;
        document.getElementById("description").disabled = true;
        document.getElementById("logo").style.visibility = 'visible';
        document.getElementById("menu").remove();
    }

    function loadOblique(myColor, podName, Coords, Height, ID, tokenID, myCenter){ 
        const mapx = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: myCenter,
            zoom: 16.2,
            pitch: 65,
            bearing: 45,
            antialias: true,
            attributionControl: false
        });  
              
        mapx.getCanvas().style.cursor = 'pointer';
        mapx.on('style.load', () => {
            //remove labels from stylesheet
            mapx.style.stylesheet.layers.forEach(function(layer) {
                if (layer.type === 'symbol') {
                    mapx.removeLayer(layer.id);
                }
            });

            let cubeArray = [];
            for (var j = 0; j < Coords[0].length; j++) { 
                cubeArray.push(j.toString());
                mapx.addSource('node' + j, {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            'coordinates': [Coords[0][j]]
                        },
                        'properties': {
                            'xcoord': Coords[0][j][0][0],
                            'ycoord': Coords[0][j][0][1],
                            'zcoord': Height[0][j],
                            'podname': podName,
                            'xrplid': ID[0][j],
                            'tokenid': tokenID[0][j]
                        }
                    },
                    'generateId': true
                });  
                      
                mapx.addLayer({
                    'id': j.toString(),
                    'type': 'fill-extrusion',
                    'source': 'node' + j,
                    'paint': {
                        'fill-extrusion-color': ['case', ['boolean', ['feature-state', 'clicked'], false], 'yellow', myColor], 
                        'fill-extrusion-height': Height[0][j]+124,
                        'fill-extrusion-base': Height[0][j]+120,
                        'fill-extrusion-opacity': 1
                    },
                }); 
            } 

            //set coords for 'zone_of_influence' polygon
            let llArray = [], ulArray = [], ulArray2 = [], urArray = [], lrArray = [];
            let radius = 0.0010149020537229   //370 ft
            llArray.push(myCenter[0] + radius);   
            llArray.push(myCenter[1] - radius);
            ulArray.push(myCenter[0] + radius); 
            ulArray.push(myCenter[1] + radius);
            urArray.push(myCenter[0] - radius);
            urArray.push(myCenter[1] + radius);
            lrArray.push(myCenter[0] - radius);
            lrArray.push(myCenter[1] - radius);
            let coords = [[llArray, ulArray, urArray, lrArray]];
          
            //set camera position
            let radius2 = 0.0021943828188603;   //800
            ulArray2.push(myCenter[0] + radius2); 
            ulArray2.push(myCenter[1] + radius2);
            mapx.panTo(ulArray2);

            //add 'zone_of_influence' layer
            mapx.addSource('master', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Polygon',
                        'coordinates': coords
                    },
                    'properties': {
                        'name': 'Point Cloud Sphere Network',
                        'count': 400,
                    }
                },
                'generateId': true
            });            
            mapx.addLayer({
                'id': 'Zone_of_Influence',
                'type': 'fill-extrusion',
                'source': 'master',
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'fill-extrusion-color': 'green', 
                    'fill-extrusion-height': 310,
                    'fill-extrusion-base': 105,
                    'fill-extrusion-opacity': 0.3
                },
            }); 

            mapx.on('click', function(e) {
                const bbox = [
                    [e.point.x - 5, e.point.y - 5],
                    [e.point.x + 5, e.point.y + 5]
                ];

                let nodes = mapx.queryRenderedFeatures(bbox, {layers: cubeArray});  
                let nodes2 = mapx.queryRenderedFeatures({layers: cubeArray});
                for (var j = 0; j < nodes2.length; j++) {
                    mapx.removeFeatureState({source: nodes2[j].source, id: nodes2[j].id});
                }

                //create popups
                const popup = new mapboxgl.Popup()
                popup.setLngLat([nodes[0].properties.xcoord, nodes[0].properties.ycoord]);
                if (podName === 'Preview Pod'){
                    popup.setHTML('<div><label style="color: black;font-weight: 700;text-decoration: underline">' + 'Pod Name: ' + nodes[0].properties.podname + '</label>' +
                        '<div><label>' + 'Node Xcoord: ' + nodes[0].properties.xcoord.toFixed(4) + '</label></div>' +
                        '<div><label>' + 'Node Ycoord: ' + nodes[0].properties.ycoord.toFixed(4) + '</label></div>' +
                        '<div><label>' +  'Node Elev: ' + nodes[0].properties.zcoord.toFixed(0) + '</label></div>')
                } else {
                    popup.setHTML('<img src="'+'XRPL_ledger.jpg'+'"/>' +   
                        '<div><label style="color: black;font-weight: 700;text-decoration: underline">' + 'Pod Name: ' + nodes[0].properties.podname + '</label>' +
                        '<div><label>Child Token ID:</label><a href="https://testnet.xrpl.org/nft/'+ nodes[0].properties.tokenid +'" target="_blank">' + nodes[0].properties.xrplid + '</a></div>' +
                        '<div><label>' + 'Child Xcoord: ' + nodes[0].properties.xcoord.toFixed(4) + '</label></div>' +
                        '<div><label>' + 'Child Ycoord: ' + nodes[0].properties.ycoord.toFixed(4) + '</label></div>' +
                        '<div><label>' +  'Child Elev: ' + nodes[0].properties.zcoord.toFixed(0) + '</label></div>')
                }
                popup.addTo(mapx);
                
                mapx.setFeatureState({source: nodes[0].source, id: nodes[0].id}, {clicked: true}); 
            }); 

            //Create a link for Zone_of_Influence tool toggle
            let menu = document.createElement("nav")
            menu.id = 'menu';
            document.body.appendChild(menu);

            const link = document.createElement('a');
            link.id = 'Zone_of_Influence';
            link.href = '#';
            link.textContent = 'Zone_of_Influence';
            link.className = 'active';
       
            //Show or hide layer when the toggle is clicked
            link.onclick = function (e) {
                const clickedLayer = this.textContent;
                e.preventDefault();
                e.stopPropagation();
                
                const visibility = mapx.getLayoutProperty(clickedLayer,'visibility');
                
                //Toggle layer visibility by changing the layout object's visibility property
                if (visibility === 'visible') {
                    mapx.setLayoutProperty(clickedLayer, 'visibility', 'none');
                    this.className = '';
                } else {
                    this.className = 'active';
                    mapx.setLayoutProperty(clickedLayer,'visibility','visible');
                }     
            }  
            const layers = document.getElementById('menu');
            layers.appendChild(link);  
        });
    }

    function setCenter(loc){
        let center = [];
        switch (loc) {
            case "Avatar Park & Ride":
                center.push(-78.478831); center.push(-0.161835);
                break;
            case "Fashion District":
                center.push(36.82094551772883); center.push(-1.2852623809454684);
                break;
            case "Events Center": 
                center.push(103.88874184685591); center.push(1.3926136527227584);
                break;
        }
        return center
    }

    function changeSpec(){
        document.getElementById("podname").disabled = true;
        document.getElementById("description").disabled = true;
        document.getElementById("submit").disabled = true;
    }

    function explMaster(){
        window.open('https://testnet.xrpl.org/nft/' + myTokenID)
    }

return (
    <> 
    <div className="map" id="map"></div>
    <form className="form-preview" id="myform2">
    
        <label style={{ position: "relative", top: "5px", width: "250px", right: "25px", zIndex: "4", fontSize: "16px", fontWeight: "bold"}}>Build a Pod</label>
        <label style={{ position: "relative", top: "5px", width: "250px", right: "50px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Select Location in Metaverse</label>
        <select id="location" onChange={changeSpec}>
            <option value="Avatar Park & Ride">Avatar Park & Ride</option>
            <option value="Fashion District">Fashion District</option>
            <option value="Events Center">Events Center</option>
        </select>
        <label style={{ position: "relative", top: "8px", width: "250px", right: "82px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Number of Nodes</label>
        <input type="number" id="childcount" onChange={changeSpec} defaultValue="250" min="2" max="500"autoComplete="off"></input>
        <label style={{ position: "relative", top: "10px", width: "250px", right: "58px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Height Above Surface (ft.)</label>
        <input type="text" id="height" defaultValue="100  (default)" disabled></input>
        <label style={{ position: "relative", top: "10px", width: "250px", right: "74px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Size (diameter in ft.)</label>
        <input type="text" id="size" defaultValue="200  (default)" disabled></input>
    </form>
    <button id="loader" onClick={loadSphere}>Preview</button>
    <form className="form-tokenized" id="myform3">
        <label style={{ position: "relative", top: "-2px", width: "200px", right: "1px", zIndex: "4", fontSize: "16px", fontWeight: "bold"}}>Tokenized Pods on XRPL</label>
        <select id="network" onChange={loadTokenized}></select>   
        <button type="button" id="explorer" onClick={explMaster}><img id="logo" src="xrpl_small.jpg" height="23" width="26"/></button>
        <label style={{ position: "relative", top: "5px", width: "150px", right: "99px", zIndex: "4", fontSize: "14px", fontWeight: "600"}}>Location:</label>
        <label id="tokenizedLoc" style={{ position: "relative", top: "-22px", width: "120px", right: "-10px", zIndex: "4", fontSize: "14px", color: "blue", fontWeight: "600"}}></label>
        <label style={{ position: "relative", top: "-21px", width: "150px", right: "71px", zIndex: "4", fontSize: "14px", fontWeight: "600"}}>Child Tokens:</label>
        <label id="tokenizedCount" style={{ position: "relative", top: "-44px", width: "150px", right: "1px", zIndex: "4", fontSize: "14px", color: "blue", fontWeight: "600"}}></label>
        <label style={{ position: "relative", top: "-43px", width: "150px", right: "94px", zIndex: "4", fontSize: "14px", fontWeight: "600"}}>Desc.:</label>
        <p style={{ position: "relative", top: "-62px", width: "200px", right: "-26px", zIndex: "4", fontSize: "13px", color: "blue", fontWeight: "500", lineHeight: "17px"}}><label id="tokenizedDesc" ></label></p>
    </form>
    <Tokenizer isphere={sphere}/>
    </>
);
}
export default Mapper;  