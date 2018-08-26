import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import AboutScreen from "./components/AboutScreen";
import { DimensionsProvider } from "./components/DimensionsContext";
import PracticeDetailScreen from "./components/PracticeDetailScreen";
import PracticeListScreen from "./components/PracticeListScreen";
import QuizDetailScreen from "./components/QuizDetailScreen";
import QuizListScreen from "./components/QuizListScreen";
import SettingsScreen from "./components/SettingsScreen";
import { provideColors } from "./components/ColorsContext";
import config from "./config";

export default class App extends React.Component {
  render() {
    return (
      <DimensionsProvider>
        <RootStack />
      </DimensionsProvider>
    );
  }
}

const PracticeStack = createStackNavigator({
  PracticeList: provideColors(config.colors.practice, PracticeListScreen),
  PracticeDetail: provideColors(config.colors.practice, PracticeDetailScreen)
});

const QuizStack = createStackNavigator({
  QuizList: provideColors(config.colors.quiz, QuizListScreen),
  QuizDetail: provideColors(config.colors.quiz, QuizDetailScreen)
});

const SettingsStack = createStackNavigator({
  _: SettingsScreen
});

const AboutStack = createStackNavigator({
  _: provideColors(config.colors.about, AboutScreen)
});

const RootStack = createBottomTabNavigator(
  {
    Practice: PracticeStack,
    Quiz: QuizStack,
    // Settings: SettingsStack, // disabled until we actually need user-facing settings
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

        const iconColor = focused
          ? config.colors[routeName.toLowerCase()].primary
          : config.colors.neutral;

        return (
          <MaterialCommunityIcons name={iconName} size={25} color={iconColor} />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: config.colors.text,
      inactiveTintColor: config.colors.neutral
    }
  }
);
