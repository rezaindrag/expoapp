import React, { Component } from 'react';
import {
	View,
	Text,
	TextInput,
	StatusBar,
	ScrollView,
	TouchableHighlight,
	Image
} from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import HTML from 'react-native-render-html';
import hdate from 'human-date';
import styles from '../../styles';
import { Header } from '../partials/commons';
import { fetchComments } from '../../actions';

class PostQuestions extends Component {

	componentWillMount() {
		this.props.fetchComments();
	}

	hummanDate(date) {
	    const D = date.substr(8, 2);
	    const M = date.substr(5, 2);
	    const Y = date.substr(0, 4);
	    const H = date.substr(11, 2);
	    const Mt = date.substr(14, 2);
	    const S = date.substr(17, 2);

	    const _date = `${Y}/${M}/${D} ${H}:${Mt}:${S}`;

	    return hdate.relativeTime(_date);
	}

	renderComment(item, i) {
		return (
			<View 
				key={i}
				style={styles.postComments.commentSection}
			>
				<Text style={styles.postComments.authorName}>
					{ item.author_name }{ item.author === 0 || <Text style={styles.postComments.adminText}> - admin</Text> }
				</Text>
				<Text style={styles.postComments.authorDate}>{ this.hummanDate(item.date) }</Text>
				<HTML 
					html={item.content.rendered}
					htmlStyles={styles.postComments.comment}
				/>
			</View>
		);
	}

	comments() {
		const { comments } = this.props;
		const { postId } = this.props.navigation.state.params;

		const commentPost = comments.filter(val => {
			return val.post === postId;
		});

		if (commentPost.length === 0) {
			return (
				<View style={styles.searchPost.notFoundWrapper}>
					<Text>Belum ada komentar.</Text>
				</View>
			);
		}

		return _.map(commentPost, this.renderComment.bind(this));
	}

	render() {
		const { goBack } = this.props.navigation;

		return (
			<View style={styles.mainContainer}>
				<StatusBar
					backgroundColor={styles.utilities.statusBarBg}
					barStyle="light-content"
				/>
				<Header
					title='Komentar'
					iconLeft={require('../../../assets/icons/arrow_back_android.png')}
					actionLeft={() => goBack()}
					iconRight={require('../../../assets/icons/add.png')}
					actionRight={() => {}}
				/>
				<ScrollView style={styles.content.container.postComments}>
					{ this.comments() }
				</ScrollView>
			</View>
		);
	}

}

const mapStateToProps = ({ comment }) => {
	return {
		loading: comment.loading,
		comments: comment.data
	}
}

export default connect(mapStateToProps, { fetchComments })(PostQuestions);