import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Platform, ImageBackground } from "react-native"

const {width, height} = Dimensions.get("window")

export default class Deal extends React.Component {
    
    render() {
        const { title, imageUri, navi } = this.props

        return(            
            <TouchableOpacity style={styles.dealCard}
                onPress = {() => {
                    {
                        navi.navigate('MyModal', {title : title, imageUri : imageUri})
                    }
                }}
            >
              <ImageBackground source={{uri : imageUri}} style={{width: '100%', height: '100%' }} >
                <View style={{alignItems : "center", flex: 1}}>
                    <View style={{flex : 1}} />
                    <View style={{height : 50, alignItems : 'center', justifyContent : 'center' ,backgroundColor : "white",
                        width : width, opacity : .8
                    }}>
                        <Text>{title}</Text>    
                    </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    dealCard: {
        backgroundColor: "black",
        width: width - 25,
        height : 400,
        borderRadius: 10,
        marginBottom: 30,
        overflow : 'hidden',
        ...Platform.select({  // shadow 는 ios, Android 다르다. plaform specific code 가 필요함
          ios: {
            shadowColor: "rgb(50, 50, 50)",
            shadowOpacity: 0.5,
            shadowRadius: 5,
            shadowOffset: {
              height: -1,
              width: 0
            }
          },
          android: {
            elevation: 3
          }
        }),
    
      },
      cardBottom : {
        height : 60 ,
        backgroundColor : "white",
        opacity : 0.5,
      }
})