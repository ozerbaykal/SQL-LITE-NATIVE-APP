import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/rootNavigator';
import {Provider} from 'react-redux';
import store from './src/store';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

const App = () => {
  return (

    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.dark}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
};

export default App;
