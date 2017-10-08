import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Image,
	Platform
} from 'react-native';
import styles from '../../../styles';

class Header extends Component {

	renderComponentLeft() {
		const { iconLeft, actionLeft } = this.props;

		if (iconLeft) {
			if (Platform.OS === 'ios') {
				return (
					<TouchableHighlight
						onPress={actionLeft}
						style={styles.header.touchableIOS}
						underlayColor="#0D47A1"
					>
						<Image
							style={styles.header.actionIcon}
							source={iconLeft}
						/>
					</TouchableHighlight>
				);
			}

			return (
				<TouchableHighlight
					onPress={actionLeft}
					style={styles.header.touchable}
					underlayColor="#0D47A1"
				>
					<Image
						style={styles.header.actionIcon}
						source={iconLeft}
					/>
				</TouchableHighlight>
			);
		}

		return <View />;
	}

	renderComponentRight() {
		const { iconRight, actionRight } = this.props;

		if (iconRight) {
			if (Platform.OS === 'ios') {
				return (
					<TouchableHighlight
						onPress={actionRight}
						style={styles.header.touchableIOS}
						underlayColor="#0D47A1"
					>
						<Image
							style={styles.header.actionIcon}
							source={iconRight}
						/>
					</TouchableHighlight>
				);
			}

			return (
				<TouchableHighlight
					onPress={actionRight}
					style={styles.header.touchable}
					underlayColor="#0D47A1"
				>
					<Image
						style={styles.header.actionIcon}
						source={iconRight}
					/>
				</TouchableHighlight>
			);
		}

		return <View />;
	}

	renderTitle() {
		const { title } = this.props;

		if (title) {
			if (title === 'logo') {
				return (
					<Image
						style={{ height: 15, width: 145 }}
						source={require('../../../../assets/icons/logo.png')}
					/>
				);
			} 

			return <Text style={styles.header.title}>{ title }</Text>;
		}

		return <View />;
	}

	render() {
		const { addStyle } = this.props;

		if (Platform.OS === 'ios') {
			return (
				<View style={[styles.header.containerIOS, addStyle]}>
					<View style={styles.header.actionSectionIOS}>
						{ this.renderComponentLeft() }
					</View>
					<View style={styles.header.titleSection}>
						{ this.renderTitle() }
					</View>
					<View style={styles.header.actionSectionIOS}>
						{ this.renderComponentRight() }
					</View>
				</View>
			);
		}

		return (
			<View style={[styles.header.container, addStyle]}>
				<View style={styles.header.actionSection}>
					{ this.renderComponentLeft() }
				</View>
				<View style={styles.header.titleSection}>
					{ this.renderTitle() }
				</View>
				<View style={styles.header.actionSection}>
					{ this.renderComponentRight() }
				</View>
			</View>
		);
	}

}

export { Header };