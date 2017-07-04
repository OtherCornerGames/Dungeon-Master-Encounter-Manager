let Campaigns = require('../models/campaign')
let Encounters = require('../models/encounter')
let Players = require('../models/player')
let Characters = require('../models/character')
let request = require('request')

export default {
  getEncountersByCampaignId: {
    path: '/campaigns/:campaignId/encounters',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return campaign and associated encounters'
      Campaigns.findById(req.params.campaignId)
        .then(campaign => {
          Encounters.find({ campaignId: req.params.campaignId })
            .then(encounters => {
              campaign.encounters = encounters
              res.send(handleResponse(action, campaign.encounters))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getPlayersByCampaignId: {
    path: '/campaigns/:campaignId/players',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return campaign and associated players'
      Campaigns.findById(req.params.campaignId)
        .then(campaign => {
          Players.find({ campaignId: req.params.campaignId })
            .then(players => {
              campaign.players = players
              res.send(handleResponse(action, campaign.players))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getCharactersByEncounterId: {
    path: '/encounters/:encounterId/characters',
    reqType: 'get',
    method(req, res, next) {
      let action = 'return encounter and associated characters'
      Encounters.findById(req.params.encounterId)
        .then(encounter => {
          Characters.find({ encounterId: req.params.encounterId })
            .then(characters => {
              encounter.characters = characters
              res.send(handleResponse(action, encounter.characters))
            })
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getSpells: {
    path: '/spells',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/spells', function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        res.send(body)
      });
    }
  },
  getMonsters: {
    path: '/monsters',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/monsters', function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        res.send(body)
      });
    }
  },
  getEquipment: {
    path: '/equipment',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/equipment', function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        res.send(body)
      });
    }
  },
  getMonster: {
    path: '/monsters/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/monsters/' + req.params.id, function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        res.send(body)
      });
    }
  },
  getSpell: {
    path: '/spells/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/spells/' + req.params.id, function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        res.send(body)
      });
    }
  },
  getItem: {
    path: '/equipment/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'make request to outside api and return data requested'
      request('http://www.dnd5eapi.co/api/equipment/' + req.params.id, function (error, response, body) {
        console.log('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        res.send(body)
      });
    }
  }
}

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}