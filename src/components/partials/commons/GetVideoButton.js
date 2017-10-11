import React, { Component } from 'react';
import {
	TouchableWithoutFeedback,
	View,
	Text,
	Image
} from 'react-native';

class GetVideoButton extends Component {

	handleGetVideoButton(screenName) {
		const { navigate } = this.props.navigation;

		navigate('VideoListPreview');
	}

	render() {
		return (
			<TouchableWithoutFeedback
				onPress={this.handleGetVideoButton.bind(this, 'VideoList')}
			>
				<View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 0, backgroundColor: 'transparent', height: 50, justifyContent: 'center', alignItems: 'center' }}>
					<View style={{ flexDirection: 'row', backgroundColor: '#D84315', paddingTop: 5, paddingBottom: 5, paddingLeft: 12, paddingRight: 12, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={{ color: '#FFF', fontSize: 16 }}>Get Premium Video</Text>
						<Image 
							style={{ width: 16, height: 16 }}
							source={require('../../../../assets/icons/ic_keyboard_arrow_right_white_48dp.png')} 
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>		
		);
	}
}

export { GetVideoButton };
