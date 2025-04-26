const API_URL = 'http://46.63.69.24/v1';

import AsyncStorage from '@react-native-async-storage/async-storage';

async function saveTokens({ access_token, refresh_token }) {
	try {
		await AsyncStorage.setItem('token', access_token);
		await AsyncStorage.setItem('refreshToken', refresh_token);
		console.log(access_token, 'pidaras', refresh_token,'hui')
		console.log('Tokens saved');
	} catch (err) {
		console.error('Ошибка при сохранении токенов:', err);
	}
}

export async function fetchWithAuth(url, options = {}) {

	let token = await AsyncStorage.getItem('token');
	console.log(token, 'token')
	const baseHeaders = {
		...(options.headers || {}),
		Authorization: `Bearer ${token}`,
		'Content-Type': 'application/json', // по умолчанию JSON
	};

	let res = await fetch(url, {
		...options,
		headers: baseHeaders,
	});

	// Если токен истёк (401)
	if (res.status === 401) {
		try {
			await refreshToken();
			token = await AsyncStorage.getItem('token');

			const retryHeaders = {
				...baseHeaders,
				Authorization: `Bearer ${token}`,
			};

			res = await fetch(url, {
				...options,
				headers: retryHeaders,
			});
		} catch (err) {
			throw new Error('Сессия истекла. Пожалуйста, войдите снова.');
		}
	}

	return res;
}


export async function connectWebSocketWithAuth(baseWsUrl) {
	let token = await AsyncStorage.getItem('token');
	let ws;

	const createSocket = (tokenToUse) => {
		const url = `${baseWsUrl}?token=${encodeURIComponent(tokenToUse)}`;
		return new WebSocket(url);
	};

	ws = createSocket(token);

	return new Promise((resolve, reject) => {
		ws.onopen = () => {
			console.log('WebSocket connection established');
			resolve(ws);
		};

		ws.onerror = async () => {
			console.warn('Initial WebSocket connection failed, trying to refresh token...');
			try {
				await refreshToken();
				token = await AsyncStorage.getItem('token');
				ws = createSocket(token);

				ws.onopen = () => {
					console.log('WebSocket reconnected successfully');
					resolve(ws);
				};

				ws.onerror = () => {
					reject(new Error('Сессия истекла. Войдите снова.'));
				};
			} catch (err) {
				reject(new Error('Сессия истекла. Войдите снова.'));
			}
		};
	});
}



export async function login(userData) {
	try {
		const res = await fetch(`${API_URL}/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userData),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || 'Ошибка при входе');
		}

		await saveTokens(data)

		return data; // { token, refreshToken, user }
	} catch (err) {
		console.error('Login error:', err);
		throw err;
	}
}

export async function register(userData) {
	try {
		const res = await fetch(`${API_URL}/auth/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(userData),
		});

		const data = await res.json();

		console.log(data,'data')

		if (!res.ok) {
			throw new Error(data.message || 'Ошибка при регистрации');
		}


		await saveTokens(data)

		console.log('successful', data)
		return data; // { token, refreshToken, user }
	} catch (err) {
		console.error('Registration error:', err);
		throw err;
	}
}

export async function refreshToken() {
	const refresh = await AsyncStorage.getItem('refreshToken');

	if (!refresh) throw new Error('Нет refresh токена');

	try {
		const res = await fetch(`${API_URL}/auth/refresh`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ refresh_token: refresh }),
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || 'Не удалось обновить токен');
		}

		await saveTokens(data);

		return data;
	} catch (err) {
		console.error('Refresh token error:', err);
		throw err;
	}
}

export async function getCurrentUser() {
	try {
		const res = await fetchWithAuth(`${API_URL}/users/me`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await res.json();

		if (!res.ok) {
			throw new Error(data.message || 'Current account does not exist');
		}

		console.log('✅ current user found');
		return data;
	} catch (err) {
		console.error('❌ Error in getCurrentUser:', err);
		throw err;
	}
}



export default {
	register,
	login,
};