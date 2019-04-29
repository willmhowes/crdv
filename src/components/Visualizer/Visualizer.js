import React from 'react';
import { connect } from 'react-redux';
import { Form, Segment, Header } from 'semantic-ui-react';
import { Component } from 'react';

class Visualizer extends Component {

   state = {

   }

   render() {
      return (
         <section>
            
         </section>
      );
   }
}

const mapStateToProps = reduxState => ({
   reduxState,
});

export default connect(mapStateToProps)(Visualizer);
