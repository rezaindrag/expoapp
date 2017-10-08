import React, { Component } from 'react';
import {
	TouchableNativeFeedback,
	View,
	Image,
	Text
} from 'react-native';
import styles from '../../styles';

class CategoryItem extends Component {
	render() {
		const { navigate } = this.props.navigation;
		const { name, id, description } = this.props;

		return (
			<TouchableNativeFeedback
				onPress={() => navigate('PostList', { categoryName: name, categoryId: id })}
			>
				<View style={styles.content.categorySection}>
					<Image 
						style={styles.content.imageCategory}
						source={{ uri: description }}
					/>
					<Text style={styles.content.titleCategory}>{ name }</Text>
				</View>
			</TouchableNativeFeedback>
		);
	}
}

export default CategoryItem;