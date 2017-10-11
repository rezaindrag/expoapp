import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	TouchableHighlight,
	ListView,
	StatusBar,
	Image,
	WebView,
	ActivityIndicator,
	Platform
} from 'react-native';
import _ from 'lodash';
import HTML from 'react-native-render-html';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { Header } from '../partials/commons';
import styles from '../../styles';
import api from '../../api';

class PostDetail extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}

	componentWillMount() {
		setTimeout(() => {
			this.setState({ loading: false });
		}, 300);
	}

	renderDetailPost() {
		const { item } = this.props.navigation.state.params;
		const itemTitle = item.title.rendered.split("|");
		const title = itemTitle[0];
		const thumbnailUrl = itemTitle[1];

		if (this.state.loading) {
			return (
				<View style={styles.content.container.error}>
					<ActivityIndicator
						size="large"
						color='#1565C0'
					/>
				</View>
			);
		}
		
		return (
			<HeaderImageScrollView
				maxHeight={250}
				minHeight={Platform.OS === 'ios' ? 75 : 78}
				renderHeader={() => (
					<Image source={{ uri: thumbnailUrl }} style={{ width: '100%', height: 250 }} />
				)}
				minOverlayOpacity={0}
				maxOverlayOpacity={1}
				overlayColor="#1565C0"
			>
				<View style={styles.postDetail.titleWrapper}>
					<Text style={styles.postDetail.titleText}>{ title }</Text>
				</View>
				<View style={styles.postDetail.content}>
					<HTML 
						html={item.content.rendered}
						htmlStyles={styles.postDetail.htmlStyles}
					/>
				</View>
			</HeaderImageScrollView>
		);
	}

	renderHeader() {
		const { goBack } = this.props.navigation;

		return (
			<Header
				iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
				actionLeft={() => goBack()}
				addStyle={{ backgroundColor: 'transparent', position: 'absolute', top: 0, zIndex: 10 }}
			/>
		);
	}

	render() {
		return (
			<View style={styles.mainContainer}>
				<StatusBar
					backgroundColor={styles.utilities.statusBarBg}
					barStyle="light-content"
				/>
				{ this.renderHeader() }
				{ this.renderDetailPost() }
			</View>
		);
	}

}

export default PostDetail;