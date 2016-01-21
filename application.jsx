import React from 'react';
import { Button, Col, Glyphicon, Grid, Navbar, NavbarBrand, Panel, Row, Table } from 'react-bootstrap';

import moment from 'moment';
import request from 'superagent';

const fsxApiUrl = 'http://localhost:7070';

const Application = React.createClass({
    getInitialState () {
        return {
            measurements: [],
            intervalId: 0
        };
    },

    getMeasurement () {
        request
            .get(`${fsxApiUrl}/api/plane`)
            .end((err, res) => {
                if (!res) {
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

    handleClearMeasurementsButton () {
        this.setState({
            measurements: []
        });
    },

    handleGetOnceButton () {
        this.getMeasurement();
    },

    handleGetConstantlyButton () {
        this.setState({
            intervalId: setInterval(this.getMeasurement, 1000)
        });
    },

    handleStopButton () {
        clearInterval(this.state.intervalId);

        this.setState({
            intervalId: 0
        });
    },

    render () {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>{'Projekt SL'}</NavbarBrand>
                </Navbar>
                <Grid>
                    <Row>
                        <Col>
                            <Panel header={<span><Glyphicon glyph="list" />{' Measurements'}</span>}>
                                <Table hover striped>
                                    <thead>
                                        <tr>
                                            <td>{'Timestamp'}</td>
                                            <td>{'Latitude [deg]'}</td>
                                            <td>{'Longitude [deg]'}</td>
                                            <td>{'Altitude [m]'}</td>
                                            <td>{'True Air Speed [kn]'}</td>
                                            <td>{'Indicated Air Speed [kn]'}</td>
                                            <td>{'Vertical Speed [m/s]'}</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.measurements.map(measurement =>
                                            <tr key={measurement.timestamp}>
                                                <td>
                                                    {moment(measurement.timestamp).format('DD-MM-YYYY HH:mm:ss')}
                                                </td>
                                                <td>
                                                    {measurement.position.latitude.toFixed(4)}
                                                </td>
                                                <td>
                                                    {measurement.position.longitude.toFixed(4)}
                                                </td>
                                                <td>
                                                    {measurement.position.altitude.toFixed(2)}
                                                </td>
                                                <td>
                                                    {measurement.speed.trueAirSpeed.toFixed(2)}
                                                </td>
                                                <td>
                                                    {measurement.speed.indicatedAirSpeed.toFixed(2)}
                                                </td>
                                                <td>
                                                    {measurement.speed.verticalSpeed.toFixed(2)}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                                <div className="pull-left">
                                    <Button
                                        bsStyle="danger"
                                        onClick={this.handleClearMeasurementsButton}
                                        style={{marginRight: 5}}
                                    >
                                        <Glyphicon glyph="trash" />{' Clear Measurements'}
                                    </Button>
                                </div>
                                <div className="pull-right">
                                    <Button
                                        bsStyle="success"
                                        onClick={this.handleGetOnceButton}
                                        style={{marginRight: 20}}
                                    >
                                        <Glyphicon glyph="download" />{' Get Once'}
                                    </Button>
                                    <Button
                                        bsStyle="success"
                                        disabled={this.state.intervalId !== 0}
                                        onClick={this.handleGetConstantlyButton}
                                        style={{marginRight: 5}}
                                    >
                                        <Glyphicon glyph="repeat" />{' Get Constantly'}
                                    </Button>
                                    <Button
                                        bsStyle="danger"
                                        disabled={this.state.intervalId === 0}
                                        onClick={this.handleStopButton}
                                        style={{marginRight: 5}}
                                    >
                                        <Glyphicon glyph="stop" />{' Stop'}
                                    </Button>
                                </div>
                            </Panel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

export default Application;
