import React from 'react';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';


class Visualizer extends Component {

   renderGraph = () => {
      if (this.props.dataset[0] === "Data") {
         return (
            <Placeholder style={{ height: 150, width: 150 }}>
               <Placeholder.Image />
            </Placeholder>
         );
      } else {
         let tableLabel = this.props.dataset.map(x => x['Category']);
         let dataset = this.props.dataset[4];
         let tableData = [dataset['American Indian or Alaska Native'],
            dataset['Asian'], dataset['Hawaiian/ Pacific Islander'],
            dataset['Hispanic'], dataset['Black'], dataset['White'],
            dataset['Two or more races']];

         let data = {
            labels: ["American Indian or Alaska Native", "Asian",
               "Hawaiian/ Pacific Islander", "Hispanic",
               "Black", "White", "Two or more races"],
            datasets: [{
               label: `${dataset['Category']}`,
               data: tableData,
               backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
               ],
               borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(255, 159, 64, 1)'
               ],
               borderWidth: 1
            }]
         };

         return (
            <Pie
               data={data}
               width={400}
               height={400}
               options={{ maintainAspectRatio: false }}
            />
         );
      }
   }

   render() {
      return (
         <section>
            {this.renderGraph()}
         </section >
      );
   }
}

const mapStateToProps = state => ({
   user: state.user,
   dataset: state.scopeOption.specificDatasetReducer,
});

export default connect(mapStateToProps)(withRouter(Visualizer));


// [`chartData${i}`]: {
//    labels: ["American Indian or Alaska Native", "Asian",
//       "Hawaiian/ Pacific Islander", "Hispanic",
//       "Black", "White", "Two or more races"],
//       datasets: [{
//          label: category['Category'],
//          data: [
//             category['American Indian or Alaska Native'],
//             category['Asian'],
//             category['Hawaiian/ Pacific Islander'],
//             category['Hispanic'],
//             category['Black'],
//             category['White'],
//             category['Two or more races'],
//          ],
//       }],
// }
