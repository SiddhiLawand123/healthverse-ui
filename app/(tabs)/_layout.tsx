import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="login" />
      <Tabs.Screen name="otp" />
      <Tabs.Screen name="entry" />
    </Tabs>
  );
}
