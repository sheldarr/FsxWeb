var React = require('react');
var ReactDOM = require('react-dom');

var Button = require('react-bootstrap').Button;
var Col = require('react-bootstrap').Col;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Grid = require('react-bootstrap').Grid;
var Nav = require('react-bootstrap').Nav;
var Navbar = require('react-bootstrap').Navbar;
var NavBrand = require('react-bootstrap').NavBrand;
var NavItem = require('react-bootstrap').NavItem;
var Row = require('react-bootstrap').Row;
var Table = require('react-bootstrap').Table;

const App = React.createClass({
    getInitialState() {
        return {
            measurements: []
        }
    },

    render() {
        return (
            <div>
                <Navbar>
                    <NavBrand>Projekt SL</NavBrand>
                </Navbar>
                <Grid>
                    <Row>
                        <Col>
                            Test
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);
