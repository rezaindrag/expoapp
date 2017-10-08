import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	ScrollView,
	ToastAndroid,
	Image,
	Platform,
	RefreshControl,
	ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import Toast, { URATION } from 'react-native-easy-toast';
import { 
	fetchVideos,
	refreshVideos,
	checkIsAuthenticated,
	openUpgradeAccountModal
} from '../../actions';
import { SubHeader, Divider } from '../partials/commons';
import styles from '../../styles';
import UpgradeAccount from './UpgradeAccount';
import PaymentConfirmation from './PaymentConfirmation';

class VideoList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			descriptionCollapse: false
		}
	}

	componentWillMount() {
		this.props.fetchVideos();
		this.props.checkIsAuthenticated();
	}

	handleRefresh() {
		this.props.refreshVideos();
	}

	handleRefetch() {
		this.props.fetchVideos();
	}

	handleVideoPlayPressed(item) {
		const itemTitle = item.title.rendered.split("|");
		const statusPreview = itemTitle[3];		

		const { userActive, hasLogin } = this.props;

		if ( ! hasLogin) {
			if (Platform.OS === 'ios') {
				this.refs.toast.show('Silahkan masuk!', 2000);
			} else {
				ToastAndroid.show('Silahkan masuk!', 2000);
			}

			return false;
		} else {
			if (userActive === 0) {
				if (statusPreview === undefined) {
					if (Platform.OS === 'ios') {
						this.refs.toast.show('Video dikunci!', 2000);
					} else {
						ToastAndroid.show('Video dikunci!', 2000);
					}

					return false;
				}
			}
		}

		const { navigate } = this.props.navigation;

		navigate('VideoPlay', { item });
	}

	videoLabel(statusPreview) {
		if (statusPreview === undefined) {
			return (
				<Image
					style={{ height: 20, width: 20 }}
					source={require('../../../assets/icons/icons8-Lock-48.png')}
				/>
			);
		}
		
		return <Text style={styles.videoList.time}>Preview</Text>;
	}

	videoItem(item, i) {
		const itemTitle = item.title.rendered.split("|");
		const title = itemTitle[0];
		const time = itemTitle[1];
		const statusPreview = itemTitle[3];		
						
		if (this.props.userActive === 0) {
			return (
				<TouchableHighlight
					key={i}
					onPress={this.handleVideoPlayPressed.bind(this, item)}
					underlayColor="#f4f5f7"
				>
					<View style={styles.videoList.postItem}>
						<View style={styles.videoList.titleWrapper}>
							<Text style={styles.videoList.title}>{ title }</Text>
						</View>
						<View style={styles.videoList.timeWrapper}>
							{ this.videoLabel(statusPreview) }
						</View>
					</View>
				</TouchableHighlight>
			);
		}

		return (
			<TouchableHighlight
				key={i}
				onPress={this.handleVideoPlayPressed.bind(this, item)}
				underlayColor="#f4f5f7"
			>
				<View style={styles.videoList.postItem}>
					<View style={styles.videoList.titleWrapper}>
						<Text style={styles.videoList.title}>{ title }</Text>
					</View>
					<View style={styles.videoList.timeWrapper}>
						<Text style={styles.videoList.time}>{ time }</Text>
					</View>
				</View>
			</TouchableHighlight>
		);
	}
	
	renderVideo() {
		const { videos, loading, error } = this.props;

		if (loading) {
			return (
				<View style={[styles.postList.containerError, { backgroundColor: '#FFF' }]}>
					<ActivityIndicator
						size="large"
						color='#1565C0'
					/>
				</View>
			);
		}

		if (error !== null) {
			return (
				<View style={[styles.postList.containerError, { backgroundColor: '#FFF' }]}>
					<Text style={[styles.utilities.error.errorText, { marginBottom: 8 }]}>{ error }</Text>
					<TouchableHighlight
						onPress={this.handleRefetch.bind(this)}
					>
						<View style={styles.utilities.error.errorButton}>
							<Text style={styles.utilities.error.errorButtonText}>Coba Lagi</Text>
						</View>
					</TouchableHighlight>
				</View>
			);
		}

		return _.map(videos, this.videoItem.bind(this));
	}

	renderDescription() {
		if (this.state.descriptionCollapse === true) {
			return (
				<TouchableWithoutFeedback
					onPress={() => this.setState({ descriptionCollapse: !this.state.descriptionCollapse })}
				>		
					<View>
						<Text style={styles.videoList.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sequi optio vitae nulla odit perspiciatis praesentium soluta nihil, dolore aperiam, illo. Quos quo molestiae commodi placeat earum doloremque. Quos, dolorum.</Text>
						<Text style={styles.videoList.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sequi optio vitae nulla odit perspiciatis praesentium soluta nihil, dolore aperiam, illo. Quos quo molestiae commodi placeat earum doloremque. Quos, dolorum.</Text>
						<Text style={styles.videoList.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sequi optio vitae nulla odit perspiciatis praesentium soluta nihil, dolore aperiam, illo. Quos quo molestiae commodi placeat earum doloremque. Quos, dolorum. [Tutup]</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		}

		return (
			<TouchableWithoutFeedback
				onPress={() => this.setState({ descriptionCollapse: !this.state.descriptionCollapse })}
			>
				<View>
					<Text style={styles.videoList.description}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis sequi optio vitae [Selengkapnya]</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View style={{ flex: 1 }}>
				<ScrollView
					style={styles.content.scrollContainer}
					refreshControl={
						<RefreshControl
							refreshing={this.props.refreshing}
							onRefresh={this.handleRefresh.bind(this)}
							colors={['#1565C0']}
							tintColor="#1565C0"
						/>
			        }
				>
					<View style={styles.content.container.videoList}>
						<View style={styles.videoList.introduceContainer}>
							<Text style={styles.videoList.mainTitle}>Complete Python Bootcamp: Go from zero to hero in Python</Text>
							<TouchableWithoutFeedback
								onPress={() => {}}
							>
								<View style={{ flex: 1 }}>
									<View style={{ position: 'absolute', top: 0, left: 0, zIndex: 10, justifyContent: 'center', alignItems: 'center', width: '100%', height: 150 }}>
										<View style={{ backgroundColor: 'rgba(000,000,000,0.8)', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 40, paddingLeft: 5, paddingRight: 5, borderRadius: 4 }}>
											<Image 
												style={{ width: 30, height: 30, marginRight: 3 }}
												source={require('../../../assets/icons/ic_play_circle_filled_white_48dp.png')}
											/>
											<Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>Preview</Text>
										</View>
									</View>
									<Image
										style={styles.videoList.videoPreview}
										source={require('../../../assets/images/video_preview.png')}
									/>
								</View>
							</TouchableWithoutFeedback>
							<TouchableHighlight
								style={styles.videoList.buttonBuyNow}
								onPress={() => this.props.openUpgradeAccountModal()}
								underlayColor="#459648"
							>
								<View>
									<Text style={styles.videoList.buttonBuyNowText}>Beli Sekarang</Text>
								</View>
							</TouchableHighlight>
							{ this.renderDescription() }
						</View>
						<View style={[styles.videoList.introduceContainer, { backgroundColor: '#DDD' }]}>
							<Text style={[styles.videoList.mainTitle, { fontSize: 16, fontWeight: 'bold', marginBottom: 0 }]}>Daftar Materi</Text>
						</View>
						{ this.renderVideo() }
					</View>
				</ScrollView>
				<UpgradeAccount {...this.props} />
				<Toast 
					ref="toast"
					position='bottom'
                    positionValue={200}
                    opacity={0.8}
				/>
			</View>
		);
	}

}

const mapStateToProps = ({ video, user, auth, net }) => {
	return {
		videos: video.data,
		userActive: user.active,
		//userActive: 1,
		hasLogin: auth.hasLogin,
		upgradeAccountModal: user.upgradeAccountModal,
		error: video.error,
		loading: video.loading,
		refreshing: video.refreshing
	}

}

export default connect(mapStateToProps, { 
	fetchVideos, 
	refreshVideos,
	checkIsAuthenticated,
	openUpgradeAccountModal
})(VideoList);