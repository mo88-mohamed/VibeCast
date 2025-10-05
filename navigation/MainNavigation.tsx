import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Platform } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import PodcastScreen from '../screens/PodcastScreen';
import SearchScreen from '../screens/SearchScreen';
import { Episode, podcastItem } from '../types/podcasts';

export type RootStackParamList = {
  MainTabs: { screen?: string };
  Podcast: podcastItem;
  Search: undefined;
  Audio: Episode;
};
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import AudioScreen from '../screens/AudioScreen';

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingBottom: insets.bottom,
        backgroundColor: colors.card,
      }}>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
              {typeof label === 'function'
                ? label({ focused: isFocused, color: isFocused ? colors.primary : colors.text, children: '', position: 'below-icon' })
                : label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}


const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="home" color={color} size={size} /> }} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="heart" color={color} size={size} /> }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: ({ color, size }) => <FontAwesome name="search" color={color} size={size} /> }} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator<RootStackParamList>();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabs} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Podcast"
        component={PodcastScreen} 
        options={{ 
          headerTitle: '',
          headerTransparent: true,
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen 
        name="Search"
        component={SearchScreen} 
        options={{ 
          headerTitle: 'Search',
        }}
      />
      <Stack.Screen 
        name="Audio"
        component={AudioScreen} 
        options={{ 
          headerTitle: 'Audio',
        }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;