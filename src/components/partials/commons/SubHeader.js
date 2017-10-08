import React, { Component } from 'react';
import {
	View,
	Text
} from 'react-native';
import styles from '../../../styles';

class SubHeader extends Component {
	render() {
		const { title } = this.props;
		return (
			<View style={styles.subheader.container}>
				<Text style={styles.subheader.text}>{ title }</Text>
			</View>
		);
	}
}

export { SubHeader };