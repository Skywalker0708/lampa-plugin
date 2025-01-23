// online mod extend test

//22.01.2025 - Fix

(function () {
    'use strict';

    function startsWith(str, searchString) {
        return str.lastIndexOf(searchString, 0) === 0;
    }

    function endsWith(str, searchString) {
        var start = str.length - searchString.length;
        if (start < 0) return false;
        return str.indexOf(searchString, start) === start;
    }

    var myIp = '';

    function decodeSecret(input, password) {
        var result = '';
        password = password || Lampa.Storage.get('online_mod_secret_password', '') + '';

        if (input && password) {
            var hash = Lampa.Utils.hash(password);

            while (hash.length < input.length) {
                hash += hash;
            }

            var i = 0;

            while (i < input.length) {
                result += String.fromCharCode(input[i] ^ hash.charCodeAt(i));
                i++;
            }
        }

        return result;
    }

    function isDebug() {
        var secret = decodeSecret([92, 85, 91, 65, 84]);
        return secret === 'debug';
    }

    function isDebug2() {
        var secret = decodeSecret([86, 81, 81, 71, 83]);
        return secret === 'debug';
    }


    function fanserialsHost() {
        return 'https://s1.fanserial.tv';
    }

    function filmixToken(dev_id, token) {
        return '?user_dev_id=' + dev_id + '&user_dev_name=Xiaomi&user_dev_token=' + token + '&user_dev_vendor=Xiaomi&user_dev_os=14&user_dev_apk=2.2.0&app_lang=ru-rRU';
    }

    function filmixUserAgent() {
        return 'okhttp/3.10.0';
    }

    function baseUserAgent() {
        return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36';
    }

    function vcdnToken() {
        return atob("YXBpX3Rva2VuPQ==") + (isDebug() ? decodeSecret([94, 99, 78, 68, 91, 124, 67, 103, 12, 14, 74, 64, 126, 105, 93, 113, 126, 0, 125, 9, 110, 82, 84, 12, 114, 120, 114, 117, 6, 113, 96, 99]) : decodeSecret([0, 10, 1, 126, 69, 15, 11, 114, 119, 11, 77, 94, 89, 126, 82, 93, 110, 106, 72, 77, 101, 102, 2, 90, 107, 83, 88, 79, 113, 91, 3, 5], atob('RnVja0x1bWV4')));
    }

    function setMyIp(ip) {
        myIp = ip;
    }

    function getMyIp() {
        return myIp;
    }

    function proxy(name) {
        var ip = getMyIp() || '';
        var param_ip = Lampa.Storage.field('online_mod_proxy_find_ip') === true ? 'ip' + ip + '/' : '';
        var proxy1 = new Date().getHours() % 2 ? 'https://cors.nb557.workers.dev:8443/' : 'https://cors.fx666.workers.dev:8443/';
        var proxy2 = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'iqslgbok.deploy.cx/';
        var proxy3 = 'https://cors557.deno.dev/';
        var proxy_apn = '';
        var proxy_secret = '';
        var proxy_secret_ip = '';

        if (isDebug()) {
            proxy_apn = (window.location.protocol === 'https:' ? 'https://' : 'http://') + decodeSecret([83, 85, 76, 77, 71, 82, 76, 65, 26, 92, 85, 73, 88, 92, 64, 26, 83, 76, 23]);
            proxy_secret = decodeSecret([80, 68, 77, 68, 64, 3, 27, 31, 85, 72, 94, 20, 89, 81, 12, 1, 6, 26, 83, 95, 64, 81, 81, 23, 85, 64, 68, 23]);
            proxy_secret_ip = proxy_secret + (param_ip || 'ip/');
        }

        var proxy_other = Lampa.Storage.field('online_mod_proxy_other') === true;
        var proxy_other_url = proxy_other ? Lampa.Storage.field('online_mod_proxy_other_url') + '' : '';
        var user_proxy1 = (proxy_other_url || proxy1) + param_ip;
        var user_proxy2 = (proxy_other_url || proxy2) + param_ip;
        var user_proxy3 = (proxy_other_url || proxy3) + param_ip;
        if (name === 'filmix_site') return user_proxy2;
        if (name === 'filmix_abuse') return window.location.protocol === 'https:' ? 'https://cors.apn.monster/' : 'http://cors.cfhttp.top/';
        if (name === 'cookie') return user_proxy1;
        if (name === 'cookie2') return user_proxy2;
        if (name === 'cookie3') return user_proxy3;

        if (Lampa.Storage.field('online_mod_proxy_' + name) === true) {
            if (name === 'iframe') return user_proxy2;
            if (name === 'filmix') return proxy_secret_ip || user_proxy1;
            if (name === 'anilibria') return user_proxy2;
            if (name === 'animelib') return proxy_other ? proxy_secret : proxy_apn;
            if (name === 'kodik') return user_proxy2;
        }

        return '';
    }

    function fixLink(link, referrer) {
        if (link) {
            if (!referrer || link.indexOf('://') !== -1) return link;
            var url = new URL(referrer);
            if (startsWith(link, '//')) return url.protocol + link;
            if (startsWith(link, '/')) return url.origin + link;
            if (startsWith(link, '?')) return url.origin + url.pathname + link;
            if (startsWith(link, '#')) return url.origin + url.pathname + url.search + link;
            var base = url.href.substring(0, url.href.lastIndexOf('/') + 1);
            return base + link;
        }

        return link;
    }

    function proxyLink(link, proxy, proxy_enc, enc) {
        if (link && proxy) {
            if (proxy_enc == null) proxy_enc = '';
            if (enc == null) enc = 'enc';

            if (enc === 'enc') {
                var pos = link.indexOf('/');
                if (pos !== -1 && link.charAt(pos + 1) === '/') pos++;
                var part1 = pos !== -1 ? link.substring(0, pos + 1) : '';
                var part2 = pos !== -1 ? link.substring(pos + 1) : link;
                return proxy + 'enc/' + encodeURIComponent(btoa(proxy_enc + part1)) + '/' + part2;
            }

            if (enc === 'enc1') {
                var _pos = link.lastIndexOf('/');

                var _part = _pos !== -1 ? link.substring(0, _pos + 1) : '';

                var _part2 = _pos !== -1 ? link.substring(_pos + 1) : link;

                return proxy + 'enc1/' + encodeURIComponent(btoa(proxy_enc + _part)) + '/' + _part2;
            }

            if (enc === 'enc2') {
                var posEnd = link.lastIndexOf('?');
                var posStart = link.lastIndexOf('://');
                if (posEnd === -1 || posEnd <= posStart) posEnd = link.length;
                if (posStart === -1) posStart = -3;
                var name = link.substring(posStart + 3, posEnd);
                posStart = name.lastIndexOf('/');
                name = posStart !== -1 ? name.substring(posStart + 1) : '';
                return proxy + 'enc2/' + encodeURIComponent(btoa(proxy_enc + link)) + '/' + name;
            }

            return proxy + proxy_enc + link;
        }

        return link;
    }

    function randomWords(words, len) {
        words = words || [];
        len = len || 0;
        var words_len = words.length;
        if (!words_len) return '';
        var str = '';

        for (var i = 0; i < len; i++) {
            str += words[Math.floor(Math.random() * words_len)];
        }

        return str;
    }

    function randomChars(chars, len) {
        return randomWords((chars || '').split(''), len);
    }

    function randomHex(len) {
        return randomChars('0123456789abcdef', len);
    }

    function randomId(len) {
        return randomChars('0123456789abcdefghijklmnopqrstuvwxyz', len);
    }

    function checkAndroidVersion(needVersion) {
        if (typeof AndroidJS !== 'undefined') {
            try {
                var current = AndroidJS.appVersion().split('-');
                var versionCode = current.pop();

                if (parseInt(versionCode, 10) >= needVersion) {
                    return true;
                }
            } catch (e) { }
        }

        return false;
    }

    var Utils = {
        decodeSecret: decodeSecret,
        isDebug: isDebug,
        isDebug2: isDebug2,
        fanserialsHost: fanserialsHost,
        filmixToken: filmixToken,
        filmixUserAgent: filmixUserAgent,
        baseUserAgent: baseUserAgent,
        vcdnToken: vcdnToken,
        setMyIp: setMyIp,
        getMyIp: getMyIp,
        proxy: proxy,
        fixLink: fixLink,
        proxyLink: proxyLink,
        randomWords: randomWords,
        randomChars: randomChars,
        randomHex: randomHex,
        randomId: randomId,
        checkAndroidVersion: checkAndroidVersion
    };

    var network$1 = new Lampa.Reguest();
    var cache = {};
    var total_cnt = 0;
    var proxy_cnt = 0;
    var good_cnt = 0;
    var CACHE_SIZE = 100;
    var CACHE_TIME = 1000 * 60 * 60;

    function get(method, oncomplite, onerror) {
        var use_proxy = total_cnt >= 10 && good_cnt > total_cnt / 2;
        if (!use_proxy) total_cnt++;
        var kp_prox = 'https://cors.kp556.workers.dev:8443/';
        var url = 'https://kinopoiskapiunofficial.tech/';
        url += method;
        network$1.timeout(15000);
        network$1.silent((use_proxy ? kp_prox : '') + url, function (json) {
            oncomplite(json);
        }, function (a, c) {
            use_proxy = !use_proxy && (proxy_cnt < 10 || good_cnt > proxy_cnt / 2);

            if (use_proxy && (a.status == 429 || a.status == 0 && a.statusText !== 'timeout')) {
                proxy_cnt++;
                network$1.timeout(15000);
                network$1.silent(kp_prox + url, function (json) {
                    good_cnt++;
                    oncomplite(json);
                }, onerror, false, {
                    headers: {
                        'X-API-KEY': '2a4a0808-81a3-40ae-b0d3-e11335ede616'
                    }
                });
            } else onerror(a, c);
        }, false, {
            headers: {
                'X-API-KEY': '2a4a0808-81a3-40ae-b0d3-e11335ede616'
            }
        });
    }

    function getComplite(method, oncomplite) {
        get(method, oncomplite, function () {
            oncomplite(null);
        });
    }

    function getCompliteIf(condition, method, oncomplite) {
        if (condition) getComplite(method, oncomplite); else {
            setTimeout(function () {
                oncomplite(null);
            }, 10);
        }
    }

    function getCache(key) {
        var res = cache[key];

        if (res) {
            var cache_timestamp = new Date().getTime() - CACHE_TIME;
            if (res.timestamp > cache_timestamp) return res.value;

            for (var ID in cache) {
                var node = cache[ID];
                if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
            }
        }

        return null;
    }

    function setCache(key, value) {
        var timestamp = new Date().getTime();
        var size = Object.keys(cache).length;

        if (size >= CACHE_SIZE) {
            var cache_timestamp = timestamp - CACHE_TIME;

            for (var ID in cache) {
                var node = cache[ID];
                if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
            }

            size = Object.keys(cache).length;

            if (size >= CACHE_SIZE) {
                var timestamps = [];

                for (var _ID in cache) {
                    var _node = cache[_ID];
                    timestamps.push(_node && _node.timestamp || 0);
                }

                timestamps.sort(function (a, b) {
                    return a - b;
                });
                cache_timestamp = timestamps[Math.floor(timestamps.length / 2)];

                for (var _ID2 in cache) {
                    var _node2 = cache[_ID2];
                    if (!(_node2 && _node2.timestamp > cache_timestamp)) delete cache[_ID2];
                }
            }
        }

        cache[key] = {
            timestamp: timestamp,
            value: value
        };
    }

    function getFromCache(method, oncomplite, onerror) {
        var json = getCache(method);

        if (json) {
            setTimeout(function () {
                oncomplite(json, true);
            }, 10);
        } else get(method, oncomplite, onerror);
    }

    function clear() {
        network$1.clear();
    }

    var KP = {
        get: get,
        getComplite: getComplite,
        getCompliteIf: getCompliteIf,
        getCache: getCache,
        setCache: setCache,
        getFromCache: getFromCache,
        clear: clear
    };







    function filmix(component, _object, _debug) {
        var network = new Lampa.Reguest();
        var extract = {};
        var object = _object;
        var debug = _debug;
        var prox = component.proxy('filmix');
        var prox2 = component.proxy('filmix_site');
        var prox3 = component.proxy('filmix_abuse');
        var headers = Lampa.Platform.is('android') ? {
            'User-Agent': Utils.filmixUserAgent()
        } : {};
        var prox_enc = '';

        if (prox) {
            prox_enc += 'param/User-Agent=' + encodeURIComponent(Utils.filmixUserAgent()) + '/';
        }

        var embed = 'http://filmixapp.cyou/api/v2/';
        var site = 'https://filmix.quest/';
        var select_title = '';
        var prefer_http = Lampa.Storage.field('online_mod_prefer_http') === true;
        var filter_items = {};
        var choice = {
            season: 0,
            voice: 0,
            voice_name: ''
        };
        var secret = '';
        var secret_url = '';

        function decodeSecretToken(callback) {
            {
                if (callback) callback();
                return;
            }
        }

        if (!window.mod_filmix) {
            window.mod_filmix = {
                max_qualitie: 480,
                is_max_qualitie: false
            };
        }

        var token = Lampa.Storage.get('filmix_token', '') + '';
        var dev_token = Utils.filmixToken(Utils.randomHex(16), token || 'aaaabbbbccccddddeeeeffffaaaabbbb');
        var abuse_token = prox3 ? Utils.filmixToken(Utils.randomHex(16), '') : '';
        /**
         * Начать поиск
         * @param {Object} _object
         * @param {String} kinopoisk_id
         */

        this.search = function (_object, kinopoisk_id, data) {
            var _this = this;

            object = _object;
            select_title = object.search || object.movie.title;
            if (this.wait_similars && data && data[0].is_similars) return find(data[0].id);
            var search_date = object.search_date || !object.clarification && (object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date) || '0000';
            var search_year = parseInt((search_date + '').slice(0, 4));
            var orig_titles = [];

            if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
                orig_titles = object.movie.alternative_titles.results.map(function (t) {
                    return t.title;
                });
            }

            if (object.movie.original_title) orig_titles.push(object.movie.original_title);
            if (object.movie.original_name) orig_titles.push(object.movie.original_name);
            var clean_title = component.cleanTitle(select_title).replace(/\b(\d\d\d\d+)\b/g, '+$1');
            var object_date = object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date || '0000';
            var object_year = parseInt((object_date + '').slice(0, 4));

            if (object_year) {
                clean_title = clean_title.replace(new RegExp(' \\+(' + object_year + ')$'), ' $1');
            }

            var display = function display(json) {
                var is_sure = false;
                json.forEach(function (c) {
                    if (!c.orig_title) c.orig_title = c.original_title || c.original_name;
                    if (!c.year && c.alt_name) c.year = parseInt(c.alt_name.split('-').pop());
                });
                var cards = json;

                if (cards.length) {
                    if (orig_titles.length) {
                        var tmp = cards.filter(function (c) {
                            return component.containsAnyTitle([c.orig_title, c.title], orig_titles);
                        });

                        if (tmp.length) {
                            cards = tmp;
                            is_sure = true;
                        }
                    }

                    if (select_title) {
                        var _tmp = cards.filter(function (c) {
                            return component.containsAnyTitle([c.title, c.orig_title], [select_title]);
                        });

                        if (_tmp.length) {
                            cards = _tmp;
                            is_sure = true;
                        }
                    }

                    if (cards.length > 1 && search_year) {
                        var _tmp2 = cards.filter(function (c) {
                            return c.year == search_year;
                        });

                        if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
                            return c.year && c.year > search_year - 2 && c.year < search_year + 2;
                        });
                        if (_tmp2.length) cards = _tmp2;
                    }
                }

                if (cards.length == 1 && is_sure) {
                    if (search_year && cards[0].year) {
                        is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
                    }

                    if (is_sure) {
                        is_sure = false;

                        if (orig_titles.length) {
                            is_sure |= component.equalAnyTitle([cards[0].orig_title, cards[0].title], orig_titles);
                        }

                        if (select_title) {
                            is_sure |= component.equalAnyTitle([cards[0].title, cards[0].orig_title], [select_title]);
                        }
                    }
                }

                if (cards.length == 1 && is_sure) find(cards[0].id); else if (json.length) {
                    _this.wait_similars = true;
                    json.forEach(function (c) {
                        c.is_similars = true;
                        c.seasons_count = c.last_episode && c.last_episode.season;
                        c.episodes_count = c.last_episode && c.last_episode.episode;
                    });
                    component.similars(json);
                    component.loading(false);
                } else component.emptyForQuery(select_title);
            };

            var siteSearch = function siteSearch() {
                var url = site + 'api/v2/suggestions?search_word=' + encodeURIComponent(clean_title);
                network.clear();
                network.timeout(10000);
                network["native"](component.proxyLink(url, prox2), function (json) {
                    display(json && json.posts || []);
                }, function (a, c) {
                    component.empty(network.errorDecode(a, c));
                }, false, {
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
            };

            var apiSearch = function apiSearch(abuse) {
                var url = embed + 'search' + (abuse ? abuse_token : dev_token);
                url = Lampa.Utils.addUrlComponent(url, 'story=' + encodeURIComponent(clean_title));
                url = abuse ? component.proxyLink(url, prox3, '', '') : component.proxyLink(url, prox, prox_enc, 'enc2');
                network.clear();
                network.timeout(10000);
                network["native"](url, function (json) {
                    if (json && json.length) display(json); else siteSearch();
                }, function (a, c) {
                    if (!abuse && abuse_token) apiSearch(true); else siteSearch();
                }, false, {
                    headers: headers
                });
            };

            decodeSecretToken(function () {
                return apiSearch();
            });
        };

        function find(filmix_id, abuse, abuse_error, low_quality) {
            if (!debug && !window.mod_filmix.is_max_qualitie) {
                window.mod_filmix.is_max_qualitie = true;
                token = Lampa.Storage.get('filmix_token', '') + '';
                dev_token = Utils.filmixToken(Utils.randomHex(16), token || 'aaaabbbbccccddddeeeeffffaaaabbbb');

                if (token) {
                    var url = embed + 'user_profile' + dev_token;
                    network.clear();
                    network.timeout(10000);
                    network["native"](component.proxyLink(url, prox, prox_enc, 'enc2'), function (found) {
                        if (found && found.user_data) {
                            window.mod_filmix.max_qualitie = 720;
                            if (found.user_data.is_pro) window.mod_filmix.max_qualitie = 1080;
                            if (found.user_data.is_pro_plus) window.mod_filmix.max_qualitie = 2160;
                        }

                        end_search();
                    }, function (a, c) {
                        end_search();
                    }, false, {
                        headers: headers
                    });
                } else end_search();
            } else end_search();

            function end_search() {
                var url = embed + 'post/' + filmix_id + (abuse ? abuse_token : dev_token);
                url = abuse ? component.proxyLink(url, prox3, '', '') : component.proxyLink(url, prox, prox_enc, 'enc2');
                network.clear();
                network.timeout(10000);
                network["native"](url, function (found) {
                    if (found && Object.keys(found).length) {
                        if (!abuse && abuse_token && checkAbuse(found)) find(filmix_id, true, found); else success(found, low_quality);
                    } else component.emptyForQuery(select_title);
                }, function (a, c) {
                    if (abuse && abuse_error) success(abuse_error); else if (!abuse && abuse_token) find(filmix_id, true, null, true); else component.empty(network.errorDecode(a, c));
                }, false, {
                    headers: headers
                });
            }
        }

        this.extendChoice = function (saved) {
            Lampa.Arrays.extend(choice, saved, true);
        };
        /**
         * Сброс фильтра
         */


        this.reset = function () {
            component.reset();
            choice = {
                season: 0,
                voice: 0,
                voice_name: ''
            };
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Применить фильтр
         * @param {*} type
         * @param {*} a
         * @param {*} b
         */


        this.filter = function (type, a, b) {
            choice[a.stype] = b.index;
            if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
            component.reset();
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Уничтожить
         */


        this.destroy = function () {
            network.clear();
            extract = null;
        };
        /**
         * Успешно, есть данные
         * @param {Object} json
         */


        function success(json, low_quality) {
            component.loading(false);
            extractData(json, low_quality);
            filter();
            append(filtred());
        }

        function checkAbuse(data) {
            var pl_links = data.player_links || {};

            if (pl_links.movie && Object.keys(pl_links.movie).length > 0) {

                for (var ID in pl_links.movie) {
                    var file = pl_links.movie[ID];
                    var stream_url = file.link || '';

                    if (file.translation === 'Заблокировано правообладателем!' && stream_url.indexOf('/abuse_') !== -1) {
                        var found = stream_url.match(/https?:\/\/[^\/]+(\/s\/[^\/]*\/)/);

                        if (found) {
                            {
                                secret = '$1' + found[1];
                                secret_url = '';
                            }

                            return true;
                        }
                    }
                }
            }

            return false;
        }
        /**
         * Получить информацию о фильме
         * @param {Arrays} data
         */


        function extractData(data, low_quality) {
            extract = {};
            var filmix_max_qualitie = low_quality ? 480 : debug ? 2160 : window.mod_filmix.max_qualitie;
            var pl_links = data.player_links || {};

            if (pl_links.playlist && Object.keys(pl_links.playlist).length > 0) {
                var seasons = [];
                var seas_num = 0;

                for (var season_id in pl_links.playlist) {
                    var season = pl_links.playlist[season_id];
                    var voices = [];
                    ++seas_num;

                    for (var voice_id in season) {
                        var episodes = season[voice_id];
                        var items = [];
                        var epis_num = 0;

                        for (var episode_id in episodes) {
                            var file = episodes[episode_id];
                            ++epis_num;
                            var quality_eps = file.qualities.filter(function (qualitys) {
                                return !isNaN(qualitys) && qualitys <= filmix_max_qualitie;
                            });
                            quality_eps.sort(function (a, b) {
                                return b - a;
                            });
                            var max_quality = quality_eps[0];

                            if (max_quality) {
                                var stream_url = file.link || '';
                                if (prefer_http) stream_url = stream_url.replace('https://', 'http://');

                                if (secret) {
                                    stream_url = stream_url.replace(/(https?:\/\/[^\/]+)\/s\/[^\/]*\//, secret);
                                    if (secret_url) stream_url = stream_url.replace(/^https?:\/\//, secret_url);
                                }

                                var seas_id = parseInt(season_id);
                                var epis_id = parseInt(episode_id);

                                if (isNaN(seas_id) || isNaN(epis_id)) {
                                    var s_e = stream_url.substring(stream_url.lastIndexOf('/'));
                                    var str_s_e = s_e.match(/s(\d+)e(\d+)_%s\.mp4/i);

                                    if (str_s_e) {
                                        seas_id = parseInt(str_s_e[1]);
                                        epis_id = parseInt(str_s_e[2]);
                                    }
                                }

                                if (isNaN(seas_id)) seas_id = seas_num;
                                if (isNaN(epis_id)) epis_id = epis_num;
                                items.push({
                                    season: seas_id,
                                    episode: epis_id,
                                    file: stream_url,
                                    quality: max_quality,
                                    qualities: quality_eps
                                });
                            }
                        }

                        if (items.length) {
                            voices.push({
                                id: voice_id,
                                items: items
                            });
                        }
                    }

                    if (voices.length) {
                        seasons.push({
                            id: season_id,
                            title: Lampa.Lang.translate('torrent_serial_season') + ' ' + (isNaN(season_id) ? seas_num : season_id),
                            voices: voices
                        });
                    }
                }

                extract.seasons = seasons;
            } else if (pl_links.movie && Object.keys(pl_links.movie).length > 0) {
                var movies = [];

                for (var ID in pl_links.movie) {
                    var _file = pl_links.movie[ID];
                    var _max_quality = filmix_max_qualitie;

                    var _stream_url = _file.link || '';

                    if (prefer_http) _stream_url = _stream_url.replace('https://', 'http://');

                    if (secret) {
                        _stream_url = _stream_url.replace(/(https?:\/\/[^\/]+)\/s\/[^\/]*\//, secret);
                        if (secret_url) _stream_url = _stream_url.replace(/^https?:\/\//, secret_url);
                    }

                    var _quality_eps = _stream_url.match(/\[([\d,]*)\]\.mp4/i);

                    if (_quality_eps) {
                        _quality_eps = _quality_eps[1].split(',').map(function (quality) {
                            return parseInt(quality);
                        }).filter(function (quality) {
                            return !isNaN(quality) && quality <= filmix_max_qualitie;
                        });

                        _quality_eps.sort(function (a, b) {
                            return b - a;
                        });

                        _max_quality = _quality_eps[0];
                    }

                    if (_max_quality) {
                        var file_url = _stream_url.replace(/\[[\d,]*\](\.mp4)/i, '%s$1');

                        movies.push({
                            translation: _file.translation,
                            file: file_url,
                            quality: _max_quality,
                            qualities: _quality_eps
                        });
                    }
                }

                extract.movies = movies;
            }
        }
        /**
         * Найти поток
         * @param {Object} element
         * @returns string
         */


        function getFile(element) {
            var media = element.media || {};
            var file = media.file;
            var quality = false;

            if (file) {
                quality = {};

                if (media.qualities) {
                    media.qualities.forEach(function (q) {
                        quality[q + 'p'] = file.replace(/%s(\.mp4)/i, q + '$1');
                    });
                    file = file.replace(/%s(\.mp4)/i, media.qualities[0] + '$1');
                }
            }

            return {
                file: file,
                quality: quality
            };
        }
        /**
         * Построить фильтр
         */


        function filter() {
            filter_items = {
                season: extract.seasons ? extract.seasons.map(function (s) {
                    return s.title;
                }) : [],
                voice: []
            };
            if (!filter_items.season[choice.season]) choice.season = 0;

            if (extract.seasons && extract.seasons[choice.season]) {
                filter_items.voice = extract.seasons[choice.season].voices.map(function (v) {
                    return v.id;
                });
            }

            if (!filter_items.voice[choice.voice]) choice.voice = 0;

            if (choice.voice_name) {
                var inx = filter_items.voice.indexOf(choice.voice_name);
                if (inx == -1) choice.voice = 0; else if (inx !== choice.voice) {
                    choice.voice = inx;
                }
            }

            component.filter(filter_items, choice);
        }
        /**
         * Отфильтровать файлы
         * @returns array
         */


        function filtred() {
            var filtred = [];

            if (extract.seasons) {
                var season = extract.seasons[choice.season] || {};
                var voices = season.voices || [];
                var voice = voices[choice.voice] || {};
                var voice_name = Lampa.Utils.shortText(filter_items.voice[choice.voice] || '', 50);
                var items = voice.items || [];
                items.forEach(function (media) {
                    filtred.push({
                        title: component.formatEpisodeTitle(media.season, media.episode),
                        quality: media.quality + 'p',
                        info: voice_name ? ' / ' + voice_name : '',
                        season: media.season,
                        episode: media.episode,
                        media: media
                    });
                });
            } else if (extract.movies) {
                extract.movies.forEach(function (media) {
                    filtred.push({
                        title: media.translation || select_title,
                        quality: media.quality + 'p',
                        info: '',
                        media: media
                    });
                });
            }

            return filtred;
        }
        /**
         * Добавить видео
         * @param {Array} items
         */


        function append(items) {
            component.reset();
            var viewed = Lampa.Storage.cache('online_view', 5000, []);
            var last_episode = component.getLastEpisode(items);
            items.forEach(function (element) {
                if (element.season) {
                    element.translate_episode_end = last_episode;
                    element.translate_voice = filter_items.voice[choice.voice];
                }

                var hash = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title].join('') : object.movie.original_title);
                var view = Lampa.Timeline.view(hash);
                var item = Lampa.Template.get('online_mod', element);
                var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.title);
                element.timeline = view;
                item.append(Lampa.Timeline.render(view));

                if (Lampa.Timeline.details) {
                    item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
                }

                if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                item.on('hover:enter', function () {
                    if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
                    var extra = getFile(element);

                    if (extra.file) {
                        var playlist = [];
                        var first = {
                            url: component.getDefaultQuality(extra.quality, extra.file),
                            quality: component.renameQualityMap(extra.quality),
                            timeline: element.timeline,
                            title: element.season ? element.title : select_title + (element.title == select_title ? '' : ' / ' + element.title)
                        };

                        if (element.season) {
                            items.forEach(function (elem) {
                                var ex = getFile(elem);
                                playlist.push({
                                    url: component.getDefaultQuality(ex.quality, ex.file),
                                    quality: component.renameQualityMap(ex.quality),
                                    timeline: elem.timeline,
                                    title: elem.title
                                });
                            });
                        } else {
                            playlist.push(first);
                        }

                        if (playlist.length > 1) first.playlist = playlist;
                        Lampa.Player.play(first);
                        Lampa.Player.playlist(playlist);

                        if (viewed.indexOf(hash_file) == -1) {
                            viewed.push(hash_file);
                            item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                            Lampa.Storage.set('online_view', viewed);
                        }
                    } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                });
                component.append(item);
                component.contextmenu({
                    item: item,
                    view: view,
                    viewed: viewed,
                    hash_file: hash_file,
                    element: element,
                    file: function file(call) {
                        call(getFile(element));
                    }
                });
            });
            component.start(true);
        }
    }

    function anilibria(component, _object) {
        var network = new Lampa.Reguest();
        var extract = {};
        var object = _object;
        var select_title = '';
        var prox = component.proxy('anilibria');
        var embed = 'https://api.anilibria.tv/v3/';
        var filter_items = {};
        var choice = {
            season: 0,
            voice: 0
        };
        /**
         * Поиск
         * @param {Object} _object
         */

        this.search = function (_object, kinopoisk_id, data) {
            var _this = this;

            object = _object;
            select_title = object.search || object.movie.title;
            if (this.wait_similars && data && data[0].is_similars) return getRelease(data[0]);
            var search_year = object.search_date;
            var orig_titles = [];

            if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
                orig_titles = object.movie.alternative_titles.results.map(function (t) {
                    return t.title;
                });
            }

            if (object.movie.original_title) orig_titles.push(object.movie.original_title);
            if (object.movie.original_name) orig_titles.push(object.movie.original_name);

            var display = function display(items) {
                if (items && items.length && items.forEach) {
                    var is_sure = false;
                    items.forEach(function (c) {
                        c.ru_title = c.names && c.names.ru;
                        c.en_title = c.names && c.names.en;
                        c.alt_title = c.names && c.names.alternative;
                        c.year = c.season && c.season.year && parseInt(c.season.year) || 0;
                    });
                    var cards = items;

                    if (cards.length) {
                        if (orig_titles.length) {
                            var tmp = cards.filter(function (c) {
                                return component.containsAnyTitle([c.en_title, c.ru_title, c.alt_title], orig_titles);
                            });

                            if (tmp.length) {
                                cards = tmp;
                                is_sure = true;
                            }
                        }

                        if (select_title) {
                            var _tmp = cards.filter(function (c) {
                                return component.containsAnyTitle([c.ru_title, c.en_title, c.alt_title], [select_title]);
                            });

                            if (_tmp.length) {
                                cards = _tmp;
                                is_sure = true;
                            }
                        }

                        if (cards.length > 1 && search_year) {
                            var _tmp2 = cards.filter(function (c) {
                                return c.year == search_year;
                            });

                            if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
                                return c.year && c.year > search_year - 2 && c.year < search_year + 2;
                            });
                            if (_tmp2.length) cards = _tmp2;
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        if (search_year && cards[0].year) {
                            is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
                        }

                        if (is_sure) {
                            is_sure = false;

                            if (orig_titles.length) {
                                is_sure |= component.equalAnyTitle([cards[0].en_title, cards[0].ru_title, cards[0].alt_title], orig_titles);
                            }

                            if (select_title) {
                                is_sure |= component.equalAnyTitle([cards[0].ru_title, cards[0].en_title, cards[0].alt_title], [select_title]);
                            }
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        getRelease(cards[0]);
                    } else {
                        _this.wait_similars = true;
                        items.forEach(function (c) {
                            c.is_similars = true;

                            if (!(c.type && c.type.string === 'MOVIE')) {
                                c.episodes_count = c.player && c.player.episodes && c.player.episodes.last;
                            }
                        });
                        component.similars(items);
                        component.loading(false);
                    }
                } else component.emptyForQuery(select_title);
            };

            var url = embed + 'title/search';
            url = Lampa.Utils.addUrlComponent(url, 'filter=names,season,type,player');
            url = Lampa.Utils.addUrlComponent(url, 'limit=20');
            url = Lampa.Utils.addUrlComponent(url, 'search=' + encodeURIComponent(select_title));
            network.clear();
            network.timeout(1000 * 30);
            network.silent(component.proxyLink(url, prox), function (json) {
                display(json && json.list);
            }, function (a, c) {
                component.empty(network.errorDecode(a, c));
            });
        };

        this.extendChoice = function (saved) {
            Lampa.Arrays.extend(choice, saved, true);
        };
        /**
         * Сброс фильтра
         */


        this.reset = function () {
            component.reset();
            choice = {
                season: 0,
                voice: 0
            };
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Применить фильтр
         * @param {*} type
         * @param {*} a
         * @param {*} b
         */


        this.filter = function (type, a, b) {
            choice[a.stype] = b.index;
            component.reset();
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Уничтожить
         */


        this.destroy = function () {
            network.clear();
            extract = null;
        };

        function getRelease(json) {
            if (json.player && json.player.host && json.player.list && Object.keys(json.player.list).length) {
                success(json);
            } else {
                component.emptyForQuery(select_title);
                Lampa.Noty.show(Lampa.Lang.translate('online_mod_blockedlink_copyright'));
            }
        }

        function success(json) {
            component.loading(false);
            extract = json;
            filter();
            append(filtred());
        }
        /**
         * Построить фильтр
         */


        function filter() {
            filter_items = {
                season: [],
                voice: []
            };
            component.filter(filter_items, choice);
        }
        /**
         * Получить потоки
         * @param {String} host
         * @param {Object} hls
         * @returns array
         */


        function extractItems(host, hls) {
            var items = [];

            if (hls) {
                if (hls.fhd) {
                    items.push({
                        label: '1080p',
                        quality: 1080,
                        file: host + hls.fhd
                    });
                }

                if (hls.hd) {
                    items.push({
                        label: '720p',
                        quality: 720,
                        file: host + hls.hd
                    });
                }

                if (hls.sd) {
                    items.push({
                        label: '480p',
                        quality: 480,
                        file: host + hls.sd
                    });
                }
            }

            return items;
        }
        /**
         * Отфильтровать файлы
         * @returns array
         */


        function filtred() {
            var filtred = [];

            if (extract.player && extract.player.host && extract.player.list && Object.keys(extract.player.list).length) {
                var host = 'https://' + extract.player.host;

                if (extract.type && extract.type.string === 'MOVIE' && Object.keys(extract.player.list).length === 1) {
                    for (var ID in extract.player.list) {
                        var episode = extract.player.list[ID];
                        var items = extractItems(host, episode.hls);
                        filtred.push({
                            title: extract.ru_title || extract.en_title || select_title,
                            orig_title: extract.en_title || extract.ru_title || select_title,
                            quality: items[0] ? items[0].label : '360p ~ 1080p',
                            info: '',
                            media: items
                        });
                    }
                } else {
                    for (var _ID in extract.player.list) {
                        var _episode = extract.player.list[_ID];

                        var _items = extractItems(host, _episode.hls);

                        filtred.push({
                            title: component.formatEpisodeTitle(null, _episode.episode, _episode.name),
                            orig_title: extract.en_title || extract.ru_title || select_title,
                            quality: _items[0] ? _items[0].label : '360p ~ 1080p',
                            info: '',
                            season: 1,
                            episode: _episode.episode,
                            media: _items
                        });
                    }
                }
            }

            return filtred;
        }
        /**
         * Найти поток
         * @param {Object} element
         * @returns string
         */


        function getFile(element) {
            var file = '';
            var quality = false;
            var items = element.media;

            if (items && items.length) {
                file = items[0].file;
                quality = {};
                items.forEach(function (item) {
                    quality[item.label] = item.file;
                });
            }

            return {
                file: file,
                quality: quality
            };
        }
        /**
         * Показать файлы
         */


        function append(items) {
            component.reset();
            var viewed = Lampa.Storage.cache('online_view', 5000, []);
            items.forEach(function (element) {
                var hash = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title].join('') : object.movie.original_title + element.orig_title);
                var view = Lampa.Timeline.view(hash);
                var item = Lampa.Template.get('online_mod', element);
                var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title].join('') : object.movie.original_title + element.orig_title + element.title);
                element.timeline = view;
                item.append(Lampa.Timeline.render(view));

                if (Lampa.Timeline.details) {
                    item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
                }

                if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                item.on('hover:enter', function () {
                    if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
                    var extra = getFile(element);

                    if (extra.file) {
                        var playlist = [];
                        var first = {
                            url: component.getDefaultQuality(extra.quality, extra.file),
                            quality: component.renameQualityMap(extra.quality),
                            timeline: element.timeline,
                            title: element.title
                        };

                        if (element.season) {
                            items.forEach(function (elem) {
                                var ex = getFile(elem);
                                playlist.push({
                                    url: component.getDefaultQuality(ex.quality, ex.file),
                                    quality: component.renameQualityMap(ex.quality),
                                    timeline: elem.timeline,
                                    title: elem.title
                                });
                            });
                        } else {
                            playlist.push(first);
                        }

                        if (playlist.length > 1) first.playlist = playlist;
                        Lampa.Player.play(first);
                        Lampa.Player.playlist(playlist);

                        if (viewed.indexOf(hash_file) == -1) {
                            viewed.push(hash_file);
                            item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                            Lampa.Storage.set('online_view', viewed);
                        }
                    } else Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                });
                component.append(item);
                component.contextmenu({
                    item: item,
                    view: view,
                    viewed: viewed,
                    hash_file: hash_file,
                    file: function file(call) {
                        call(getFile(element));
                    }
                });
            });
            component.start(true);
        }
    }

    function animelib(component, _object) {
        var network = new Lampa.Reguest();
        var extract = {};
        var object = _object;
        var select_title = '';
        var prox = component.proxy('animelib');
        var host = 'https://anilib.me';
        var ref = host + '/';
        var embed = 'https://api2.mangalib.me/api/';
        var prox_enc = '';

        if (prox) {
            prox_enc += 'param/Origin=' + encodeURIComponent(host) + '/';
            prox_enc += 'param/Referer=' + encodeURIComponent(ref) + '/';
        }

        var servers = [{
            name: 'Основной',
            url: 'https://video1.anilib.me/.%D0%B0s/'
        }, {
            name: 'Резервный 1',
            url: 'https://video2.anilib.me/.%D0%B0s/'
        }, {
            name: 'Резервный 2',
            url: 'https://video3.anilib.me/.%D0%B0s/'
        }];
        var filter_items = {};
        var choice = {
            season: 0,
            voice: 0,
            voice_name: '',
            server: 0
        };
        /**
         * Поиск
         * @param {Object} _object
         */

        this.search = function (_object, kinopoisk_id, data) {
            var _this = this;

            object = _object;
            select_title = object.search || object.movie.title;
            if (this.wait_similars && data && data[0].is_similars) return getEpisodes(data[0]);
            var search_year = object.search_date;
            var orig_titles = [];

            if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
                orig_titles = object.movie.alternative_titles.results.map(function (t) {
                    return t.title;
                });
            }

            if (object.movie.original_title) orig_titles.push(object.movie.original_title);
            if (object.movie.original_name) orig_titles.push(object.movie.original_name);

            var display = function display(items) {
                if (items && items.length) {
                    var is_sure = false;
                    items.forEach(function (c) {
                        c.orig_title = c.name;
                        c.ru_title = c.rus_name;
                        c.en_title = c.eng_name;
                        var year = c.releaseDate || '0000';
                        c.year = parseInt((year + '').slice(0, 4));
                    });
                    var cards = items;

                    if (cards.length) {
                        if (orig_titles.length) {
                            var tmp = cards.filter(function (c) {
                                return component.containsAnyTitle([c.orig_title, c.en_title, c.ru_title], orig_titles);
                            });

                            if (tmp.length) {
                                cards = tmp;
                                is_sure = true;
                            }
                        }

                        if (select_title) {
                            var _tmp = cards.filter(function (c) {
                                return component.containsAnyTitle([c.ru_title, c.en_title, c.orig_title], [select_title]);
                            });

                            if (_tmp.length) {
                                cards = _tmp;
                                is_sure = true;
                            }
                        }

                        if (cards.length > 1 && search_year) {
                            var _tmp2 = cards.filter(function (c) {
                                return c.year == search_year;
                            });

                            if (!_tmp2.length) _tmp2 = cards.filter(function (c) {
                                return c.year && c.year > search_year - 2 && c.year < search_year + 2;
                            });
                            if (_tmp2.length) cards = _tmp2;
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        if (search_year && cards[0].year) {
                            is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
                        }

                        if (is_sure) {
                            is_sure = false;

                            if (orig_titles.length) {
                                is_sure |= component.equalAnyTitle([cards[0].orig_title, cards[0].en_title, cards[0].ru_title], orig_titles);
                            }

                            if (select_title) {
                                is_sure |= component.equalAnyTitle([cards[0].ru_title, cards[0].en_title, cards[0].orig_title], [select_title]);
                            }
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        getEpisodes(cards[0]);
                    } else {
                        _this.wait_similars = true;
                        items.forEach(function (c) {
                            c.is_similars = true;
                        });
                        component.similars(items);
                        component.loading(false);
                    }
                } else component.emptyForQuery(select_title);
            };

            var url = embed + 'anime?fields[]=rate_avg&fields[]=rate&fields[]=releaseDate';
            url = Lampa.Utils.addUrlComponent(url, 'q=' + encodeURIComponent(select_title));
            network.clear();
            network.timeout(1000 * 15);
            network.silent(component.proxyLink(url, prox, prox_enc), function (json) {
                display(json && json.data);
            }, function (a, c) {
                component.empty(network.errorDecode(a, c));
            });
        };

        this.extendChoice = function (saved) {
            Lampa.Arrays.extend(choice, saved, true);
        };
        /**
         * Сброс фильтра
         */


        this.reset = function () {
            component.reset();
            choice = {
                season: 0,
                voice: 0,
                voice_name: '',
                server: 0
            };
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Применить фильтр
         * @param {*} type
         * @param {*} a
         * @param {*} b
         */


        this.filter = function (type, a, b) {
            choice[a.stype] = b.index;
            if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
            component.reset();
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Уничтожить
         */


        this.destroy = function () {
            network.clear();
            extract = null;
        };

        function getEpisodes(json) {
            var url = embed + 'episodes';
            url = Lampa.Utils.addUrlComponent(url, 'anime_id=' + encodeURIComponent(json.slug_url));
            network.clear();
            network.timeout(1000 * 15);
            network.silent(component.proxyLink(url, prox, prox_enc), function (episodes) {
                if (episodes && episodes.data && episodes.data.length) {
                    json.episodes = episodes.data;
                    getPlayers(json.episodes[0], function () {
                        if (json.episodes[0].players && json.episodes[0].players.length) success(json); else component.emptyForQuery(select_title);
                    });
                } else component.emptyForQuery(select_title);
            }, function (a, c) {
                component.empty(network.errorDecode(a, c));
            });
        }

        function getPlayers(episode, callback) {
            if (episode.players) {
                callback();
                return;
            }

            var url = embed + 'episodes/' + episode.id;
            network.clear();
            network.timeout(1000 * 15);
            network.silent(component.proxyLink(url, prox, prox_enc), function (json) {
                if (json && json.data && json.data.players) {
                    episode.players = json.data.players.filter(function (p) {
                        return p.player === 'Animelib';
                    });
                }

                callback();
            }, function (a, c) {
                callback();
            });
        }

        function success(json) {
            component.loading(false);
            extract = json;
            extract.is_film = extract.episodes && extract.episodes.length === 1 && extract.type && ['Фильм', 'Неизвестный'].indexOf(extract.type.label) !== -1;
            filter();
            append(filtred());
        }
        /**
         * Построить фильтр
         */


        function filter() {
            filter_items = {
                season: [],
                voice: [],
                voice_info: [],
                server: servers.map(function (s) {
                    return s.name;
                })
            };

            if (!extract.is_film) {
                extract.episodes.forEach(function (e) {
                    if (e.players) {
                        e.players.forEach(function (p) {
                            if (p.team && !filter_items.voice_info.some(function (v) {
                                return v.id == p.team.id;
                            })) {
                                filter_items.voice.push(p.team.name);
                                filter_items.voice_info.push(p.team);
                            }
                        });
                    }
                });
            }

            if (!filter_items.voice[choice.voice]) choice.voice = 0;

            if (choice.voice_name) {
                var inx = filter_items.voice.indexOf(choice.voice_name);
                if (inx == -1) choice.voice = 0; else if (inx !== choice.voice) {
                    choice.voice = inx;
                }
            }

            component.filter(filter_items, choice);
        }
        /**
         * Получить потоки
         * @param {Object} player
         * @returns array
         */


        function extractItems(player) {
            try {
                var items = [];

                if (player && player.video && player.video.quality) {
                    var server = servers[choice.server] || servers[0];
                    items = player.video.quality.map(function (q) {
                        return {
                            label: q.quality ? q.quality + 'p' : '360p ~ 1080p',
                            quality: q.quality,
                            file: q.href ? component.proxyLink(server.url + q.href, prox, prox_enc) : ''
                        };
                    });
                    items.sort(function (a, b) {
                        if (b.quality > a.quality) return 1;
                        if (b.quality < a.quality) return -1;
                        if (b.label > a.label) return 1;
                        if (b.label < a.label) return -1;
                        return 0;
                    });
                }

                return items;
            } catch (e) { }

            return [];
        }

        function extractSubs(player) {
            try {
                var subtitles = [];

                if (player && player.subtitles) {
                    subtitles = player.subtitles.map(function (item) {
                        return {
                            label: item.format || item.filename || '',
                            url: component.processSubs(item.src || '')
                        };
                    });
                }

                return subtitles.length ? subtitles : false;
            } catch (e) { }

            return false;
        }
        /**
         * Отфильтровать файлы
         * @returns array
         */


        function filtred() {
            var filtred = [];
            var server = servers[choice.server] || servers[0];

            if (extract.episodes) {
                if (extract.is_film) {
                    extract.episodes.forEach(function (episode) {
                        if (episode.players) {
                            episode.players.forEach(function (player) {
                                var voice_name = player && player.team && player.team.name || '';
                                var voice_id = player && player.team && player.team.id || null;
                                var items = extractItems(player);
                                filtred.push({
                                    title: voice_name || extract.ru_title || extract.en_title || extract.orig_title || select_title,
                                    orig_title: extract.orig_title || extract.en_title || extract.ru_title || select_title,
                                    quality: items[0] ? items[0].label : '???',
                                    info: ' / ' + server.name,
                                    media: {
                                        episode: episode,
                                        player: player,
                                        voice_id: voice_id
                                    }
                                });
                            });
                        }
                    });
                } else {
                    var voice_id = filter_items.voice_info[choice.voice] && filter_items.voice_info[choice.voice].id;
                    extract.episodes.forEach(function (episode) {
                        var player = null;

                        if (episode.players && episode.players.length) {
                            player = episode.players.filter(function (p) {
                                return p.team && p.team.id == voice_id;
                            })[0] || episode.players[0];
                        }

                        var voice_name = player && player.team && player.team.name || '???';
                        var items = extractItems(player);
                        filtred.push({
                            title: component.formatEpisodeTitle(null, episode.item_number, episode.name),
                            orig_title: extract.orig_title || extract.en_title || extract.ru_title || select_title,
                            quality: items[0] ? items[0].label : '???',
                            info: ' / ' + voice_name + ' / ' + server.name,
                            season: 1,
                            episode: episode.item_number,
                            media: {
                                episode: episode,
                                player: player,
                                voice_id: voice_id
                            }
                        });
                    });
                }
            }

            return filtred;
        }
        /**
         * Получить поток
         * @param {*} element
         */


        function getStream(element, call, error) {
            if (element.stream) return call(element);
            var episode = element.media.episode;
            var old_player = element.media.player;
            getPlayers(episode, function () {
                var player = element.media.player;

                if (!player) {
                    var voice_id = element.media.voice_id;

                    if (episode.players && episode.players.length) {
                        player = episode.players.filter(function (p) {
                            return p.team && p.team.id == voice_id;
                        })[0] || episode.players[0];
                    }
                }

                var items = extractItems(player);
                var file = '';
                var quality = false;

                if (items && items.length) {
                    file = items[0].file;
                    quality = {};
                    items.forEach(function (item) {
                        quality[item.label] = item.file;
                    });
                }

                if (!old_player && player) {
                    var voice_name = player && player.team && player.team.name || '???';
                    var server = servers[choice.server] || servers[0];
                    element.quality = items[0] ? items[0].label : '???';
                    element.info = ' / ' + voice_name + ' / ' + server.name;
                    var dst = element.template && element.template.find('.online__quality');

                    if (dst && dst.length) {
                        var src = Lampa.Template.get('online_mod', element).find('.online__quality');

                        if (src && src.length) {
                            if (Lampa.Timeline.details) {
                                src.append(Lampa.Timeline.details(element.timeline, ' / '));
                            }

                            dst[0].innerHTML = src[0].innerHTML;
                        }
                    }
                }

                if (file) {
                    element.stream = file;
                    element.qualitys = quality;
                    element.subtitles = extractSubs(player);
                    call(element);
                } else error();
            });
        }
        /**
         * Показать файлы
         */


        function append(items) {
            component.reset();
            var viewed = Lampa.Storage.cache('online_view', 5000, []);
            var last_episode = component.getLastEpisode(items);
            items.forEach(function (element) {
                if (element.season) {
                    element.translate_episode_end = last_episode;
                    element.translate_voice = filter_items.voice[choice.voice];
                }

                var hash = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title].join('') : object.movie.original_title + element.orig_title);
                var view = Lampa.Timeline.view(hash);
                var item = Lampa.Template.get('online_mod', element);
                var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.orig_title + element.title);
                element.timeline = view;
                element.template = item;
                item.append(Lampa.Timeline.render(view));

                if (Lampa.Timeline.details) {
                    item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
                }

                if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                item.on('hover:enter', function () {
                    if (element.loading) return;
                    if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
                    element.loading = true;
                    getStream(element, function (element) {
                        element.loading = false;
                        var first = {
                            url: component.getDefaultQuality(element.qualitys, element.stream),
                            quality: component.renameQualityMap(element.qualitys),
                            subtitles: element.subtitles,
                            timeline: element.timeline,
                            title: element.season ? element.title : select_title + (element.title == select_title ? '' : ' / ' + element.title)
                        };
                        Lampa.Player.play(first);

                        if (element.season && Lampa.Platform.version) {
                            var playlist = [];
                            items.forEach(function (elem) {
                                if (elem == element) {
                                    playlist.push(first);
                                } else {
                                    var cell = {
                                        url: function url(call) {
                                            getStream(elem, function (elem) {
                                                cell.url = component.getDefaultQuality(elem.qualitys, elem.stream);
                                                cell.quality = component.renameQualityMap(elem.qualitys);
                                                cell.subtitles = elem.subtitles;
                                                call();
                                            }, function () {
                                                cell.url = '';
                                                call();
                                            });
                                        },
                                        timeline: elem.timeline,
                                        title: elem.title
                                    };
                                    playlist.push(cell);
                                }
                            });
                            Lampa.Player.playlist(playlist);
                        } else {
                            Lampa.Player.playlist([first]);
                        }

                        if (viewed.indexOf(hash_file) == -1) {
                            viewed.push(hash_file);
                            item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                            Lampa.Storage.set('online_view', viewed);
                        }
                    }, function () {
                        element.loading = false;
                        Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                    });
                });
                component.append(item);
                component.contextmenu({
                    item: item,
                    view: view,
                    viewed: viewed,
                    hash_file: hash_file,
                    element: element,
                    file: function file(call) {
                        getStream(element, function (element) {
                            call({
                                file: element.stream,
                                quality: element.qualitys
                            });
                        }, function () {
                            Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                        });
                    }
                });
            });
            component.start(true);
        }
    }

    function kodik(component, _object) {
        var network = new Lampa.Reguest();
        var extract = {};
        var object = _object;
        var select_title = '';
        var prefer_http = Lampa.Storage.field('online_mod_prefer_http') === true;
        var prefer_mp4 = false;
        var prox = component.proxy('kodik');
        var embed = 'https://kodikapi.com/search';
        var token = atob('NDVjNTM1NzhmMTFlY2ZiNzRlMzEyNjdiNjM0Y2M2YTg=');
        var last_player = '';
        var last_info = '';
        var filter_items = {};
        var choice = {
            season: 0,
            voice: 0,
            voice_name: ''
        };

        function kodik_api_search(api, callback, error) {
            network.clear();
            network.timeout(10000);
            network["native"](component.proxyLink(embed + api, prox), function (json) {
                if (callback) callback(json);
            }, function (a, c) {
                if (error) error(network.errorDecode(a, c));
            });
        }
        /**
         * Поиск
         * @param {Object} _object
         */


        this.search = function (_object, kinopoisk_id, data) {
            var _this = this;

            object = _object;
            select_title = object.search || object.movie.title;
            if (this.wait_similars && data && data[0].is_similars) return success(data[0]);
            var search_year = object.search_date;
            var orig_titles = [];

            if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
                orig_titles = object.movie.alternative_titles.results.map(function (t) {
                    return t.title;
                });
            }

            if (object.movie.original_title) orig_titles.push(object.movie.original_title);
            if (object.movie.original_name) orig_titles.push(object.movie.original_name);

            var display = function display(results, empty) {
                if (results && results.length) {
                    var is_sure = false;
                    var is_imdb = false;
                    var elements = {};
                    results.forEach(function (c) {
                        var id;
                        if (c.shikimori_id) id = 'sm_' + c.shikimori_id; else if (c.worldart_link) id = 'wa_' + c.worldart_link; else if (c.kinopoisk_id) id = 'kp_' + c.kinopoisk_id; else if (c.imdb_id) id = 'im_' + c.imdb_id; else if (c.id) id = 'k_' + c.id; else id = '';
                        if (!id) return;
                        id += c.title;
                        var list = elements[id] || [];
                        list.push(c);
                        elements[id] = list;
                    });
                    var items = [];

                    for (var ID in elements) {
                        var list = elements[ID];
                        items.push({
                            title: list[0].title,
                            orig_title: list[0].title_orig,
                            other_title: list[0].other_title,
                            year: list[0].year,
                            kinopoisk_id: list[0].kinopoisk_id,
                            imdb_id: list[0].imdb_id,
                            episodes_count: list[0].episodes_count,
                            media: list[0]
                        });
                    }

                    if (!object.clarification && (object.movie.imdb_id || +kinopoisk_id)) {
                        var imdb_id = object.movie.imdb_id;
                        var kp_id = +kinopoisk_id;
                        var tmp = items.filter(function (c) {
                            return imdb_id && c.imdb_id == imdb_id || kp_id && c.kinopoisk_id == kp_id;
                        });

                        if (tmp.length) {
                            items = tmp;
                            is_sure = true;
                            is_imdb = true;
                        }
                    }

                    var cards = items;

                    if (cards.length) {
                        if (orig_titles.length) {
                            var _tmp = cards.filter(function (c) {
                                return component.containsAnyTitle([c.orig_title, c.title, c.other_title], orig_titles);
                            });

                            if (_tmp.length) {
                                cards = _tmp;
                                is_sure = true;
                            }
                        }

                        if (select_title) {
                            var _tmp2 = cards.filter(function (c) {
                                return component.containsAnyTitle([c.title, c.orig_title, c.other_title], [select_title]);
                            });

                            if (_tmp2.length) {
                                cards = _tmp2;
                                is_sure = true;
                            }
                        }

                        if (!is_sure) cards = [];
                        items = cards;

                        if (cards.length > 1 && search_year) {
                            var _tmp3 = cards.filter(function (c) {
                                return c.year == search_year;
                            });

                            if (!_tmp3.length) _tmp3 = cards.filter(function (c) {
                                return c.year && c.year > search_year - 2 && c.year < search_year + 2;
                            });
                            if (_tmp3.length) cards = _tmp3;
                        }
                    }

                    if (cards.length == 1 && is_sure && !is_imdb) {
                        if (search_year && cards[0].year) {
                            is_sure = cards[0].year > search_year - 2 && cards[0].year < search_year + 2;
                        }

                        if (is_sure) {
                            is_sure = false;

                            if (orig_titles.length) {
                                is_sure |= component.equalAnyTitle([cards[0].orig_title, cards[0].title, cards[0].other_title], orig_titles);
                            }

                            if (select_title) {
                                is_sure |= component.equalAnyTitle([cards[0].title, cards[0].orig_title, cards[0].other_title], [select_title]);
                            }
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        success(cards[0]);
                    } else if (items.length) {
                        _this.wait_similars = true;
                        items.forEach(function (c) {
                            c.is_similars = true;
                        });
                        component.similars(items);
                        component.loading(false);
                    } else empty();
                } else empty();
            };

            var kodik_search_by_title = function kodik_search_by_title(callback, error) {
                var params = Lampa.Utils.addUrlComponent('', 'token=' + token);
                params = Lampa.Utils.addUrlComponent(params, 'limit=100');
                params = Lampa.Utils.addUrlComponent(params, 'translation_type=voice');
                params = Lampa.Utils.addUrlComponent(params, 'title=' + encodeURIComponent(select_title));
                kodik_api_search(params, callback, error);
            };

            var kodik_search_by_title_part = function kodik_search_by_title_part(callback, error) {
                var params = Lampa.Utils.addUrlComponent('', 'token=' + token);
                params = Lampa.Utils.addUrlComponent(params, 'limit=100');
                params = Lampa.Utils.addUrlComponent(params, 'translation_type=voice');
                var words = component.cleanTitle(select_title || '').replace(/[\s—\-+]+/g, ' ').trim().split(' ');
                words.sort(function (a, b) {
                    return b.length - a.length;
                });
                var title = words.splice(0, 1).join(' ');

                if (title !== select_title) {
                    params = Lampa.Utils.addUrlComponent(params, 'title=' + encodeURIComponent(title));
                    kodik_api_search(params, callback, error);
                } else callback({});
            };

            var kodik_search_by_id = function kodik_search_by_id(callback, error) {
                if (!object.clarification && (object.movie.imdb_id || +kinopoisk_id)) {
                    var params = Lampa.Utils.addUrlComponent('', 'token=' + token);
                    params = Lampa.Utils.addUrlComponent(params, 'limit=100');
                    var kp_params = +kinopoisk_id ? Lampa.Utils.addUrlComponent(params, 'kinopoisk_id=' + encodeURIComponent(+kinopoisk_id)) : '';
                    var imdb_params = object.movie.imdb_id ? Lampa.Utils.addUrlComponent(params, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id)) : '';
                    kodik_api_search(kp_params || imdb_params, function (json) {
                        if (json.results && json.results.length) callback(json); else if (kp_params && imdb_params) {
                            kodik_api_search(imdb_params, callback, error);
                        } else callback({});
                    }, error);
                } else callback({});
            };

            var error = component.empty.bind(component);
            kodik_search_by_id(function (json) {
                display(json && json.results, function () {
                    kodik_search_by_title_part(function (json) {
                        display(json && json.results, function () {
                            kodik_search_by_title(function (json) {
                                display(json && json.results, function () {
                                    component.emptyForQuery(select_title);
                                });
                            }, error);
                        });
                    }, error);
                });
            }, error);
        };

        this.extendChoice = function (saved) {
            Lampa.Arrays.extend(choice, saved, true);
        };
        /**
         * Сброс фильтра
         */


        this.reset = function () {
            component.reset();
            choice = {
                season: 0,
                voice: 0,
                voice_name: ''
            };
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Применить фильтр
         * @param {*} type
         * @param {*} a
         * @param {*} b
         */


        this.filter = function (type, a, b) {
            choice[a.stype] = b.index;
            if (a.stype == 'voice') choice.voice_name = filter_items.voice[b.index];
            component.reset();
            filter();
            append(filtred());
            component.saveChoice(choice);
        };
        /**
         * Уничтожить
         */


        this.destroy = function () {
            network.clear();
            extract = null;
        };

        function success(json) {
            var media = json.media || {};
            var params = Lampa.Utils.addUrlComponent('', 'token=' + token);
            params = Lampa.Utils.addUrlComponent(params, 'limit=100');
            params = Lampa.Utils.addUrlComponent(params, 'with_episodes=true');
            if (media.shikimori_id) params = Lampa.Utils.addUrlComponent(params, 'shikimori_id=' + encodeURIComponent(media.shikimori_id)); else if (media.worldart_link) params = Lampa.Utils.addUrlComponent(params, 'worldart_link=' + encodeURIComponent(media.worldart_link)); else if (media.kinopoisk_id) params = Lampa.Utils.addUrlComponent(params, 'kinopoisk_id=' + encodeURIComponent(media.kinopoisk_id)); else if (media.imdb_id) params = Lampa.Utils.addUrlComponent(params, 'imdb_id=' + encodeURIComponent(media.imdb_id)); else if (media.id) params = Lampa.Utils.addUrlComponent(params, 'id=' + encodeURIComponent(media.id)); else {
                component.emptyForQuery(select_title);
                return;
            }
            var error = component.empty.bind(component);
            kodik_api_search(params, function (json) {
                component.loading(false);
                extractData(json && json.results ? json.results.filter(function (c) {
                    return c.title === media.title;
                }) : []);
                filter();
                append(filtred());
            }, error);
        }
        /**
         * Получить данные о фильме
         * @param {Array} items
         */


        function extractData(items) {
            var seasons = [];
            items.forEach(function (c) {
                if (c.seasons) {
                    var _loop = function _loop(season_id) {
                        var season = c.seasons[season_id];

                        if (season) {
                            if (!seasons.some(function (s) {
                                return s.id === season_id;
                            })) {
                                seasons.push({
                                    id: season_id,
                                    title: Lampa.Lang.translate('torrent_serial_season') + ' ' + season_id + (season.title ? ' - ' + season.title : '')
                                });
                            }
                        }
                    };

                    for (var season_id in c.seasons) {
                        _loop(season_id);
                    }
                }
            });
            seasons.sort(function (a, b) {
                return a.id - b.id;
            });
            extract = {
                items: items,
                seasons: seasons
            };
        }
        /**
         * Построить фильтр
         */


        function filter() {
            filter_items = {
                season: extract.seasons.map(function (s) {
                    return s.title;
                }),
                voice: [],
                voice_info: []
            };
            if (!filter_items.season[choice.season]) choice.season = 0;

            if (extract.seasons.length) {
                var season_id = extract.seasons[choice.season] && extract.seasons[choice.season].id;
                extract.items.forEach(function (c) {
                    if (!(c.seasons && c.seasons[season_id])) return;

                    if (c.translation && !filter_items.voice_info.some(function (v) {
                        return v.id == c.translation.id;
                    })) {
                        filter_items.voice.push(c.translation.title);
                        filter_items.voice_info.push(c.translation);
                    }
                });
            }

            if (!filter_items.voice[choice.voice]) choice.voice = 0;

            if (choice.voice_name) {
                var inx = filter_items.voice.indexOf(choice.voice_name);
                if (inx == -1) choice.voice = 0; else if (inx !== choice.voice) {
                    choice.voice = inx;
                }
            }

            component.filter(filter_items, choice);
        }
        /**
         * Отфильтровать файлы
         * @returns array
         */


        function filtred() {
            var filtred = [];

            if (extract.seasons.length) {
                var season_id = extract.seasons[choice.season] && extract.seasons[choice.season].id;
                var voice_name = filter_items.voice[choice.voice];
                var voice_id = filter_items.voice_info[choice.voice] && filter_items.voice_info[choice.voice].id;
                var translation = extract.items.filter(function (c) {
                    return c.seasons && c.seasons[season_id] && c.translation && c.translation.id == voice_id;
                })[0];

                if (translation) {
                    var episodes = translation.seasons[season_id] && translation.seasons[season_id].episodes || {};

                    for (var episode_id in episodes) {
                        var link = episodes[episode_id];
                        filtred.push({
                            title: component.formatEpisodeTitle(season_id, episode_id),
                            orig_title: translation.title_orig || translation.title || select_title,
                            quality: translation.quality || '360p ~ 1080p',
                            info: ' / ' + voice_name,
                            season: '' + season_id,
                            episode: parseInt(episode_id),
                            link: link
                        });
                    }
                }
            } else {
                extract.items.forEach(function (c) {
                    if (c.seasons) return;
                    filtred.push({
                        title: c.translation && c.translation.title || select_title,
                        orig_title: c.title_orig || c.title || select_title,
                        quality: c.quality || '360p ~ 1080p',
                        info: '',
                        link: c.link
                    });
                });
            }

            return filtred;
        }
        /**
         * Получить поток
         * @param {*} element
         */


        function getStream(element, call, error) {
            if (element.stream) return call(element);
            if (!element.link) return error();
            var link_match = element.link.match(/^(\/\/[^\/]+)\/.*$/);
            var link_origin = (prefer_http ? 'http:' : 'https:') + (link_match ? link_match[1] : '//kodik.info');
            var url = (prefer_http ? 'http:' : 'https:') + element.link;
            network.clear();
            network.timeout(10000);
            network["native"](component.proxyLink(url, prox), function (str) {
                str = (str || '').replace(/\n/g, '');
                var urlParams = str.match(/\burlParams = '([^']+)'/);
                var type = str.match(/\bvideoInfo\.type = '([^']+)'/);
                var hash = str.match(/\bvideoInfo\.hash = '([^']+)'/);
                var id = str.match(/\bvideoInfo\.id = '([^']+)'/);
                var player = str.match(/<script [^>]*\bsrc="(\/assets\/js\/app\.player_single[^"]+)"/);
                var json;

                try {
                    json = urlParams && urlParams[1] && JSON.parse(urlParams[1]);
                } catch (e) { }

                var postdata = '';

                if (json && type && hash && id) {
                    postdata = 'd=' + json.d;
                    postdata += '&d_sign=' + json.d_sign;
                    postdata += '&pd=' + json.pd;
                    postdata += '&pd_sign=' + json.pd_sign;
                    postdata += '&ref=' + json.ref;
                    postdata += '&ref_sign=' + json.ref_sign;
                    postdata += '&bad_user=true';
                    postdata += '&cdn_is_working=true';
                    postdata += '&type=' + type[1];
                    postdata += '&hash=' + hash[1];
                    postdata += '&id=' + id[1];
                    postdata += '&info=%7B%7D';
                }

                if (postdata && player) {
                    var getLinks = function getLinks() {
                        network.clear();
                        network.timeout(10000);
                        network["native"](component.proxyLink(last_info, prox), function (json) {
                            if (json && json.links) {
                                var items = extractItems(json.links),
                                    file = '',
                                    quality = false;

                                if (items && items.length) {
                                    file = items[0].file;
                                    quality = {};
                                    items.forEach(function (item) {
                                        quality[item.label] = item.file;
                                    });
                                }

                                if (file) {
                                    element.stream = file;
                                    element.qualitys = quality;
                                    call(element);
                                } else error();
                            } else error();
                        }, function (a, c) {
                            error();
                        }, postdata);
                    };

                    var player_url = link_origin + player[1];

                    if (player_url !== last_player) {
                        network.clear();
                        network.timeout(10000);
                        network["native"](component.proxyLink(player_url, prox), function (str) {
                            str = (str || '').replace(/\n/g, '');
                            var info_match = str.match(/\$\.ajax\({type: *"POST", *url: *atob\("([^"]+)"\)/);
                            var info;

                            try {
                                info = info_match && atob(info_match[1]);
                            } catch (e) { }

                            if (info && startsWith(info, '/')) {
                                last_info = link_origin + info;
                                last_player = player_url;
                                getLinks();
                            } else error();
                        }, function (a, c) {
                            error();
                        }, false, {
                            dataType: 'text'
                        });
                    } else getLinks();
                } else error();
            }, function (a, c) {
                error();
            }, false, {
                dataType: 'text'
            });
        }

        function extractItems(playlists) {
            try {
                var items = [];
                Object.keys(playlists).forEach(function (key) {
                    var obj = playlists[key];
                    var quality = parseInt(key);
                    var link = decode(obj && obj[0] && obj[0].src || '');
                    if (startsWith(link, '//')) link = (prefer_http ? 'http:' : 'https:') + link; else if (prefer_http) link = link.replace('https://', 'http://');
                    if (prefer_mp4);
                    items.push({
                        label: quality ? quality + 'p' : '360p ~ 1080p',
                        quality: quality,
                        file: component.proxyStream(link, 'kodik')
                    });
                });
                items.sort(function (a, b) {
                    if (b.quality > a.quality) return 1;
                    if (b.quality < a.quality) return -1;
                    if (b.label > a.label) return 1;
                    if (b.label < a.label) return -1;
                    return 0;
                });
                return items;
            } catch (e) { }

            return [];
        }

        function decode(str) {
            try {
                return atob(str.replace(/[a-z]/g, function (x) {
                    return String.fromCharCode(x.charCodeAt(0) + (x > 'm' ? -13 : 13));
                }).replace(/[A-Z]/g, function (x) {
                    return String.fromCharCode(x.charCodeAt(0) + (x > 'M' ? -13 : 13));
                }));
            } catch (e) {
                return '';
            }
        }
        /**
         * Показать файлы
         */


        function append(items) {
            component.reset();
            var viewed = Lampa.Storage.cache('online_view', 5000, []);
            var last_episode = component.getLastEpisode(items);
            items.forEach(function (element) {
                if (element.season) {
                    element.translate_episode_end = last_episode;
                    element.translate_voice = filter_items.voice[choice.voice];
                }

                var hash = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title].join('') : object.movie.original_title + element.orig_title);
                var view = Lampa.Timeline.view(hash);
                var item = Lampa.Template.get('online_mod', element);
                var hash_file = Lampa.Utils.hash(element.season ? [element.season, element.season > 10 ? ':' : '', element.episode, object.movie.original_title, element.orig_title, filter_items.voice[choice.voice]].join('') : object.movie.original_title + element.orig_title + element.title);
                element.timeline = view;
                item.append(Lampa.Timeline.render(view));

                if (Lampa.Timeline.details) {
                    item.find('.online__quality').append(Lampa.Timeline.details(view, ' / '));
                }

                if (viewed.indexOf(hash_file) !== -1) item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                item.on('hover:enter', function () {
                    if (element.loading) return;
                    if (object.movie.id) Lampa.Favorite.add('history', object.movie, 100);
                    element.loading = true;
                    getStream(element, function (element) {
                        element.loading = false;
                        var first = {
                            url: component.getDefaultQuality(element.qualitys, element.stream),
                            quality: component.renameQualityMap(element.qualitys),
                            timeline: element.timeline,
                            title: element.season ? element.title : select_title + (element.title == select_title ? '' : ' / ' + element.title)
                        };
                        Lampa.Player.play(first);

                        if (element.season && Lampa.Platform.version) {
                            var playlist = [];
                            items.forEach(function (elem) {
                                if (elem == element) {
                                    playlist.push(first);
                                } else {
                                    var cell = {
                                        url: function url(call) {
                                            getStream(elem, function (elem) {
                                                cell.url = component.getDefaultQuality(elem.qualitys, elem.stream);
                                                cell.quality = component.renameQualityMap(elem.qualitys);
                                                call();
                                            }, function () {
                                                cell.url = '';
                                                call();
                                            });
                                        },
                                        timeline: elem.timeline,
                                        title: elem.title
                                    };
                                    playlist.push(cell);
                                }
                            });
                            Lampa.Player.playlist(playlist);
                        } else {
                            Lampa.Player.playlist([first]);
                        }

                        if (viewed.indexOf(hash_file) == -1) {
                            viewed.push(hash_file);
                            item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                            Lampa.Storage.set('online_view', viewed);
                        }
                    }, function () {
                        element.loading = false;
                        Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                    });
                });
                component.append(item);
                component.contextmenu({
                    item: item,
                    view: view,
                    viewed: viewed,
                    hash_file: hash_file,
                    element: element,
                    file: function file(call) {
                        getStream(element, function (element) {
                            call({
                                file: element.stream,
                                quality: element.qualitys
                            });
                        }, function () {
                            Lampa.Noty.show(Lampa.Lang.translate('online_mod_nolink'));
                        });
                    }
                });
            });
            component.start(true);
        }
    }


    var proxyInitialized = {};
    var proxyWindow = {};
    var proxyCalls = {};
    var default_balanser = 'lumex2';

    function component(object) {
        var network = new Lampa.Reguest();
        var scroll = new Lampa.Scroll({
            mask: true,
            over: true
        });
        var files = new Lampa.Explorer(object);
        var filter = new Lampa.Filter(object);
        var balanser = Lampa.Storage.get('online_mod_balanser', default_balanser) + '';
        var last_bls = Lampa.Storage.field('online_mod_save_last_balanser') === true ? Lampa.Storage.cache('online_mod_last_balanser', 200, {}) : {};
        var use_stream_proxy = Lampa.Storage.field('online_mod_use_stream_proxy') === true;
        var rezka2_prx_ukr = '//' + (Lampa.Storage.field('online_mod_rezka2_prx_ukr') || 'prx.ukrtelcdn.net') + '/';
        var rezka2_fix_stream = Lampa.Storage.field('online_mod_rezka2_fix_stream') === true;
        var prefer_http = Lampa.Storage.field('online_mod_prefer_http') === true;
        var convert_vtt_to_srt = Lampa.Storage.field('online_mod_convert_vtt_to_srt') === true;
        var forcedQuality = '';
        var qualityFilter = {
            title: Lampa.Lang.translate('settings_player_quality'),
            subtitle: '',
            items: [],
            stype: 'quality'
        };
        var contextmenu_all = [];

        if (last_bls[object.movie.id]) {
            balanser = last_bls[object.movie.id];
        }

        this.proxy = function (name) {
            return Utils.proxy(name);
        };

        this.fixLink = function (link, referrer) {
            return Utils.fixLink(link, referrer);
        };

        this.proxyLink = function (link, proxy, proxy_enc, enc) {
            return Utils.proxyLink(link, proxy, proxy_enc, enc);
        };

        this.proxyStream = function (url, name) {
            if (url && use_stream_proxy) {
                if (name === 'lumex') return url;

                if (name === 'rezka2') {
                    return url.replace(/\/\/(stream\.voidboost\.(cc|top|link|club)|[^\/]*.ukrtelcdn.net|vdbmate.org|sambray.org|femeretes.org)\//, rezka2_prx_ukr);
                }

                return (prefer_http ? 'http://apn.cfhttp.top/' : 'https://apn.watch/') + url;
            }

            if (url && rezka2_fix_stream && name === 'rezka2') {
                return url.replace(/\/\/stream\.voidboost\.(cc|top|link|club)\//, '//femeretes.org/');
            }

            return url;
        };

        this.processSubs = function (url) {
            if (url && convert_vtt_to_srt) {
                var posEnd = url.lastIndexOf('?');
                var posStart = url.lastIndexOf('://');
                if (posEnd === -1 || posEnd <= posStart) posEnd = url.length;
                if (posStart === -1) posStart = -3;
                var name = url.substring(posStart + 3, posEnd);
                posStart = name.lastIndexOf('/');
                name = posStart !== -1 ? name.substring(posStart + 1) : '';
                posEnd = name.length;

                if (posEnd >= 4 && name.substring(posEnd - 4, posEnd).toLowerCase() === '.vtt') {
                    return (prefer_http ? 'http:' : 'https:') + '//epg.rootu.top/vtt2srt/' + url + '/' + name.substring(0, posEnd - 4) + '.srt';
                }
            }

            return url;
        };

        this.proxyStreamSubs = function (url, name) {
            if (name === 'lumex') return url;
            var srtUrl = this.processSubs(url);
            if (srtUrl !== url) return srtUrl;
            return this.proxyStream(url, name);
        };

        var last;
        var extended;
        var selected_id;
        var filter_translate = {
            season: Lampa.Lang.translate('torrent_serial_season'),
            voice: Lampa.Lang.translate('torrent_parser_voice'),
            source: Lampa.Lang.translate('settings_rest_source')
        };
        var disable_dbg = !Utils.isDebug();
        var isAndroid = Lampa.Platform.is('android');
        var androidHeaders = isAndroid && Utils.checkAndroidVersion(339);
        var collapsBlocked = (!startsWith(window.location.protocol, 'http') || window.location.hostname === 'lampa.mx') && disable_dbg;

        // TODO: ADD new params for uakino/doramyland

        var all_sources = [{
            name: 'lumex',
            title: 'Lumex',
            source: new lumex(this, object),
            search: false,
            kp: false,
            imdb: true,
            disabled: disable_dbg && !androidHeaders
        }, {
            name: 'lumex2',
            title: 'Lumex (Ads)',
            source: new lumex2(this, object),
            search: false,
            kp: false,
            imdb: true
        }, {
            name: 'rezka',
            title: 'Voidboost',
            source: new rezka(this, object),
            search: false,
            kp: true,
            imdb: true,
            disabled: true
        }, {
            name: 'rezka2',
            title: 'HDrezka',
            source: new rezka2(this, object),
            search: true,
            kp: false,
            imdb: false
        }, {
            name: 'kinobase',
            title: 'Kinobase',
            source: new kinobase(this, object),
            search: true,
            kp: false,
            imdb: false,
            disabled: disable_dbg
        }, {
            name: 'collaps',
            title: 'Collaps',
            source: new collaps(this, object, false),
            search: false,
            kp: true,
            imdb: true,
            disabled: collapsBlocked
        }, {
            name: 'collaps-dash',
            title: 'Collaps (DASH)',
            source: new collaps(this, object, true),
            search: false,
            kp: true,
            imdb: true,
            disabled: collapsBlocked
        }, {
            name: 'cdnmovies',
            title: 'CDNMovies',
            source: new cdnmovies(this, object),
            search: false,
            kp: true,
            imdb: true,
            disabled: disable_dbg
        }, {
            name: 'filmix',
            title: 'Filmix',
            source: new filmix(this, object),
            search: true,
            kp: false,
            imdb: false
        }, {
            name: 'zetflix',
            title: 'Zetflix',
            source: new zetflix(this, object),
            search: false,
            kp: true,
            imdb: false,
            disabled: disable_dbg
        }, {
            name: 'fancdn',
            title: 'FanCDN',
            source: new fancdn(this, object),
            search: true,
            kp: false,
            imdb: false,
            disabled: disable_dbg && !isAndroid
        }, {
            name: 'fancdn2',
            title: 'FanCDN (ID)',
            source: new fancdn2(this, object),
            search: false,
            kp: true,
            imdb: true,
            disabled: disable_dbg && !isAndroid
        }, {
            name: 'fanserials',
            title: 'FanSerials',
            source: new fanserials(this, object),
            search: false,
            kp: true,
            imdb: false,
            disabled: disable_dbg && !isAndroid
        }, {
            name: 'redheadsound',
            title: 'RedHeadSound',
            source: new redheadsound(this, object),
            search: true,
            kp: false,
            imdb: true
        }, {
            name: 'cdnvideohub',
            title: 'CDNVideoHub',
            source: new cdnvideohub(this, object),
            search: false,
            kp: true,
            imdb: false
        }, {
            name: 'anilibria',
            title: 'AniLibria',
            source: new anilibria(this, object),
            search: true,
            kp: false,
            imdb: false
        }, {
            name: 'anilibria2',
            title: 'AniLibria.top',
            source: new anilibria2(this, object),
            search: true,
            kp: false,
            imdb: false
        }, {
            name: 'animelib',
            title: 'AnimeLib',
            source: new animelib(this, object),
            search: true,
            kp: false,
            imdb: false,
            disabled: disable_dbg
        }, {
            name: 'kodik',
            title: 'Kodik',
            source: new kodik(this, object),
            search: true,
            kp: true,
            imdb: true
        }, {
            name: 'alloha',
            title: 'Alloha',
            source: new alloha(this, object),
            search: false,
            kp: true,
            imdb: true,
            disabled: disable_dbg
        }, {
            name: 'kinopub',
            title: 'KinoPub',
            source: new kinopub(this, object),
            search: true,
            kp: false,
            imdb: true,
            disabled: true
        }];
        var obj_filter_sources = all_sources.filter(function (s) {
            return !s.disabled;
        });
        var filter_sources = obj_filter_sources.map(function (s) {
            return s.name;
        });
        var sources = {};
        obj_filter_sources.forEach(function (s) {
            sources[s.name] = s.source;
        });
        var search_sources = all_sources.filter(function (s) {
            return s.search;
        }).map(function (s) {
            return s.name;
        });
        var kp_sources = all_sources.filter(function (s) {
            return s.kp;
        }).map(function (s) {
            return s.name;
        });
        var imdb_sources = all_sources.filter(function (s) {
            return s.imdb;
        }).map(function (s) {
            return s.name;
        }); // шаловливые ручки

        if (filter_sources.indexOf(balanser) == -1) {
            balanser = default_balanser;
            Lampa.Storage.set('online_mod_balanser', balanser);
        }

        scroll.body().addClass('torrent-list');
        scroll.minus(files.render().find('.explorer__files-head'));
        /**
         * Подготовка
         */

        this.create = function () {
            var _this = this;

            this.activity.loader(true);

            filter.onSearch = function (value) {
                Lampa.Activity.replace({
                    search: value,
                    search_date: '',
                    clarification: true
                });
            };

            filter.onBack = function () {
                _this.start();
            };

            filter.onSelect = function (type, a, b) {
                if (type == 'filter') {
                    if (a.reset) {
                        if (extended) sources[balanser].reset(); else _this.start();
                    } else if (a.stype == 'source') {
                        _this.changeBalanser(filter_sources[b.index]);
                    } else if (a.stype == 'quality') {
                        forcedQuality = b.title;

                        _this.updateQualityFilter();
                    } else {
                        sources[balanser].filter(type, a, b);
                    }
                } else if (type == 'sort') {
                    _this.changeBalanser(a.source);
                }
            };

            filter.render().find('.filter--sort span').text(Lampa.Lang.translate('online_mod_balanser'));
            files.appendHead(filter.render());
            files.appendFiles(scroll.render());
            this.search();
            return this.render();
        };

        this.changeBalanser = function (balanser_name) {
            balanser = balanser_name;
            Lampa.Storage.set('online_mod_balanser', balanser);
            last_bls[object.movie.id] = balanser;

            if (Lampa.Storage.field('online_mod_save_last_balanser') === true) {
                Lampa.Storage.set('online_mod_last_balanser', last_bls);
            }

            this.search();
            setTimeout(this.closeFilter, 10);
        };

        this.updateQualityFilter = function () {
            var preferably = forcedQuality;

            if (!preferably) {
                preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
                if (preferably === '1080p') preferably = '1080p Ultra';
            }

            var items = ['2160p', '1440p', '1080p Ultra', '1080p', '720p', '480p'].map(function (quality, i) {
                return {
                    title: quality,
                    selected: quality === preferably,
                    index: i
                };
            });
            qualityFilter.subtitle = preferably;
            qualityFilter.items = items;
            setTimeout(this.closeFilter, 10);
        };
        /**
         * Начать поиск
         */


        this.search = function () {
            this.activity.loader(true);
            this.filter({
                source: filter_sources
            }, {
                source: 0
            });
            this.reset();
            this.find();
        };

        this.cleanTitle = function (str) {
            return str.replace(/[\s.,:;’'`!?]+/g, ' ').trim();
        };

        this.kpCleanTitle = function (str) {
            return this.cleanTitle(str).replace(/^[ \/\\]+/, '').replace(/[ \/\\]+$/, '').replace(/\+( *[+\/\\])+/g, '+').replace(/([+\/\\] *)+\+/g, '+').replace(/( *[\/\\]+ *)+/g, '+');
        };

        this.normalizeTitle = function (str) {
            return this.cleanTitle(str.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-').replace(/ё/g, 'е'));
        };

        this.equalTitle = function (t1, t2) {
            return typeof t1 === 'string' && typeof t2 === 'string' && this.normalizeTitle(t1) === this.normalizeTitle(t2);
        };

        this.containsTitle = function (str, title) {
            return typeof str === 'string' && typeof title === 'string' && this.normalizeTitle(str).indexOf(this.normalizeTitle(title)) !== -1;
        };

        this.equalAnyTitle = function (strings, titles) {
            var _this2 = this;

            return titles.some(function (title) {
                return title && strings.some(function (str) {
                    return str && _this2.equalTitle(str, title);
                });
            });
        };

        this.containsAnyTitle = function (strings, titles) {
            var _this3 = this;

            return titles.some(function (title) {
                return title && strings.some(function (str) {
                    return str && _this3.containsTitle(str, title);
                });
            });
        };

        this.uniqueNamesShortText = function (names, limit) {
            var unique = [];
            names.forEach(function (name) {
                if (name && unique.indexOf(name) == -1) unique.push(name);
            });

            if (limit && unique.length > 1) {
                var length = 0;
                var limit_index = -1;
                var last_index = unique.length - 1;
                unique.forEach(function (name, index) {
                    length += name.length;
                    if (limit_index == -1 && length > limit - (index == last_index ? 0 : 5)) limit_index = index;
                    length += 2;
                });

                if (limit_index != -1) {
                    unique = unique.splice(0, Math.max(limit_index, 1));
                    unique.push('...');
                }
            }

            return unique.join(', ');
        };

        this.decodeHtml = function (html) {
            var text = document.createElement("textarea");
            text.innerHTML = html;
            return text.value;
        };

        this.vcdn_api_search = function (api, data, callback, error) {
            var prox = this.proxy('lumex');
            var url = 'https://portal.lumex.host/api/';
            network.clear();
            network.timeout(1000 * 20);
            network["native"](this.proxyLink(url + api, prox, '', 'enc2'), function (json) {
                if (json.data && json.data.length) data = data.concat(json.data);
                if (callback) callback(data);
            }, function (a, c) {
                if (a.status == 404 && a.responseJSON && a.responseJSON.result === false || a.status == 0 && a.statusText !== 'timeout') {
                    if (callback) callback(data);
                } else if (error) error(network.errorDecode(a, c));
            });
        };

        this.kp_api_search = function (api, callback, error) {
            KP.clear();
            KP.getFromCache(api, function (json, cached) {
                var items = [];
                if (json.items && json.items.length) items = json.items; else if (json.films && json.films.length) items = json.films;
                if (!cached && items.length) KP.setCache(api, json);
                if (callback) callback(items);
            }, function (a, c) {
                if (error) error(network.errorDecode(a, c));
            });
        };

        this.find = function () {
            var _this4 = this;

            var query = object.search || object.movie.title;
            var search_date = object.search_date || !object.clarification && (object.movie.release_date || object.movie.first_air_date || object.movie.last_air_date) || '0000';
            var search_year = parseInt((search_date + '').slice(0, 4));
            var orig_titles = [];

            if (object.movie.alternative_titles && object.movie.alternative_titles.results) {
                orig_titles = object.movie.alternative_titles.results.map(function (t) {
                    return t.title;
                });
            }

            if (object.movie.original_title) orig_titles.push(object.movie.original_title);
            if (object.movie.original_name) orig_titles.push(object.movie.original_name);

            var display = function display(items) {
                if (items && items.length) {
                    var is_sure = false;
                    var is_imdb = false;
                    items.forEach(function (c) {
                        if (c.start_date === '1969-12-31') c.start_date = '';
                        if (c.year === '1969-12-31') c.year = '';
                        var year = c.start_date || c.year || '0000';
                        c.tmp_year = parseInt((year + '').slice(0, 4));
                    });

                    if (!object.clarification && (object.movie.imdb_id || +object.movie.kinopoisk_id)) {
                        var imdb_id = object.movie.imdb_id;
                        var kp_id = +object.movie.kinopoisk_id;
                        var tmp = items.filter(function (c) {
                            return imdb_id && (c.imdb_id || c.imdbId) == imdb_id || kp_id && (c.kp_id || c.kinopoisk_id || c.kinopoiskId || c.filmId) == kp_id;
                        });

                        if (tmp.length) {
                            items = tmp;
                            is_sure = true;
                            is_imdb = true;
                        }
                    }

                    var cards = items;

                    if (cards.length) {
                        if (orig_titles.length) {
                            var _tmp = cards.filter(function (c) {
                                return _this4.containsAnyTitle([c.orig_title || c.nameOriginal, c.en_title || c.nameEn, c.title || c.ru_title || c.nameRu], orig_titles);
                            });

                            if (_tmp.length) {
                                cards = _tmp;
                                is_sure = true;
                            }
                        }

                        if (query) {
                            var _tmp2 = cards.filter(function (c) {
                                return _this4.containsAnyTitle([c.title || c.ru_title || c.nameRu, c.en_title || c.nameEn, c.orig_title || c.nameOriginal], [query]);
                            });

                            if (_tmp2.length) {
                                cards = _tmp2;
                                is_sure = true;
                            }
                        }

                        if (cards.length > 1 && search_year) {
                            var _tmp3 = cards.filter(function (c) {
                                return c.tmp_year == search_year;
                            });

                            if (!_tmp3.length) _tmp3 = cards.filter(function (c) {
                                return c.tmp_year && c.tmp_year > search_year - 2 && c.tmp_year < search_year + 2;
                            });
                            if (_tmp3.length) cards = _tmp3;
                        }
                    }

                    if (cards.length == 1 && is_sure && !is_imdb) {
                        if (search_year && cards[0].tmp_year) {
                            is_sure = cards[0].tmp_year > search_year - 2 && cards[0].tmp_year < search_year + 2;
                        }

                        if (is_sure) {
                            is_sure = false;

                            if (orig_titles.length) {
                                is_sure |= _this4.equalAnyTitle([cards[0].orig_title || cards[0].nameOriginal, cards[0].en_title || cards[0].nameEn, cards[0].title || cards[0].ru_title || cards[0].nameRu], orig_titles);
                            }

                            if (query) {
                                is_sure |= _this4.equalAnyTitle([cards[0].title || cards[0].ru_title || cards[0].nameRu, cards[0].en_title || cards[0].nameEn, cards[0].orig_title || cards[0].nameOriginal], [query]);
                            }
                        }
                    }

                    if (cards.length == 1 && is_sure) {
                        _this4.extendChoice();

                        sources[balanser].search(object, cards[0].kp_id || cards[0].kinopoisk_id || cards[0].kinopoiskId || cards[0].filmId || cards[0].imdb_id, cards);
                    } else {
                        items.forEach(function (c) {
                            if (c.episodes) {
                                var season_count = 1;
                                c.episodes.forEach(function (episode) {
                                    if (episode.season_num > season_count) {
                                        season_count = episode.season_num;
                                    }
                                });
                                c.seasons_count = season_count;
                                c.episodes_count = c.episodes.length;
                            }
                        });

                        _this4.similars(items);

                        _this4.loading(false);
                    }
                } else _this4.emptyForQuery(query);
            };

            var vcdn_search_by_title = function vcdn_search_by_title(callback, error) {
                var params = Lampa.Utils.addUrlComponent('', Utils.vcdnToken());
                params = Lampa.Utils.addUrlComponent(params, 'query=' + encodeURIComponent(query));
                params = Lampa.Utils.addUrlComponent(params, 'field=title');

                _this4.vcdn_api_search('movies' + params, [], function (data) {
                    _this4.vcdn_api_search('animes' + params, data, function (data) {
                        _this4.vcdn_api_search('tv-series' + params, data, function (data) {
                            _this4.vcdn_api_search('anime-tv-series' + params, data, function (data) {
                                _this4.vcdn_api_search('show-tv-series' + params, data, callback, error);
                            }, error);
                        }, error);
                    }, error);
                }, error);
            };

            var vcdn_search_by_id = function vcdn_search_by_id(callback, error) {
                if (!object.clarification && (object.movie.imdb_id || +object.movie.kinopoisk_id)) {
                    var params = Lampa.Utils.addUrlComponent('', Utils.vcdnToken());
                    var imdb_params = object.movie.imdb_id ? Lampa.Utils.addUrlComponent(params, 'imdb_id=' + encodeURIComponent(object.movie.imdb_id)) : '';
                    var kp_params = +object.movie.kinopoisk_id ? Lampa.Utils.addUrlComponent(params, 'kinopoisk_id=' + encodeURIComponent(+object.movie.kinopoisk_id)) : '';

                    _this4.vcdn_api_search('short' + (imdb_params || kp_params), [], function (data) {
                        if (data && data.length) callback(data); else if (imdb_params && kp_params) {
                            _this4.vcdn_api_search('short' + kp_params, [], callback, error);
                        } else callback([]);
                    }, error);
                } else callback([]);
            };

            var vcdn_search = function vcdn_search(fallback) {
                var error = function error() {
                    if (fallback) fallback(); else display([]);
                };

                vcdn_search_by_id(function (data) {
                    if (data && data.length) display(data); else vcdn_search_by_title(function (data) {
                        if (data && data.length) display(data); else error();
                    }, error);
                }, error);
            };

            var kp_search_by_title = function kp_search_by_title(callback, error) {
                var url = 'api/v2.1/films/search-by-keyword?keyword=' + encodeURIComponent(_this4.kpCleanTitle(query));

                _this4.kp_api_search(url, callback, error);
            };

            var kp_search_by_id = function kp_search_by_id(callback, error) {
                if (!object.clarification && object.movie.imdb_id) {
                    var url = 'api/v2.2/films?imdbId=' + encodeURIComponent(object.movie.imdb_id);

                    _this4.kp_api_search(url, callback, error);
                } else callback([]);
            };

            var kp_search = function kp_search(fallback) {
                var error = function error() {
                    if (fallback) fallback(); else display([]);
                };

                kp_search_by_id(function (data) {
                    if (data && data.length) display(data); else kp_search_by_title(function (data) {
                        if (data && data.length) display(data); else error();
                    }, error);
                }, error);
            };

            var vcdn_search_imdb = function vcdn_search_imdb() {
                var error = function error() {
                    if (imdb_sources.indexOf(balanser) >= 0) {
                        _this4.extendChoice();

                        sources[balanser].search(object, object.movie.imdb_id);
                    } else if (search_sources.indexOf(balanser) >= 0) {
                        _this4.extendChoice();

                        sources[balanser].search(object);
                    } else {
                        var error2 = function error2() {
                            display([]);
                        };

                        kp_search_by_title(function (data) {
                            if (data && data.length) display(data); else error2();
                        }, error2);
                    }
                };

                vcdn_search_by_id(function (data) {
                    if (data && data.length) display(data); else error();
                }, error);
            };

            var kp_search_imdb = function kp_search_imdb() {
                kp_search_by_id(function (data) {
                    if (data && data.length) display(data); else vcdn_search_imdb();
                }, vcdn_search_imdb);
            };

            var letgo = function letgo() {
                if (!object.clarification && +object.movie.kinopoisk_id && kp_sources.indexOf(balanser) >= 0) {
                    _this4.extendChoice();

                    sources[balanser].search(object, +object.movie.kinopoisk_id);
                } else if (!object.clarification && object.movie.imdb_id && kp_sources.indexOf(balanser) >= 0) {
                    kp_search_imdb();
                } else if (search_sources.indexOf(balanser) >= 0) {
                    _this4.extendChoice();

                    sources[balanser].search(object);
                } else {
                    if (balanser == 'lumex' || balanser == 'lumex2') {
                        var fallback = function fallback() {
                            if (!object.clarification && (+object.movie.kinopoisk_id || object.movie.imdb_id)) {
                                _this4.extendChoice();

                                sources[balanser].search(object, +object.movie.kinopoisk_id || object.movie.imdb_id);
                            } else if (Lampa.Storage.field('online_mod_skip_kp_search') !== true) kp_search(); else display([]);
                        };

                        vcdn_search(fallback);
                    } else kp_search(vcdn_search);
                }
            };

            if (!object.movie.imdb_id && (object.movie.source == 'tmdb' || object.movie.source == 'cub') && (imdb_sources.indexOf(balanser) >= 0 || kp_sources.indexOf(balanser) >= 0)) {
                var tmdburl = (object.movie.name ? 'tv' : 'movie') + '/' + object.movie.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru';
                var baseurl = typeof Lampa.TMDB !== 'undefined' ? Lampa.TMDB.api(tmdburl) : 'http://api.themoviedb.org/3/' + tmdburl;
                network.clear();
                network.timeout(1000 * 15);
                network.silent(baseurl, function (ttid) {
                    object.movie.imdb_id = ttid.imdb_id;
                    letgo();
                }, function (a, c) {
                    letgo();
                });
            } else {
                letgo();
            }
        };

        this.parsePlaylist = function (str) {
            var pl = [];

            try {
                if (startsWith(str, '[')) {
                    str.substring(1).split(',[').forEach(function (item) {
                        if (endsWith(item, ',')) item = item.substring(0, item.length - 1);
                        var label_end = item.indexOf(']');

                        if (label_end >= 0) {
                            var label = item.substring(0, label_end);

                            if (item.charAt(label_end + 1) === '{') {
                                item.substring(label_end + 2).split(';{').forEach(function (voice_item) {
                                    if (endsWith(voice_item, ';')) voice_item = voice_item.substring(0, voice_item.length - 1);
                                    var voice_end = voice_item.indexOf('}');

                                    if (voice_end >= 0) {
                                        var voice = voice_item.substring(0, voice_end);
                                        pl.push({
                                            label: label,
                                            voice: voice,
                                            links: voice_item.substring(voice_end + 1).split(' or ').filter(function (link) {
                                                return link;
                                            })
                                        });
                                    }
                                });
                            } else {
                                pl.push({
                                    label: label,
                                    links: item.substring(label_end + 1).split(' or ').filter(function (link) {
                                        return link;
                                    })
                                });
                            }
                        }
                    });
                    pl = pl.filter(function (item) {
                        return item.links.length;
                    });
                }
            } catch (e) { }

            return pl;
        };

        this.parseM3U = function (str) {
            var pl = [];

            try {
                var xstream = false;
                var bandwidth = 0;
                var width = 0;
                var height = 0;
                var codecs = '';
                str.split('\n').forEach(function (line) {
                    line = line.trim();

                    if (startsWith(line, '#')) {
                        if (startsWith(line, '#EXT-X-STREAM-INF')) {
                            xstream = true;
                            var BANDWIDTH = line.match(/\bBANDWIDTH=(\d+)\b/);

                            if (BANDWIDTH) {
                                bandwidth = BANDWIDTH[1];
                            }

                            var RESOLUTION = line.match(/\bRESOLUTION=(\d+)x(\d+)\b/);

                            if (RESOLUTION) {
                                width = parseInt(RESOLUTION[1]);
                                height = parseInt(RESOLUTION[2]);
                            }

                            var CODECS = line.match(/\bCODECS="([^"]+)"/);

                            if (CODECS) {
                                codecs = CODECS[1];
                            }
                        }
                    } else if (line.length) {
                        pl.push({
                            xstream: xstream,
                            bandwidth: bandwidth,
                            width: width,
                            height: height,
                            codecs: codecs,
                            link: line
                        });
                        xstream = false;
                        bandwidth = 0;
                        width = 0;
                        height = 0;
                        codecs = '';
                    }
                });
            } catch (e) { }

            return pl;
        };

        this.formatEpisodeTitle = function (s_num, e_num, name) {
            var title = '';
            var full = Lampa.Storage.field('online_mod_full_episode_title') === true;

            if (s_num != null && s_num !== '') {
                title = (full ? Lampa.Lang.translate('torrent_serial_season') + ' ' : 'S') + s_num + ' / ';
            }

            if (name == null || name === '') name = Lampa.Lang.translate('torrent_serial_episode') + ' ' + e_num; else if (e_num != null && e_num !== '') name = Lampa.Lang.translate('torrent_serial_episode') + ' ' + e_num + ' - ' + name;
            title += name;
            return title;
        };

        this.proxyUrlCall = function (proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials) {
            proxy_url = this.proxy('iframe') + proxy_url;

            var process = function process() {
                if (proxyWindow[proxy_url]) {
                    timeout = timeout || 60 * 1000;
                    var message_id;

                    try {
                        message_id = crypto.getRandomValues(new Uint8Array(16)).toString();
                    } catch (e) { }

                    if (!message_id) message_id = Math.random().toString();
                    proxyCalls[message_id] = {
                        success: call_success,
                        fail: call_fail
                    };
                    proxyWindow[proxy_url].postMessage({
                        message: 'proxyMessage',
                        message_id: message_id,
                        method: method,
                        url: url,
                        timeout: timeout,
                        post_data: post_data,
                        withCredentials: withCredentials
                    }, '*');
                    setTimeout(function () {
                        var call = proxyCalls[message_id];

                        if (call) {
                            delete proxyCalls[message_id];
                            if (call.fail) call.fail({
                                status: 0,
                                statusText: 'timeout',
                                responseText: ''
                            }, 'timeout');
                        }
                    }, timeout + 1000);
                } else {
                    if (call_fail) call_fail({
                        status: 0,
                        statusText: 'abort',
                        responseText: ''
                    }, 'abort');
                }
            };

            if (!proxyInitialized[proxy_url]) {
                proxyInitialized[proxy_url] = true;
                var proxyOrigin = proxy_url.replace(/(https?:\/\/[^\/]+)\/.*/, '$1');
                var proxyIframe = document.createElement('iframe');
                proxyIframe.setAttribute('src', proxy_url);
                proxyIframe.setAttribute('width', '0');
                proxyIframe.setAttribute('height', '0');
                proxyIframe.setAttribute('tabindex', '-1');
                proxyIframe.setAttribute('title', 'empty');
                proxyIframe.setAttribute('style', 'display:none');
                proxyIframe.addEventListener('load', function () {
                    proxyWindow[proxy_url] = proxyIframe.contentWindow;
                    window.addEventListener('message', function (event) {
                        var data = event.data;

                        if (event.origin === proxyOrigin && data && data.message === 'proxyResponse' && data.message_id) {
                            var call = proxyCalls[data.message_id];

                            if (call) {
                                delete proxyCalls[data.message_id];

                                if (data.status === 200) {
                                    if (call.success) call.success(data.responseText);
                                } else {
                                    if (call.fail) call.fail({
                                        status: data.status,
                                        statusText: data.statusText,
                                        responseText: data.responseText
                                    });
                                }
                            }
                        }
                    });
                    if (process) process();
                    process = null;
                });
                document.body.appendChild(proxyIframe);
                setTimeout(function () {
                    if (process) process();
                    process = null;
                }, 10000);
            } else {
                process();
            }
        };
        // TODO: WTF
        this.proxyCall = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
            var proxy_url = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'nb557.surge.sh/proxy.html';
            this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
        };

        this.proxyCall2 = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
            var proxy_url = (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'lampa.stream/proxy.html';
            this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
        };

        this.proxyCall3 = function (method, url, timeout, post_data, call_success, call_fail, withCredentials) {
            var proxy_url = 'https://nb557.github.io/plugins/proxy.html';
            this.proxyUrlCall(proxy_url, method, url, timeout, post_data, call_success, call_fail, withCredentials);
        };

        this.extendChoice = function () {
            var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
            var save = data[selected_id || object.movie.id] || {};
            extended = true;
            sources[balanser].extendChoice(save);
        };

        this.saveChoice = function (choice) {
            var data = Lampa.Storage.cache('online_mod_choice_' + balanser, 500, {});
            data[selected_id || object.movie.id] = choice;
            Lampa.Storage.set('online_mod_choice_' + balanser, data);
        };
        /**
         * Есть похожие карточки
         * @param {Object} json
         */


        this.similars = function (json, search_more, more_params) {
            var _this5 = this;

            json.forEach(function (elem) {
                var title = elem.title || elem.ru_title || elem.nameRu || elem.en_title || elem.nameEn || elem.orig_title || elem.nameOriginal;
                var orig_title = elem.orig_title || elem.nameOriginal || elem.en_title || elem.nameEn;
                var year = elem.start_date || elem.year || '';
                var info = [];
                if (orig_title && orig_title != elem.title) info.push(orig_title);
                if (elem.seasons_count) info.push(Lampa.Lang.translate('online_mod_seasons_count') + ': ' + elem.seasons_count);
                if (elem.episodes_count) info.push(Lampa.Lang.translate('online_mod_episodes_count') + ': ' + elem.episodes_count);
                elem.title = title;
                elem.quality = year ? (year + '').slice(0, 4) : '----';
                elem.info = info.length ? ' / ' + info.join(' / ') : '';
                var item = Lampa.Template.get('online_mod_folder', elem);
                item.on('hover:enter', function () {
                    _this5.activity.loader(true);

                    _this5.reset();

                    object.search = elem.title;
                    object.search_date = year;
                    selected_id = elem.id;

                    _this5.extendChoice();

                    sources[balanser].search(object, elem.kp_id || elem.kinopoisk_id || elem.kinopoiskId || elem.filmId || elem.imdb_id, [elem]);
                });

                _this5.append(item);
            });

            if (search_more) {
                var elem = {
                    title: Lampa.Lang.translate('online_mod_show_more'),
                    quality: '...',
                    info: ''
                };
                var item = Lampa.Template.get('online_mod_folder', elem);
                item.on('hover:enter', function () {
                    _this5.activity.loader(true);

                    _this5.reset();

                    search_more(more_params);
                });
                this.append(item);
            }
        };
        /**
         * Очистить список файлов
         */


        this.reset = function () {
            contextmenu_all = [];
            last = filter.render().find('.selector').eq(0)[0];
            scroll.render().find('.empty').remove();
            scroll.clear();
            scroll.reset();
        };

        this.inActivity = function () {
            var body = $('body');
            return !(body.hasClass('settings--open') || body.hasClass('menu--open') || body.hasClass('keyboard-input--visible') || body.hasClass('selectbox--open') || body.hasClass('search--open') || body.hasClass('ambience--enable') || $('div.modal').length);
        };
        /**
         * Загрузка
         */


        this.loading = function (status) {
            if (status) this.activity.loader(true); else {
                this.activity.loader(false);
                if (Lampa.Activity.active().activity === this.activity && this.inActivity()) this.activity.toggle();
            }
        };

        this.getDefaultQuality = function (qualityMap, defValue) {
            if (qualityMap) {
                var preferably = forcedQuality;

                if (!preferably) {
                    preferably = Lampa.Storage.get('video_quality_default', '1080') + 'p';
                    if (preferably === '1080p') preferably = '1080p Ultra';
                }

                var items = ['2160p', '4K', '1440p', '2K', '1080p Ultra', '1080p', '720p', '480p', '360p', '240p'];
                var idx = items.indexOf(preferably);

                if (idx !== -1) {
                    for (var i = idx; i < items.length; i++) {
                        var item = items[i];
                        if (qualityMap[item]) return qualityMap[item];
                    }

                    for (var _i = idx - 1; _i >= 0; _i--) {
                        var _item = items[_i];
                        if (qualityMap[_item]) return qualityMap[_item];
                    }
                }
            }

            return defValue;
        };

        this.renameQualityMap = function (qualityMap) {
            if (!qualityMap) return qualityMap;
            var renamed = {};

            for (var label in qualityMap) {
                renamed["\u200B" + label] = qualityMap[label];
            }

            return renamed;
        };
        /**
         * Построить фильтр
         */


        this.filter = function (filter_items, choice) {
            var select = [];

            var add = function add(type, title) {
                var need = Lampa.Storage.get('online_mod_filter', '{}');
                var items = filter_items[type];
                var subitems = [];
                var value = need[type];
                items.forEach(function (name, i) {
                    subitems.push({
                        title: name,
                        selected: value == i,
                        index: i
                    });
                });
                select.push({
                    title: title,
                    subtitle: items[value],
                    items: subitems,
                    stype: type
                });
            };

            choice.source = filter_sources.indexOf(balanser);
            Lampa.Storage.set('online_mod_filter', choice);
            select.push({
                title: Lampa.Lang.translate('torrent_parser_reset'),
                reset: true
            });
            filter_items.source = obj_filter_sources.map(function (s) {
                return s.title;
            });
            add('source', Lampa.Lang.translate('online_mod_balanser'));
            if (filter_items.voice && filter_items.voice.length) add('voice', Lampa.Lang.translate('torrent_parser_voice'));
            if (filter_items.season && filter_items.season.length) add('season', Lampa.Lang.translate('torrent_serial_season'));
            if (filter_items.server && filter_items.server.length) add('server', Lampa.Lang.translate('online_mod_server'));
            this.updateQualityFilter();
            select.push(qualityFilter);
            filter.set('filter', select);
            filter.set('sort', obj_filter_sources.map(function (e) {
                return {
                    source: e.name,
                    title: e.title,
                    selected: e.name === balanser
                };
            }));
            this.selected(filter_items);
        };
        /**
         * Закрыть фильтр
         */


        this.closeFilter = function () {
            if ($('body').hasClass('selectbox--open')) Lampa.Select.close();
        };
        /**
         * Показать что выбрано в фильтре
         */


        this.selected = function (filter_items) {
            var need = Lampa.Storage.get('online_mod_filter', '{}'),
                select = [];

            for (var i in need) {
                if (i !== 'source' && filter_translate[i] && filter_items[i] && filter_items[i].length > 1) {
                    select.push(filter_translate[i] + ': ' + filter_items[i][need[i]]);
                }
            }

            var source_obj = obj_filter_sources.filter(function (e) {
                return e.name === balanser;
            })[0];
            filter.chosen('filter', select);
            filter.chosen('sort', [source_obj ? source_obj.title : balanser]);
        };
        /**
         * Добавить файл
         */


        this.append = function (item) {
            item.on('hover:focus', function (e) {
                last = e.target;
                scroll.update($(e.target), true);
            });
            scroll.append(item);
        };
        /**
         * Меню
         */


        this.contextmenu = function (params) {
            contextmenu_all.push(params);
            params.item.on('hover:long', function () {
                function selectQuality(title, callback) {
                    return function (extra) {
                        if (extra.quality) {
                            var qual = [];

                            for (var i in extra.quality) {
                                qual.push({
                                    title: i,
                                    file: extra.quality[i]
                                });
                            }

                            Lampa.Select.show({
                                title: title,
                                items: qual,
                                onBack: function onBack() {
                                    Lampa.Controller.toggle(enabled);
                                },
                                onSelect: callback
                            });
                        } else callback(null, extra);
                    };
                }

                var enabled = Lampa.Controller.enabled().name;
                var menu = [{
                    title: Lampa.Lang.translate('torrent_parser_label_title'),
                    mark: true
                }, {
                    title: Lampa.Lang.translate('torrent_parser_label_cancel_title'),
                    clearmark: true
                }, {
                    title: Lampa.Lang.translate('online_mod_clearmark_all'),
                    clearmark_all: true
                }, {
                    title: Lampa.Lang.translate('time_reset'),
                    timeclear: true
                }, {
                    title: Lampa.Lang.translate('online_mod_timeclear_all'),
                    timeclear_all: true
                }];

                if (Lampa.Platform.is('webos')) {
                    menu.push({
                        title: Lampa.Lang.translate('player_lauch') + ' - Webos',
                        player: 'webos'
                    });
                }

                if (Lampa.Platform.is('android')) {
                    menu.push({
                        title: Lampa.Lang.translate('player_lauch') + ' - Android',
                        player: 'android'
                    });
                }

                menu.push({
                    title: Lampa.Lang.translate('player_lauch') + ' - Lampa',
                    player: 'lampa'
                });

                if (params.file) {
                    menu.push({
                        title: Lampa.Lang.translate('copy_link'),
                        copylink: true
                    });
                }

                if (Lampa.Account.working() && params.element && typeof params.element.season !== 'undefined' && Lampa.Account.subscribeToTranslation) {
                    menu.push({
                        title: Lampa.Lang.translate('online_mod_voice_subscribe'),
                        subscribe: true
                    });
                }

                Lampa.Select.show({
                    title: Lampa.Lang.translate('title_action'),
                    items: menu,
                    onBack: function onBack() {
                        Lampa.Controller.toggle(enabled);
                    },
                    onSelect: function onSelect(a) {
                        if (a.clearmark) {
                            Lampa.Arrays.remove(params.viewed, params.hash_file);
                            Lampa.Storage.set('online_view', params.viewed);
                            params.item.find('.torrent-item__viewed').remove();
                        }

                        if (a.clearmark_all) {
                            contextmenu_all.forEach(function (params) {
                                Lampa.Arrays.remove(params.viewed, params.hash_file);
                                Lampa.Storage.set('online_view', params.viewed);
                                params.item.find('.torrent-item__viewed').remove();
                            });
                        }

                        if (a.mark) {
                            if (params.viewed.indexOf(params.hash_file) == -1) {
                                params.viewed.push(params.hash_file);
                                params.item.append('<div class="torrent-item__viewed">' + Lampa.Template.get('icon_star', {}, true) + '</div>');
                                Lampa.Storage.set('online_view', params.viewed);
                            }
                        }

                        if (a.timeclear) {
                            params.view.percent = 0;
                            params.view.time = 0;
                            params.view.duration = 0;
                            Lampa.Timeline.update(params.view);
                        }

                        if (a.timeclear_all) {
                            contextmenu_all.forEach(function (params) {
                                params.view.percent = 0;
                                params.view.time = 0;
                                params.view.duration = 0;
                                Lampa.Timeline.update(params.view);
                            });
                        }

                        Lampa.Controller.toggle(enabled);

                        if (a.player) {
                            Lampa.Player.runas(a.player);
                            params.item.trigger('hover:enter', {
                                runas: a.player
                            });
                        }

                        if (a.copylink) {
                            params.file(selectQuality('Ссылки', function (b, extra) {
                                Lampa.Utils.copyTextToClipboard(b && b.file || extra && extra.file, function () {
                                    Lampa.Noty.show(Lampa.Lang.translate('copy_secuses'));
                                }, function () {
                                    Lampa.Noty.show(Lampa.Lang.translate('copy_error'));
                                });
                            }));
                        }

                        if (a.subscribe) {
                            Lampa.Account.subscribeToTranslation({
                                card: object.movie,
                                season: params.element.season,
                                episode: params.element.translate_episode_end,
                                voice: params.element.translate_voice
                            }, function () {
                                Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_success'));
                            }, function () {
                                Lampa.Noty.show(Lampa.Lang.translate('online_mod_voice_error'));
                            });
                        }
                    }
                });
            }).on('hover:focus', function () {
                if (Lampa.Helper) Lampa.Helper.show('online_file', Lampa.Lang.translate('online_mod_file_helper'), params.item);
            });
        };
        /**
         * Показать пустой результат
         */


        this.empty = function (msg) {
            var empty = Lampa.Template.get('list_empty');
            if (msg) empty.find('.empty__descr').text(msg);
            scroll.append(empty);
            this.loading(false);
        };
        /**
         * Показать пустой результат по ключевому слову
         */


        this.emptyForQuery = function (query) {
            this.empty(Lampa.Lang.translate('online_mod_query_start') + ' (' + query + ') ' + Lampa.Lang.translate('online_mod_query_end'));
        };

        this.getLastEpisode = function (items) {
            var last_episode = 0;
            items.forEach(function (e) {
                if (typeof e.episode !== 'undefined') last_episode = Math.max(last_episode, parseInt(e.episode));
            });
            return last_episode;
        };
        /**
         * Начать навигацию по файлам
         */


        this.start = function (first_select) {
            if (Lampa.Activity.active().activity !== this.activity) return; //обязательно, иначе наблюдается баг, активность создается но не стартует, в то время как компонент загружается и стартует самого себя.

            if (first_select) {
                var last_views = scroll.render().find('.selector.online').find('.torrent-item__viewed').parent().last();
                if (object.movie.number_of_seasons && last_views.length) last = last_views.eq(0)[0]; else last = scroll.render().find('.selector').eq(0)[0];
            }

            Lampa.Background.immediately(Lampa.Utils.cardImgBackground(object.movie));
            Lampa.Controller.add('content', {
                toggle: function toggle() {
                    Lampa.Controller.collectionSet(scroll.render(), files.render());
                    Lampa.Controller.collectionFocus(last || false, scroll.render());
                },
                up: function up() {
                    if (Navigator.canmove('up')) {
                        Navigator.move('up');
                    } else Lampa.Controller.toggle('head');
                },
                down: function down() {
                    Navigator.move('down');
                },
                right: function right() {
                    if (Navigator.canmove('right')) Navigator.move('right'); else filter.show(Lampa.Lang.translate('title_filter'), 'filter');
                },
                left: function left() {
                    if (Navigator.canmove('left')) Navigator.move('left'); else Lampa.Controller.toggle('menu');
                },
                back: this.back
            });
            if (this.inActivity()) Lampa.Controller.toggle('content');
        };

        this.render = function () {
            return files.render();
        };

        this.back = function () {
            Lampa.Activity.backward();
        };

        this.pause = function () { };

        this.stop = function () { };

        this.destroy = function () {
            network.clear();
            files.destroy();
            scroll.destroy();
            network = null;
            all_sources.forEach(function (s) {
                s.source.destroy();
            });
        };
    }

    var mod_version = '22.01.2025';
    console.log('App', 'start address:', window.location.href);
    var isMSX = !!(window.TVXHost || window.TVXManager);
    var isTizen = navigator.userAgent.toLowerCase().indexOf('tizen') !== -1;
    var isIFrame = window.parent !== window;
    var isLocal = !startsWith(window.location.protocol, 'http');
    var androidHeaders = Lampa.Platform.is('android') && Utils.checkAndroidVersion(339);
    console.log('App', 'is MSX:', isMSX);
    console.log('App', 'is Tizen:', isTizen);
    console.log('App', 'is iframe:', isIFrame);
    console.log('App', 'is local:', isLocal);
    console.log('App', 'supports headers:', androidHeaders);

    if (!Utils.isDebug()) {
        Lampa.Storage.set('online_mod_proxy_rezka2', 'false');
        Lampa.Storage.set('online_mod_proxy_kinobase', 'false');
        Lampa.Storage.set('online_mod_proxy_collaps', 'false');
        Lampa.Storage.set('online_mod_proxy_cdnmovies', 'false');
        Lampa.Storage.set('online_mod_proxy_fancdn', 'false');
        Lampa.Storage.set('online_mod_proxy_fanserials', 'false');
        Lampa.Storage.set('online_mod_proxy_redheadsound', 'false');
        Lampa.Storage.set('online_mod_proxy_animelib', 'false');
    }

    Lampa.Storage.set('online_mod_proxy_filmix', Lampa.Platform.is('android') ? 'false' : 'true');
    Lampa.Storage.set('online_mod_proxy_videodb', 'false');
    Lampa.Storage.set('online_mod_proxy_zetflix', 'false');
    Lampa.Storage.set('online_mod_proxy_kinopub', 'true');
    Lampa.Storage.set('online_mod_proxy_alloha', 'false');
    Lampa.Storage.set('online_mod_proxy_hdvb', 'false');
    Lampa.Storage.set('online_mod_proxy_kp', 'false');
    Lampa.Params.trigger('online_mod_iframe_proxy', !isTizen || isLocal);
    Lampa.Params.trigger('online_mod_proxy_iframe', false);
    Lampa.Params.trigger('online_mod_use_stream_proxy', false);
    Lampa.Params.trigger('online_mod_proxy_find_ip', false);
    Lampa.Params.trigger('online_mod_proxy_other', false);
    Lampa.Params.trigger('online_mod_proxy_lumex', false);
    Lampa.Params.trigger('online_mod_proxy_rezka', false);
    Lampa.Params.trigger('online_mod_proxy_rezka2', false);
    Lampa.Params.trigger('online_mod_proxy_rezka2_mirror', false);
    Lampa.Params.trigger('online_mod_proxy_kinobase', false);
    Lampa.Params.trigger('online_mod_proxy_collaps', false);
    Lampa.Params.trigger('online_mod_proxy_cdnmovies', false);
    Lampa.Params.trigger('online_mod_proxy_filmix', false);
    Lampa.Params.trigger('online_mod_proxy_videodb', false);
    Lampa.Params.trigger('online_mod_proxy_zetflix', false);
    Lampa.Params.trigger('online_mod_proxy_fancdn', false);
    Lampa.Params.trigger('online_mod_proxy_fanserials', false);
    Lampa.Params.trigger('online_mod_proxy_redheadsound', false);
    Lampa.Params.trigger('online_mod_proxy_cdnvideohub', false);
    Lampa.Params.trigger('online_mod_proxy_anilibria', false);
    Lampa.Params.trigger('online_mod_proxy_anilibria2', false);
    Lampa.Params.trigger('online_mod_proxy_animelib', false);
    Lampa.Params.trigger('online_mod_proxy_kodik', false);
    Lampa.Params.trigger('online_mod_proxy_kinopub', false);
    Lampa.Params.trigger('online_mod_proxy_alloha', false);
    Lampa.Params.trigger('online_mod_proxy_hdvb', false);
    Lampa.Params.trigger('online_mod_proxy_kp', false);
    Lampa.Params.trigger('online_mod_skip_kp_search', false);
    Lampa.Params.trigger('online_mod_prefer_http', window.location.protocol !== 'https:');
    Lampa.Params.trigger('online_mod_prefer_mp4', true);
    Lampa.Params.trigger('online_mod_prefer_dash', false);
    Lampa.Params.trigger('online_mod_collaps_lampa_player', false);
    Lampa.Params.trigger('online_mod_full_episode_title', false);
    Lampa.Params.trigger('online_mod_convert_vtt_to_srt', false);
    Lampa.Params.trigger('online_mod_av1_support', true);
    Lampa.Params.trigger('online_mod_save_last_balanser', false);
    Lampa.Params.trigger('online_mod_rezka2_fix_stream', false);
    Lampa.Params.select('online_mod_kinobase_mirror', '', '');
    Lampa.Params.select('online_mod_kinobase_cookie', '', '');
    Lampa.Params.select('online_mod_rezka2_mirror', '', '');
    Lampa.Params.select('online_mod_rezka2_name', '', '');
    Lampa.Params.select('online_mod_rezka2_password', '', '');
    Lampa.Params.select('online_mod_rezka2_cookie', '', '');
    Lampa.Params.select('online_mod_rezka2_prx_ukr', {
        'prx.ukrtelcdn.net': 'prx.ukrtelcdn.net',
        'prx-cogent.ukrtelcdn.net': 'prx-cogent.ukrtelcdn.net',
        'prx2-cogent.ukrtelcdn.net': 'prx2-cogent.ukrtelcdn.net',
        'prx-ams.ukrtelcdn.net': 'prx-ams.ukrtelcdn.net',
        'prx2-ams.ukrtelcdn.net': 'prx2-ams.ukrtelcdn.net'
    }, 'prx.ukrtelcdn.net');
    Lampa.Params.select('online_mod_fancdn_name', '', '');
    Lampa.Params.select('online_mod_fancdn_password', '', '');
    Lampa.Params.select('online_mod_fancdn_cookie', '', '');
    Lampa.Params.select('online_mod_proxy_other_url', '', '');
    Lampa.Params.select('online_mod_secret_password', '', '');

    if (window.location.protocol === 'https:') {
        Lampa.Storage.set('online_mod_prefer_http', 'false');
    }

    if (Lampa.Storage.get('online_mod_proxy_reset', '') != 6) {
        if (['collaps', 'collaps-dash'].indexOf(Lampa.Storage.get('online_mod_balanser', '') + '') !== -1) {
            Lampa.Storage.set('online_mod_balanser', '');
        }

        Lampa.Storage.set('online_mod_proxy_lumex', Lampa.Platform.is('android') ? 'false' : 'true');
        Lampa.Storage.set('online_mod_proxy_reset', '6');
    }

    if (!Lampa.Lang) {
        var lang_data = {};
        Lampa.Lang = {
            add: function add(data) {
                lang_data = data;
            },
            translate: function translate(key) {
                return lang_data[key] ? lang_data[key].ru : key;
            }
        };
    }

    Lampa.Lang.add({
        online_mod_watch: {
            ru: 'Смотреть онлайн',
            uk: 'Дивитися онлайн',
            be: 'Глядзець анлайн',
            en: 'Watch online',
            zh: '在线观看'
        },
        online_mod_nolink: {
            ru: 'Не удалось извлечь ссылку',
            uk: 'Неможливо отримати посилання',
            be: 'Не ўдалося атрымаць спасылку',
            en: 'Failed to fetch link',
            zh: '获取链接失败'
        },
        online_mod_blockedlink: {
            ru: 'К сожалению, это видео не доступно в вашем регионе',
            uk: 'На жаль, це відео не доступне у вашому регіоні',
            be: 'Нажаль, гэта відэа не даступна ў вашым рэгіёне',
            en: 'Sorry, this video is not available in your region',
            zh: '抱歉，您所在的地区无法观看该视频'
        },
        online_mod_blockedlink_copyright: {
            ru: 'К сожалению, это видео не доступно по запросу правообладателей',
            uk: 'На жаль, це відео не доступне за запитом правовласників',
            be: 'Нажаль, гэта відэа не даступна па запыце праваўладальнікаў',
            en: 'Sorry, this video is not available due to copyright holder request',
            zh: '抱歉，由于版权所有者的要求，该视频无法播放。'
        },
        online_mod_waitlink: {
            ru: 'Работаем над извлечением ссылки, подождите...',
            uk: 'Працюємо над отриманням посилання, зачекайте...',
            be: 'Працуем над выманнем спасылкі, пачакайце...',
            en: 'Working on extracting the link, please wait...',
            zh: '正在提取链接，请稍候...'
        },
        online_mod_captcha_address: {
            ru: 'Требуется пройти капчу по адресу: ',
            uk: 'Потрібно пройти капчу за адресою: ',
            be: 'Патрабуецца прайсці капчу па адрасе: ',
            en: 'It is required to pass the captcha at: ',
            zh: '您需要完成验证码： '
        },
        online_mod_captcha_proxy: {
            ru: 'Требуется пройти капчу. Попробуйте использовать зеркало вместо прокси',
            uk: 'Потрібно пройти капчу. Спробуйте використовувати дзеркало замість проксі',
            be: 'Патрабуецца прайсці капчу. Паспрабуйце выкарыстоўваць люстэрка замест проксі',
            en: 'It is required to pass the captcha. Try to use a mirror instead of a proxy',
            zh: '您需要通过验证码。 尝试使用镜子而不是代理'
        },
        online_mod_balanser: {
            ru: 'Балансер',
            uk: 'Балансер',
            be: 'Балансер',
            en: 'Balancer',
            zh: '平衡器'
        },
        online_mod_file_helper: {
            ru: 'Удерживайте клавишу "ОК" для вызова контекстного меню',
            uk: 'Утримуйте клавішу "ОК" для виклику контекстного меню',
            be: 'Утрымлівайце клавішу "ОК" для выкліку кантэкстнага меню',
            en: 'Hold the "OK" key to bring up the context menu',
            zh: '按住“确定”键调出上下文菜单'
        },
        online_mod_clearmark_all: {
            ru: 'Снять отметку у всех',
            uk: 'Зняти позначку у всіх',
            be: 'Зняць адзнаку ва ўсіх',
            en: 'Uncheck all',
            zh: '取消所有'
        },
        online_mod_timeclear_all: {
            ru: 'Сбросить тайм-код у всех',
            uk: 'Скинути тайм-код у всіх',
            be: 'Скінуць тайм-код ва ўсіх',
            en: 'Reset timecode for all',
            zh: '为所有人重置时间码'
        },
        online_mod_query_start: {
            ru: 'По запросу',
            uk: 'На запит',
            be: 'Па запыце',
            en: 'On request',
            zh: '根据要求'
        },
        online_mod_query_end: {
            ru: 'нет результатов',
            uk: 'немає результатів',
            be: 'няма вынікаў',
            en: 'no results',
            zh: '没有结果'
        },
        online_mod_title: {
            ru: 'Онлайн',
            uk: 'Онлайн',
            be: 'Анлайн',
            en: 'Online',
            zh: '在线的'
        },
        online_mod_title_full: {
            ru: 'Онлайн Мод',
            uk: 'Онлайн Мод',
            be: 'Анлайн Мод',
            en: 'Online Mod',
            zh: '在线的 Mod'
        },
        online_mod_use_stream_proxy: {
            ru: 'Проксировать видеопоток (Укр)',
            uk: 'Проксирувати відеопотік (Укр)',
            be: 'Праксіраваць відэаструмень (Укр)',
            en: 'Proxy video stream (Ukr)',
            zh: '代理视频流 （乌克兰）'
        },
        online_mod_proxy_find_ip: {
            ru: 'Передавать свой IP прокси',
            uk: 'Передавати свій IP проксі',
            be: 'Перадаваць свой IP проксі',
            en: 'Send your IP to proxy',
            zh: '将您的 IP 发送给代理'
        },
        online_mod_proxy_other: {
            ru: 'Использовать альтернативный прокси',
            uk: 'Використовувати альтернативний проксі',
            be: 'Выкарыстоўваць альтэрнатыўны проксі',
            en: 'Use an alternative proxy',
            zh: '使用备用代理'
        },
        online_mod_proxy_other_url: {
            ru: 'Альтернативный прокси',
            uk: 'Альтернативний проксі',
            be: 'Альтэрнатыўны проксі',
            en: 'Alternative proxy',
            zh: '备用代理'
        },
        online_mod_proxy_balanser: {
            ru: 'Проксировать',
            uk: 'Проксирувати',
            be: 'Праксіраваць',
            en: 'Proxy',
            zh: '代理'
        },
        online_mod_proxy_kp: {
            ru: 'Проксировать КиноПоиск',
            uk: 'Проксирувати КиноПоиск',
            be: 'Праксіраваць КиноПоиск',
            en: 'Proxy KinoPoisk',
            zh: '代理 KinoPoisk'
        },
        online_mod_skip_kp_search: {
            ru: 'Не искать в КиноПоиск',
            uk: 'Не шукати у КиноПоиск',
            be: 'Не шукаць у КиноПоиск',
            en: 'Skip search in KinoPoisk',
            zh: '在 KinoPoisk 中跳过搜索'
        },
        online_mod_iframe_proxy: {
            ru: 'Использовать iframe-прокси',
            uk: 'Використовувати iframe-проксі',
            be: 'Выкарыстоўваць iframe-проксі',
            en: 'Use iframe proxy',
            zh: '使用 iframe 代理'
        },
        online_mod_prefer_http: {
            ru: 'Предпочитать поток по HTTP',
            uk: 'Віддавати перевагу потіку по HTTP',
            be: 'Аддаваць перавагу патоку па HTTP',
            en: 'Prefer stream over HTTP',
            zh: '优先于 HTTP 流式传输'
        },
        online_mod_prefer_mp4: {
            ru: 'Предпочитать поток MP4',
            uk: 'Віддавати перевагу потіку MP4',
            be: 'Аддаваць перавагу патоку MP4',
            en: 'Prefer MP4 stream',
            zh: '更喜欢 MP4 流'
        },
        online_mod_prefer_dash: {
            ru: 'Предпочитать DASH вместо HLS',
            uk: 'Віддавати перевагу DASH замість HLS',
            be: 'Аддаваць перавагу DASH замест HLS',
            en: 'Prefer DASH over HLS',
            zh: '更喜欢 DASH 而不是 HLS'
        },
        online_mod_collaps_lampa_player: {
            ru: 'Collaps: Встроенный плеер',
            uk: 'Collaps: Вбудований плеєр',
            be: 'Collaps: Убудаваны плэер',
            en: 'Collaps: Lampa player',
            zh: 'Collaps： Lampa播放器'
        },
        online_mod_full_episode_title: {
            ru: 'Полный формат названия серии',
            uk: 'Повний формат назви серії',
            be: 'Поўны фармат назвы серыі',
            en: 'Full episode title format',
            zh: '完整剧集标题格式'
        },
        online_mod_convert_vtt_to_srt: {
            ru: 'Конвертировать VTT в SRT',
            uk: 'Конвертувати VTT в SRT',
            be: 'Канвертаваць VTT у SRT',
            en: 'Convert VTT to SRT',
            zh: '将 VTT 转换为 SRT'
        },
        online_mod_av1_support: {
            ru: 'AV1 поддерживается',
            uk: 'AV1 підтримується',
            be: 'AV1 падтрымліваецца',
            en: 'AV1 supported',
            zh: 'AV1 支持'
        },
        online_mod_save_last_balanser: {
            ru: 'Сохранять историю балансеров',
            uk: 'Зберігати історію балансерів',
            be: 'Захоўваць гісторыю балансараў',
            en: 'Save history of balancers',
            zh: '保存平衡器的历史记录'
        },
        online_mod_clear_last_balanser: {
            ru: 'Очистить историю балансеров',
            uk: 'Очистити історію балансерів',
            be: 'Ачысціць гісторыю балансараў',
            en: 'Clear history of balancers',
            zh: '清除平衡器的历史记录'
        },
        online_mod_kinobase_mirror: {
            ru: 'Зеркало для Kinobase',
            uk: 'Дзеркало для Kinobase',
            be: 'Люстэрка для Kinobase',
            en: 'Mirror for Kinobase',
            zh: 'Kinobase的镜子'
        },
        online_mod_kinobase_cookie: {
            ru: 'Куки для Kinobase',
            uk: 'Кукі для Kinobase',
            be: 'Кукі для Kinobase',
            en: 'Cookie for Kinobase',
            zh: 'Kinobase 的 Cookie'
        },
        online_mod_rezka2_mirror: {
            ru: 'Зеркало для HDrezka',
            uk: 'Дзеркало для HDrezka',
            be: 'Люстэрка для HDrezka',
            en: 'Mirror for HDrezka',
            zh: 'HDrezka的镜子'
        },
        online_mod_proxy_rezka2_mirror: {
            ru: 'Проксировать зеркало HDrezka',
            uk: 'Проксирувати дзеркало HDrezka',
            be: 'Праксіраваць люстэрка HDrezka',
            en: 'Proxy HDrezka mirror',
            zh: '代理HDrezka镜子'
        },
        online_mod_rezka2_name: {
            ru: 'Логин или email для HDrezka',
            uk: 'Логін чи email для HDrezka',
            be: 'Лагін ці email для HDrezka',
            en: 'Login or email for HDrezka',
            zh: 'HDrezka的登录名或电子邮件'
        },
        online_mod_rezka2_password: {
            ru: 'Пароль для HDrezka',
            uk: 'Пароль для HDrezka',
            be: 'Пароль для HDrezka',
            en: 'Password for HDrezka',
            zh: 'HDrezka的密码'
        },
        online_mod_rezka2_login: {
            ru: 'Войти в HDrezka',
            uk: 'Увійти до HDrezka',
            be: 'Увайсці ў HDrezka',
            en: 'Log in to HDrezka',
            zh: '登录HDrezka'
        },
        online_mod_rezka2_logout: {
            ru: 'Выйти из HDrezka',
            uk: 'Вийти з HDrezka',
            be: 'Выйсці з HDrezka',
            en: 'Log out of HDrezka',
            zh: '注销HDrezka'
        },
        online_mod_rezka2_cookie: {
            ru: 'Куки для HDrezka',
            uk: 'Кукі для HDrezka',
            be: 'Кукі для HDrezka',
            en: 'Cookie for HDrezka',
            zh: 'HDrezka 的 Cookie'
        },
        online_mod_rezka2_fill_cookie: {
            ru: 'Заполнить куки для HDrezka',
            uk: 'Заповнити кукі для HDrezka',
            be: 'Запоўніць кукі для HDrezka',
            en: 'Fill cookie for HDrezka',
            zh: '为HDrezka填充Cookie'
        },
        online_mod_rezka2_fix_stream: {
            ru: 'Фикс видеопотока для HDrezka',
            uk: 'Фікс відеопотоку для HDrezka',
            be: 'Фікс відэаструменю для HDrezka',
            en: 'Fix video stream for HDrezka',
            zh: '修复 HDrezka 的视频流'
        },
        online_mod_rezka2_prx_ukr: {
            ru: 'Прокси-сервер для HDrezka (Укр)',
            uk: 'Проксі-сервер для HDrezka (Укр)',
            be: 'Проксі-сервер для HDrezka (Укр)',
            en: 'Proxy server for HDrezka (Ukr)',
            zh: 'HDrezka 的代理服务器 （乌克兰）'
        },
        online_mod_fancdn_name: {
            ru: 'Логин для FanSerials',
            uk: 'Логін для FanSerials',
            be: 'Лагін для FanSerials',
            en: 'Login for FanSerials',
            zh: 'FanSerials的登录名'
        },
        online_mod_fancdn_password: {
            ru: 'Пароль для FanSerials',
            uk: 'Пароль для FanSerials',
            be: 'Пароль для FanSerials',
            en: 'Password for FanSerials',
            zh: 'FanSerials的密码'
        },
        online_mod_fancdn_cookie: {
            ru: 'Куки для FanSerials',
            uk: 'Кукі для FanSerials',
            be: 'Кукі для FanSerials',
            en: 'Cookie for FanSerials',
            zh: 'FanSerials 的 Cookie'
        },
        online_mod_fancdn_fill_cookie: {
            ru: 'Заполнить куки для FanSerials',
            uk: 'Заповнити кукі для FanSerials',
            be: 'Запоўніць кукі для FanSerials',
            en: 'Fill cookie for FanSerials',
            zh: '为FanSerials填充Cookie'
        },
        online_mod_authorization_required: {
            ru: 'Требуется авторизация',
            uk: 'Потрібна авторизація',
            be: 'Патрабуецца аўтарызацыя',
            en: 'Authorization required',
            zh: '需要授权'
        },
        online_mod_secret_password: {
            ru: 'Секретный пароль',
            uk: 'Секретний пароль',
            be: 'Сакрэтны пароль',
            en: 'Secret password',
            zh: '秘密密码'
        },
        online_mod_seasons_count: {
            ru: 'Сезонов',
            uk: 'Сезонів',
            be: 'Сезонаў',
            en: 'Seasons',
            zh: '季'
        },
        online_mod_episodes_count: {
            ru: 'Эпизодов',
            uk: 'Епізодів',
            be: 'Эпізодаў',
            en: 'Episodes',
            zh: '集'
        },
        online_mod_show_more: {
            ru: 'Показать ещё',
            uk: 'Показати ще',
            be: 'Паказаць яшчэ',
            en: 'Show more',
            zh: '展示更多'
        },
        online_mod_server: {
            ru: 'Сервер',
            uk: 'Сервер',
            be: 'Сервер',
            en: 'Server',
            zh: '服务器'
        },
        online_mod_filmix_param_add_title: {
            ru: 'Добавить ТОКЕН от Filmix',
            uk: 'Додати ТОКЕН від Filmix',
            be: 'Дадаць ТОКЕН ад Filmix',
            en: 'Add TOKEN from Filmix',
            zh: '从 Filmix 添加 TOKEN'
        },
        online_mod_filmix_param_add_descr: {
            ru: 'Добавьте ТОКЕН для подключения подписки',
            uk: 'Додайте ТОКЕН для підключення передплати',
            be: 'Дадайце ТОКЕН для падлучэння падпіскі',
            en: 'Add a TOKEN to connect a subscription',
            zh: '添加 TOKEN 以连接订阅'
        },
        online_mod_filmix_param_placeholder: {
            ru: 'Например: nxjekeb57385b..',
            uk: 'Наприклад: nxjekeb57385b..',
            be: 'Напрыклад: nxjekeb57385b..',
            en: 'For example: nxjekeb57385b..',
            zh: '例如： nxjekeb57385b..'
        },
        online_mod_filmix_param_add_device: {
            ru: 'Добавить устройство на Filmix',
            uk: 'Додати пристрій на Filmix',
            be: 'Дадаць прыладу на Filmix',
            en: 'Add Device to Filmix',
            zh: '将设备添加到 Filmix'
        },
        online_mod_filmix_modal_text: {
            ru: 'Введите его на странице https://filmix.quest/consoles в вашем авторизованном аккаунте!',
            uk: 'Введіть його на сторінці https://filmix.quest/consoles у вашому авторизованому обліковому записі!',
            be: 'Увядзіце яго на старонцы https://filmix.quest/consoles у вашым аўтарызаваным акаўнце!',
            en: 'Enter it at https://filmix.quest/consoles in your authorized account!',
            zh: '在您的授权帐户中的 https://filmix.quest/consoles 中输入！'
        },
        online_mod_filmix_modal_wait: {
            ru: 'Ожидаем код',
            uk: 'Очікуємо код',
            be: 'Чакаем код',
            en: 'Waiting for the code',
            zh: '等待代码'
        },
        online_mod_filmix_copy_secuses: {
            ru: 'Код скопирован в буфер обмена',
            uk: 'Код скопійовано в буфер обміну',
            be: 'Код скапіяваны ў буфер абмену',
            en: 'Code copied to clipboard',
            zh: '代码复制到剪贴板'
        },
        online_mod_filmix_copy_fail: {
            ru: 'Ошибка при копировании',
            uk: 'Помилка при копіюванні',
            be: 'Памылка пры капіяванні',
            en: 'Copy error',
            zh: '复制错误'
        },
        online_mod_filmix_nodevice: {
            ru: 'Устройство не авторизовано',
            uk: 'Пристрій не авторизований',
            be: 'Прылада не аўтарызавана',
            en: 'Device not authorized',
            zh: '设备未授权'
        },
        online_mod_filmix_status: {
            ru: 'Статус',
            uk: 'Статус',
            be: 'Статус',
            en: 'Status',
            zh: '状态'
        },
        online_mod_voice_subscribe: {
            ru: 'Подписаться на перевод',
            uk: 'Підписатися на переклад',
            be: 'Падпісацца на пераклад',
            en: 'Subscribe to translation',
            zh: '订阅翻译'
        },
        online_mod_voice_success: {
            ru: 'Вы успешно подписались',
            uk: 'Ви успішно підписалися',
            be: 'Вы паспяхова падпісаліся',
            en: 'You have successfully subscribed',
            zh: '您已成功订阅'
        },
        online_mod_voice_error: {
            ru: 'Возникла ошибка',
            uk: 'Виникла помилка',
            be: 'Узнікла памылка',
            en: 'An error has occurred',
            zh: '发生了错误'
        }
    });
    var network = new Lampa.Reguest();
    var online_loading = false;

    function resetTemplates() {
        Lampa.Template.add('online_mod', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 128\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <circle cx=\"64\" cy=\"64\" r=\"56\" stroke=\"white\" stroke-width=\"16\"/>\n                    <path d=\"M90.5 64.3827L50 87.7654L50 41L90.5 64.3827Z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
        Lampa.Template.add('online_mod_folder', "<div class=\"online selector\">\n        <div class=\"online__body\">\n            <div style=\"position: absolute;left: 0;top: -0.3em;width: 2.4em;height: 2.4em\">\n                <svg style=\"height: 2.4em; width:  2.4em;\" viewBox=\"0 0 128 112\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"20\" width=\"128\" height=\"92\" rx=\"13\" fill=\"white\"/>\n                    <path d=\"M29.9963 8H98.0037C96.0446 3.3021 91.4079 0 86 0H42C36.5921 0 31.9555 3.3021 29.9963 8Z\" fill=\"white\" fill-opacity=\"0.23\"/>\n                    <rect x=\"11\" y=\"8\" width=\"106\" height=\"76\" rx=\"13\" fill=\"white\" fill-opacity=\"0.51\"/>\n                </svg>\n            </div>\n            <div class=\"online__title\" style=\"padding-left: 2.1em;\">{title}</div>\n            <div class=\"online__quality\" style=\"padding-left: 3.4em;\">{quality}{info}</div>\n        </div>\n    </div>");
    }

    function loadOnline(object) {
        var onComplite = function onComplite() {
            online_loading = false;
            resetTemplates();
            Lampa.Component.add('online_mod', component);
            Lampa.Activity.push({
                url: '',
                title: Lampa.Lang.translate('online_mod_title_full'),
                component: 'online_mod',
                search: object.title,
                search_one: object.title,
                search_two: object.original_title,
                movie: object,
                page: 1
            });
        };

        Utils.setMyIp('');

        if (Lampa.Storage.field('online_mod_proxy_find_ip') === true) {
            if (online_loading) return;
            online_loading = true;
            network.clear();
            network.timeout(10000);
            network.silent('https://api.ipify.org/?format=json', function (json) {
                if (json.ip) Utils.setMyIp(json.ip);
                onComplite();
            }, function (a, c) {
                onComplite();
            });
        } else onComplite();
    } // нужна заглушка, а то при страте лампы говорит пусто


    Lampa.Component.add('online_mod', component); //то же самое

    resetTemplates();
    var manifest = {
        type: 'video',
        version: mod_version,
        name: Lampa.Lang.translate('online_mod_title_full') + ' - ' + mod_version,
        description: Lampa.Lang.translate('online_mod_watch'),
        component: 'online_mod',
        onContextMenu: function onContextMenu(object) {
            return {
                name: Lampa.Lang.translate('online_mod_watch'),
                description: ''
            };
        },
        onContextLauch: function onContextLauch(object) {
            online_loading = false;
            loadOnline(object);
        }
    };
    Lampa.Manifest.plugins = manifest;
    var button = "<div class=\"full-start__button selector view--online_mod\" data-subtitle=\"online_mod " + mod_version + "\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 244 260\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n    <g xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M242,88v170H10V88h41l-38,38h37.1l38-38h38.4l-38,38h38.4l38-38h38.3l-38,38H204L242,88L242,88z M228.9,2l8,37.7l0,0 L191.2,10L228.9,2z M160.6,56l-45.8-29.7l38-8.1l45.8,29.7L160.6,56z M84.5,72.1L38.8,42.4l38-8.1l45.8,29.7L84.5,72.1z M10,88 L2,50.2L47.8,80L10,88z\" fill=\"currentColor\"/>\n    </g></svg>\n\n    <span>#{online_mod_title}</span>\n    </div>";
    Lampa.Listener.follow('full', function (e) {
        if (e.type == 'complite') {
            var btn = $(Lampa.Lang.translate(button));
            online_loading = false;
            btn.on('hover:enter', function () {
                loadOnline(e.data.movie);
            });
            e.object.activity.render().find('.view--torrent').after(btn);
        }
    });

    if (Lampa.Storage.get('online_mod_use_stream_proxy', '') === '') {
        $.ajax({
            url: (window.location.protocol === 'https:' ? 'https://' : 'http://') + 'ipwho.is/?fields=ip,country_code',
            jsonp: 'callback',
            dataType: 'jsonp'
        }).done(function (json) {
            if (json && json.country_code) {
                Lampa.Storage.set('online_mod_use_stream_proxy', '' + (json.country_code === 'UA'));
            }
        });
    }

    if (Lampa.VPN && Lampa.VPN.region && (Utils.isDebug() || Utils.isDebug2())) {
        Lampa.VPN.region = function (call) {
            if (call) call('de');
        };
    } ///////FILMIX/////////


    var filmix_headers = Lampa.Platform.is('android') ? {
        'User-Agent': Utils.filmixUserAgent()
    } : {};
    var api_url = 'http://filmixapp.cyou/api/v2/';
    var dev_id = Utils.randomHex(16);
    var ping_auth;
    Lampa.Params.select('filmix_token', '', '');
    Lampa.Template.add('settings_filmix', "<div>\n    <div class=\"settings-param selector\" data-name=\"filmix_token\" data-type=\"input\" placeholder=\"#{online_mod_filmix_param_placeholder}\">\n        <div class=\"settings-param__name\">#{online_mod_filmix_param_add_title}</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">#{online_mod_filmix_param_add_descr}</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"filmix_add\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_filmix_param_add_device}</div>\n    </div>\n</div>");
    Lampa.Storage.listener.follow('change', function (e) {
        if (e.name == 'filmix_token') {
            window.mod_filmix = {
                max_qualitie: 480,
                is_max_qualitie: false
            };
            if (e.value) checkPro(e.value); else {
                Lampa.Storage.set("filmix_status", {});
                showStatus();
            }
        }
    });

    function addSettingsFilmix() {
        if (Lampa.Settings.main && Lampa.Settings.main() && !Lampa.Settings.main().render().find('[data-component="filmix"]').length) {
            var field = $("<div class=\"settings-folder selector\" data-component=\"filmix\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"57\" viewBox=\"0 0 58 57\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M20 20.3735V45H26.8281V34.1262H36.724V26.9806H26.8281V24.3916C26.8281 21.5955 28.9062 19.835 31.1823 19.835H39V13H26.8281C23.6615 13 20 15.4854 20 20.3735Z\" fill=\"white\"/>\n                <rect x=\"2\" y=\"2\" width=\"54\" height=\"53\" rx=\"5\" stroke=\"white\" stroke-width=\"4\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">Filmix</div>\n        </div>");
            Lampa.Settings.main().render().find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    }

    if (window.appready) addSettingsFilmix(); else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addSettingsFilmix();
        });
    }
    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'filmix') {
            e.body.find('[data-name="filmix_add"]').unbind('hover:enter').on('hover:enter', function () {
                var user_code = '';
                var user_token = '';
                var filmix_prox = Utils.proxy('filmix');
                var filmix_prox_enc = '';

                if (filmix_prox) {
                    filmix_prox_enc += 'param/User-Agent=' + encodeURIComponent(Utils.filmixUserAgent()) + '/';
                }

                var modal = $('<div><div class="broadcast__text">' + Lampa.Lang.translate('online_mod_filmix_modal_text') + '</div><div class="broadcast__device selector" style="text-align: center">' + Lampa.Lang.translate('online_mod_filmix_modal_wait') + '...</div><br><div class="broadcast__scan"><div></div></div></div></div>');
                Lampa.Modal.open({
                    title: '',
                    html: modal,
                    onBack: function onBack() {
                        Lampa.Modal.close();
                        Lampa.Controller.toggle('settings_component');
                        clearInterval(ping_auth);
                    },
                    onSelect: function onSelect() {
                        Lampa.Utils.copyTextToClipboard(user_code, function () {
                            Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_secuses'));
                        }, function () {
                            Lampa.Noty.show(Lampa.Lang.translate('online_mod_filmix_copy_fail'));
                        });
                    }
                });
                ping_auth = setInterval(function () {
                    checkPro(user_token, function () {
                        Lampa.Modal.close();
                        clearInterval(ping_auth);
                        Lampa.Storage.set("filmix_token", user_token);
                        e.body.find('[data-name="filmix_token"] .settings-param__value').text(user_token);
                        Lampa.Controller.toggle('settings_component');
                    });
                }, 10000);
                network.clear();
                network.timeout(10000);
                network["native"](Utils.proxyLink(api_url + 'token_request' + Utils.filmixToken(dev_id, ''), filmix_prox, filmix_prox_enc, 'enc2'), function (found) {
                    if (found && found.status == 'ok') {
                        user_token = found.code;
                        user_code = found.user_code;
                        modal.find('.selector').text(user_code); //modal.find('.broadcast__scan').remove()
                    } else {
                        Lampa.Noty.show(found);
                    }
                }, function (a, c) {
                    Lampa.Noty.show(network.errorDecode(a, c));
                }, false, {
                    headers: filmix_headers
                });
            });
            showStatus();
        }
    });

    function showStatus() {
        var status = Lampa.Storage.get("filmix_status", '{}');
        var info = Lampa.Lang.translate('online_mod_filmix_nodevice');

        if (status.login) {
            if (status.is_pro) info = status.login + ' - PRO ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date; else if (status.is_pro_plus) info = status.login + ' - PRO_PLUS ' + Lampa.Lang.translate('filter_rating_to') + ' - ' + status.pro_date; else info = status.login + ' - NO PRO';
        }

        var field = $(Lampa.Lang.translate("\n        <div class=\"settings-param\" data-name=\"filmix_status\" data-static=\"true\">\n            <div class=\"settings-param__name\">#{online_mod_filmix_status}</div>\n            <div class=\"settings-param__value\">".concat(info, "</div>\n        </div>")));
        $('.settings [data-name="filmix_status"]').remove();
        $('.settings [data-name="filmix_add"]').after(field);
    }

    ///////Онлайн Мод/////////


    var template = "<div>";

    {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_lumex\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Lumex</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    if (Utils.isDebug()) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka2\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} HDrezka</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kinobase\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kinobase</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_collaps\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Collaps</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_cdnmovies\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} CDNMovies</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_filmix\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Filmix</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    if (Utils.isDebug()) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fancdn\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanCDN</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_fanserials\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} FanSerials</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_redheadsound\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} RedHeadSound</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_anilibria\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AniLibria</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_anilibria2\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AniLibria.top</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

    if (Utils.isDebug()) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_animelib\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} AnimeLib</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_kodik\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} Kodik</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_skip_kp_search\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_skip_kp_search}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_iframe_proxy\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_iframe_proxy}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_iframe\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_balanser} iframe</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_prefer_http\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_prefer_http}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_prefer_mp4\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_prefer_mp4}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

    {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_collaps_lampa_player\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_collaps_lampa_player}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_full_episode_title\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_full_episode_title}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_convert_vtt_to_srt\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_convert_vtt_to_srt}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_save_last_balanser\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_save_last_balanser}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_clear_last_balanser\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_clear_last_balanser}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>";

    if (Utils.isDebug()) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_kinobase_mirror\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_kinobase_mirror}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_kinobase_cookie\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_kinobase_cookie}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_mirror\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_mirror}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_rezka2_mirror\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_rezka2_mirror}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_name\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_name}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

    if (Lampa.Platform.is('android')) {
        Lampa.Storage.set("online_mod_rezka2_status", 'false');
    } else {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_login\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_login}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_logout\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_logout}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>";
    }

    if (Utils.isDebug() || Lampa.Platform.is('android')) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_cookie\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_cookie}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_fill_cookie\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_fill_cookie}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>";
    }

    {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_fix_stream\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_fix_stream}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    if (Utils.isDebug() || androidHeaders) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_name\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_fancdn_name}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_fancdn_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    if (Utils.isDebug() || Lampa.Platform.is('android')) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_cookie\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_fancdn_cookie}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    if (Utils.isDebug() || androidHeaders) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_fancdn_fill_cookie\" data-static=\"true\">\n        <div class=\"settings-param__name\">#{online_mod_fancdn_fill_cookie}</div>\n        <div class=\"settings-param__status\"></div>\n    </div>";
    }

    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_use_stream_proxy\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_use_stream_proxy}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_rezka2_prx_ukr\" data-type=\"select\">\n        <div class=\"settings-param__name\">#{online_mod_rezka2_prx_ukr}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_find_ip\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_find_ip}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_proxy_other_url\" data-type=\"input\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_proxy_other_url}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"online_mod_secret_password\" data-type=\"input\" data-string=\"true\" placeholder=\"#{settings_cub_not_specified}\">\n        <div class=\"settings-param__name\">#{online_mod_secret_password}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";

    if (Utils.isDebug()) {
        template += "\n    <div class=\"settings-param selector\" data-name=\"online_mod_av1_support\" data-type=\"toggle\">\n        <div class=\"settings-param__name\">#{online_mod_av1_support}</div>\n        <div class=\"settings-param__value\"></div>\n    </div>";
    }

    template += "\n</div>";
    Lampa.Template.add('settings_online_mod', template);

    function addSettingsOnlineMod() {
        if (Lampa.Settings.main && Lampa.Settings.main() && !Lampa.Settings.main().render().find('[data-component="online_mod"]').length) {
            var field = $(Lampa.Lang.translate("<div class=\"settings-folder selector\" data-component=\"online_mod\">\n            <div class=\"settings-folder__icon\">\n                <svg height=\"260\" viewBox=\"0 0 244 260\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M242,88v170H10V88h41l-38,38h37.1l38-38h38.4l-38,38h38.4l38-38h38.3l-38,38H204L242,88L242,88z M228.9,2l8,37.7l0,0 L191.2,10L228.9,2z M160.6,56l-45.8-29.7l38-8.1l45.8,29.7L160.6,56z M84.5,72.1L38.8,42.4l38-8.1l45.8,29.7L84.5,72.1z M10,88 L2,50.2L47.8,80L10,88z\" fill=\"white\"/>\n                </svg>\n            </div>\n            <div class=\"settings-folder__name\">#{online_mod_title_full}</div>\n        </div>"));
            Lampa.Settings.main().render().find('[data-component="more"]').after(field);
            Lampa.Settings.main().update();
        }
    }

    if (window.appready) addSettingsOnlineMod(); else {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') addSettingsOnlineMod();
        });
    }
    Lampa.Settings.listener.follow('open', function (e) {
        if (e.name == 'online_mod') {
            var clear_last_balanser = e.body.find('[data-name="online_mod_clear_last_balanser"]');
            clear_last_balanser.unbind('hover:enter').on('hover:enter', function () {
                Lampa.Storage.set('online_last_balanser', {});
                Lampa.Storage.set('online_balanser', '');
                Lampa.Storage.set('online_mod_last_balanser', {});
                Lampa.Storage.set('online_mod_balanser', '');
                $('.settings-param__status', clear_last_balanser).removeClass('active error wait').addClass('active');
            });
        }
    });

})();
