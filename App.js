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
import secrets from "./.secrets";
import { Segment } from "expo";
import Sentry from "sentry-expo";

if (secrets.segment) {
  Segment.initialize(secrets.segment);
}

if (secrets.sentry && secrets.sentry.publicDSN) {
  Sentry.enableInExpoDevelopment = true;
  Sentry.config(secrets.sentry.publicDSN).install();
}

export default class App extends React.Component {
  render() {
    return (
      <ErrorBoundary>
        <DimensionsProvider>
          <RootStack onNavigationStateChange={trackScreenChanges} />
        </DimensionsProvider>
      </ErrorBoundary>
    );
  }
}

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    Sentry.captureException(error, {
      extra: errorInfo
    });
  }

  render() {
    const { children } = this.props;
    return children;
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
  Settings: SettingsScreen
});

const AboutStack = createStackNavigator({
  About: provideColors(config.colors.about, AboutScreen)
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

function trackScreenChanges(prevState, currentState) {
  const currentScreen = getActiveRoute(currentState);
  const prevScreen = getActiveRoute(prevState);

  if (prevScreen.routeName !== currentScreen.routeName) {
    const properties = {};
    if (currentScreen.params) {
      if (currentScreen.params.charSet) {
        properties.charSetName = currentScreen.params.charSet.name;
      }
    }

    Segment.screenWithProperties(currentScreen.routeName, properties);
  }
}

// gets the current screen from navigation state
function getActiveRoute(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRoute(route);
  }
  return route;
}
