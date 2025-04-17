# IoT Dashboard

## Implementation Insights

### Most Interesting Aspects :star2:
The most interesting part was implementing real-time WebSocket communication to reflect live sensor states on the UI. Managing dynamic data with useReducer and updating the visual state seamlessly was both challenging and rewarding. It was also fun to make the data visually intuitive using gauge chart and dark mode.

### Technical Challenges :thinking:
The most cumbersome part was handling WebSocket disconnections and reconnections, especially dealing with network drops, silent socket closures, and ensuring the client correctly attempts reconnection using the proper endpoint. Debugging silent failures or idle timeouts also added friction.

## Future Improvements :computer:

### Enhanced User Experience
1. Add clear status indicators for showing Websocket status
2. Include auto-retry countdowns so users know when reconnection attempts will happen.
3. Provide sensor data history for better insights and tracking
4. Add an option to toggle between dark and light mode for user preference

## Installation :gear:
1. Clone this repository
2. Install dependencies with `npm install`
3. Start the application with `npm start`

## Run tests :white_check_mark:
```
npm run test
```