import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	ListView,
	StatusBar,
	Image,
	ActivityIndicator,
	RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header, GetVideoButton } from '../partials/commons';
import styles from '../../styles';
import { 
	fetchPost, 
	refreshPost 
} from '../../actions';
import PostItem from '../partials/PostItem';

class PostList extends Component {

	componentWillMount() {
		this.props.fetchPost();
	}

	handleRefresh() {
		this.props.refreshPost();
	}

	handleRefetch() {
		this.props.fetchPost();
	}

	renderPost(item, i) {
		return <PostItem key={i} { ...this.props } item={item} i={i} />
	}

	renderPostList() {
		const { categoryId } = this.props.navigation.state.params;
		const { dataPost, error, loading } = this.props;

		if (loading) {
			return (
				<View style={styles.postList.containerError}>
					<ActivityIndicator
						size="large"
						color='#1565C0'
					/>
				</View>
			);
		}

		if (error !== null) {
			return (
				<View style={styles.postList.containerError}>
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

		const _dataPost = [];
		for (var i = 0; i < dataPost.length; i++) {
			const indexResult = dataPost[i].categories.findIndex(cId => { return cId === categoryId });
			if (indexResult != -1) {
				_dataPost.push(dataPost[i]);
			}
		}

		return (
			<ScrollView 
				style={styles.postList.scrollContainer}
				refreshControl={
					<RefreshControl
						refreshing={this.props.refreshing}
						onRefresh={this.handleRefresh.bind(this)}
						colors={['#1565C0']}
						tintColor="#1565C0"
					/>
		        }
			>
				<View style={styles.postList.container}>
					{ _.map(_dataPost, this.renderPost.bind(this)) }
				</View>
			</ScrollView>
		);
	}

	render() {
		const { goBack, navigate } = this.props.navigation;
		const { categoryName } = this.props.navigation.state.params;		

		return (
			<View style={styles.mainContainer}>
				<StatusBar
					backgroundColor={styles.utilities.statusBarBg}
					barStyle="light-content"
				/>
				<Header
					title={categoryName}
					iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
					actionLeft={() => goBack()}
					iconRight={require('../../../assets/icons/search.png')}
					actionRight={() => navigate('SearchPost')}
				/>
				{ this.renderPostList() }
				<GetVideoButton {...this.props} />
			</View>
		);
	}

}

const mapStateToProps = ({ post }) => {
	return {
		refreshing: post.refreshing,
		loading: post.loading,
		dataPost: post.data,
		error: post.error
	}
}

export default connect(mapStateToProps, { 
	fetchPost, 
	refreshPost 
})(PostList);