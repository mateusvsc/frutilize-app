// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: 'Início' }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explorar' }}
      />
      {/* Se quiser usar sua antiga LayoutScreen como uma tab separada,
          crie o arquivo layout.tsx e adicione aqui: */}
      {/* 
      <Tabs.Screen
        name="layout"
        options={{ title: 'Layout' }}
      />
      */}
    </Tabs>
  );
}