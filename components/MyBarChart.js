// import React from 'react';
// import { View, Text } from 'react-native';
// import { BarChart } from 'react-native-chart-kit';
// import { Dimensions } from 'react-native';

// const screenWidth = Dimensions.get('window').width;

// const data = {
    
//   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',''],
//   datasets: [{
//     data: [ 4, 6,3, 7, 6, 9,5,0]
//   }]
// };

// const chartConfig = {
//   // backgroundGradientFrom: '#1E2923',
//   backgroundGradientFromOpacity: 0,
//   // backgroundGradientTo: '#1E2923',
//   backgroundGradientToOpacity: 0,
//   color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  

// }

// const MyBarChart = () => {
//   return (
//     <View>
//       <Text>Bar Chart Example</Text>
//       <BarChart
//            style={styles.barChart}
//            data={data}
//            width={330}
//           showValuesOnTopOfBars
//           yLabelsOffset={40}
          
//           xLabelsOffset={-20}
      
//            height={250}
           
//            chartConfig={chartConfig}
//          />
//     </View>
//   );
// };

// export default MyBarChart;