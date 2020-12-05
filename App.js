import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './navigator.component';
import {default as mapping} from './mapping.json';
import {ApiState} from './context/ApiState';


export default () => {
  return (
    <ApiState>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light} customMapping={mapping}>
        <AppNavigator />
      </ApplicationProvider>
    </ApiState>
  );
};
