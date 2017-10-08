import React, { Component } from 'react';
import {
	View,
	Text,
	NetInfo,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import Home from './Home';
import VideoList from './VideoList';
import { DrawerLayout } from '../partials/commons';
import { changeConnectivity } from '../../actions';

class Main extends Component {

	componentDidMount() {
		NetInfo.addEventListener(
			'change',
			this.handleFirstConnectivityChange.bind(this)
		);
	}

	handleFirstConnectivityChange(isConnected) {
		this.props.changeConnectivity(isConnected);

		NetInfo.isConnected.removeEventListener(
			'change',
			this.handleFirstConnectivityChange
		);
	}

	renderScreen() {
		if (this.props.screen === 'VideoList') {
			return <VideoList {...this.props} />;
		} else {
			return <Home {...this.props} />;
		}
	}

	render() {
		return (
			<DrawerLayout
				{ ...this.props }
			>
				{ this.renderScreen() }
			</DrawerLayout>
		);
	}

}

const mapStateToProps = ({ nav: { screen }, net }) => {
	return {
		screen,
		isConnected: net.isConnected
	}
}

export default connect(mapStateToProps, { changeConnectivity })(Main);