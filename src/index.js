import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { persistStore } from "redux-persist";
import { PersistGate } from 'redux-persist/integration/react';
import App from "./App";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";

let persistor = persistStore( store );

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
			<HashRouter>
				<App />
			</HashRouter>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);