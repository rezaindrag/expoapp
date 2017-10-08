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
			<ScrollView style={styles.content.scrollContainer}>
				<Image 
		 			style={{ width: '100%', height: 200 }}
		 			source={{ uri: thumbnailUrl }}
		 		/>
				<View style={styles.postDetail.titleWrapper}>
					<Text style={styles.postDetail.titleText}>{ title }</Text>
				</View>
				<View style={styles.postDetail.content}>
					<HTML 
						html={item.content.rendered}
						htmlStyles={styles.postDetail.htmlStyles}
					/>
				</View>
			</ScrollView>
		);
	}

	renderHeader() {
		const { goBack } = this.props.navigation;

		if (Platform.OS === 'ios') {
			return (
				<Header
					iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
					actionLeft={() => goBack()}
					iconRight={require('../../../assets/icons/ic_share_white_48dp.png')}
					actionRight={() => {}}
				/>
			);
		}

		return (
			<Header
				iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
				actionLeft={() => goBack()}
				iconRight={require('../../../assets/icons/ic_share_white_48dp.png')}
				actionRight={() => {}}
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