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
	ViewPagerAndroid 
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Header, SubHeader, Divider } from '../partials/commons';
import styles from '../../styles';
import { 
	checkIsAuthenticated, 
	openUpgradeAccountModal
} from '../../actions';
import UpgradeAccount from './UpgradeAccount';
import PaymentConfirmation from './PaymentConfirmation';

class Profile extends Component {

	componentWillMount() {
		this.props.checkIsAuthenticated();
	}

	render() {
		const { goBack, navigate } = this.props.navigation;	

		return (
			<View style={styles.mainContainer}>
				<StatusBar
					backgroundColor={styles.utilities.statusBarBg}
					barStyle="light-content"
				/>
				<Header
					title="Profile"
					iconLeft={require('../../../assets/icons/ic_arrow_back_white_48dp.png')}
					actionLeft={() => goBack()}
				/>
				<ScrollView style={styles.profile.scrollContainer}>
					<View style={styles.profile.sectionImageProfile}>
						<View style={styles.profile.imageProfileWrapper}>
							<Image 
								style={styles.profile.imageProfile}
								source={require('../../../assets/icons/user.png')}
							/>
						</View>
					</View>
					<View style={styles.profile.section}>
						<Text style={styles.profile.textLabel}>Nama: </Text>
						<Text style={styles.profile.textValue}>{ this.props.fullName }</Text>
					</View>
					<View style={styles.profile.section}>
						<Text style={styles.profile.textLabel}>Email/ID: </Text>
						<Text style={styles.profile.textValue}>{ this.props.email }</Text>
					</View>
				</ScrollView>
				<UpgradeAccount {...this.props} />
				<PaymentConfirmation {...this.props} />
			</View>
		);
	}

}

const mapStateToProps = ({ auth: { hasLogin, userId }, user: { fullName, email, active } }) => {
	return {
		hasLogin,
		userId,
		fullName,
		email,
		active
	}
}

export default connect(mapStateToProps, { 
	checkIsAuthenticated, 
	openUpgradeAccountModal 
})(Profile);