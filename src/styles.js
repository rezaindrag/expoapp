import {
	Dimensions,
	Platform
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FONT_FAMILY_REGULAR = 'gotham-light';
const FONT_FAMILY_BOLD = 'gotham-light';
const PRIMARY_COLOR = '#1565C0';
const SECONDARY_COLOR = '#1976D2';
const STATUSBAR_COLOR = '#0D47A1';
const SUBHEADER_COLOR = '#DDD';
const TEXT_COLOR = '#242729';

const styles = {
	mainContainer: { 
		flex: 1 
	},
	utilities: { 
		statusBarBg: STATUSBAR_COLOR, 
		underlayColorActionHeader: SECONDARY_COLOR, 
		divider: { backgroundColor: '#DDD', height: 1, marginBottom: 8, marginTop: 8 },
		buttonGreen: { 
			buttonWrapper: { paddingRight: 10, paddingLeft: 10, height: 30, borderRadius: 4, justifyContent: 'center', alignItems: 'center', backgroundColor: '#4CAF50' },
			buttonText: { color: '#FFF', fontSize: 14 } 
		},
		connected: {
			statusOfflineWrapper: { width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(000, 000, 000, 0.5)', height: 35, position: 'absolute', bottom: 0, zIndex: 10 },
			statusOfflineText: { color: '#FFF' }
		},
		error: {
			errorButton: { justifyContent: 'center', alignItems: 'center', borderColor: '#1565C0', borderWidth: 1, borderRadius: 4, height: 30, paddingRight: 10, paddingLeft: 10 },
			errorButtonText: { fontSize: 13, color: '#1565C0' }
		},
		collapseButton: {
			borderWidth: 1, borderColor: '#DDD', height: 25, justifyContent: 'center', alignItems: 'center'
		}
	},
	sideMenu: {
		container: { flex: 1, backgroundColor: '#fff' },
		header: { height: 90, paddingTop: 24, backgroundColor: '#1565C0', display: 'flex', flexDirection: 'row' },
		headerIOS: { height: 90, paddingTop: 20, backgroundColor: '#1565C0', display: 'flex', flexDirection: 'row' },
		imageProfileWrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
		imageProfileRounder: { height: 45, width: 45, backgroundColor: '#CCC', borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
		imageProfile: { width: 40, height: 40 },
		nameProfileWrapper: { flex: 3, justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' },
		nameProfile: { color: 'white', fontSize: 18 },
		menuItemWrapper: { height: 45, paddingLeft: 12, flexDirection: 'row' },
		menuItemIconWrapper: { display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'flex-start' },
		menuItemIcon: { width: 20, height: 20 },
		menuItemTitleWrapper: { flex: 6, justifyContent: 'center', alignItems: 'flex-start' },
		menuItemTitleDropdownWrapper: { flex: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
		menuItemTitleBadgeWrapper: { flex: 6, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' },
		menuItemTitle: { fontSize: 14, color: TEXT_COLOR },
		accountStatus: { fontSize: 13, color: '#FFF' },
		accountStatusBadge: { marginLeft: 5, backgroundColor: '#D84315', borderRadius: 4, paddingLeft: 3, paddingRight: 3, height: 12 },
		accountStatusBadgeText: { color: '#FFF', fontSize: 10 }
	},
	header: {
		container: { height: 78, paddingTop: 24, backgroundColor: PRIMARY_COLOR, alignItems: 'center', flexDirection: 'row' },
		containerIOS: { height: 70, paddingTop: 20, backgroundColor: PRIMARY_COLOR, alignItems: 'center', flexDirection: 'row' },
		titleSection: {	alignItems: 'center', justifyContent: 'center', flex: 1, paddingLeft: 14, paddingRight: 14 },
		title: { color: 'white', fontSize: 20, fontWeight: 'bold' },
		actionSection: { width: 50, alignItems: 'center', justifyContent: 'center' },
		actionSectionIOS: { width: 50, alignItems: 'center', justifyContent: 'center' },
		touchable: { height: 54, width: 50,	justifyContent: 'center', alignItems: 'center' },
		touchableIOS: { height: 50, width: 50, justifyContent: 'center', alignItems: 'center' },
		actionIcon: { height: 22, width: 22 }
	},
	subheader: {
		container: { height: 35, backgroundColor: SUBHEADER_COLOR, justifyContent: 'center', alignItems: 'center', paddingLeft: 17, paddingRight: 17 },
		text: {	fontSize: 16, color: TEXT_COLOR }
	},
	content: {
		scrollContainer: { backgroundColor: 'white' },
		container: { 
			home: {	flex: 1, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white' },
			error: { flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' },
			postList: {	flex: 1, flexDirection: 'column', backgroundColor: 'white' },
			searchPost: { flex: 1, flexDirection: 'column', backgroundColor: 'white' },
			postComments: {	flex: 1, flexDirection: 'column', backgroundColor: 'white',	padding: 10	},
		},
		categorySection: { width: (SCREEN_WIDTH / 2), height: (SCREEN_WIDTH / 2), justifyContent: 'center', alignItems: 'center', borderWidth: 0.5, borderColor: '#DDD'	},
		imageCategory: { borderRadius: 100,	borderWidth: 1,	borderColor: '#DDD', width: (((SCREEN_WIDTH / 2) * 50)/100), height: (((SCREEN_WIDTH / 2) * 50)/100), marginBottom: 8 },
		titleCategory: { color: TEXT_COLOR, fontSize: 16, }
	},
	postList: {
		scrollContainer: { flex: 1, backgroundColor: '#DDD' },
		container: { flex: 1, flexDirection: 'column', padding: 10 },
		postItem: {	backgroundColor: '#fff', flex: 1, flexDirection: 'row' },
		titleWrapper: { flex: 1, paddingTop: 10, paddingLeft: 10, paddingRight: 10 },
		title: { color: TEXT_COLOR, fontWeight: 'bold', fontSize: 14 },
		thumbWrapper: { width: 100, justifyContent: 'center', alignItems: 'center'	},
		thumb: { width: 100, height: 100 },
		containerError: { flex: 1, backgroundColor: '#DDD', justifyContent: 'center', alignItems: 'center' }
	},
	postDetail: {
		titleWrapper: { backgroundColor: 'white', paddingTop: 12, paddingBottom: 12, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
		titleText: { color: TEXT_COLOR, fontSize: 16, fontWeight: 'bold' },
		authorWrapper: { backgroundColor: 'white', paddingTop: 12, paddingBottom: 12, paddingLeft: 10, paddingRight: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
		authorText: { fontSize: 14, color: TEXT_COLOR },
		postDate: { fontSize: 14, color: TEXT_COLOR },
		content: { backgroundColor: 'white', paddingLeft: 10, paddingRight: 10, paddingTop: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
		//htmlStyles: { p: { color: TEXT_COLOR, fontSize: 14, marginBottom: 8, marginTop: 0, lineHeight: 22 } },
		fabShare: { display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 20, right: 20, width: 60, height: 60, borderRadius: 100, backgroundColor: '#2196F3' },
		imgShare: { width: 20, height: 20 }
	},
	searchPost: {
		headerContainer: { height: 78, paddingTop: 24, backgroundColor: '#F7F7F7', flexDirection: 'row' },
		headerContainerIOS: { height: 70, paddingTop: 20, backgroundColor: '#F7F7F7', flexDirection: 'row' },
		inputSearchWrapper: { flex: 1, alignItems: 'flex-start', justifyContent: 'center' },
		inputSearch: { color: TEXT_COLOR, height: 45, width: '100%', backgroundColor: '#F7F7F7', fontSize: 16, paddingRight: 12 },
		notFoundWrapper: { justifyContent: 'center', alignItems: 'center', height: 50 }
	},
	postComments: {
		content: { backgroundColor: 'white', paddingTop: 12,	paddingBottom: 12, paddingLeft: 10, paddingRight: 10 },
		authorUrl: { fontSize: 14, color: TEXT_COLOR },
		commentSection: { paddingBottom: 10, marginBottom: 10, borderBottomWidth: 1, borderColor: '#DDD' },
		authorName: { color: TEXT_COLOR, fontSize: 16 }, 
		authorDate: { fontSize: 14, color: TEXT_COLOR },
		comment: { p: { color: TEXT_COLOR, fontSize: 16, marginTop: 8, marginBottom: 0 } },
		adminText: { fontSize: 12	}
	},
	auth: {
		container: { flex: 1, alignItems: 'center', paddingBottom: 50 },
		formContainerLandscape: { width: 350, paddingTop: 18, paddingBottom: 18, alignSelf: 'center' },
		formContainerPortrait: { padding: 18, width: '100%', alignSelf: 'center' },
		inputLogin: { color: TEXT_COLOR, fontSize: 16, borderWidth: 1, backgroundColor: '#FFF', borderColor: '#DDD', borderRadius: 4, height: 40, paddingRight: 10, paddingLeft: 10, marginBottom: 10 },
		buttonLogin: { backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', height: 40, borderRadius: 4 },
		buttonTextLogin: { color: '#FFF', fontSize: 16 },
		buttonLoginSocial: { backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center', height: 30, borderRadius: 4 },
		buttonTextLoginSocial: { color: '#FFF', fontSize: 14 },
		buttonClose: { height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: '#DDD' },
		buttonIconClose: { height: 25, width: 25 },
		errorWrapper: { padding: 10, marginTop: 18, marginRight: 17, marginLeft: 17, backgroundColor: '#ffcdd2', borderRadius: 4, borderWidth: 1, borderColor: '#ef9a9a' },
		errorText: { color: '#b71c1c', fontSize: 14 },
		messageWrapper: { padding: 10, marginTop: 18, marginRight: 17, marginLeft: 17, backgroundColor: '#C8E6C9', borderRadius: 4, borderWidth: 1, borderColor: '#2E7D32' },
		messageText: { color: '#2E7D32', fontSize: 14 },
		footer: { flexDirection: 'row', position: 'absolute', bottom: 0, borderTopWidth: 1, borderColor: '#DDD', justifyContent: 'center', alignItems: 'center', height: 50, flex: 1, width: '100%' },
		footerTextRegular: { color: TEXT_COLOR, fontSize: 13 },
		footerTextBold: { color: TEXT_COLOR, fontSize: 13, fontWeight: 'bold' }
	},
	videoList: {
		introduceContainer: { padding: 10, backgroundColor: '#FFF' },
		mainTitle: { fontSize: 18, color: TEXT_COLOR, marginBottom: 10 },
		videoPreview: { width: '100%', height: 150 },
		description: { fontSize: 14, color: TEXT_COLOR, marginBottom: 8 },
		buttonBuyNow: { height: 35, backgroundColor: '#4CAF50', borderRadius: 80, justifyContent: 'center', alignItems: 'center', marginTop: 8, marginBottom: 9 },
		buttonBuyNowText: { fontSize: 14, color: '#FFF' },
		postItem: {	borderBottomWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF', flex: 1, flexDirection: 'row', paddingTop: 12, paddingBottom: 12, justifyContent: 'center' },
		titleWrapper: { flex: 1, justifyContent: 'center', paddingLeft: 10, paddingRight: 10 },
		title: { color: TEXT_COLOR, fontSize: 16 },
		timeWrapper: { width: 100, justifyContent: 'center', alignItems: 'center' },
		time: { color: '#1565C0', fontSize: 13,  }
	},
	videoPlay: {
		videoWrapper: { flex: 1, width: '100%', backgroundColor: '#000', alignItems: 'center', justifyContent: 'center' },
		video: { alignSelf: 'stretch', flex: 1 },
	},
	videoClose: {
		position: { position: 'absolute', left: 0, zIndex: 10 },
		buttonWrapper: { backgroundColor: '#FFF', height: 50, width: 50, justifyContent: 'center', alignItems: 'center' },
		buttonIcon: { height: 22, width: 22 }
	},
	notification: {
		wrapper: { flexDirection: 'column', backgroundColor: '#757575', justifyContent: 'center', alignItems: 'center', paddingTop: 10, paddingBottom: 12 },
		text: { color: '#FFF', fontSize: 16, textAlign: 'center' },
	},
	upgradeAccount: {
		wrapper: { width: '100%', paddingTop: 12, paddingLeft: 10, paddingRight: 10 },
		label: { fontSize: 18, color: TEXT_COLOR, marginBottom: 8 },
		text: { fontSize: 14, color: TEXT_COLOR, marginBottom: 8 }
	},
	profile: {
		scrollContainer: { flex: 1, backgroundColor: '#FFF' },
		sectionImageProfile: { paddingTop: 16,	paddingBottom: 16, backgroundColor: '#FFF', flex: 1, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#DDD' },
		section: { paddingTop: 12,	paddingBottom: 12, paddingLeft: 10, paddingRight: 10, backgroundColor: '#FFF', flex: 1, justifyContent: 'center', borderBottomWidth: 1, borderColor: '#DDD'	},
		imageProfileWrapper: { height: 105, width: 105,	backgroundColor: '#CCC', borderRadius: 100, justifyContent: 'center', alignItems: 'center' },
		imageProfile: {	height: 100, width: 100 },
		textLabel: { fontSize: 16, color: TEXT_COLOR },
		textValue: { fontSize: 16, color: TEXT_COLOR },
		buttonWrapper: { flex: 1, flexDirection: 'row', justifyContent: 'flex-start' },
		buttonAdditionalStyle: { marginTop: 8 }
	},
	paymentConfirmation: {
		formLabel: { fontSize: 16, color: TEXT_COLOR },
		formInput: { fontSize: 16, color: TEXT_COLOR, height: 40, borderRadius: 4, borderColor: '#DDD', borderWidth: 1, paddingLeft: 10, paddingRight: 10, marginBottom: 8 },
		formDatePickerWrapper: { justifyContent: 'center', height: 40, borderRadius: 4, borderColor: '#DDD', borderWidth: 1, paddingLeft: 10, paddingRight: 10, marginBottom: 8 },
		formDatePickerText: { fontSize: 16, color: '#9E9E9E' }
	}
};

export default styles;