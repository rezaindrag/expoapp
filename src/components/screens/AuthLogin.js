import React, { Component } from 'react';
import {
	View,
	Text,
	TouchableHighlight,
	TouchableWithoutFeedback,
	Modal,
	Image,
	TextInput,
	StatusBar,
	ScrollView,
	ActivityIndicator,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
	openAuthRegisterModal,
	closeAuthModal, 
	doLogin,
	doRegister,
	doResetPassword,
	inputChange,
	inputReset,
	stopAuthProcess,
	showForm,
	doLoginWithGoogle
} from '../../actions';
import { Header } from '../partials/commons';
import styles from '../../styles';
import api from '../../api';

class Auth extends Component {
	
	handleClosePressed() {
		this.props.inputReset();
		this.props.stopAuthProcess();
		this.props.closeAuthModal();
	}

	// login process
	handleLoginPressed() {
		const { email, password } = this.props;

		this.props.doLogin({ email, password });
	}

	// register process
	handleRegisterPressed() {
		const { fullName, email, password, confirmPassword } = this.props;

		this.props.doRegister({ fullName, email, password, confirmPassword });
	}

	// next version
	handleLoginWithGooglePressed() {
		this.props.doLoginWithGoogle();
	}

	handleShowForm(form) {
		this.props.showForm(form);
	}
	
	handleResetPasswordPressed() {
		const { email } = this.props;

		this.props.doResetPassword({ email });
	}
	
	errorItems(err, i) {
		return (
			<View key={i}>
				<Text style={styles.auth.errorText}>{ err }</Text>
			</View>
		);
	}

	renderErrors() {
		const { errors } = this.props;
		
		if (errors.length > 0) {
			return (
				<View style={styles.auth.errorWrapper}>
					{ _.map(errors, this.errorItems.bind(this)) }
				</View>
			);
		}

		return null;
	}

	renderMessage() {
		const { message } = this.props;
		
		if (message.length > 0) {
			return (
				<View style={styles.auth.messageWrapper}>
					<Text style={styles.auth.messageText}>{ message }</Text>
				</View>
			);
		}

		return null;
	}

	renderButton() {
		if (this.props.loading) {
			return (
				<View style={styles.auth.buttonLogin}>
					<ActivityIndicator 
						color="#FFF"
						size="large"
					/>
				</View>
			);
		}
		
		if (this.props.form === 'login') {
			return (
				<TouchableHighlight
					onPress={this.handleLoginPressed.bind(this)}
					underlayColor="#459648"
				>
					<View style={styles.auth.buttonLogin}>
						<Text style={styles.auth.buttonTextLogin}>Masuk</Text>
					</View>
				</TouchableHighlight>
			);
		} else if(this.props.form === 'register') {
			return (
				<TouchableHighlight
					onPress={this.handleRegisterPressed.bind(this)}
					underlayColor="#459648"
				>
						<View style={styles.auth.buttonLogin}>
						<Text style={styles.auth.buttonTextLogin}>Daftar</Text>
					</View>
				</TouchableHighlight>
			);
		} else {
			return (
				<TouchableHighlight
					onPress={this.handleResetPasswordPressed.bind(this)}
					underlayColor="#459648"
				>
						<View style={styles.auth.buttonLogin}>
						<Text style={styles.auth.buttonTextLogin}>Kirim</Text>
					</View>
				</TouchableHighlight>
			);
		}	
	}

	/*renderButtonSocial() {
		return (
			<View>
				<View style={{ alignItems: 'center', justifyContent: 'center', height: 40, marginTop: 8 }}>
					<Text style={styles.auth.footerTextBold}>Atau Login Dengan</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30, marginTop: 8 }}>
					<View style={{ flex: 1 }}>
						<TouchableHighlight
							onPress={() => {}}
						>
							<View style={[styles.auth.buttonLoginSocial, { backgroundColor: '#3b5999' }]}>
								<Text style={styles.auth.buttonTextLoginSocial}>Facebook</Text>
							</View>
						</TouchableHighlight>
					</View>
					<View style={{ width: 20 }} />
					<View style={{ flex: 1 }}>
						<TouchableHighlight
							onPress={this.handleLoginWithGooglePressed.bind(this)}
						>
							<View style={[styles.auth.buttonLoginSocial, { backgroundColor: '#dd4b39' }]}>
								<Text style={styles.auth.buttonTextLoginSocial}>Google</Text>
							</View>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}*/

	renderButtonLostPassword() {
		return (
			<TouchableWithoutFeedback
				onPress={this.handleShowForm.bind(this, 'lostPassword')}
			>
				<View style={{ alignItems: 'center', justifyContent: 'center', height: 40, marginTop: 8, marginBottom: 8 }}>
					<Text style={styles.auth.footerTextBold}>Lupa Password?</Text>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	renderFormLostPasswordItems() {
		return (
			<View>
				<TextInput
					value={this.props.email}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'email', value })}
					placeholder="Email"
					underlineColorAndroid="transparent"
				/>
				{ this.renderButton() }
			</View>
		);
	}

	renderFormRegisterItems() {
		return (
			<View>
				<TextInput
					value={this.props.fullName}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'fullName', value })}
					placeholder="Nama Lengkap"
					underlineColorAndroid="transparent"
				/>
				<TextInput
					value={this.props.email}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'email', value })}
					placeholder="Email"
					underlineColorAndroid="transparent"
				/>
				<TextInput
					value={this.props.password}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'password', value })}
					placeholder="Password"
					underlineColorAndroid="transparent"
					secureTextEntry={true}
				/>
				<TextInput
					value={this.props.confirmPassword}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'confirmPassword', value })}
					placeholder="Konfirmasi Password"
					underlineColorAndroid="transparent"
					secureTextEntry={true}
				/>
				{ this.renderButton() }
			</View>
		);
	}

	renderFormLoginItems() {
		return (
			<View>
				<TextInput
					value={this.props.email}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'email', value })}
					placeholder="Email"
					underlineColorAndroid="transparent"
				/>
				<TextInput
					value={this.props.password}
					style={styles.auth.inputLogin}
					onChangeText={(value) => this.props.inputChange({ props: 'password', value })}
					placeholder="Password"
					underlineColorAndroid="transparent"
					secureTextEntry={true}
				/>
				{ this.renderButton() }
			</View>
		);
	}

	renderForm() {
		if (this.props.form === 'login') {
			return (
				<View style={styles.auth.formContainerPortrait}>
					{ this.renderFormLoginItems() }
					{ this.renderButtonLostPassword() }
				</View>
			);
		} else if (this.props.form === 'register') {
			return (
				<View style={styles.auth.formContainerPortrait}>
					{ this.renderFormRegisterItems() }
				</View>
			);
		}

		return (
			<View style={styles.auth.formContainerPortrait}>
				{ this.renderFormLostPasswordItems() }
			</View>
		);
	}

	renderFooter() {
		if (this.props.form === 'login') {
			return (
				<TouchableWithoutFeedback
					onPress={this.handleShowForm.bind(this, 'register')}
				>
					<View style={styles.auth.footer}>
						<Text style={[styles.auth.footerTextRegular, { marginRight: 4 }]}>Belum Punya Akun?</Text>
						<Text style={styles.auth.footerTextBold}>Daftar Sekarang</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		} else if (this.props.form === 'register') {
			return (
				<TouchableWithoutFeedback
						onPress={this.handleShowForm.bind(this, 'login')}
					>
					<View style={styles.auth.footer}>
						<Text style={[styles.auth.footerTextRegular, { marginRight: 4 }]}>Sudah Punya Akun!</Text>
						<Text style={styles.auth.footerTextBold}>Masuk</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		} else {
			return (
				<TouchableWithoutFeedback
						onPress={this.handleShowForm.bind(this, 'login')}
					>
					<View style={styles.auth.footer}>
						<Text style={styles.auth.footerTextRegular}>Kembali</Text>
					</View>
				</TouchableWithoutFeedback>
			);
		}
	}

	renderHeaderModal() {
		if (Platform.OS === 'ios') {
			if (this.props.form === 'login') {
				return (
					<Header
						title="Masuk"
						iconLeft={require('../../../assets/icons/clear.png')}
						actionLeft={this.handleClosePressed.bind(this)}
					/>
				);
			} else if (this.props.form === 'register') {
				return (
					<Header
						title="Daftar"
						iconLeft={require('../../../assets/icons/clear.png')}
						actionLeft={this.handleClosePressed.bind(this)}
					/>
				);
			} 

			return (
				<Header
					title="Lupa Password"
					iconLeft={require('../../../assets/icons/clear.png')}
					actionLeft={this.handleClosePressed.bind(this)}
				/>
			);
		}

		if (this.props.form === 'login') {
			return (
				<Header
					title="Masuk"
					iconLeft={require('../../../assets/icons/clear.png')}
					actionLeft={this.handleClosePressed.bind(this)}
					addStyle={{ paddingTop: 0, height: 54 }}
				/>
			);
		} else if (this.props.form === 'register') {
			return (
				<Header
					title="Daftar"
					iconLeft={require('../../../assets/icons/clear.png')}
					actionLeft={this.handleClosePressed.bind(this)}
					addStyle={{ paddingTop: 0, height: 54 }}
				/>
			);
		} 

		return (
			<Header
				title="Lupa Password"
				iconLeft={require('../../../assets/icons/clear.png')}
				actionLeft={this.handleClosePressed.bind(this)}
				addStyle={{ paddingTop: 0, height: 54 }}
			/>
		);
	}

	render() {
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.props.visibleLoginModal}
				onRequestClose={() => {alert("Modal has been closed.")}}
			>
				<View style={styles.auth.container}>
					<StatusBar
						backgroundColor={styles.utilities.statusBarBg}
						barStyle="light-content"
					/>
					{ this.renderHeaderModal() }
					<ScrollView style={{ width: '100%' }}>
						{ this.renderMessage() }
						{ this.renderErrors() }
						{ this.renderForm() }
					</ScrollView>
					{ this.renderFooter() }
				</View>
			</Modal>
		);
	}

}

const mapStateToProps = ({ auth, authForm }) => {
	return {
		fullName: authForm.fullName,
		email: authForm.email,
		password: authForm.password,
		confirmPassword: authForm.confirmPassword,
		visibleLoginModal: auth.visibleLoginModal,
		errors: auth.errors,
		loading: auth.loading,
		form: auth.form,
		message: auth.message
	}
}

export default connect(mapStateToProps, {
	showForm,
	openAuthRegisterModal,
	closeAuthModal, 
	doLogin,
	doRegister,
	doResetPassword,
	inputChange,
	inputReset,
	stopAuthProcess,
	doLoginWithGoogle
})(Auth);