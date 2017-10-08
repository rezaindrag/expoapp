import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	RefreshControl,
	ActivityIndicator,
	TouchableHighlight,
	TouchableNativeFeedback,
	Button,
	NetInfo,
	Image
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import styles from '../../styles';
import { fetchPost, refreshPost } from '../../actions';
import CategoryItem from '../partials/CategoryItem';
import PostItem from '../partials/PostItem';

class Home extends Component {

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
		return <PostItem key={i} { ...this.props } item={item} i={i}  />
	}

	renderPostList() {
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
					{ _.map(dataPost, this.renderPost.bind(this)) }
				</View>
			</ScrollView>
		);
	}

	render() {
		const { goBack, navigate } = this.props.navigation;

		return (
			<View style={styles.mainContainer}>
				{ this.renderPostList() }
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
		//error: ['some error message']
	}
}

export default connect(mapStateToProps, { 
	fetchPost,
	refreshPost
})(Home);