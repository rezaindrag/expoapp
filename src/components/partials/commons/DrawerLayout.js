import React, { Component } from 'react';
import {
	View,
	Text,
	Image,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	DrawerLayoutAndroid,
	StatusBar,
	Alert,
	ScrollView,
	Platform,
	Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';
import SideMenu from 'react-native-side-menu';
import styles from '../../../styles';
import api from '../../../api';
import { Header, SubHeader } from './';
import { 
	fetchCategory,
	openAuthLoginModal,
	openAuthRegisterModal,
	checkIsAuthenticated,
	doLogout,
	changeScreen,
	showForm
} from '../../../actions';
import AuthLogin from '../../screens/AuthLogin';
import { Divider } from './';

const SCREEN_WIDTH = Dimensions.get('window').width;

class DrawerAndroid extends Component {

	state = {
		isOpen: false
	}

	componentWillMount() {
		this.props.checkIsAuthenticated();
		this.props.fetchCategory();
	}

	handleLoginPressed() {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}
		
		this.props.openAuthLoginModal();
		this.props.showForm('login');
	}

	handleRegisterPressed() {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}

		this.props.openAuthLoginModal();
		this.props.showForm('register');
	}

	handleLogoutPressed() {
		Alert.alert(
			'Logout',
			'Apakah anda ingin keluar?',
			[
				{text: 'Cancel', onPress: () => {}, style: 'cancel'},
				{text: 'OK', onPress: () => this.continueToLogout()},
			],
			{ cancelable: false }
		);
	}

	handleCategoryItemPressed(name, id) {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}

		const { navigate } = this.props.navigation;
		navigate('PostList', { categoryName: name, categoryId: id });
	}

	handleNavigate(screenName) {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}

		const { navigate } = this.props.navigation;
		navigate(screenName);
	}

	continueToLogout() {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}

		this.props.doLogout();
	}

	handleMenuItemPressed(screenName) {
		if (Platform.OS === 'ios') {
			this.setState({ isOpen: false });
		} else {
			this.refs['navigation'].closeDrawer();
		}

		this.props.changeScreen(screenName);
	}

	handleButtonSideMenuPressed() {
		const { isOpen } = this.state;

		if (Platform.OS === 'ios') {
			this.setState({ isOpen: true });
			return false;
		}

		this.refs['navigation'].openDrawer();
	}

	renderStatusOffline() {
		const { isConnected } = this.props;

		if ( ! isConnected) {
			return (
				<View style={styles.utilities.connected.statusOfflineWrapper}>
					<Text style={styles.utilities.connected.statusOfflineText}>Koneksi Internet Terputus!</Text>
				</View>
			);
		}

		return null;
	}
	
	renderHeader() {
		const { navigate } = this.props.navigation;
		const { screen } = this.props;

		if (screen === 'VideoList') {
			return (
				<Header
					title="Video"
					iconLeft={require('../../../../assets/icons/ic_menu_white_48dp.png')}
					actionLeft={this.handleButtonSideMenuPressed.bind(this)}
				/>
			);
		}

		return (
			<Header
				title="logo"
				iconLeft={require('../../../../assets/icons/ic_menu_white_48dp.png')}
				actionLeft={this.handleButtonSideMenuPressed.bind(this)}
				iconRight={require('../../../../assets/icons/ic_search_white_48dp.png')}
				actionRight={() => navigate('SearchPost')}
			/>
		);
	}

	renderHeaderMenu() {	
		const { isConnected, hasLogin } = this.props;

		if (hasLogin) {
			if (isConnected) {
				var label = (
					<View>
						<Text style={styles.sideMenu.nameProfile}>{ api.limitWords(this.props.fullName, 1) }</Text>
						<Text style={styles.sideMenu.accountStatus}>{ this.props.email }</Text>
					</View>
				);
			} else {
				var label = <Text style={styles.sideMenu.nameProfile}>Koneksi Terputus...</Text>;
			}

			if (Platform.OS === 'ios') {
				return (
					<View style={styles.sideMenu.headerIOS}>
						<View style={styles.sideMenu.imageProfileWrapper}>
							<View style={styles.sideMenu.imageProfileRounder}>
								<Image 
									style={styles.sideMenu.imageProfile}
									source={require('../../../../assets/icons/user.png')}
								/>
							</View>
						</View>
						<View style={styles.sideMenu.nameProfileWrapper}>
							{ label }
						</View>
					</View>
				);
			} else {
				return (
					<View style={styles.sideMenu.header}>
						<View style={styles.sideMenu.imageProfileWrapper}>
							<View style={styles.sideMenu.imageProfileRounder}>
								<Image 
									style={styles.sideMenu.imageProfile}
									source={require('../../../../assets/icons/user.png')}
								/>
							</View>
						</View>
						<View style={styles.sideMenu.nameProfileWrapper}>
							{ label }
						</View>
					</View>
				);
			}
		}

		if (isConnected) {
			var label = <Text style={styles.sideMenu.nameProfile}>Silahkan Masuk!</Text>;
		} else {
			var label = <Text style={styles.sideMenu.nameProfile}>Koneksi Terputus...</Text>;
		}

		if (Platform.OS === 'ios') {
			return (
				<View style={styles.sideMenu.headerIOS}>
					<View style={styles.sideMenu.imageProfileWrapper}>
						<View style={styles.sideMenu.imageProfileRounder}>
							<Image 
								style={styles.sideMenu.imageProfile}
								source={require('../../../../assets/icons/user.png')}
							/>
						</View>
					</View>
					<View style={styles.sideMenu.nameProfileWrapper}>
						{ label }
					</View>
				</View>
			);
		} else {
			return (
				<View style={styles.sideMenu.header}>
					<View style={styles.sideMenu.imageProfileWrapper}>
						<View style={styles.sideMenu.imageProfileRounder}>
							<Image 
								style={styles.sideMenu.imageProfile}
								source={require('../../../../assets/icons/user.png')}
							/>
						</View>
					</View>
					<View style={styles.sideMenu.nameProfileWrapper}>
						{ label }
					</View>
				</View>
			);
		}
	}

	renderAuthNavigation() {
		if (this.props.hasLogin) {
			return (
				<View>
					<View>
						<TouchableHighlight
							onPress={this.handleNavigate.bind(this, 'Profile')}
							underlayColor="#f4f5f7"
						>
							<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
								<View style={styles.sideMenu.menuItemTitleWrapper}>
									<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Profile</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight
							onPress={this.handleLogoutPressed.bind(this)}
							underlayColor="#f4f5f7"
						>
							<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
								<View style={styles.sideMenu.menuItemTitleWrapper}>
									<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Keluar</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			);
		}

		return (
			<View>
				<View>
					<TouchableHighlight
						onPress={this.handleLoginPressed.bind(this)}
						underlayColor="#f4f5f7"
					>
						<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
							<View style={styles.sideMenu.menuItemTitleWrapper}>
								<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Masuk</Text>
							</View>
						</View>
					</TouchableHighlight>
				</View>
				<View>
					<TouchableHighlight
						onPress={this.handleRegisterPressed.bind(this)}
						underlayColor="#f4f5f7"
					>
						<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
							<View style={styles.sideMenu.menuItemTitleWrapper}>
								<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Daftar</Text>
							</View>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	}

	categoryMenuItem(item, i) {		
		return (
			<View key={i}>
				<TouchableHighlight
					onPress={this.handleCategoryItemPressed.bind(this, item.name, item.id)}
					underlayColor="#f4f5f7"
				>
					<View style={styles.sideMenu.menuItemWrapper}>
						<View style={styles.sideMenu.menuItemIconWrapper}>
							<Image 
								style={styles.sideMenu.menuItemIcon}
								source={require('../../../../assets/icons/ic_keyboard_arrow_right_black_24dp.png')}
							/>
						</View>
						<View style={styles.sideMenu.menuItemTitleWrapper}>
							<Text style={styles.sideMenu.menuItemTitle}>{ item.name }</Text>
						</View>
					</View>
				</TouchableHighlight>
			</View>
		);
	}

	renderCategories() {
		const { categories } = this.props;

		return _.map(categories, this.categoryMenuItem.bind(this));
	}

	renderNavigationView() {
		return (
			<ScrollView style={styles.sideMenu.container}>
				{ this.renderHeaderMenu() }
				<View style={{ paddingTop: 8, paddingBottom: 8 }}>
					<View>
						<TouchableHighlight
							onPress={this.handleMenuItemPressed.bind(this, 'Main')}
							underlayColor="#f4f5f7"
						>
							<View style={styles.sideMenu.menuItemWrapper}>
								<View style={styles.sideMenu.menuItemIconWrapper}>
									<Image 
										style={styles.sideMenu.menuItemIcon}
										source={require('../../../../assets/icons/ic_keyboard_arrow_right_black_24dp.png')}
									/>
								</View>
								<View style={styles.sideMenu.menuItemTitleWrapper}>
									<Text style={styles.sideMenu.menuItemTitle}>Beranda</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
					{ this.renderCategories() }
					<View>
						<TouchableHighlight
							onPress={this.handleMenuItemPressed.bind(this, 'VideoList')}
							underlayColor="#f4f5f7"
						>
							<View style={styles.sideMenu.menuItemWrapper}>
								<View style={styles.sideMenu.menuItemIconWrapper}>
									<Image 
										style={styles.sideMenu.menuItemIcon}
										source={require('../../../../assets/icons/ic_keyboard_arrow_right_black_24dp.png')}
									/>
								</View>
								<View style={styles.sideMenu.menuItemTitleBadgeWrapper}>
									<Text style={styles.sideMenu.menuItemTitle}>Video</Text>
									<View style={styles.sideMenu.accountStatusBadge}>
										<Text style={styles.sideMenu.accountStatusBadgeText}>
											Premium
										</Text>
									</View>
								</View>
							</View>
						</TouchableHighlight>
					</View>
					<Divider />
					{ this.renderAuthNavigation() }
					<View>
						<TouchableHighlight
							onPress={() => {}}
							underlayColor="#f4f5f7"
						>
							<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
								<View style={styles.sideMenu.menuItemTitleWrapper}>
									<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Kritik &amp; Saran</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
					<View>
						<TouchableHighlight
							onPress={() => {}}
							underlayColor="#f4f5f7"
						>
							<View style={[styles.sideMenu.menuItemWrapper, { paddingLeft: 17 }]}>
								<View style={styles.sideMenu.menuItemTitleWrapper}>
									<Text style={[styles.sideMenu.menuItemTitle, { color: '#586069' }]}>Tentang Kami</Text>
								</View>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</ScrollView>
		);
	}

	render() {
		const { subHeaderTitle } = this.props;

		if (Platform.OS === 'ios') {
			const menu = (
				<View style={{ flex: 1, width: 100, backgroundColor: 'red' }}></View>
			);

			return (
				<SideMenu 
					menu={this.renderNavigationView()}
					openMenuOffset={SCREEN_WIDTH*(80/100)}
					isOpen={this.state.isOpen}
					onChange={(isOpen) => this.setState({ isOpen })}
				>
					<View style={styles.mainContainer}>
						<StatusBar
							backgroundColor={styles.utilities.statusBarBg}
							barStyle="light-content"
						/>
						{ this.renderHeader() }
						{ this.renderStatusOffline() }
						{ this.props.children }
						{ <AuthLogin {...this.props} /> }
					</View>
				</SideMenu>
			);
		}

		return (
			<DrawerLayoutAndroid 
				drawerWidth={SCREEN_WIDTH*(80/100)} 
				drawerPosition={DrawerLayoutAndroid.positions.Left} 
				renderNavigationView={() => this.renderNavigationView()}
				ref='navigation'
			>
				<View style={styles.mainContainer}>
					<StatusBar
						backgroundColor={styles.utilities.statusBarBg}
						barStyle="light-content"
					/>
					{ this.renderHeader() }
					{ this.renderStatusOffline() }
					{ this.props.children }
					{ <AuthLogin {...this.props} /> }
				</View>
			</DrawerLayoutAndroid>
		);
	}

}

const mapStateToProps = ({ auth: { hasLogin, userId }, user: { fullName, email }, category, nav: { screen } }) => {
	const categories = [];
	for(i = 0; i < category.data.length; i++) {
		if(category.data[i].description === "1") {
			categories.push(category.data[i]);
		}
	}

	return {
		categories,
		hasLogin,
		userId,
		fullName,
		email,
		screen
	}
}

const DrawerLayout = connect(mapStateToProps, { 
	fetchCategory,
	openAuthLoginModal,
	openAuthRegisterModal,
	checkIsAuthenticated,
	doLogout,
	changeScreen,
	showForm
})(DrawerAndroid);

export { DrawerLayout }; ;