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

const moment = require('moment');
const request = require('superagent');

const App = React.createClass({
    getInitialState() {
        return {
            measurements: [],
            intervalId: 0
        }
    },

    _clearMeasurements() {
        this.setState({
            measurements: []
        })
    },

    _getMeasurement() {
        request
            .get(`http://localhost:7070/api/plane`)
            .end((err, res) => {
                if(!res.ok) {
                    console.log(err);
                    return;
                }

                var measurement = res.body;
                measurement.timestamp = Date.now();

                this.setState({
                    measurements: this.state.measurements.concat([measurement])
                });
            });
    },

    _getMeasurementsConstantly() {
        this.setState({
            intervalId: setInterval(this._getMeasurement, 1000)
        });
    },

    _stopGetingMeasurementsConstantly() {
        clearInterval(this.state.intervalId)

        this.setState({
            intervalId: 0
        });
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
                                            <td>Timestamp</td>
                                            <td>Latitude [deg]</td>
                                            <td>Longitude [deg]</td>
                                            <td>Altitude [m]</td>
                                            <td>True Air Speed [kn]</td>
                                            <td>Indicated Air Speed [kn]</td>
                                            <td>Vertical Speed [m/s]</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.measurements.map(measurement => 
                                            <tr key={measurement.timestamp}>
                                                <td>
                                                    {moment(measurement.timestamp).format("DD-MM-YYYY HH:mm:ss")}
                                                </td>
                                                <td>
                                                    {measurement.position.latitude}
                                                </td>
                                                 <td>
                                                    {measurement.position.altitude}
                                                </td>
                                                <td>
                                                    {measurement.position.longitude}
                                                </td>
                                                <td>
                                                    {measurement.speed.trueAirSpeed}
                                                </td>
                                                <td>
                                                    {measurement.speed.indicatedAirSpeed}
                                                </td>
                                                <td>
                                                    {measurement.speed.verticalSpeed}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <div className="pull-left">
                                    <Button bsStyle="danger" onClick={this._clearMeasurements} style={{marginRight: 5}}><Glyphicon glyph="trash" /> Clear Measurements</Button>
                                </div>
                                <div className="pull-right">
                                    <Button bsStyle="success" onClick={this._getMeasurement} style={{marginRight: 20}}><Glyphicon glyph="download" /> Get Once</Button>
                                    <Button bsStyle="success" onClick={this._getMeasurementsConstantly} disabled={this.state.intervalId !== 0} style={{marginRight: 5}}><Glyphicon glyph="repeat" /> Get Constantly</Button>
                                    <Button bsStyle="danger" onClick={this._stopGetingMeasurementsConstantly} disabled={this.state.intervalId === 0} style={{marginRight: 5}}><Glyphicon glyph="stop" /> Stop</Button>
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
