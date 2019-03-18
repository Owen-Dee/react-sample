import Cookie from 'js-cookie';

const COOKIE_KEY_ACCESS_TOKEN = 'qunhe-jwt';
const COOKIE_KEY_REFRESH_TOKEN = 'qunhe-refresh';


const cookieOptions = { expires: Infinity, httpOnly: false };

function getTokensFromCookie() {
    const accessToken = Cookie.get(COOKIE_KEY_ACCESS_TOKEN);
    const refreshToken = Cookie.get(COOKIE_KEY_REFRESH_TOKEN);
    return {
        accessToken,
        refreshToken
    };
}

function setTokensToCookie({ accessToken, refreshToken, expiresIn } = {}) {
    if (accessToken && refreshToken && expiresIn) {
        Cookie.set(COOKIE_KEY_REFRESH_TOKEN, refreshToken, cookieOptions);
        Cookie.set(COOKIE_KEY_ACCESS_TOKEN, accessToken, {
            ...cookieOptions,
            expires: expiresIn / 3600 / 24
        });
    } else {
        throw new Error('accessToken & refreshToken & expiration must not be empty!');
    }
}

export default (function () {
    let _accessToken = null;
    let _refreshToken = null;
    return {
        get() {
            if (_accessToken && _refreshToken) {
                return {
                    accessToken: _accessToken,
                    refreshToken: _refreshToken
                };
            }

            return getTokensFromCookie();
        },
        set({ accessToken, refreshToken, expiresIn } = {}) {
            _accessToken = accessToken;
            _refreshToken = refreshToken;
            setTokensToCookie({
                accessToken: _accessToken,
                refreshToken: _refreshToken,
                expiresIn
            });
        },
        clear() {
            Cookie.remove(COOKIE_KEY_ACCESS_TOKEN, cookieOptions);
            Cookie.remove(COOKIE_KEY_REFRESH_TOKEN, cookieOptions);
            _accessToken = null;
            _refreshToken = null;
        }
    };
})();
