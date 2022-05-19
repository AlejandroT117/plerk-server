const {Schema, model, Types} = require('mongoose');
const moment = require("moment");
const unique_enterprises = require('../data/entreprises')

class Enterprise {
  constructor(){
    const schema = new Schema({
      name: String,
      status: {default: 'active', type:String}
    })

    this.model = model('enterprise', schema)
  }

  async loadEnterprises(enterprises){
    try{
      let countNew = 0
      for (let i = 0; i < enterprises.length; i++) {
        let new_enterprise = {name: enterprises[i]}
        await this.model.create(new_enterprise)
        countNew++        
      }

      return `Empresas añadidas: ${countNew}`
    }catch(e){
      return e
    }
  }

  async getbyName(name){
    try{
      const enterprise = await this.model.findOne({name})
  
      return enterprise
    }catch(e){
      return e
    }
  }

  async getById(id){
    try{
      const enterprise = await this.model.findById(id)
      if(!enterprise){
        return null
      }   
      return enterprise
    }catch(e){
      return e
    }
  }
}

module.exports = new Enterprise()