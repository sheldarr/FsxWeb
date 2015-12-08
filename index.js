const React = require('react');
const ReactDOM = require('react-dom');

const Button = require('react-bootstrap').Button;
const Col = require('react-bootstrap').Col;
const Glyphicon = require('react-bootstrap').Glyphicon;
const Grid = require('react-bootstrap').Grid;
const Nav = require('react-bootstrap').Nav;
const Navbar = require('react-bootstrap').Navbar;
const NavbarBrand = require('react-bootstrap').NavbarBrand;
const Panel = require('react-bootstrap').Panel
const Row = require('react-bootstrap').Row;
const Table = require('react-bootstrap').Table;

const App = React.createClass({
    getInitialState() {
        return {
            measurements: [],
            getConstantly: false
        }
    },

    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>Projekt SL</NavbarBrand>
                </Navbar>
                <Grid>
                    <Row>
                        <Col>
                            <Panel header={<span><Glyphicon glyph="list" /> Measurements</span>}>
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <td>DateTime</td>
                                            <td>Latitude</td>
                                            <td>Longitude</td>
                                            <td>True Air Speed [kn]</td>
                                            <td>Indicated Air Speed [kn]</td>
                                            <td>Vertical Speed [m/s]</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.measurements.map(measurement => 
                                            <tr key={measurement.id}>
                                                <td>
                                                    {measurement.position.latitude}
                                                </td>
                                                <td>
                                                    {measurement.position.longitude}
                                                </td>
                                                <td>
                                                    {measurement.speed.trueAirSpeed}
                                                </td>
                                                <td>
                                                    {measurement.speed.indicatedSpeed}
                                                </td>
                                                <td>
                                                    {measurement.speed.verticalSpeed}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <div className="pull-right">
                                    <Button bsStyle="success" style={{marginRight: 20}}><Glyphicon glyph="download" /> Get Once</Button>
                                    <Button bsStyle="success" disabled={this.state.getConstantly} style={{marginRight: 5}}><Glyphicon glyph="repeat" /> Get Constaintly</Button>
                                    <Button bsStyle="danger" disabled={!this.state.getConstantly} style={{marginRight: 5}}><Glyphicon glyph="stop" /> Stop</Button>
                                </div>
                            </Panel>
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
