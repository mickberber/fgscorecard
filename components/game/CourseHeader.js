import React from 'react';
import { Text, View } from 'react-native';

import { styles } from './../../styles/App';

const CourseHeader = props => {
    return (
      <View style={styles.coursedetailscontainer}>
        <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>Course</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {props.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {props.totalPar}</Text>
        </View>
        {(props.totalHoles > 9) ? <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>{(props.currentHole > 9) ? 'Back' : 'Front'} 9:</Text>
          <Text style={styles.courseyardpar}>Total Yardage: {props.coursehalf.totalYardage}</Text>
          <Text style={styles.courseyardpar}>Par: {props.coursehalf.par}</Text>
        </View> : null}
        <View style={styles.detailscolumn}>
          <Text style={styles.courseheader}>Hole {props.currentHole} </Text>
          <Text style={styles.courseyardpar}>Yardage: {props.currentHoleDetails.yardage}</Text>
          <Text style={styles.courseyardpar}>Par: {props.currentHoleDetails.par}</Text>
        </View>
      </View>
    );
}

export default CourseHeader;
