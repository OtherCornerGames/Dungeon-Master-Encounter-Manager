<template>
  <div class="campaign">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <h1 class="dungeon">DM</h1>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li><a class="dungeon" style="color: #c70505; cursor: pointer" @click="logout(this.user)">Logout</a></li>
        </ul>
      </div>
    </nav>
    <div class="well">
      <button type="button">
        <router-link :to="'/campaigns/'"><h6>go back to campaigns list...</h6></router-link>
        </button>
      <h3 class="dungeon">{{campaign.name}}</h3>
      <form @submit.prevent="createEncounter">
        <div class="col-xs-6">
          <div class="input-group">
            <input type="text" v-model="encounterName" required placeholder="Create Encounter">
            <input type="text" v-model="encounterDescription" required placeholder="Encounter Description">
          </div>
          <button type="submit">Create Encounter</button>
        </div>
      </form>
      <div class="col-xs-6">
        <div class="input-group">
          <form @submit.prevent="createPlayer">
            <div class="input-group">
              <input type="text" v-model="playerName" required placeholder="Player Name">
              <input type="text" v-model="playerDescription" required placeholder="Player Description">
              <input type="number" v-model="playerHealth" required placeholder="Player Health">
              <input type="number" v-model="playerArmor" required placeholder="Player Armor">
              <input type="number" v-model="playerSpeed" required placeholder="Player Speed">
              <input type="text" v-model="playerWeapons" required placeholder="Player Weapons/ Dice Damage">
              <input type="number" v-model="playerStrength" required placeholder="Player Strength">
              <input type="number" v-model="playerDexterity" required placeholder="Player Dexterity">
              <input type="number" v-model="playerConstitution" required placeholder="Player Constitution">
              <input type="number" v-model="playerWisdom" required placeholder="Player Wisdom">
              <input type="number" v-model="playerIntelligence" required placeholder="Player Intelligence">
              <input type="number" v-model="playerCharisma" required placeholder="Player Charisma">
            </div>
            <button type="submit">Create Player</button>
          </form>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <div class="well">
            <div class="list-group">
              <div class="col-xs-6">
                <h1 class="dungeon">Encounter</h1>
                <a class="list-group-item" v-for="encounter in encounters">
                  <button @click="movePlayers(players, encounter._id)">Add all Players</button>
                  <router-link :to="'/campaigns/'+campaign._id+'/encounters/' + encounter._id ">
                    {{encounter.name}}
                  </router-link>
                  <a class="fa fa-trash" @click="removeEncounter(encounter)"></a>
                </a>
              </div>
              <div class="col-xs-6">
                <h1 class="dungeon">Player</h1>
                <a class="list-group-item" v-for="player in players">
                  {{player.name}}
                  <a class="fa fa-trash" @click="removePlayer(player)"></a>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Encounter from './encounter'
  import Player from './player'
  export default {
    name: 'campaigns',
    data() {
      return {
        encounterName: '',
        encounterDescription: '',
        playerName: '',
        playerDescription: '',
        playerHealth: Number,
        playerArmor: Number,
        playerSpeed: '',
        playerWeapons: '',
        playerIntelligence: Number,
        playerStrength: Number,
        playerDexterity: Number,
        playerConstitution: Number,
        playerWisdom: Number,
        playerCharisma: Number

      }
    },
    mounted() {
      this.$store.dispatch('getCampaign', this.$route.params.id)
      this.$store.dispatch('getEncounters', this.$route.params.id)
      this.$store.dispatch('getPlayers', this.$route.params.id)
    },
    computed: {
      campaign() {
        return this.$store.state.activeCampaign
      },
      encounters() {
        return this.$store.state.encounters
      },
      players() {
        return this.$store.state.players
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logout', this.user)
      },
      createPlayer() {
        this.$store.dispatch('createPlayer', {
          health: this.playerHealth,
          maxHealth: this.playerHealth,
          name: this.playerName,
          description: this.playerDescription,
          armor_class: this.playerArmor,
          speed: this.playerSpeed,
          weapons: this.playerWeapons,
          intelligence: this.playerIntelligence,
          strength: this.playerStrength,
          dexterity: this.playerDexterity,
          constitution: this.playerConstitution,
          wisdom: this.playerWisdom,
          charisma: this.playerCharisma,
          campaignId: this.$route.params.id
        })
        this.playerHealth = ''
        this.playerName = ''
        this.playerDescription = ''
        this.playerArmor = ''
        this.playerSpeed = ''
        this.playerWeapons = ''
        this.playerIntelligence = ''
        this.playerStrength = ''
        this.playerDexterity = ''
        this.playerConstitution = ''
        this.playerWisdom = ''
        this.playerCharisma = ''
      },
      createEncounter() {
        this.$store.dispatch('createEncounter', {
          name: this.encounterName,
          description: this.encounterDescription,
          campaignId: this.$route.params.id
        })
        this.encounterName = ''
        this.encounterDescription = ''
      },
      removeEncounter(encounter) {
        this.$store.dispatch('removeEncounter', encounter)
      },
      removePlayer(player) {
        this.$store.dispatch('removePlayer', player)
      },
      movePlayers(players, encounterId) {
        for (var i = 0; i < players.length; i++) {
          var player = players[i]
          player.encounterId = encounterId
          this.$store.dispatch("movePlayers", player)
        }
      },
      components: {
        Player,
        Encounter
      }
    }
  }

</script>

<style scoped>
  button {
    color: #333;
  }
  
  h1 {
    text-align: center;
    font-size: 50px;
  }
  
  .navbar {
    background-color: rgba(100, 100, 100, 0);
    border-color: rgba(100, 100, 100, 0);
  }
  
  .list-group-item {
    background-color: rgba(100, 100, 100, 0);
    border-color: rgba(100, 100, 100, 0);
  }
  
  .list-group-item:hover {
    background-color: rgba(100, 100, 100, 0);
    border-color: rgba(100, 100, 100, 0);
  }
  
  .dungeon {
    color: #c70505;
    font-family: 'Metal Mania';
    text-shadow: 1px 1px 1px gold;
  }
  
  a {
    color: whitesmoke;
    text-shadow: 1px 1px 1px rgba(100, 100, 100, 0);
  }
  
  .well {
    background-color: rgba(100, 100, 100, 0);
    border-color: rgba(100, 100, 100, 0);
    font-family: 'Asap', sans-serif;
  }
  
  h6 {
    color: #333
  }
</style>