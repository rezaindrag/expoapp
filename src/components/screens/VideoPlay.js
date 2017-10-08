import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	ScrollView,
	StatusBar,
	Button,
	Image,
	Slider,
	ActivityIndicator,
	Dimensions,
	Platform
} from 'react-native';
import { Video, ScreenOrientation } from 'expo';
import _ from 'lodash';
import HTML from 'react-native-render-html';
import { VideoClose } from '../partials/commons';
import styles from '../../styles';
import api from '../../api';

const SERVER_REQUEST = 'http://renrasedoya.com/videos/';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class VideoPlay extends Component {

	state = {
		orientation: 'PORTRAIT',
		play: true,
		duration: 0,
		playableDuration: 0, 
		currentTime: 0,
		buffer: true,
		volume: 1,
		muted: false,
		showControl: true,
		videoHeight: 200
	}

	componentWillUnmount() {
		ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
	}

	handleLockToLandscape() {
		this.setState({ orientation: 'LANDSCAPE' });
		ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.LANDSCAPE);
	}

	handleLockToPortrait() {
		this.setState({ orientation: 'PORTRAIT' });
		ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT);
	}

	renderPausedPlayButton() {
		if ( ! this.state.play) {
			return (
				<TouchableWithoutFeedback
					onPress={() => this.setState({ play: !this.state.play })}
				>
					<View style={styles.videoClose.buttonWrapper}>
						<Image 
							style={{ width: 22, height: 22 }}
							source={require('../../../assets/icons/ic_play_arrow_black_24dp.png')}
						/>
					</View>
				</TouchableWithoutFeedback>
			);
		}

		return (
			<TouchableWithoutFeedback
				onPress={() => this.setState({ play: !this.state.play })}
			>
				<View style={styles.videoClose.buttonWrapper}>
					<Image 
						style={{ width: 22, height: 22 }}
						source={require('../../../assets/icons/ic_pause_black_24dp.png')}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	renderFullscreenButton() {
		if (this.state.orientation === 'PORTRAIT') {
			return (
				<TouchableWithoutFeedback 
					onPress={this.handleLockToLandscape.bind(this)}
				>
					<View style={styles.videoClose.buttonWrapper}>
						<Image 
							style={{ width: 22, height: 22 }}
							source={require('../../../assets/icons/ic_fullscreen_black_24dp.png')}
						/>
					</View>
				</TouchableWithoutFeedback>
			);
		}
		
		// landscape
		return (
			<TouchableWithoutFeedback 
				onPress={this.handleLockToPortrait.bind(this)}
			>
				<View style={styles.videoClose.buttonWrapper}>
					<Image 
						style={{ width: 22, height: 22 }}
						source={require('../../../assets/icons/ic_fullscreen_exit_black_24dp.png')}
					/>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	/*renderVolumeButton() {
		if (this.state.muted) {
			return (
				<TouchableWithoutFeedback 
					onPress={() => this.setState({ muted: !this.state.muted }) }
				>
					<View>
						<Image 
							style={{ width: 22, height: 22 }}
							source={require('../../../assets/icons/ic_volume_mute_black_24dp.png')}
						/>
					</View>
				</TouchableWithoutFeedback>
			);
		}

		if (this.state.volume > 0.5) {
			return (
				<TouchableWithoutFeedback 
					onPress={() => this.setState({ muted: !this.state.muted }) }
				>
					<View>
						<Image 
							style={{ width: 22, height: 22 }}
							source={require('../../../assets/icons/ic_volume_up_black_24dp.png')}
						/>
					</View>
				</TouchableWithoutFeedback>
			);
		} else {
			if (this.state.volume === 0) {
				return (
					<TouchableWithoutFeedback 
						onPress={() => this.setState({ muted: !this.state.muted }) }
					>
						<View>
							<Image 
								style={{ width: 22, height: 22 }}
								source={require('../../../assets/icons/ic_volume_mute_black_24dp.png')}
							/>
						</View>
					</TouchableWithoutFeedback>
				);
			}

			return (
				<TouchableWithoutFeedback 
					onPress={() => this.setState({ muted: !this.state.muted }) }
				>
					<View>
						<Image 
							style={{ width: 22, height: 22 }}
							source={require('../../../assets/icons/ic_volume_down_black_24dp.png')}
						/>
					</View>
				</TouchableWithoutFeedback>
			);
		}
	}*/

	renderVideo() {
		const { title } = this.props.navigation.state.params.item;
		const itemTitle = title.rendered.split("|");
		const VIDEO_SOURCE = itemTitle[2];

		if (this.state.orientation === 'PORTRAIT') {
			return (
				<Video 
					source={{ uri: SERVER_REQUEST+VIDEO_SOURCE }}
					ref={(ref) => {
						this.player = ref
					}}   
					rate={1}
					volume={this.state.muted ? 0 : this.state.volume}
					isMuted={false}
					shouldPlay={this.state.play}
					resizeMode="cover"
					isLooping={true}
					onLoad={(vPlayer) => {
						this.setState({ buffer: false });
						this.setState({ duration: vPlayer.durationMillis })
					}}
					onPlaybackStatusUpdate={(vPlayer) => {
						this.setState({ duration: vPlayer.durationMillis });
						this.setState({ currentTime: vPlayer.positionMillis });
					}}
					onReadyForDisplay={(vPlayer) => {
						this.setState({ 
							videoHeight: ((SCREEN_WIDTH/vPlayer.naturalSize.width)*vPlayer.naturalSize.height)
						});
					}}
					onLoadStart={(vPlayer) => {}}
					onError={() => {}}
					style={{ alignSelf: 'stretch', height: this.state.videoHeight, width: '100%' }}
				/>
			);
		}

		// landscape
		return (
			<Video 
				source={{ uri: SERVER_REQUEST+VIDEO_SOURCE }}
				ref={(ref) => {
					this.player = ref
				}}   
				rate={1}
				volume={this.state.muted ? 0 : this.state.volume}
				isMuted={false}
				shouldPlay={this.state.play}
				resizeMode="cover"
				isLooping={true}
				onLoad={(vPlayer) => {
					this.setState({ buffer: false });
					this.setState({ duration: vPlayer.durationMillis })
				}}
				onPlaybackStatusUpdate={(vPlayer) => {
					this.setState({ duration: vPlayer.durationMillis });
					this.setState({ currentTime: vPlayer.positionMillis });
				}}
				onReadyForDisplay={(vPlayer) => {
					this.setState({ 
						videoHeight: ((SCREEN_WIDTH/vPlayer.naturalSize.width)*vPlayer.naturalSize.height)
					});
				}}
				onLoadStart={(vPlayer) => {}}
				onError={() => {}}
				style={{ alignSelf: 'stretch', height: '100%', width: '100%' }}
			/>
		);
	}

	renderBuffer() {
		if (this.state.buffer) {
			return (
				<ActivityIndicator
					animated={true}
					color="#FFF"
					size="large"
					style={{ position: 'absolute', top: '43%', left: '43%' }}
				/>
			);
		}

		return null;
	}

	renderTopControl() {
		const { goBack } = this.props.navigation;

		if (this.state.showControl) {
			return (
				<VideoClose {...this.props} orientation={this.state.orientation} />
			);
		}

		return null;
	}

	renderBottomControl() {
		const { navigate, goBack } = this.props.navigation;

		if (this.state.showControl) {
			return (
				<View style={{ alignItems: 'center', backgroundColor: '#FFF', position: 'absolute', bottom: 0, height: 50, width: '100%', flex: 1, flexDirection: 'row' }}>
					<View style={{ width: 50, alignItems: 'center', zIndex: 10 }}>
						{ this.renderPausedPlayButton() }
					</View>
					<View style={{ width: 100, alignItems: 'center' }}>
						<Text style={{ color: '#242729' }}>{ api.stringToTimeFormat(this.state.currentTime)+'/'+api.stringToTimeFormat(this.state.duration) }</Text>
					</View>
					<View style={{ flex: 1, alignItems: 'center' }}>
						<Slider
							style={{ width: '100%' }}
							maximumValue={this.state.duration}
							minimumValue={0}
							value={this.state.currentTime}
							onValueChange={(currentTime) => { this.player.setPositionAsync(currentTime) }}
						/>
					</View>
					<View style={{ width: 50, alignItems: 'center' }}>		
						{ this.renderFullscreenButton() }
					</View>
				</View>
			);
		}

		return null;
	}

	render() {
		const { item } = this.props.navigation.state.params;

		const titleItem = item.title.rendered.split("|");
		const title = titleItem[0];
		const videoId = titleItem[2];

		return (
			<View style={styles.mainContainer}>
				<StatusBar
					backgroundColor="black"
					barStyle="light-content"
				/>
				<View style={{ flex: 1 }}>
					{ this.renderTopControl() }
					<TouchableWithoutFeedback 
						onPress={() => this.setState({ showControl: !this.state.showControl })}
					>
						<View style={[styles.videoPlay.videoWrapper, {backgroundColor:'black'}]}>
							{ this.renderBuffer() }
							{ this.renderVideo() }
						</View>
					</TouchableWithoutFeedback>
					{ this.renderBottomControl() }
				</View>
			</View>
		);
	}

}

export default VideoPlay;