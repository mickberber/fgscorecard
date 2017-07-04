import React from 'react';
import { Text, View, FlatList } from 'react-native';

import FinishedPlayer from './FinishedPlayer';
import { styles } from './../styles/App';

export default class FinishGame extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.coursedetailscontainer}>
          <View style={styles.detailscolumn}>
            <Text style={styles.courseheader}>Course Totals</Text>
            <Text style={styles.courseyardpar}>Total Yardage: {this.props.totalYardage}</Text>
            <Text style={styles.courseyardpar}>Par: {this.props.totalPar}</Text>
            <Text style={styles.courseheader}>{(this.props.currentHole > 9) ? 'Back' : 'Front'} 9: Totals</Text>
            <Text style={styles.courseyardpar}>Total Yardage: {this.props.coursehalf.totalYardage}</Text>
            <Text style={styles.courseyardpar}>Par: {this.props.coursehalf.par}</Text>
          </View>
          <FlatList data={this.props.players}
                    renderItem={(player) => <FinishedPlayer player={player} />} />

        </View>
      </View>
    );
  }
}
