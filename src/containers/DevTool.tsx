import React from 'react';
import { createDevTools } from 'redux-devtools';
import DockMonitor from 'redux-devtools-dock-monitor';
import LogMonitor from 'redux-devtools-log-monitor';

export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-H"
               changePositionKey="ctrl-Q" >
    <LogMonitor />
  </DockMonitor>
);
