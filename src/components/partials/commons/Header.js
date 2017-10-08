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
					<TouchableWithoutFeedback
						onPress={actionLeft}
						style={styles.header.touchableIOS}
					>
						<Image
							style={styles.header.actionIcon}
							source={iconLeft}
						/>
					</TouchableWithoutFeedback>
				);
			}

			return (
				<TouchableWithoutFeedback
					onPress={actionLeft}
					style={styles.header.touchable}
				>
					<Image
						style={styles.header.actionIcon}
						source={iconLeft}
					/>
				</TouchableWithoutFeedback>
			);
		}

		return <View />;
	}

	renderComponentRight() {
		const { iconRight, actionRight } = this.props;

		if (iconRight) {
			if (Platform.OS === 'ios') {
				return (
					<TouchableWithoutFeedback
						onPress={actionRight}
						style={styles.header.touchableIOS}
					>
						<Image
							style={styles.header.actionIcon}
							source={iconRight}
						/>
					</TouchableWithoutFeedback>
				);
			}

			return (
				<TouchableWithoutFeedback
					onPress={actionRight}
					style={styles.header.touchable}
				>
					<Image
						style={styles.header.actionIcon}
						source={iconRight}
					/>
				</TouchableWithoutFeedback>
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