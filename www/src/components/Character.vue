<template>
  <div class="character">
    <div v-show="showCharacter">
      <div class="row">
        <!--repeat this div for each monster & player, displayed on Encounter.vue-->
        <div class="col-md-1">
          <div class="row">
            <div class="col-md-12 int">
              <h5>INT</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4>{{character.initiative}}</h4>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="row">
            <div class="col-md-12">
              <h4>{{character.name}}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4>{{character.description}}</h4>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <h4>Level
                <input type="number">
              </h4>
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <div class="row">
            <!--ROW 1 OF 2 OPEN-->
            <div class="col-md-12">
              <h5 class="hea">HP</h5>
              <div class="hea2">
                <h5>{{character.health}}</h5>
                <h5>{{character.maxHealth}}</h5>
              </div>
            </div>
          </div>
          <!--ROW 1 OF 2 CLOSE-->
          <div class="row">
            <!--ROW 2 OF 2 OPEN-->
            <div class="col-md-12">
              <!--COL OF ROW3 (OF ROW2/2) OPEN-->
              <div class="row">
                <!--ROW1 (OF ROW2/2) OPEN-->
                <div class="col-md-4">
                  <i class="fa fa-angle-up" @click="updateHealth(1)"></i>
                </div>
                <div class="col-md-4">
                  <i class="fa fa-angle-up" @click="updateHealth(5)"></i>
                </div>
                <div class="col-md-4">
                  <i class="fa fa-angle-up" @click="updateHealth(10)"></i>
                </div>
              </div>
              <!--ROW1 (OF ROW2/2) CLOSE-->
              <div class="row">
                <!--ROW2 (OF ROW2/2) OPEN-->
                <div class="col-md-4">1</input>
                </div>
                <div class="col-md-4">5</input>
                </div>
                <div class="col-md-4">10</input>
                </div>
              </div>
              <!--ROW2 (OF ROW2/2) CLOSE-->
              <div class="row">
                <!--ROW3 (OF ROW2/2) OPEN-->
                <div class="col-md-4">
                  <i class="fa fa-angle-down" @click="updateHealth(-1)"></i>
                </div>
                <div class="col-md-4">
                  <i class="fa fa-angle-down" @click="updateHealth(-5)"></i>
                </div>
                <div class="col-md-4">
                  <i class="fa fa-angle-down" @click="updateHealth(-10)"></i>
                </div>
              </div>
              <!--ROW3 (OF ROW2/2) CLOSE-->
            </div>
            <!--COL OF ROW3 (OF ROW2/2) CLOSE-->
          </div>
          <!--ROW 2 OF 2 CLOSE-->
        </div>
        <!--COL 1 FOR HEALTH CLOSES-->
        <div class="col-md-1">
          <div class="row">
            <div class="col-md-12 ac">
              <h5>AC</h5>
            </div>
            <div class="ac2">
              {{character.armor_class}}
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div @click="openArmor">
                <a class="size">
                  <img src="https://farm5.staticflickr.com/4316/35360194133_27c76ed6b8_s.jpg" alt="AC">
                </a>
              </div>
              <div v-show="showArmor">
                <textarea cols="20" rows="4" placeholder="Armors"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <div class="row">
            <div class="col-md-12">
              <h5>SPEED</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 spe">
              {{character.speed}}
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <div class="row">
            <div class="col-md-12">
              <h5>WEAPONS</h5>
            </div>
          </div>
          <div class="row" id="wpn">
            <div @click="openWeapons">
              <img src="https://farm5.staticflickr.com/4310/35360194343_87b2f64af0_s.jpg" alt="WEAPONS">
            </div>
            <div v-show="showWeapons">
              <!--THESE ARE POPULATING AS OBJ, OBJ, OBJ...MAY NOT BE ABLE TO USE THIS INFORMATION....-->
              <textarea cols="30" rows="4" placeholder="Weapons"></textarea>
            </div>
  
          </div>
        </div>
        <div class="col-md-4">
          <div class="row">
            <!--STATS TITLE-->
            <div class="col-md-2 titleS">STR</div>
            <div class="col-md-2 titleD">DEX</div>
            <div class="col-md-2 titleCN">CON</div>
            <div class="col-md-2 titleW">WIS</div>
            <div class="col-md-2 titleI">INT</div>
            <div class="col-md-2 titleCH">CHA</div>
          </div>
          <div class="row">
            <!--CHARACTER STATS-->
            <div class="col-md-2 shifty">{{character.strength}}</div>
            <div class="col-md-2 shifty">{{character.dexterity}}</div>
            <div class="col-md-2 shifty">{{character.constitution}}</div>
            <div class="col-md-2 shifty">{{character.wisdom}}</div>
            <div class="col-md-2 shifty">{{character.intelligence}}</div>
            <div class="col-md-2 shifty">{{character.charisma}}</div>
          </div>
          <div class="row">
            <!--THE STAT MODIFIER-->
            <div class="col-md-2">
              <input id="strMod" type="text">
            </div>
            <div class="col-md-2">
              <input id="dexMod" type="text">
            </div>
            <div class="col-md-2">
              <input id="conMod" type="text">
            </div>
            <div class="col-md-2">
              <input id="wisMod" type="text">
            </div>
            <div class="col-md-2">
              <input id="intMod" type="text">
            </div>
            <div class="col-md-2">
              <input id="charMod" type="text">
            </div>
          </div>
        </div>
        <div class="col-md-1">
          <div class="row" id="end">
            <div class="ui checkbox">
              <input type="checkbox" name="checkbox">
            </div>
          </div>
          <div class="row" id="end2">
            <div @click="removeCharacter(character)">
              <i>
                <img class="tiny" src="http://i44.photobucket.com/albums/f3/suhmantha/skullDelete_zpsmswuacpy.png">
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Player from './Player'
export default {

  name: 'Character',
  data() {
    return {
      showCharacter: true,
      showArmor: false,
      showWeapons: false
    }
  },
  props: ["character"],
  methods: {
    removeCharacter(character) {
      // this.$store.dispatch('removeCharacter', character)
      this.$store.state.removeCharacters.push(character)
      for (var i = this.$store.state.characters.length - 1; i >= 0; i--) {
        if (this.$store.state.characters[i]._id == character._id) this.$store.state.characters.splice(i, 1);
      }
    },
    updateHealth(value) {
      this.$store.dispatch('updateHealth', { character: this.character, value: value })
    },
    openArmor() {
      this.showArmor = !this.showArmor
    },
    openWeapons() {
      this.showWeapons = !this.showWeapons
    },
    closeCharacter() {
      this.showCharacter = !this.showCharacter
    }
  },
  components: {
    Player
  }
}

</script>


<style scoped>
.tiny {
  max-height: 30px;
  max-width: auto
}

input {
  max-width: 40px;
}

#wpn {
  padding-left: 20px;
}

#end {
  min-height: 50px;
  padding-left: 30px;
}

#end2 {
  padding-left: 5px;
}

.int {
  padding-left: 20px;
}

.lvl {
  padding-left: 10px;
}

.hea {
  padding-left: 30px;
}

.hea2 {
  padding-left: 30px;
}

.ac {
  padding-left: 35px;
}

.ac2 {
  padding-left: 34px;
  min-height: 50px;
}

.spe {
  padding-left: 18px;
}

.titleS {
  padding-left: 17px;
}

.titleD {
  padding-left: 17px;
}

.titleCN {
  padding-left: 17px;
}

.titleW {
  padding-left: 19px;
}

.titleI {
  padding-left: 21px;
}

.titleCH {
  padding-left: 19px;
}

.shifty {
  padding-left: 25px;
  min-height: 30px;
}
</style>