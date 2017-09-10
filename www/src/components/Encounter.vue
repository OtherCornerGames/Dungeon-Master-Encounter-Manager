<template>
  <div class="encounter">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <h1 class="dungeon">DM</h1>
        </div>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a class="dungeon" style="color: #c70505; cursor: pointer" @click="logout(this.user)">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
    <h2 class="dungeon">{{campaign.name}}</h2>
    <h3 class="dungeon">{{encounter.name}}</h3>
    <div class="row tabrow">
      <!--MONSTERS TAB -->
      <div class="col-md-2">
        <button type="button" title="three heads == monster" class="btn btn-default" @click="showMonsters=true">
          <img src="../assets/hydra.png" alt="MONSTER">
        </button>
        <transition name="modal" v-if="showMonsters">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="monsters">
                    Monsters
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <form @submit.prevent="monsters">
                      <div class="form-group">
                        <input type="text" class="form-control" v-model="monsterName" placeholder="Monster Name" required>
                      </div>
                    </form>
                    <div class="container">
                      <div class="row">
                        <div class="col-md-2">
                          <div class="row">
                            <div class="col-md-12" v-for='monster in this.monsters'>
                              <a @click="getMonster(monster)">{{monster.name}}</a>
                            </div>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="row">
                            <div class="col-md-12">
                              <strong>Name:</strong> {{monster.name}}
                              <br> <strong>Size:</strong> {{monster.size}}
                              <br> <strong>Armor Class:</strong> {{monster.armor_class}}
                              <br> <strong>Speed:</strong> {{monster.speed}}
                              <br> <strong>Hit Points:</strong> {{monster.hit_points}}
                              <br> <strong>Senses:</strong> {{monster.senses}}
                              <br> <strong>Challenge Rating:</strong> {{monster.challenge_rating}}
                              <br> <strong>Strength:</strong> {{monster.strength}}
                              <br> <strong>Dexterity:</strong> {{monster.dexterity}}
                              <br> <strong>Constitution:</strong> {{monster.constitution}}
                              <br> <strong>Intelligence:</strong> {{monster.intelligence}}
                              <br> <strong>Wisdom:</strong> {{monster.wisdom}}
                              <br> <strong>Charisma:</strong> {{monster.charisma}}
                              <br> <strong>Actions:</strong> {{monster.actions}}
                              <form @submit.prevent="moveMonster">
                                <div class="form-group">
                                  <input type="text" class="form-control" v-model="customName" :placeholder="monster.name">
                                  <button class="btn but-default" @submit="moveMonster">Add Monster</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </slot>
                </div>
  
                <div class="modal-footer">
                  <slot name="footer">
                    Monster feet stink.
                    <button class="modal-default-button" @click="showMonsters=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--PLAYERS TAB -->
      <div class="col-md-2">
        <button type="button" title="swordwoman == playa" class="btn btn-default" @click="showPlayer=true">
          <img src="../assets/swordwoman.png" alt="PLAYER">
        </button>
        <transition name="modal" v-if="showPlayer">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="players">
                    Players
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <form @submit.prevent="players">
                      <div class="form-group">
                        <input type="text" class="form-control" v-model="playerName" placeholder="Player Name" required>
                      </div>
                    </form>
                    <div v-for='player in this.players'>
                      <div class="row">
                        <div class="col-md-12">
                          {{player.name}} Name: {{player.name}} --
                          <br> Armor Class: {{player.armor_class}} --
                          <br> Speed: {{player.speed}} --
                          <br> Hit Points: {{player.health}} --
                          <br> Weapons {{player.weapons}} --
                          <br>Strength: {{player.strength}} --
                          <br> Dexterity: {{player.dexterity}} --
                          <br> Constitution: {{player.constitution}} --
                          <br> Intelligence: {{player.intelligence}} --
                          <br> Wisdom: {{player.wisdom}} --
                          <br> Charisma: {{player.charisma}} --
                          <br> Actions: {{player.actions}}
                          <button class="btn but-default" @click="movePlayer">Add Player</button>
                        </div>
                      </div>
                    </div>
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    Player feet stink.
                    <button class="modal-default-button" @click="showPlayer=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--WEAPONS TAB -->
      <div class="col-md-2">
        <button type="button" title="things that hurt == weapons" class="btn btn-default" @click="showWeapons=true">
          <img src="../assets/sverd-i-fjell.png" alt="EQUIPMENT">
        </button>
        <transition name="modal" v-if="showWeapons">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="weapons">
                    Equipment
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <form @submit.prevent="equipment">
                      <div class="form-group">
                        <input type="text" class="form-control" v-model="equipmentName" placeholder="Equipment Name" required>
                      </div>
                    </form>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="row">
  
                          <div class="col-xs-12" v-for='item in this.equipment'>
                            <a @click="getItem(item)">{{item.name}}</a>
                          </div>
                        </div>
  
                      </div>
                      <!--Dummy info for drawing monster description-->
                      <div class="col-xs-6">
                        <div class="row">
                          <div class="col-md-6">
  
                            Name: {{item.name}} --
                            <br> Category: {{item.equipment_category}} --
                            <br> Category Range: {{item.category_range}} --
                            <br> Cost; {{item.cost}} --
                            <br> Damage: {{item.damage}} --
                            <br> Range: {{item.range}} --
                            <br> Throw: {{item.throw_range}} --
                            <br> Armor: {{item.armor_category}} --
                            <br> Armor Class: {{item.armor_class}} --
                            <br> Minimum Strength: {{item.str_minimum}} --
                            <br> Description: {{item.desc}} --
                            <br> Speed: {{item.speed }} --
                            <br> Capacity: {{item.capacity}} --
                            <br>
                          </div>
                        </div>
                      </div>
                    </div>
  
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    Weapons are dangerous, unless it is a boiled carrot.
                    <button class="modal-default-button" @click="showWeapons=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--SPELLS TAB -->
      <div class="col-md-2">
        <button type="button" title="spell == mindblown" class="btn btn-default" @click="showSpells=true">
          <img src="../assets/bolt-spell-cast.png" alt="COVER">
        </button>
        <transition name="modal" v-if="showSpells">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="spells">
                    Spells
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <form @submit.prevent="spells">
                      <div class="form-group">
                        <input type="text" class="form-control" v-model="spellName" placeholder="Spell Name" required>
                      </div>
                    </form>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="row">
                          <div class="col-xs-12" v-for='spell in this.spells'>
                            <a @click="getSpell(spell)">{{spell.name}}</a>
                          </div>
                        </div>
                      </div>
                      <div class="col-xs-6">
                        <div class="row">
                          <div class="col-md-12">
                            Name: {{spell.name}} --
                            <br> Description: {{spell.desc}} --
                            <br> Higher Level: {{spell.higher_level}} --
                            <br> Range: {{spell.range}} --
                            <br> Components: {{spell.components}} --
                            <br> Material: {{spell.material}} --
                            <br> Duration: {{spell.duration}} --
                            <br> Concentration: {{spell.concentration}} --
                            <br> Casting Time: {{spell.casting_time}} --
                            <br>
                          </div>
                        </div>
                      </div>
                    </div>
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    Don't anger the mage.
                    <button class="modal-default-button" @click="showSpells=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--CONDITIONS TAB -->
      <div class="col-md-2">
        <button type="button" title="condition: player != okay" class="btn btn-default" @click="showConditions=true">
          <img src="../assets/internal-injury.png" alt="CONDITION">
        </button>
        <transition name="modal" v-if="showConditions">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="conditions">
                    Conditions
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <conditions></conditions>
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    What is your condition??
                    <button class="modal-default-button" @click="showConditions=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <!--COVER TAB -->
      <div class="col-md-2">
        <button type="button" title="big rock == cover" class="btn btn-default" @click="showCover=true">
          <img src="../assets/stone-pile.png" alt="COVER">
        </button>
        <transition name="modal" v-if="showCover">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container">
                <div class="modal-header">
                  <slot name="cover">
                    Cover
                  </slot>
                </div>
                <div class="modal-body">
                  <slot name="body">
                    <cover></cover>
  
                  </slot>
                </div>
                <div class="modal-footer">
                  <slot name="footer">
                    Big rock == cover.
                    <button class="modal-default-button" @click="showCover=false">
                      Close
                    </button>
                  </slot>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="row initrow">
      <div class="col-md-1">
        <!--this is a purposely blank spot-->
      </div>
      <div class="col-md-2">
        <button class="btn btn-default" @click="assignInt()">Initiative roll</button>
        <button class="btn btn-default" @click="endEncounter()">End Encounter</button>
        <button class="btn btn-default" @click="getCharacters()">Reset Encounter</button>
      </div>
      <div class="col-md-5"></div>
      <div class="col-md-2">
        <router-link :to="'/campaigns/'+ this.$store.state.activeEncounter.campaignId">
          <button class="btn btn-default">Return to Campaign</button>
        </router-link>
      </div>
      <div class="col-md-2">
        <!--this is a purposely blank spot-->
      </div>
    </div>
    <div class="row chars">
      <div class="well well-lg">
        <Character class="well" v-for="character in characters" :character="character"></Character>
      </div>
    </div>
  </div>
</template>


<script>
import Player from './Player'
import Character from './Character'
import Conditions from './Conditions'
import Cover from './Cover'
import Vue from 'vue'
export default {
  name: 'encounter',
  data() {
    return {
      showMonsters: false,
      showPlayer: false,
      showWeapons: false,
      showSpells: false,
      showConditions: false,
      showCover: false,
      monsterName: '',
      customName: '',
      playerName: '',
      playerHealth: Number,
      spellName: '',
      equipmentName: ''

    }
  },
  mounted() {
    this.$store.dispatch("getMonsters")
    this.$store.dispatch("getSpells")
    this.$store.dispatch("getEquipment")
    this.$store.dispatch("getEncounter", this.$route.params.id)
    this.$store.dispatch("getPlayers", this.campaign._id)
    this.$store.dispatch("getCharacters", this.$route.params.id)

  },

  computed: {
    monsters() {
      var keyword = this.monsterName
      var temp = this.$store.state.monsters
      var monsters = []
      for (var i = 0; i < temp.length; i++) {
        var monster = temp[i]
        var value = monster.name.toLowerCase()
        var term = keyword.toLowerCase()
        if (value.indexOf(term) !== -1 && monsters.length < 20) {
          monsters.push(monster)
        }
      }
      return monsters
    },
    monster() {
      return this.$store.state.activeMonster
    },
    spell() {
      return this.$store.state.activeSpell
    },
    item() {
      return this.$store.state.activeEquipment
    },
    spells() {
      var keyword = this.spellName
      var temp = this.$store.state.spells
      var spells = []
      for (var i = 0; i < temp.length; i++) {
        var spell = temp[i]
        var value = spell.name.toLowerCase()
        var term = keyword.toLowerCase()
        if (value.indexOf(term) !== -1 && spells.length < 20) {
          spells.push(spell)
        }
      }
      return spells
    },
    equipment() {
      var keyword = this.equipmentName
      var temp = this.$store.state.equipment
      var equipment = []
      for (var i = 0; i < temp.length; i++) {
        var item = temp[i]
        var value = item.name.toLowerCase()
        var term = keyword.toLowerCase()
        if (value.indexOf(term) !== -1 && equipment.length < 20) {
          equipment.push(item)
        }
      }
      return equipment
    },
    encounter() {
      return this.$store.state.activeEncounter
    },
    characters() {
      return this.$store.state.characters
    },
    campaign() {
      return this.$store.state.activeCampaign
    },
    players() {
      return this.$store.state.players
    }
  },
  methods: {
    endEncounter() {
      for (var index = 0; index < this.$store.state.removeCharacters.length; index++) {
        var character = this.$store.state.removeCharacters[index]
        this.$store.dispatch('removeCharacter', character)
      }
      this.$store.state.removeCharacters = []
    },
    getCharacters() {
      this.$store.dispatch("getCharacters", this.$route.params.id)
      this.$store.state.removeCharacters = []
    },
    getSpell(spell) {
      var id = ''
      for (var i = 34; i < spell.url.length; i++) {
        var char = spell.url[i];
        id += char
      }
      this.$store.dispatch("getSpell", id)
    },
    getMonster(monster) {
      var id = ''
      for (var i = 36; i < monster.url.length; i++) {
        var char = monster.url[i];
        id += char
      }
      this.$store.dispatch("getMonster", id)
    },
    getItem(item) {
      var id = ''
      for (var i = 37; i < item.url.length; i++) {
        var char = item.url[i];
        id += char
      }
      this.$store.dispatch("getItem", id)
    },
    logout() {
      this.$store.dispatch('logout', this.user)
    },
    assignInt() {
      this.$store.dispatch('setInit', this.compare)
    },
    compare(a, b) {
      if (a.initiative < b.initiative) {
        return -1;
      }
      if (b.initiative > a.initiative) {
        return 1;
      }
      return 0;
    },
    moveMonster() {
      debugger
      var baseMonster = this.$store.state.activeMonster
      this.$store.state.tempMonster = this.$store.state.activeMonster
      if(this.customName == ''){
      this.nameMonster(this.monsterName)
      }
      this.$store.state.tempMonster.name = this.monsterName
      this.$store.dispatch('moveMonster', this.encounter._id)
      this.monsterName = ''
      this.getMonster(baseMonster)
    },
    nameMonster(monsterName) {
      var monstersName
      var names = ["Alden", "Alec", "Anton", "Arden", "Arlen", "Armand", "Arron", "Augustus", "Avery", "Benedict", "Bennett", "Branden", "Brendon", "Britt", "Broderick", "Carter", "Chadwick", "Chas", "Chet", "Colby", "Cole", "Cordell", "Dalton", "Damien", "Dante", "Darryl", "Darius", "Darron", "Darwin", "Dewitt", "Diego", "Dillon", "Dirk", "Domenic", "Donovan", "Dorian", "Dorsey", "Edison", "Elden", "Elvin", "Erich", "Galen", "Garret", "Gaston", "Gavin", "Gorgon", "Graham", "Hal", "Hank", "Harlan", "Hayden", "Herschel", "Hoyt", "Hunter", "Isaias", "Isaac", "Jacinto", "Jarred", "Jonas", "Kendrick", "Kyle", "Kennith", "Keven", "Leif", "Lenard", "Lincoln", "Linwood", "Lucius", "Sam", "Malcolm", "Malik", "Maxwell", "McKinley", "Merlin", "Merrill", "Michal", "Monty", "Newton", "Nathan", "Nolan", "Oni", "Porter", "Quinton", "Raphael", "Reid", "Jason", "Scotty", "Seth", "Shad", "Stanton", "Stefan", "Thaddeus", "Tobias", "Trenton", "Vance", "Walker", "Walton", "Weldon", "Wes", "Weston", "Willian", "Winford", "Wyatt", "Zordon"]
      var randomName;
      function getRandomName(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      randomName = names[getRandomName(0, names.length)]

      monstersName = `${randomName} the ${this.$store.state.activeMonster.name}`
      this.monsterName = monstersName
    }
    //console.log(characters)
  },
  components: {
    Character,
    Player,
    Conditions,
    Cover
  }
}

</script>


<style scoped>
h1 {
  font-size: 50px;
}

img {
  width: 80%;
}

.navbar {
  background-color: rgba(100, 100, 100, 0);
  border-color: rgba(100, 100, 100, 0);
}

.dungeon {
  color: #c70505;
  font-family: 'Metal Mania';
  text-shadow: 1px 1px 1px gold;
  text-align: center;
}

.encounter {
  color: black;
}

.tabrow {
  min-height: 100px;
}

.initrow {
  min-height: 100px;
}

.chars {
  min-height: 100px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(200, 200, 200, .33);
  display: table;
  transition: opacity .3s ease;
  color: black;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 900px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  max-height: 400px;
  overflow-y: auto;
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}



/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-wrapper {
  height: 90%;
}

.modal-body {
  overflow: scroll;
}

.well {
  min-height: 300px;
}
</style>