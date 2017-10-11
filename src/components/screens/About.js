import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import { Header } from '../partials/commons';
import styles from '../../styles';
import app from '../../../app.json';

class About extends Component {

	render() {
		const { goBack } = this.props.navigation;
		return (
			<View style={styles.mainContainer}>
				<Header
					title="Tentang Kami"
					iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
					actionLeft={() => goBack()}
				/>
				<View style={styles.content.container.postList}>
					<View style={styles.postDetail.titleWrapper}>
						<Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</Text>
					</View>
					<View style={styles.postDetail.titleWrapper}>
						<Text>App Version: { app.expo.version }</Text>
					</View>
				</View>
			</View>
		);
	}

}

export default About;