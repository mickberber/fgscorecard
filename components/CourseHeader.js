import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './../styles/App';

export default class CourseHeader extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.coursedetailscontainer}>
        <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>Course Totals</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {this.props.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {this.props.totalPar}</Text>
        </View>
        {(this.props.totalHoles > 9) ? <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>{(this.props.currentHole > 9) ? 'Back' : 'Front'} 9: Totals</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {this.props.coursehalf.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {this.props.coursehalf.par}</Text>
        </View> : null}
        <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>Hole {this.props.currentHole} </Text>
          <Text style={styles.courseyardpar}>Yardage: {this.props.currentHoleDetails.yardage}</Text>
          <Text style={styles.courseyardpar}>Par: {this.props.currentHoleDetails.par}</Text>
        </View>
      </View>
    );
  }
}
