import { StackNavigator } from 'react-navigation';
import Main from './components/screens/Main';
import About from './components/screens/About';
import PostList from './components/screens/PostList';
import PostDetail from './components/screens/PostDetail';
import SearchPost from './components/screens/SearchPost';
import PostComments from './components/screens/PostComments';
import VideoPlay from './components/screens/VideoPlay';
import Profile from './components/screens/Profile';

export default StackNavigator({
	Main: { 
		screen: Main, 
		navigationOptions: { 
			header: null 
		} 
	},
	About: { 
		screen: About, 
		navigationOptions: { 
			header: null 
		} 
	},
	PostList: { 
		screen: PostList, 
		navigationOptions: { 
			header: null 
		} 
	},
	PostDetail: { 
		screen: PostDetail, 
		navigationOptions: { 
			header: null 
		} 
	},
	SearchPost: { 
		screen: SearchPost, 
		navigationOptions: { 
			header: null 
		} 
	},
	PostComments: { 
		screen: PostComments, 
		navigationOptions: { 
			header: null 
		} 
	},
	VideoPlay: {
		screen: VideoPlay,
		navigationOptions: {
			header: null
		}
	},
	Profile: {
		screen: Profile,
		navigationOptions: {
			header: null
		}
	}
});