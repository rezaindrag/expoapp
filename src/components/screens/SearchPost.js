import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StatusBar,
	ScrollView,
	TouchableNativeFeedback,
	TouchableHighlight,
	Image,
	Platform
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import styles from '../../styles';
import { Header, HeaderSearch } from '../partials/commons';
import { fetchPost } from '../../actions';
import PostItem from '../partials/PostItem';

class SearchPost extends Component {

	state = {
		dataPost: []
	}

	componentWillMount() {
		this.props.fetchPost();

		const { dataPost } = this.props;

		this.setState({ dataPost });
	}

	handleSearch(text) {
		const { dataPost } = this.props;

		if (text.length == 0) {
			this.setState({ dataPost });
			return false;
		}

		// filter post by keyword
		const dataPostFilter = [];
		for (var i = 0; i < dataPost.length; i++) {
			const indexResult = dataPost[i].title.rendered.toLowerCase().indexOf(text.toLowerCase());
			if (indexResult != -1) {
				dataPostFilter.push(dataPost[i]);
			}
		}

		this.setState({ dataPost: dataPostFilter });
	}

	handleClearInput() {
		this.refs['inputSearch'].clear();

		const { dataPost } = this.props;

		this.setState({ dataPost });
	}

	renderPost(item, i) {
		return <PostItem key={i} { ...this.props } item={item} i={i}  />
	}

	renderPostList() {
		const { dataPost } = this.state;

		if (dataPost.length === 0) {
			return (
				<View style={styles.searchPost.notFoundWrapper}>
					<Text>Artikel tidak ditemukan</Text>
				</View>
			);
		}

		return _.map(dataPost, this.renderPost.bind(this));
	}

	renderStatusBar() {
		if (Platform.OS === 'ios') {
			return (
				<StatusBar
					backgroundColor={styles.utilities.statusBarBg}
					barStyle="dark-content"
				/>
			);
		}

		return (
			<StatusBar
				backgroundColor={styles.utilities.statusBarBg}
				barStyle="light-content"
			/>
		);
	}

	render() {
		const { goBack, navigate } = this.props.navigation;

		return (
			<View style={styles.mainContainer}>
				{ this.renderStatusBar() }
				<HeaderSearch 
					{ ...this.props } 
					handleSearch={this.handleSearch.bind(this)}
				/>
				<View style={styles.content.container.searchPost}>
					<ScrollView style={styles.postList.scrollContainer}>
						<View style={styles.postList.container}>
							{ this.renderPostList() }
						</View>
					</ScrollView>
				</View>
			</View>
		);
	}

}

const mapStateToProps = ({ post }) => {
	return {
		loading: post.loading,
		dataPost: post.data
	}
}

export default connect(mapStateToProps, { fetchPost })(SearchPost);