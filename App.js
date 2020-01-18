import React, {useState, useEffect} from 'react';

import styled from 'styled-components/native';
import lista from './src/lista';
import ListaItem from './src/components/ListaItem';
import AddItemArea from './src/components/AddItemArea';
import uuid from 'uuid/v4';   
import {SwipeListView } from 'react-native-swipe-list-view';
import ListaItemSwipe from './src/components/ListaItemSwipe';
import AsyncStorage from '@react-native-community/async-storage';

const Page = styled.SafeAreaView`
flex:1;
`;
const Listagem = styled.FlatList`
flex:1
`;
const Item = styled.TouchableHighlight`
padding:10px;

`;

const ItemText = styled.Text`
font-size:15px;
`;

const ItemCheck = styled.View`
width:20px;
height:20px;
border-radius:10px;
border: 5px solid #FFF;
`;

const Input = styled.TextInput`
border:1px solid black;

`;

const Button = styled.Button`

`;

const Textin = styled.Text`
font-size:18px;
`;

const EspaçoText = styled.View`
background-color:red;
height:40px;
padding:10px;
`;

export default ()=>{

  const addNewItem = (txt) => {
    let newItems = [...items];
    newItems.push({
        id:uuid(),
        task:txt,
        done:false
    });
    setItems(newItems);
  }

const [items, setItems ] = useState(lista);
const [nome, setNome] = useState('');
const [novoNome, setNovoNome] = useState('');

const handleSave = async () => {
if(novoNome !=''){
  await AsyncStorage.setItem('@nome', novoNome);
  setNome(novoNome);
  setNovoNome('');
}
}

const getNome = async () => {
  const n = await AsyncStorage.getItem('@nome')
    setNome(n);

  
}

useEffect(()=>{
getNome();
}, []);

const toggleDone = (index) => {
let newItems = [...items];
newItems[index].done = !newItems[index].done;
setItems(newItems);
}

const deleteItem = (index) => {
  let newItems = [...items];
  newItems = newItems.filter((it, i)=>{
    if(i != index) {
      return true;
    } else {
          return false;
        }
  
   
  });
  setItems(newItems);
}

  return(
<Page>
  <Input  placeholder="qual seu nome"
   value={novoNome} 
   onChangeText={e=>setNovoNome(e)}
    />
  <Button title="salvar" onPress={handleSave}/>
  <EspaçoText>
  <Textin>{nome}</Textin>
  </EspaçoText>

  <AddItemArea onAdd={addNewItem}  />
<SwipeListView
  data={items}
  renderItem={({item, index})=><ListaItem onPress={()=>toggleDone(index)}  data={item} />}
  keyExctrator={(item)=>item.id}
  renderHiddenItem={({item, index}) => <ListaItemSwipe onDelete={()=>deleteItem(index)} />}
  leftOpenValue={50}
  disableLeftSwipe={true}
 

/>
</Page>
  );
}