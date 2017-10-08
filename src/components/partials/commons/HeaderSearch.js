import React, { Component } from 'react';
import {
	View,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	Platform
} from 'react-native';
import styles from '../../../styles';

class HeaderSearch extends Component {
	render() {
		const { goBack } = this.props.navigation;
		const { handleSearch } = this.props;

		if (Platform.OS === 'ios') {
			return (
				<View style={styles.searchPost.headerContainerIOS}>
					<View style={styles.header.actionSection}>
						<TouchableWithoutFeedback
							onPress={() => goBack()}
							style={styles.header.touchable}
						>
							<View>
								<Image 
									style={styles.header.actionIcon}
									source={require('../../../../assets/icons/ic_arrow_back_black_48dp.png')}
								/>
							</View>
						</TouchableWithoutFeedback>
					</View>
					<View style={styles.searchPost.inputSearchWrapper}>
						<TextInput 
							style={styles.searchPost.inputSearch}
							placeholder='Cari Artikel...'
							onChangeText={handleSearch}
							autoFocus={true}
							underlineColorAndroid='transparent'
							ref='inputSearch'
						/>
					</View>
				</View>
			);
		}

		return (
			<View style={styles.searchPost.headerContainer}>
				<View style={styles.header.actionSection}>
					<TouchableHighlight
						onPress={() => goBack()}
						underlayColor="#DDD"
						style={styles.header.touchable}
					>
						<View>
							<Image 
								style={styles.header.actionIcon}
								source={require('../../../../assets/icons/arrow_back_android_black.png')}
							/>
						</View>
					</TouchableHighlight>
				</View>
				<View style={styles.searchPost.inputSearchWrapper}>
					<TextInput 
						style={styles.searchPost.inputSearch}
						placeholder='Cari Artikel...'
						onChangeText={handleSearch}
						autoFocus={true}
						underlineColorAndroid='transparent'
						ref='inputSearch'
					/>
				</View>
			</View>
		);

	}
}

export { HeaderSearch };