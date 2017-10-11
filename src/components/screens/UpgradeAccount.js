import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	ScrollView,
	Modal,
	StatusBar,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import { closeUpgradeAccountModal } from '../../actions';
import { Header, Divider } from '../partials/commons';
import styles from '../../styles';

class UpgradeAccount extends Component {

	renderHeader() {
		const { closeUpgradeAccountModal } = this.props;

		if (Platform.OS === 'ios') {
			return (
				<Header
					title="Beli Sekarang"
					iconLeft={require('../../../assets/icons/clear.png')}
					actionLeft={() => closeUpgradeAccountModal()}
				/>
			);
		}

		return (
			<Header
				title="Beli Sekarang"
				iconLeft={require('../../../assets/icons/clear.png')}
				actionLeft={() => closeUpgradeAccountModal()}
				addStyle={{ paddingTop: 0, height: 54 }}
			/>
		);
	}

	render() {
		const { 
			upgradeAccountModal, 
			email 
		} = this.props;
		
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={upgradeAccountModal}
				onRequestClose={() => {alert("Modal has been closed.")}}
			>
				<View style={styles.auth.container}>
					<StatusBar
						backgroundColor={styles.utilities.statusBarBg}
						barStyle="light-content"
					/>
					{ this.renderHeader() }
					<ScrollView style={{ width: '100%' }}>
						<View style={styles.upgradeAccount.wrapper}>
							<View style={{ marginBottom: 15 }}>
								<Text style={styles.upgradeAccount.label}>1. Beli Akun</Text>
								<Text style={styles.upgradeAccount.text}>Anda dapat membeli akun premium: </Text>
								<Text style={[styles.upgradeAccount.label, { color: '#FF5722', fontSize: 14 }]}>80rb/bulan</Text>
								<Text style={[styles.upgradeAccount.text, { marginBottom: 0 }]}>Gratis seluruh video elearning.</Text>
							</View>
							<View style={{ marginBottom: 15 }}>
								<Text style={styles.upgradeAccount.label}>2. Pembayaran</Text>
								<Text style={styles.upgradeAccount.text}>Untuk pembayaran, silahkan transfer ke nomor rekening: </Text>
								<Text style={[styles.upgradeAccount.label, { color: '#FF5722', fontSize: 14, marginBottom: 0 }]}>3754945 a/n Renra Iwa Sedoya</Text>
							</View>
							<View style={{ marginBottom: 15 }}>
								<Text style={styles.upgradeAccount.label}>3. Konfirmasi Pembayaran</Text>
								<Text style={styles.upgradeAccount.text}>Setelah transfer silahkan lakukan konfirmasi pembayaran:</Text>
								<Text style={[styles.upgradeAccount.label, { color: '#FF5722', fontSize: 14, marginBottom: 0 }]}>08187834455 (WhatsApp)</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			</Modal>
		);
	}

}

const mapStateToProps = ({ user }) => {
	return {
		upgradeAccountModal: user.upgradeAccountModal,
		email: user.email
	}
}

export default connect(mapStateToProps, { 
	closeUpgradeAccountModal 
})(UpgradeAccount);