import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AboutScreen from "./components/AboutScreen";
import PracticeDetailScreen from "./components/PracticeDetailScreen";
import PracticeListScreen from "./components/PracticeListScreen";
import QuizDetailScreen from "./components/QuizDetailScreen";
import QuizListScreen from "./components/QuizListScreen";
import SettingsScreen from "./components/SettingsScreen";

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const PracticeStack = createStackNavigator({
  PracticeList: PracticeListScreen,
  PracticeDetail: PracticeDetailScreen
});

const QuizStack = createStackNavigator({
  QuizList: QuizListScreen,
  QuizDetail: QuizDetailScreen
});

const SettingsStack = createStackNavigator({
  _: SettingsScreen
});

const AboutStack = createStackNavigator({
  _: AboutScreen
});

const RootStack = createBottomTabNavigator(
  {
    Practice: PracticeStack,
    Quiz: QuizStack,
    // Settings: SettingsStack,
    About: AboutStack
  },
  {
    initialRouteName: "Practice",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Practice") {
          iconName = "book-open-page-variant";
        } else if (routeName === "Quiz") {
          iconName = "cards-outline";
        } else if (routeName === "Settings") {
          iconName = "settings";
        } else if (routeName === "About") {
          iconName = "information";
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <MaterialCommunityIcons name={iconName} size={25} color={tintColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato", // TODO: choose colors
      inactiveTintColor: "gray"
    }
  }
);
