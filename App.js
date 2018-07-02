import React from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "./components/HomeScreen";
import PracticeListScreen from "./components/PracticeListScreen";
import PracticeDetailScreen from "./components/PracticeDetailScreen";
import QuizListScreen from "./components/QuizListScreen";
import QuizDetailScreen from "./components/QuizDetailScreen";

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

// TODO: can these constants be extracted somewhere?
const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    PracticeList: PracticeListScreen,
    PracticeDetail: PracticeDetailScreen,
    QuizList: QuizListScreen,
    QuizDetail: QuizDetailScreen
  },
  {
    initialRouteName: "Home"
  }
);
