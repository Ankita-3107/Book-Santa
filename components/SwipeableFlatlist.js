import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class SwipeableFlatlist extends Component{
    constructor(props) {
        super(props);
        this.state = {
          allNotifications : this.props.allNotifications,
        };
      }
      updateMarkAsread =(notification)=>{
        db.collection("all_notifications").doc(notification.doc_id).update({
          "notification_status" : "read"
        })
      }
    
    onSwipeValueChange = swipeData => {
        var allNotifications = this.state.allNotifications
          const {key,value} = swipeData;
    
          if(value < -Dimensions.get('window').width){
       const newData = [...allNotifications];
           const prevIndex = allNotifications.findIndex(item => item.key === key);
           this.updateMarkAsread(allNotifications[prevIndex]);
             newData.splice(prevIndex, 1);
            this.setState({allNotifications : newData})
       };
    };
    renderItem = data => (
        <Animated.View>
          <ListItem
            leftElement={<Icon name="book" type="font-awesome" color ='#696969'/>}
            title={data.item.book_name}
            titleStyle={{ color: 'black', fontWeight: 'bold' }}
            subtitle={data.item.message}
            bottomDivider
          />
        </Animated.View>
    );
    renderHiddenItem = () => (
        <View style={styles.rowBack}>
            <View style={[styles.backRightBtn, styles.backRightBtnRight]}>
                <Text style={styles.backTextWhite}></Text>
            </View>
        </View>
    );
    render(){
        return(
          <View style={styles.container}>
              <SwipeListView
                  disableRightSwipe
                  data={this.state.allNotifications}
                  renderItem={this.renderItem}
                  renderHiddenItem={this.renderHiddenItem}
                  rightOpenValue={-Dimensions.get('window').width}
                  previewRowKey={'0'}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  onSwipeValueChange={this.onSwipeValueChange}
              />
          </View>
        )
      }
    
    }
    
    
