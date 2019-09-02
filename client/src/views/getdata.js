import React, { Component } from 'react';
import { print } from 'react-html2pdf';
import logo from '../assets/logo_sayse.png';

import test from '../assets/e_commerce.pdf'
import multiDownload from 'multi-download'

import { AutoComplete } from 'antd';

import axios from 'axios';

var fileDownload = require('js-file-download');

var o = {};
var e = {};


var result = []
var resultFas = []
var total = 0;
var fas = 0;


var clicli = '';
var service = '';
var idPipe= "";

var goToDb = {};

export default class GetData extends Component {

    constructor() {
        super();
        this.state = {
            client: [],
            service: [],
            priceAbo: [],
            priceFAS: [],
            totalTXT: 0,
            remise: '',
        }


    }


    componentDidMount() {

        var array = [];

        if (this.props.text.length === 0) {
            this.props.history.push('/ok')
        }
        else {
            this.setState({
                client: [this.props.text.client[0]],
                remise: this.props.text.remise          
            })

            for (let i = 0; i < this.props.text.service.length; i++) {
                array.push(this.props.text.service[i])
            }
            if (array.length !== 0) {
                this.setState({
                    service: array
                })

                // array.map((c,i) => {
                //     //detail site
                //     console.log(c.service.livraisonAdresse);

                //     c.service.map((data,index) =>{

                //         //valeur service
                //         console.log(data[Object.keys(data)].Abo_mois_ht);

                //         //Quantité
                //         console.log(Object.keys(data)[0]);

                //     })
                // })

            }
        }


        // document.querySelector('#download-button').addEventListener('click', event => {
        //     const files = event.target.dataset.files.split(' ');
        //     multiDownload(files);
        // });



    }


    download(e) {
        print('Devis', 'PdfDevis')

        e.preventDefault();
    }





    print = (e) => {
        e.preventDefault();

        console.log("click");

        goToDb.priceAbo = total
        goToDb.client = this.state.client[0].client
        goToDb.dateCrea = this.state.client[0].dateCom
        goToDb.service = this.state.client[0].typeService
        goToDb.dure = this.state.client[0].dureSous
        goToDb.idPipe = this.state.client[0].idPipe
        goToDb.createur = this.state.client[0].createur
        goToDb.bdc = this.state.client[0].bdc
        goToDb.fas = fas

        axios.post(`http://localhost:4000/goToDb`, {goToDb})
        
        const res =
            this.state.client.map((d, i) =>
                
                `                                                                                                  Résumé du devis :
                                                                                                  _________________
                    Client : ${d.client}
                    Adresse : ${d.adresse}
                    Contact Facturation: ${d.contactFact} 
                    Date de commencement: ${d.dateCom}
                    Durée Souscription: ${d.dureSous} mois
                    Nom Signataire: ${d.nameSignataire} 
                    Référent Technique: ${d.refTech}
                    IdPipe: ${d.idPipe}

                `+
                this.state.service.map((c, ind) =>
                    `
                    ________________________________

                    Nom du site : ${c.service.nameSite}
                    Prix Total Abo pour le site : ${result[ind]} €
                    Prix Total Fas pour le site : ${resultFas[ind]} €
                    ___________________________________
                `
                    +
                    c.service.map((content, y) =>
                    `
                    Durée: ${content[Object.keys(content)].Duree}
                    REF: ${content[Object.keys(content)].REF}
                    Solution: ${content[Object.keys(content)].Designation_solution}
                    Service: ${content[Object.keys(content)].Description_service}
                    Quantité: ${Object.keys(content)[0]}
                    Prix Abo: ${content[Object.keys(content)].Abo_mois_ht}
                    Total Abo : ${content[Object.keys(content)].Abo_mois_ht.substring(0, content[Object.keys(content)].Abo_mois_ht.length - 2) * Object.keys(content)[0] + '€'}
                    Prix Fas : ${content[Object.keys(content)].FAS_HT}
                    Total Fas: ${content[Object.keys(content)].FAS_HT.substring(0, content[Object.keys(content)].FAS_HT.length - 2) * Object.keys(content)[0] + "€"}

                    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
                    ` 
                    )))
                    +
                    `
                                                                                            Prix total ABO : ${total} € / Prix total FAS : ${fas}
                    `

        var btn = document.getElementById("BtnExport");

        btn.style.display = "none";

        // var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');


       // #ID_SERVICE_CLIENT

        fileDownload(res, idPipe + '_' + service + '_' + clicli + '/.txt');






        window.print();
        



        setTimeout(function () {
            btn.style.display = "block";
        }, 100);

    }

    render() {

        var priceForSite = ''
        var FASForSite = ''
        var quantité = ''

        var arr = []
        var FASFinal = []
        var quant = []

        var site = []
        var nomdusite = []

        console.log(this.state.remise);
        

        if(this.state.client.length !== 0){
            this.state.client.map((d,i) =>{
                    clicli =  d.client
                    service = d.typeService
                    idPipe = d.idPipe
                    
            })  
        }
        


        this.state.service && this.state.service.map((content, i) => {
            
            // console.log(content);



            nomdusite.push(content.service.nameSite)
            site.push(content.service.nameSite)



            content.service.map((c, index) => {
                // console.log(c);

                var key = content.service.nameSite
                var valueQuant = parseInt(Object.keys(c)[0]);
                var value = parseInt(c[Object.keys(c)].Abo_mois_ht.substring(0, c[Object.keys(c)].Abo_mois_ht.length - 2) * valueQuant);
                var valueFAS = parseInt(c[Object.keys(c)].FAS_HT.substring(0, c[Object.keys(c)].FAS_HT.length - 2) * valueQuant);



                priceForSite = {
                    [key]: value
                }

                FASForSite = {
                    [key]: valueFAS
                }
                quantité = {
                    [key]: valueQuant
                }

                // console.log(Object.keys(c)[0]);

                // console.log(c[Object.keys(c)].Abo_mois_ht.substring(0, c[Object.keys(c)].Abo_mois_ht.length - 2));


                arr.push(priceForSite)
                FASFinal.push(FASForSite)
                quant.push(quantité)

            }
            )

        }
        )
        // console.log(nomdusite);
        // console.log(quant);

        if (arr.length !== 0) {
            // console.log(arr);
            // console.log(FASFinal);
            // console.log(quant);

            for (var i = 0, l = arr.length; i < l; i++) {
                var key = Object.keys(arr[i]);
                if (!o[key]) {
                    o[key] = [];
                }
                o[key].push(arr[i][key]);
            }

            for (var ind = 0, le = FASFinal.length; ind < le; ind++) {
                var keys = Object.keys(FASFinal[ind]);
                if (!e[keys]) {
                    e[keys] = [];
                }
                e[keys].push(FASFinal[ind][keys]);
            }



            site.forEach(element => {
                result.push(o[element].reduce((a, b) => a + b))
            });

            site.forEach(element => {
                resultFas.push(e[element].reduce((a, b) => a + b))
            });


            if (result.length !== 0 && resultFas !== 0) {
                this.state.service && this.state.service.map((content, i) =>
                    // total += parseInt(result[i]) + parseInt(resultFas[i]),
                    total += parseInt(result[i])
                )
                this.state.service && this.state.service.map((content, i) =>
                    fas += parseInt(resultFas[i])
                )


            }
            

        }



        var fileData = test + " " + logo;

        return (

            <div className="">
            <div className="dont-break" id="content" >
                <div className="example-config " id="BtnExport">
                    <nav className="navbar navbar-light d-block text-center" style={{ background: 'linear-gradient(90deg, #eacda3 0%,#d6ae7b 100% )'}}>
                        <button className="btn btnPDF" onClick={(e) => this.print(e)} style={{ backgroundColor: '#d6ae7b', color:'white'}} id="download-button" data-files={fileData}>Download PDF</button>
                        {/* <a href="javascript:window.print()">TEST</a> */}
                    </nav>
                </div>

                <div className="container" id="printJS-form" style={{ padding: '3%' }}>
                    <div className="row" style={{ borderBottom: '1px solid #dbdbdb' }}>
                        <div className="col-4">
                            <img src={logo} alt="logo_sayse" width="50%"></img>
                        </div>
                        <div className="col-4 text-center text-danger mt-3">
                            <p className="p_head" style={{ fontWeight: '' }}>DEVIS POUR SOLUTION</p>
                        </div>
                        <div className="col-4 text-center text-danger mt-3">
                            <p className="p_head" style={{ fontWeight: '' }}>SDWAN / ACCES INTERNET <br></br>(By SAYSE)</p>
                        </div>
                    </div>
                    {/* <hr></hr> */}

                    <div className="row" style={{ borderBottom: '0.5px solid #dbdbdb' }}>



                        <div className="col-8" style={{ marginTop: "1%" }}>
                            <p style={{ fontSize: '9px' }}>
                                SAYSE SAS au capital social de 17 566 Euros<br></br>
                                RCS de Paris 801 891 722 00010<br></br>
                                N° de TVA Intracommunautaire FR 03 801 891 722<br></br>
                                Siège social : 10 rue de la Paix - 75002 PARIS<br></br>
                                Etablissement secondaire : 86-88 rue Thiers - 92100 Boulogne Billancourt<br></br>
                                Tel : 0820.432.000 - www.sayse.fr - contact@sayse.fr<br></br>
                            </p>
                        </div>
                        <div className="col-4" style={{ marginTop: "2%" }}>
                            {this.state.client && this.state.client.map((c, i) =>

                                <div className="" key={i}>
                                    <div key={i}>
                                        {
                                            <li key={i} style={{ listStyleType: 'none', fontSize: '10px' }}>
                                                <ul className="text-center" style={{ backgroundColor: '#6a9cd0', color: 'white', borderRadius: '2vh', }}>Date de commande : {c.dateCom.split("-").reverse().join("-")} </ul>
                                                <ul className="text-center" style={{ backgroundColor: '#6a9cd0', color: 'white', borderRadius: '2vh', }}>Durée de souscription : {c.dureSous} mois</ul>
                                                <ul className="text-center" style={{ backgroundColor: '#6a9cd0', color: 'white', borderRadius: '2vh', }}>#Id PipeDrive : #{c.idPipe}</ul>
                                            </li>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {/* <hr></hr> */}
                    <div className="row" style={{ borderBottom: '0.5px solid #dbdbdb' }}>
                        <div className="col-7"></div>
                        <div className="col-5">
                            {this.state.client && this.state.client.map((c, i) =>
                                                        
                                <div className="row" key={i}>
                                    <div className="col-5"><p style={{ fontSize: '11px', fontWeight: 'bold', borderBottom: '1px solid black', display: "inline-block", marginTop: "3.5vh" }}>Préparé pour :</p></div>


                                    <div key={i} style={{ padding: "1%", marginTop: "3%" }} className="col-7" >
                                        {
                                            <li style={{ listStyleType: 'none' }}>
                                                <div className="form-inline">
                                                    <p style={{ fontSize: '11px' }}>Client :</p>&nbsp;<p style={{ fontSize: "10px"}}>{c.client}</p>
                                                </div>
                                                <div className="form-inline">
                                                    <p style={{ fontSize: '11px' }}>Adresse:</p>&nbsp;<p style={{ fontSize: "10px" }}>{c.adresse}</p>
                                                </div>
                                                <div className="form-inline">
                                                    <p style={{ fontSize: '11px'}}>Signataire - représentant légal : </p>&nbsp;<p style={{ fontSize: "10px" }}>{c.nameSignataire}</p>
                                                </div>
                                                <div className="form-inline">
                                                    <p style={{ fontSize: '11px' }}>Référent technique : </p>&nbsp;<p style={{ fontSize: "10px" }}>{c.refTech}</p>
                                                </div>
                                                <div className="form-inline">
                                                    <p style={{ fontSize: '11px' }}>Contact facturation : </p>&nbsp;<p style={{ fontSize: "10px" }}>{c.contactFact}</p>
                                                </div>
                                            </li>
                                        }
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* <div className="col-2"></div> */}

                    </div>
    

                    <div className="mt-3">
                        {this.state.service && this.state.service.map((content, i) =>


                            <div className="" key={i} style={{ fontSize: "11px" }}>

                                <div className="row">
                                    <div className="col-12">
                                        <table className="table table-striped table-sm table-responsive-sm mb-0" style={{ marginTop: "1%", padding: "1%" }}>
                                            <thead >
                                                <tr>
                                                    <th scope="col">Mois</th>
                                                    <th scope="col">Ref</th>
                                                    <th scope="col">Libélé des solutions</th>
                                                    <th scope="col">Description des solutions</th>
                                                    <th scope="col">Quantité</th>
                                                    <th scope="col">ABO</th>
                                                    <th scope="col">Total ABO</th>
                                                    <th scope="col">FAS</th>
                                                    <th scope="col">Total FAS</th>
                                                </tr>
                                            </thead>

                                            <tbody >


                                                {

                                                    content.service.map((c, i) =>
                                                        <tr>

                                                            {/* {
                                                                    abo.push(c.Abo_mois_ht.substring(0, c.Abo_mois_ht.length - 2) * quant[i][nomdusite[i]])
                                                                } */}

                                                            <td className="testPDFCSS">{c[Object.keys(c)].Duree}</td>
                                                            <td>{c[Object.keys(c)].REF}</td>
                                                            <td>{c[Object.keys(c)].Designation_solution}</td>
                                                            <td>{c[Object.keys(c)].Description_service}</td>
                                                            <td>{Object.keys(c)[0]}</td>
                                                            <td>{c[Object.keys(c)].Abo_mois_ht}</td>
                                                            <td>{c[Object.keys(c)].Abo_mois_ht.substring(0, c[Object.keys(c)].Abo_mois_ht.length - 2) * Object.keys(c)[0]} €</td>
                                                            {/* {c.PA_FAS} */}
                                                            <td>{c[Object.keys(c)].FAS_HT}</td>
                                                            <td>{c[Object.keys(c)].FAS_HT.substring(0, c[Object.keys(c)].FAS_HT.length - 2) * Object.keys(c)[0]} €</td>

                                                        </tr>
                                                    )}
                                            </tbody>
                                            <tr>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td style={{ fontSize: "12px" }}>Total :</td>

                                            <td >
                                                {result[i]} €

                                    </td>
                                            <td>-</td>

                                            <td>
                                                {resultFas[i]} €
                                    </td>
                                    </tr>
                                        </table>
                                    </div>
                                </div>
                                <div className="row bandeauTabl" style={{ borderBottom: '0.5px solid #dbdbdb' }}>
                                    {/* <div className="col-3"></div> */}
                                    <div className="col-8">
                                        <table className="table table-sm mb-0 mt-0" style={{ fontSize: "9px", marginTop: '1' }}>
                                            <thead className="border-0">
                                                <tr>
                                                    <td className="tdInfo">Nom du site :</td>
                                                    <td className="tdInfo">Adresse de livraison :</td>
                                                    <td className="tdInfo">Nom du contact sur site :</td>
                                                    <td className="tdInfo">Mail du contact :</td>
                                                    <td className="tdInfo">Tel du contact :</td>
                                                    {/* <td>Adresse IP WAN</td>
                                                    <td>Adresse IP LAN</td> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.nameSite}</th>
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.livraisonAdresse}</th>
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.name}</th>
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.mail}</th>
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.tel}</th>
                                                    {/* <th scope="col">{content.service.ipWan}</th>
                                                    <th scope="col">{content.service.ipLan}</th> */}

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-2">
                                        <table className="table table-sm mb-0 mt-0 masqueIP" style={{ fontSize: "9px" }}>
                                            <thead className="border-0">
                                                <tr>
                                                    <td className="tdInfo">Adresse IP WAN</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.ipWan}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="table table-sm mb-1 mt-0 masqueIP" style={{ fontSize: "9px" }}>
                                            <thead className="border-0">
                                                <tr>
                                                    <td className="tdInfo">Masque sous réseau</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <th className="varIP" scope="col" style={{ fontWeight: 'normal' }}>{content.service.MasqueReseau1}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="col-2">

                                        <table className="table table-sm mb-0 mt-0 masqueIP" style={{ fontSize: "9px" }}>
                                            <thead className="border-0">
                                                <tr>
                                                    <td className="tdInfo">Adresse IP LAN</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <th scope="col" style={{ fontWeight: 'normal' }}>{content.service.ipLan}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table className="table table-sm mb-1 mt-0 masqueIP" style={{ fontSize: "9px", }}>
                                            <thead className="border-0">
                                                <tr>
                                                    <td className="tdInfo">Masque sous réseau</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr >
                                                    <th className="varIP" scope="col" style={{ fontWeight: 'normal' }}>{content.service.MasqueReseau2}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        )}

                    </div>

                    <div className="row divResum">
                        <div className="col-3">
                            <p className="pResume" style={{ fontSize: "12px !important"}}>Résumé de la commande : </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            {
                                this.state.service && this.state.service.map((content, i) =>
                                    <table class="table table-sm" style={{ marginTop: '0 !important', padding: "1%" }}>
                                        <thead style={{ fontSize: "10px" }}>
                                            <tr>
                                                <th scope="col">Site</th>
                                                <th scope="col">Abonnement Mensuel HT</th>
                                                <th scope="col">Frais de Mise en service HT</th>
                                                <th scope="col">Total</th>

                                            </tr>
                                        </thead>
                                        <tbody style={{ fontSize: "10px" }}>
                                            <tr>
                                                <th scope="row" style={{ fontWeight: 'normal' }}>{content.service.nameSite}</th>
                                                <td>{result[i]} €</td>
                                                <td>{resultFas[i]} €</td>
                                                <td>{result[i] + resultFas[i]} €</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )
                            }
                            <p style={{fontSize: "13px", fontWeight: 'bold' }}>Prix total ABO: {total} € / Prix total FAS : {fas} €</p>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    exportPDFWithComponent = () => {
        this.pdfExportComponent.save();
    }

}

// --------------- FAIT ----------------- //

// En haut selectionner Nouveau / AnnuléRemplace
//Agrandir bloc
//Selectionner -> Service
//Liste PROPRIO 
//Input pour le bon de commande auto (J-M-A-H + PROPRIO)
// Si AnnuléRemplace ajouter Input (SERVICE/VALEUR/ID) de l'ancien

//AJOUTER DATA DANS UNE BDD
// ID // NomClient // Prix Abo // Prix FAS // Date De création // Service // Durée // IdPipeDrive  // Créateur Devis // N° BDC //

// Supprimer addition prix total
//#ID_SERVICE_CLIENT (nom des fichier)

//AJOUTER INPUT REMISE %

// --------------- A FAIRE ----------------- //



// debug recherche avec chiffre


// -------------------------------------- //
//