import React, { Component } from 'react';
import '../static/List.css';
import '../static/App.css';
// import 'bootstrap/dist/css/bootstrap.css';
const item_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const name_dict={148 :'Dragonair' ,155:'Cyndaquil',185:"Sudowoodo",204:'Pineco',227:'Skarmony',246:'Larvitar',262:'Mightyena',309:'Electrike',
361:'Snorunt',417:'Pachirisu',438:'Bonsly',524:'Roggenrola',533:'Gurdurr',534:'Conkeldurr',573:'Cinccino',779:'Bruxish'};
const name_list=["Bulbasaur", "Charmander", "Squirtle", "Pikachu", "Chikorita", "Cyndaquil", "Totodile", "Treecko", "Torchic",
"Mudkip", "Dragonite", "Metagross", "Gengar", "Gyarados", "Lucario", "Kyogre", "Groudon", "Dialga", "Palkia", "Arceus"];
const rarity_list=[1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4];

class TrData extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      this.props.pokemons.map((poke ,i)=>{
        var attack = poke.attack.toNumber();
        var pokemonId = poke.pokemonId.toNumber();; 
        var pokemonNum = pokemonId>>16; 
        var owner = poke.owner;
        var level = poke.level.toNumber();
        var exp = poke.exp.toNumber();
        var attack = poke.attack.toNumber();
        const img  =require( "../pokemon_imgs/"+pokemonNum +".png") ;
        // resizeImage(img, 16, 16);
        return (
            <tr key={pokemonId} className="itemrow">
              <td className='itemnamerow'>
                <div className="container">
                  <div className="col-8">
                    <div className="Poke-name">
                      {name_dict[pokemonNum]}
                    </div>
                    <div className="Poke-detail-small">
                      Pokemon ID &nbsp;&nbsp;   {pokemonId}
                    </div>
                    <div className="Poke-detail-small">
                      Pokemon No. &nbsp;&nbsp;   {pokemonNum}
                    </div>
                    <div className="Poke-detail-small">
                      Attack Point  &nbsp;&nbsp;  {attack}
                    </div>
                    <div className="Poke-detail-small">
                      level  &nbsp;&nbsp;  {level}
                    </div>
                    <div className="Poke-detail-small">
                      EXP   &nbsp;&nbsp;  {exp}
                    </div>
                  </div>
                </div>
              </td>
              <td colSpan="0"><img src={img} className="ImageRow"/></td> 
            </tr>
        )       
      })
    )
  }
}
class List extends React.Component {
	constructor(props){
    super(props);
    this.state={
      pokemons:[] 
    }
  }

  render() {
    if (this.props.pokemons===undefined)
    {
      return <div></div>;
    }
    return (
      <table className="PokemonTable">
        <thead>
          <tr>
            <th className="NameRow"  >Pokemon Name</th>
            <th className="ImageRow"   >Pokemon Image</th>
          </tr>
        </thead>
      <tbody>
        <TrData pokemons={this.props.pokemons}/>
      </tbody>
      </table>
    )  
  }
}


class AllTrData extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      this.props.pokemons.map((pokemonId ,i)=>{
        var pokemonNum = pokemonId;
        const img  =require( "../pokemon_imgs/"+pokemonNum +".png") ;
        return (
            <tr key={pokemonId} className="itemrow">
              <td className='itemnamerow'>
                <div className="container">
                  <div className="col-8">
                    <div className="Poke-detail-small">
                      Pokemon No. &nbsp;&nbsp;   {pokemonNum}
                    </div>
                    <div className="Poke-detail-small">
                      Pokemon Name &nbsp;&nbsp;   {name_list[pokemonNum-1]}
                    </div>
                    <div className="Poke-detail-small">
                      Pokemon rarity &nbsp;&nbsp;   {rarity_list[pokemonNum-1]}
                    </div>

                    
                  </div>
                </div>
              </td>
              <td colSpan="0"><img src={img} className="ImageRow"/></td> 
            </tr>
        )       
      })
    )
  }
}
export class AllList extends React.Component {
	constructor(props){
    super(props);
    this.state={
      pokemons:item_list
    }
  }
  componentDidMount(){
    const _this=this;
      _this.setState({
        pokemons:item_list 
      });
  }
  render() {
    return (
      <div>
      <table className="PokemonTable">
        <thead>
          <tr>
            <th className="NameRow"  >Pokemon Name</th>
            <th className="ImageRow"   >Pokemon Image</th>
          </tr>
        </thead>
      <tbody>
        <AllTrData pokemons={this.state.pokemons}/>
      </tbody>
      </table>
      </div>
    )  
  }
}

export default List; 
 
