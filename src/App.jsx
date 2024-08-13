import { useState } from 'react';
import  { BrowserRouter,Routes,Route, Navigate  } from 'react-router-dom'
import { ClienteRoutes, PublicRoutes } from './routes/Routes';

function App() {
	return (

		<BrowserRouter>
		<Routes>
			<Route path="/" element={ < Navigate to="/Games"/>  }/>
			<Route path='*' element={ <PublicRoutes/> }/>
			<Route path='/cliente/*' element={ <ClienteRoutes/> }></Route>
		</Routes>
		</BrowserRouter>
		
	);
}

export default App;
