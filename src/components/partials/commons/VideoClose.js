import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	Image,
	Platform
} from 'react-native';
import styles from '../../../styles';

class VideoClose extends Component {

	render() {
		const { goBack } = this.props.navigation;

		if (this.props.orientation === 'PORTRAIT') {
			var top = Platform.OS === 'ios' ? 20 : 24;
		} else {
			var top = 0;
		}

		return (
			<View style={[styles.videoClose.position, { top }]}>
				<TouchableHighlight 
					onPress={() => goBack()}
				>
					<View style={styles.videoClose.buttonWrapper}>
						<Image 
							style={styles.videoClose.buttonIcon}
							source={require('../../../../assets/icons/ic_close_black_24dp.png')}
						/>
					</View>
				</TouchableHighlight>
			</View>
		);
	}

}

export { VideoClose };