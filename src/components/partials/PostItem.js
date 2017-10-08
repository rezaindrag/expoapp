import React from 'react';
import {
	View,
	Text,
	TouchableNativeFeedback,
	TouchableHighlight,
	Image
} from 'react-native';
import styles from '../../styles';

export default (props) => {
	const { item } = props;
	const { navigate } = props.navigation;
	const itemTitle = item.title.rendered.split("|");
	const title = itemTitle[0];
	const thumbnailUrl = itemTitle[1];

	return (
		<View key={i}>
			<TouchableHighlight
				style={{ marginBottom: 10 }}
				onPress={() => navigate('PostDetail', { item })}
				underlayColor="#f4f5f7"
			>
				<View style={styles.postList.postItem}>
					<View style={styles.postList.thumbWrapper}>
						<Image style={styles.postList.thumb} source={{ uri: thumbnailUrl }} />
					</View>
					<View style={styles.postList.titleWrapper}>
						<Text style={styles.postList.title}>{ title }</Text>
					</View>
				</View>
			</TouchableHighlight>
		</View>
	);

}