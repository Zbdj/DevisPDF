import React, { Component } from 'react';


var data = {};

export default class DetailClient extends Component {
    constructor() {
        super();
        this.state = {
            detailClient: [],
            nameSignataire: '',
            refTech: '',
            contactFact: '',
        }
    }

    componentDidUpdate() {
        if (this.state.nameSignataire !== '' && this.state.refTech !== '' && this.state.contactFact !== '') {
            this.pushData();
        }
    }



    nameSignataire(e) {
        this.setState({
            nameSignataire: e.target.value
        })

    }

    refTech(e) {
        this.setState({
            refTech: e.target.value
        })
    }

    contactFact(e) {
        this.setState({
            contactFact: e.target.value
        })
    }

    pushData() {
        data.nameSignataire = this.state.nameSignataire
        data.refTech = this.state.refTech
        data.contactFact = this.state.contactFact

        this.setState({
            detailClient: data
        }
            , () => {
                this.props.getDetail(this.state.detailClient)
            }
        )
    }


    render() {

        return (
            <div>
                
            </div>
        );
    }


}