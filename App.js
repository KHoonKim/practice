import React from 'react';
import { ScrollView, Animated, StyleSheet, Text, View, Button, StatusBar,Dimensions, Platform, ImageBackground, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Deal from './deal'


const { height, width } = Dimensions.get("window")
const deals = {
  [1] : {
    id : 1,
    title : 'hello',
    imageUri : 'https://amp.businessinsider.com/images/588a618b475752ee018b4b5b-750-563.jpg',
    deal_a : 
      {
        [1] : {
          imageUri : 'https://timedotcom.files.wordpress.com/2015/01/back-to-the-future-nikes.jpg',
          title : 'A-1 Title',
          subtitle : 'A-1 Sub Title',
        },
        [2] : {
          imageUri : 'https://pbs.twimg.com/media/DWFpKVhU8AU158o.jpg',
          title : 'A-2 Title',
          subtitle : 'A-2 Sub Title',
        },
        [3] : {
          imageUri : 'http://bit.ly/2JbYwPn',
          title : 'A-3 Title',
          subtitle : 'A-3 Sub Title',
        }
    },
    deal_b : {
      [1] : {
        imageUri : 'https://sneakernews.com/wp-content/uploads/2017/01/Adidas_EQT-support-ADV_Black_Turbo_Red-1.jpg',
        title : 'B-1 Title',
        subtitle : 'B-1 Sub Title',
      },
      [2] : {
        imageUri : 'https://i.pinimg.com/originals/55/e7/8b/55e78bdd7d2ea2d66e3dad3fe753b812.jpg',
        title : 'B-2 Title',
        subtitle : 'B-2 Sub Title',
      },
      [3] : {
        imageUri : 'http://bit.ly/2JcMGVe',
        title : 'B-3 Title',
        subtitle : 'B-3 Sub Title',
      }
    },
    createdAt : '2018-10-14'
  },
  [2] : {
    id : 2,
    title : 'bye',
    imageUri : 'https://sneakernews.com/wp-content/uploads/2018/03/nike-kobe-ad-nxt-360-release-date.jpg',
    createdAt : '2018-10-15'
  }
}
/// Deal modal
const FIXED_BAR_WIDTH = width
const BAR_SPACE = 0
const images = [
  'https://timedotcom.files.wordpress.com/2015/01/back-to-the-future-nikes.jpg',
  'https://pbs.twimg.com/media/DWFpKVhU8AU158o.jpg',
  'http://bit.ly/2JbYwPn',
  'https://sneakernews.com/wp-content/uploads/2017/01/Adidas_EQT-support-ADV_Black_Turbo_Red-1.jpg',
  'https://i.pinimg.com/originals/55/e7/8b/55e78bdd7d2ea2d66e3dad3fe753b812.jpg',
  'http://bit.ly/2JcMGVe',
  
]



class HomeScreen extends React.Component {

  render() {
    
    return (
      
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View>
          <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.topContainer}>
              <Text style={styles.subTitle}>
                
              </Text>
              <Text style={styles.title}>오늘의 딜</Text>
            </View>
            <View style={styles.dealContainer}>
              {
                Object.values(deals)                  
                .map( dealObject => {
                  
                    return <Deal 
                      key={dealObject.id} 
                      title={dealObject.title} 
                      imageUri={dealObject.imageUri} 
                      navi={this.props.navigation}
                    />
                 
                })
              }
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => {
            this.props.navigation.navigate('Home')}
          }
        />
      </View>
    );
  }
}

class ModalScreen extends React.Component {
 
  numItems = images.length
  itemWidth = (FIXED_BAR_WIDTH / this.numItems) - ((this.numItems - 1) * BAR_SPACE)
  animVal = new Animated.Value(0)

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title', 'NO-title');
    const imageUri = navigation.getParam('imageUri', 'NO-title');
    

    let imageArray = []
    let barArray = []
    
    images.forEach((image, i) => {

      const thisImage = (
        <Image
          key={`image${i}`}
          source={{uri: image}}
          style={{ width: width }}
        />
      )
      imageArray.push(thisImage)

      
      const scrollBarVal = this.animVal.interpolate({
        inputRange: [width * (i - 1), width * (i + 1)],
        outputRange: [-this.itemWidth, this.itemWidth],
        extrapolate: 'clamp',
      })

      const thisBar = (
        
        <View
          key={`bar${i}`}
          style={[
            styles.track,
            {
              
              width: this.itemWidth,
              marginLeft: i === 0 ? 0 : BAR_SPACE,
            },
          ]}
        >
          <Animated.View

            style={[
              styles.bar,
              {
                width: this.itemWidth,
                transform: [
                  { translateX: scrollBarVal },
                ],
              },
            ]}
          />
        </View>
      )
      
      barArray.push(thisBar)
    })


    return (
      
      <View
        style={styles.modalMainContainer}
      >
        
        /// Deal Scrollview
        <ScrollView horizontal showsHorizontalScrollIndicator={true} scrollEventThrottle={10} pagingEnabled contentOffset = {{ x: 100}}
          onScroll={ Animated.event( [{ nativeEvent: { contentOffset: { x: this.animVal } } }])}
        >
          {imageArray}
        </ScrollView>

        <View style={styles.scrollBarContainer}>
          {barArray}
        </View>

        <View style={styles.marginTopContainer}>
          /// 상단 X 버튼
          <SafeAreaView style={{flex: 1,}}>
            <View style={{flexDirection: 'row',}}>
              <View style={{flex : 1 , justifyContent : 'center', margin : 10, alignItems : 'center'}} />
              <View style={{flex : 4 ,height : 50, justifyContent : 'center', margin : 10, alignItems : 'center'}}></View>
              <TouchableOpacity style={{flex : 1, height : 50, width : 50, justifyContent : 'center', margin : 10, alignItems : 'center'}}>
                <Ionicons name="ios-close" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>


          /// 남은 시간
          <View style={{ top : 100, alignItems : 'center' }}>>  
            <Text style={{color : 'white', fontSize : 15 }}>
              남은 시간
            </Text>
            <Text style={{color : 'white', fontSize : 30, top : 5 }}>
              40:33:10
            </Text>
          </View>
        </View>

        /// 하단 버튼 영역
        <View style={styles.modalButtonContainer}>
        </View>

        
      </View>
    );
  }
}



const MainStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Settings') {
          iconName = `ios-happy${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: 'gray',
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    MyModal: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const styles = StyleSheet.create({
  modalMainContainer : {
    backgroundColor : 'yellow',
    flex : 1,
    justifyContent : 'center',
    alignContent : 'center'
  },
  modalButtonContainer : {
    position : 'absolute',
    backgroundColor : 'black',
    height : 100,
    width : width,
    zIndex : 1,
    bottom : 0,
    opacity : .3
  },
  marginTopContainer: {
    position : 'absolute',
    height : 100,
    width : width,
    zIndex : 1,
    top : 0,
  },
  scrollBarContainer: {
    position: 'absolute',
    top: 100,
    flexDirection: 'row',
    backgroundColor : 'red',
    
  },
  track: {
    backgroundColor: 'white',
    overflow: 'hidden',
    height: 2,
  },
  bar: {
    backgroundColor: 'red',
    height: 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
  },
  topContainer : {
    marginTop: 80,
    marginHorizontal: 15,
    marginBottom : 30,
    flex : 8,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "800",
  },
  subTitle : {
    color: "gray",
    marginBottom : 5
  },
  dealContainer : {
    alignItems : "center",
    flex : 2,
  },
});