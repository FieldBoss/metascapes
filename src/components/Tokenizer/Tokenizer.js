import React, { useState, useEffect } from 'react';
import './Tokenizer.css';
import * as XRPL from 'xrpl';
import { Buffer } from 'buffer';
import { CeramicClient } from '@ceramicnetwork/http-client';
import { DIDDataStore } from '@glazed/did-datastore';
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519';
import { getResolver } from 'key-did-resolver';
import { ModelManager } from '@glazed/devtools';
import ClipLoader from "react-spinners/ClipLoader";
import aliases2 from '../aliases2.js'; 

 //INITIALIZE/CONNECT XRPL
let client = {}, wallet = {};   
async function newSeed(){   
    client = new XRPL.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    const my_wallet = (await client.fundWallet(null)).wallet
    wallet = XRPL.Wallet.fromSeed(my_wallet.seed);
    return wallet;
}

 //INITIALIZE/CONNECT CERAMIC -
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
 
//set up datamodel
let dataStore = {}, dataStore2 = {};
async function setAliases(){
    // Create a manager for the model
    const manager = new ModelManager({ ceramic })

    //create a GeoJSON schema for point feature
    const pointSchema = await manager.createSchema('PointGeometrySchema', {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "GeoJSON Point Feature",
        "type": "object",
        "properties": {
            "type": {
            "type": "string",
            "enum": [
                "Feature"
            ]
            },
            "props": {
            "oneOf": [
                {
                "type": "null"
                },
                {
                "type": "object"
                }
            ]
            },
        }
    })

    //Create the definition using the created schema xx 
    await manager.createDefinition('PointGeometryDefinition', { 
    name: 'Point_Geometry_Definition',
    description: 'Point Geometry definition',
    schema: manager.getSchemaURL(pointSchema),
    })

    //Deploy datamodel to Ceramic node
    const aliases = await manager.deploy()

    //Write deployed model to JSON file
    dataStore = new DIDDataStore({ ceramic, model: aliases });
    return aliases
}
//ceramic stream that holds pod names/acct
dataStore2 = new DIDDataStore({ ceramic, model: aliases2 })

//the Tokenizer react component
const Tokenizer = (props) => {
    useEffect(()=>{
        //load the Tokenized Pods listbox
        dataStore2.get("PointGeometryDefinition").then((result) => { 
            var x = document.getElementById("network");
            if(result != null){
                //add a blank
                let option = document.createElement("option");
                option.text = "--select pod--";
                x.add(option);
                //load the rest
                for (let i = 0; i < result.arr.length; i++) {
                    let item = result.arr[i].name;
                    let option2 = document.createElement("option");
                    option2.text = item;
                 x.add(option2);
                }
            }
        });
         
        document.getElementById("explorer").disabled = true;
        document.getElementById("logo").style.visibility = 'hidden'; 
    }, [])

    const [loading, setLoading] = useState(false); 
    const sourceCloud = props.isphere;

    async function createMasterNFT(ceramicURI, aWallet) { 
        await client.connect();
        console.log("Connected to XRPL test blockchain - master token");
        const txJSON = {
            TransactionType: "NFTokenMint",
            Account: aWallet.classicAddress,
            Flags: parseInt('11'),
            NFTokenTaxon: 0,
            URI: Buffer.from(ceramicURI, 'utf8').toString('hex').toUpperCase()
        }
        await client.submitAndWait(txJSON,{wallet});
        console.log("master token NFT created");
        
        //get the tokenid of the new nft
        const nfts = await client.request({
            method: "account_nfts",
            account: aWallet.classicAddress  
        })
        let tokenCount = 0;
        let myTokenID = '';
        for (var i = 0; i < nfts.result.account_nfts.length; i++) {
            if (nfts.result.account_nfts[i].nft_serial > tokenCount){
                tokenCount = nfts.result.account_nfts[i].nft_serial;
                myTokenID = nfts.result.account_nfts[i].NFTokenID;
            }
        }
        return myTokenID;
    }

    async function createNodesNFT(aWallet, cnt) { 
        await client.connect();
        console.log("Connected to XRPL test blockchain - node");
        const txJSON = {
            TransactionType: "NFTokenMint",
            Account: aWallet.classicAddress,
            Flags: parseInt('11'),
            NFTokenTaxon: 0,
        }
        await client.submitAndWait(txJSON,{wallet});
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("node NFT created" + ', ' + cnt + ', ' + time);
        document.getElementById("tokenizecount").innerHTML = cnt+1;
        //get the tokenid of the new nft
        const nfts = await client.request({
            method: "account_nfts",
            account: aWallet.classicAddress  
        })
        let tokenCount = 0;
        let myTokenID = '';
        for (var i = 0; i < nfts.result.account_nfts.length; i++) {
            if (nfts.result.account_nfts[i].nft_serial > tokenCount){
                tokenCount = nfts.result.account_nfts[i].nft_serial;
                myTokenID = nfts.result.account_nfts[i].NFTokenID;
            }
        }
        return myTokenID;
    }

    //event handler for Tokenize to XRPL
    async function tokenize(event){
        event.stopPropagation();
        event.preventDefault();

        let isExecuted = window.confirm("Do you want to tokenize the PREVIEWED pod?\nNote: 10 or more nodes can take several minutes to complete");
        if (isExecuted === true){
            if (document.getElementById("podname").value === "" || document.getElementById("description").value === ""){
                alert('Pod Name and Description are required');
                return;
            }
            
            //disable preview form
            document.getElementById("loader").disabled = true;
            document.getElementById("location").disabled = true;
            document.getElementById("childcount").disabled = true;
            //disable tokenize form
            document.getElementById("podname").disabled = true;
            document.getElementById("description").disabled = true;
            document.getElementById("submit").disabled = true;
            //disable controls on Tokenized form
            let form = document.getElementById("myform3");
            let elements = form.elements;
            for (let i = 0, len = elements.length; i < len; ++i) {
                elements[i].disabled = true;
            }
        
            //start progress spinner
            setLoading(true) 
        
            //get new XRPL wallet
            let newWallet = await newSeed();
            
            //add data to acct ceramic stream
            let myData = await dataStore2.get("PointGeometryDefinition");
            let newObj = {name: document.getElementById("podname").value, acct: newWallet.classicAddress, count: document.getElementById("childcount").value, location: document.getElementById("location").value, description: document.getElementById("description").value};
            if (myData === null){
                let arr = [];
                arr.push(newObj);
                await dataStore2.set("PointGeometryDefinition", {arr}); 
            } else {
                myData.arr.push(newObj);
                await dataStore2.set("PointGeometryDefinition", myData);
            }
    
            //create each node NFT 
            let attributesObject = {longitude: 1, latitude: 2, elevation: 3, tokenID: 'x', shortID: 'y'}
            let attributesObject2 = {name: '1', description: '2', attributes: []};
            let attributesArray = [];
            for (var i = 0; i < sourceCloud.length; i++) {
                const NFTnode = await createNodesNFT(newWallet, i);
                let newobj = Object.assign({}, attributesObject, {longitude: sourceCloud[i][0], latitude: sourceCloud[i][1], elevation: Math.round(sourceCloud[i][2]), tokenID: NFTnode, shortID: "XRPL00-"+i});
                attributesArray.push(newobj);
            }  
        
            let newobj2 = Object.assign({}, attributesObject2, {name: document.getElementById("podname").value, description: document.getElementById("description").value, attributes: attributesArray});
            //console.log(JSON.stringify(newobj2, null, 2))

            //mint the master token NFT and concat schema and definition to URI for minting
            setAliases().then((result) => { 
                createMasterNFT(result.schemas.PointGeometrySchema + '_' + result.definitions.PointGeometryDefinition, newWallet);
                dataStore.set("PointGeometryDefinition", newobj2);
            });
            console.log('Data written to Ceramic database');

            //set a 5 second delay allowing processes to finish
            setTimeout(delayLoad, 5000);
            async function delayLoad() {
                //enable controls on Tokenized form
                let form2 = document.getElementById("myform3");
                let elements2 = form2.elements;
                for (let i = 0, len = elements2.length; i < len; ++i) {
                    elements2[i].disabled = false;
                }

                //reload the Tokenized select element
                document.getElementById("network").innerHTML = "";
                await dataStore2.get("PointGeometryDefinition").then((result) => { 
                    var x = document.getElementById("network");
                    if(result != null){
                        //add a blank
                        let option = document.createElement("option");
                        option.text = "--select pod--";
                        x.add(option);
                        //load the rest
                        for (let i = 0; i < result.arr.length; i++) {
                            let item = result.arr[i].name;
                            let option2 = document.createElement("option");
                            option2.text = item;
                        x.add(option2);
                        }
                    }
                });
                document.getElementById("podname").value = "";
                document.getElementById("description").value = "";
                document.getElementById("submit").disabled = true;
                document.getElementById("podname").disabled = true;
                document.getElementById("description").disabled = true;
                document.getElementById("network").disabled = false;
                document.getElementById("explorer").disabled = true;
                document.getElementById("tokenizecount").innerHTML = "";
                document.getElementById("loader").disabled = false;
                document.getElementById("location").disabled = false;
                document.getElementById("childcount").disabled = false;
                document.getElementById("network").selectedIndex = "0";

                //stop progress spinner
                setLoading(false) 
            }
        } else {return;}
    };   

    return ( 
    <>
    <form className="form-tokenize" id="myform" onSubmit={tokenize}> 
        <div>
            <label style={{ position: "relative", top: "0px", width: "150px", right: "5px", zIndex: "4", fontSize: "16px", fontWeight: "bold"}}>Tokenize a Pod</label>
            <label style={{ position: "relative", top: "-1px", width: "250px", right: "50px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Give the Pod a Unique Name</label>
            <input type="text" id="podname" autoComplete="off" disabled></input>
            <label style={{ position: "relative", top: "0px", width: "250px", right: "59px", zIndex: "4", fontSize: "13px", fontWeight: "500"}}>Describe the Pod (10 wds.)</label>
            <input type="text" id="description" autoComplete="off" disabled></input>
            <button type="submit" id="submit" disabled>Tokenize to XRPL</button>
        </div>
        <div>
            <div>
                <label id="tokenizecount" style={{ position: "relative", top: "-12px", width: "30px", right: "-90px", zIndex: "4", fontSize: "14px", fontWeight: "650"}}>0</label>
            </div>
            <ClipLoader
                color={'red'}
                loading={loading}
                cssOverride ={{position: "relative", right: "-90px", top: "-38px", borderColor: "red", zIndex: "4"}}
                size={30}
            />
        </div>
    </form>
    </>
    );
} 
export default Tokenizer; 
