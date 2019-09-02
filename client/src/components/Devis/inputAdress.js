import React, { Component } from 'react';
import axios from 'axios';
import loader from '../../assets/loader.gif';
import './devis.css'
import { Input } from 'antd';

export default class InputAdress extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      list: undefined,
      text: "",
    }
  }

  componentDidMount() {
    var data = [];

    axios.get(`https://sayse.pipedrive.com/v1/deals?api_token=d168467b213a71acdc4ba5cb5b2cfe96529ac061&limit=500`)
      .then(res => {
        // console.log(res.data.data)
        res.data.data.forEach(element => {
          data.push(element.org_id.address)
        });

        data = data.filter((v, i, arr) => arr.indexOf(v) === i)

        this.setState({data:data})
      });
  }

  select(value) {

    this.setState({ text: value, list: [] })

    return (
      null
    );
  }

  searchData(e) {

    var queryData = [];
    if (e.target.value !== '') {
      this.state.data.forEach(function (person) {
        if (person !== null) {
          if (person.toLowerCase().indexOf(e.target.value) !== -1) {
            if (queryData.length < 10) {
              queryData.push(person);
            }
          }
        }

      });

    }
    this.setState({ list: queryData });
    this.setState({ text: e.target.value })

  }
  render() {
    const { text } = this.state

    // if (this.state.data.length === 0) {
    //   return (
    //     <div className="container text-center" style={{ marginTop: '5%' }}>
    //       <img src={loader} alt='Chargement' width='25%'></img>
    //     </div>
    //   )
    // }

    return (
      <div className="AutocompleteText">
      <label for="adresse">Adresse</label>
        <Input name="adresse" onChange={this.searchData.bind(this)} placeholder="Rechercher une adresse" value={text} className="form-control" />
        {(this.state.list) ?
          <div>
            <ul>
              {this.state.list.map((value, i) => {
                return (
                  <li key={i} onClick={() => this.select(value)}>
                    {value}
                  </li>
                )
              })}
            </ul>
          </div> : null}
      </div>
    )
  }
}
