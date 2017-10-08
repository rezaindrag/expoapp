import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	ScrollView,
	Modal,
	StatusBar,
	TextInput,
	DatePickerAndroid,
	Button
} from 'react-native';
import { connect } from 'react-redux';
import { closePaymentConfirmationModal } from '../../actions';
import { Header, Divider } from '../partials/commons';
import styles from '../../styles';
import api from '../../api';

class PaymentConfirmation extends Component {

	state = {
		day: null,
		month: null,
		year: null
	}

	componentWillMount() {
		const date = new Date();

		this.setState({ 
			day: `${api.pad(date.getDate(), 2)}`,
			month: `${api.pad(date.getMonth()+1, 2)}`,
			year: `${date.getFullYear()}`
		});
	}

	async openDatePickerAndroid() {
		const _day = this.state.day;
		const _month = this.state.month;
		const _year = this.state.year;

		try {
			const {action, year, month, day} = await DatePickerAndroid.open({
				date: new Date(_year, (_month-1), _day)
			});

			if (action !== DatePickerAndroid.dismissedAction) {
				this.setState({ 
					day: `${api.pad(day, 2)}`,
					month: `${api.pad(month+1, 2)}`,
					year: `${year}`
				});
			}

		} catch ({code, message}) {
			console.warn('Cannot open date picker', message);
		}
	}

	render() {
		const { 
			paymentConfirmationModal, 
			closePaymentConfirmationModal, 
			email 
		} = this.props;
		const { day, month, year } = this.state;
		
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={paymentConfirmationModal}
				onRequestClose={() => {alert("Modal has been closed.")}}
			>
				<View style={styles.auth.container}>
					<StatusBar
						backgroundColor={styles.utilities.statusBarBg}
						barStyle="light-content"
					/>
					<Header
						title="Konfirmasi Pembayaran"
						iconLeft={require('../../../assets/icons/clear.png')}
						actionLeft={() => closePaymentConfirmationModal()}
					/>
					<ScrollView>
						<View style={styles.upgradeAccount.wrapper}>
							<Text style={styles.paymentConfirmation.formLabel}>Email/ID:</Text>
							<TextInput
						        style={styles.paymentConfirmation.formInput}
						        onChangeText={() => {}}
						        value={email}
						        underlineColorAndroid="transparent"
						        autoCorrect={false}
						    />
							<Text style={styles.paymentConfirmation.formLabel}>Nomor Rekening:</Text>
							<TextInput
						        style={styles.paymentConfirmation.formInput}
						        onChangeText={() => {}}
						        placeholder="Masukan nomor rekening"
						        underlineColorAndroid="transparent"
						        placeholderTextColor="#9E9E9E"
						    />
							<Text style={styles.paymentConfirmation.formLabel}>Nama Pemegang:</Text>
							<TextInput
						        style={styles.paymentConfirmation.formInput}
						        onChangeText={() => {}}
						        placeholder="Masukan nama pemegang rekening"
						        underlineColorAndroid="transparent"
						        placeholderTextColor="#9E9E9E"
						    />
							<Text style={styles.paymentConfirmation.formLabel}>Tanggal Transfer:</Text>
						    <TouchableWithoutFeedback onPress={this.openDatePickerAndroid.bind(this)}>
								<View style={styles.paymentConfirmation.formDatePickerWrapper}>
									<Text style={styles.paymentConfirmation.formDatePickerText}>{ `${day}/${month}/${year}` }</Text>
								</View>
							</TouchableWithoutFeedback>
							<Text style={styles.paymentConfirmation.formLabel}>Konfirmasi:</Text>
							<View style={styles.profile.buttonWrapper}>
							    <TouchableWithoutFeedback onPress={() => {}}>
									<View style={[styles.utilities.buttonGreen.buttonWrapper, { marginRight: 10 }]}>
										<Text style={styles.utilities.buttonGreen.buttonText}>Via SMS</Text>
									</View>
								</TouchableWithoutFeedback>
							    <TouchableWithoutFeedback onPress={() => {}}>
									<View style={[styles.utilities.buttonGreen.buttonWrapper]}>
										<Text style={styles.utilities.buttonGreen.buttonText}>Via EMAIL</Text>
									</View>
								</TouchableWithoutFeedback>
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
		paymentConfirmationModal: user.paymentConfirmationModal,
		email: user.email
	}
}

export default connect(mapStateToProps, { closePaymentConfirmationModal })(PaymentConfirmation);