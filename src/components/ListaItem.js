import React from 'react';

import styled from 'styled-components/native';



const Item = styled.TouchableOpacity`
padding-left:20px;
padding-right:20px;
height:50px;
flex-direction:row;
background-color:#EEE;
align-items:center;
justify-content:space-between;


`;

const ItemText = styled.Text`
font-size:15px;
`;

const ItemCheck = styled.View`
width:20px;
height:20px;
border-radius:10px;
border: 5px solid #FFF;
background-color:${props=>props.done?'green':'red'};
`;

export default (props) => {

    return(
        <Item  onPress={props.onPress} activeOpacity={0.78} underlayColor='#DDD' >
        <>
    <ItemText>{props.data.task} </ItemText> 
        <ItemCheck done={props.data.done}></ItemCheck>
        </>
      </Item>

    );
}